import React, {useEffect, useState} from 'react';
import './App.css';
import Game from '../components/gameV2/Game';
import Header from "../components/header/Header";
import {DiscordSDK, patchUrlMappings} from "@discord/embedded-app-sdk";
import {UserInfo,UserData,GuessInfo,GameInfo} from "../utils/types";
import StatBar from "../components/stats/StatBar";
import InfoPanel from "../components/infoPanel/InfoPanel";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import {inject} from "@vercel/analytics";
import * as Sentry from "@sentry/react";
// @ts-ignore
import logo from "./images.png";

Sentry.init({
    dsn:"https://b57458227a52237b9a973fa466c31d14@o4510660094787584.ingest.us.sentry.io/4510660099112960",
    tunnel:"/api/tunnel",
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
    enableLogs: true,
});

inject();
const discordSdk = new DiscordSDK("1445980061390999564");
patchUrlMappings([{prefix: '/img', target: 'https://costcofdb.com/wp-content/uploads/2022/01'}]);
async function setupDiscordSdk() {
    var auth;
    await discordSdk.ready();

    // Authorize with Discord Client
    const { code } = await discordSdk.commands.authorize({
        client_id: "1445980061390999564",
        response_type: 'code',
        state: '',
        prompt: 'none',
        // More info on scopes here: https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
        scope: [
            // Activities will launch through app commands and interactions of user-installable apps.
            // https://discord.com/developers/docs/tutorials/developing-a-user-installable-app#configuring-default-install-settings-adding-default-install-settings
            'applications.commands',
            // "applications.builds.upload",
            // "applications.builds.read",
            // "applications.store.update",
            // "applications.entitlements",
            // "bot",
            'identify',
            // "connections",
            // "email",
            // "gdm.join",
            'guilds',
            // "guilds.join",
            'guilds.members.read',
            // "messages.read",
            // "relationships.read",
            // 'rpc.activities.write',
            // "rpc.notifications.read",
            // "rpc.voice.write",
            // 'rpc.voice.read',
            // "webhook.incoming",
        ],
    });

    console.log(code);
    console.log("discordSdk initialized response");
    // Retrieve an access_token from your activity's server
    // see https://discord.com/developers/docs/activities/development-guides/networking#construct-a-full-url
    const response = await fetch("/api/auth", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            code,
        }),
    }).catch(()=>{
        console.error("auth failure")
        discordSdk.close(4000,"Error loading, Please try again later")
    });
    const { access_token } = await response?.json();
    console.log(access_token);
    console.log("access");
    // Authenticate with Discord client (using the access_token)
    auth = await discordSdk.commands.authenticate({
        access_token,
    });

    if (auth == null) {
        throw new Error('Authenticate command failed');
    }
    return access_token;
}
async function getChannel(channelID:string){
    const params = {
        channelID:channelID
    }
    const response = await fetch("/api/channel?" + new URLSearchParams(params).toString(),{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const query = await response.json();
    let cUsers:UserData[] = []
    for (let i = 0; i < query.length; i++) {
        let current = query[i]
        let g:GuessInfo = {
            hGuess:parseFloat(current[2]),
            lGuess:parseFloat(current[3]),
            guessCnt:current[5],
            completed:current[6]
        }
        let u:UserInfo = {
            username:current[8],
            avatar:current[9],
            userID:current[1],
            channelID:discordSdk.channelId,
        }
        cUsers.push({
            userInfo:u,
            guessInfo:g
        })
    }
    return cUsers;
}
async function getUserCurrent(userID:string){
    const params = {
        userID:userID
    }
    const response = await fetch("/api/guess?" + new URLSearchParams(params).toString(),{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const query = await response.json();
    console.log(query)
    console.log("query result")
    let prevGuess:GuessInfo = {
        hGuess:0,
        lGuess:0,
        guessCnt:0,
        completed:false
    }
    if (query.length > 0) {
        const guess = query[0];
        prevGuess.guessCnt = guess[5]+1;
        prevGuess.hGuess = parseFloat(guess[2]);
        prevGuess.lGuess = parseFloat(guess[3]);
        prevGuess.completed = guess[6];
    }else {
        console.log("no user found");
    }
    return prevGuess;
}

function App() {
    const [token,setToken]=useState("");
    const [users,setUsers] = useState<UserData[]>([]);
    const [userData,setUserData] = useState<UserData>();
    const [gameInfo,setGameInfo] = useState<GameInfo>();
    const [statbar,setStatBar] = useState<boolean>(false);
    const [info,setInfo] = useState<boolean>(false);
    Sentry.logger.fatal("test")
    async function getUser(token:string){
        console.log("user");
        console.log(token);
        const response = await fetch("https://discord.com/api/users/@me",{
            method:"GET",
            headers:{
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        const r = await response.json();
        const currentUser:UserInfo = {
            avatar:r["avatar"],
            userID:r["id"],
            username:r["username"],
            channelID:discordSdk.channelId
        }
        return currentUser;
    }
    useEffect(() => {
        setupDiscordSdk().then((token) => {
            console.log("Discord SDK is ready");
            setToken(token);
        }).catch(r=>{
            Sentry.logger.fatal("failed to set up discord sdk")
            console.log("failed to set up discord sdk")
        });
        },[])

    useEffect(() => {
        if (token.length>0) {
            parseGame().then(r=>{
                console.log("game info retrieved")
            })
                .catch(r=>{
                Sentry.logger.fatal("failed to retrieve game info ")
                console.error("failed to retrieve game info" + r.toString());
                discordSdk.close(4000,"Error loading, Please try again later")
            })
            getUser(token).then(u => {
                console.log("user done")
                getUserCurrent(u.userID).then(g => {
                    console.log(g);
                    console.log("User stat done");
                    const temp = {
                        userInfo: u,
                        guessInfo: g
                    }
                    setUserData(temp)
                }).catch(r => {
                    Sentry.logger.fatal("failed to get current user ")
                    console.error("failed to get current user " + r.toString())
                    discordSdk.close(4000,"Error loading, Please try again later")
                });
                if (discordSdk.channelId) {
                    getChannel(discordSdk.channelId).then(cUsers => {
                        console.log(cUsers);
                        console.log("channel done");
                        setUsers(cUsers);
                    }).catch(r=>{
                        Sentry.logger.fatal("failed to get channel info ")
                        console.error("failed to get channel info" + r.toString())
                        discordSdk.close(4000,"Error loading, Please try again later")
                    })
                } else {
                    console.log("no channel");
                }
            }).catch(r=>{
                Sentry.logger.fatal("failed to get current user token ")
                console.error("failed to retrieve user token " + r.toString())
                discordSdk.close(4000,"Error loading, Please try again later")
            });
        }
    }, [token]);


    async function parseGame(){
        const protocol = `https`;
        const clientId = '1445980061390999564';
        const proxyDomain = 'discordsays.com';
        const response = await fetch("/api/game",{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            }
        })
        const r = await response.json();
        console.log("gameinfo working");
        console.log(r);
        let gameObj = r["game"]
        let date = r["date"]
        const imgURL:string[] = gameObj.image.split("/")
        const resourcePath = "/img/"+imgURL[imgURL.length-1];
        const url =`${protocol}://${clientId}.${proxyDomain}${resourcePath}`;
        const currentGame:GameInfo = {
            image :url,
            price :parseFloat(gameObj.price.substring(1)),
            name:gameObj.name,
            date:date
        }
        setGameInfo(currentGame);
    }
    function toggleStat(){
        setStatBar(!statbar)
    }
    function toggleInfo(){
        setInfo(!info)
    }
    return (
      <div className={"bg-gray-200"}>
          <img className={"w-full h-full fixed icon:hidden"} src={logo}/>
          {statbar && gameInfo && users.length>0
              ?
              <StatBar users={users} toggle={toggleStat} price={gameInfo.price}/>
              :<div></div>}
          {info
              ?<InfoPanel toggle={toggleInfo}/>
              :<div></div>
          }
          <Header toggleStat={toggleStat} toggleInfo={toggleInfo} />
          <div className="App bg-gray-200 pt-20 md:pt-0 h-full">
              {userData && gameInfo?
                  <Game user={userData} gameData={gameInfo}/>
                  :<LoadingScreen/>}
          </div>
      </div>
    );
}

export default App;
