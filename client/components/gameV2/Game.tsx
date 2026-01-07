import React, {use, useEffect, useRef} from 'react';
import GuessInput from "../guessInput/GuessInput";
import { useState } from 'react';
import {UserData,GameInfo,UserInfo} from "../../utils/types";


async function sendGuessDB(guess:number,isHigh:boolean,isLow:boolean,completed:boolean,userInfo:UserInfo,guessCnt:number){
    return await fetch("/api/guess",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "guess":guess,
            "isHigh":isHigh,
            "isLow":isLow,
            "userID":userInfo.userID,
            "avatar":userInfo.avatar,
            "username":userInfo.username,
            "gameCompleted":completed,
            "guessCnt":guessCnt,
        }),
    })
}
function mobileCheck() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor);
    return check;
}
async function updateChannel(channelID:string,userID:string){
    return await fetch("/api/channel",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            channelID:channelID,
            userID:userID,
        }),
    })
}

function Game({gameData,user}:{gameData:GameInfo,user:UserData}) {
    const [gameOver,setGameOver] = useState<boolean>(false);
    const [win,setWin] = useState(false);
    const [msg,setMsg] = useState<string>("");
    const [msgTimer,setMsgTimer] = useState<number>(0);
    const [activeKey, setActiveKey] = useState(0);
    const [hasFocus, setHasFocus] = useState(false);
    const [wn, setWn] = useState(0);
    const [low, setLow] = useState(0);
    const [high, setHigh] = useState(0);
    const [fn, setFn] = useState(0);
    const [dec, setDec] = useState(false);
    const [guessCnt,setGuessCnt] = useState(0);
    const [freshUser,setFreshUser] = useState(user);
    const [completed,setCompleted] = useState(false);

    const userInput = useRef<HTMLInputElement>(null);
    const alert = useRef<HTMLDivElement>(null);


    useEffect(() => {
        console.log("avatar retrieved")
        setFreshUser(user);
        if (user.userInfo.channelID) {
            updateChannel(user.userInfo.channelID, user.userInfo.userID).then(r => {
                if (r.ok){
                    console.log("channel updated")
                } else{
                    console.error("channel update failed")
                }
            }).catch(r=>{
                console.error("channel update failed")
            })
        }
    }, [user]);

    function guessDistance(val:number){
        const diff = Math.abs(val - gameData.price);
        if (diff<gameData.price/20 || diff<0.6){
            return 0;
        }else if(diff<gameData.price/10 || diff<3){
            return 1;
        }else{
            return 2;
        }
    }
    function displayAlert(){
        const timer = setTimeout(() => {
            setMsgTimer(msgTimer-1);
        }, 3000);
        return () => clearTimeout(timer);
    }

    useEffect(() => {
        if (gameOver && win) {
            setMsg("Congratulations! you got today's guess");
        }else if (gameOver){
            setMsg("better luck tomorrow");
        }
    }, [gameOver]);

    useEffect(() => {
        if (msgTimer === 0){
            setMsg("")
        }else{
            displayAlert()
        }
    }, [msgTimer]);

    useEffect(() => {
        console.log(msg)
        if (msg.length>0) {
            console.log("message timer")
            console.log(msgTimer)
            setMsgTimer(msgTimer+1);
        }
    }, [msg]);

    useEffect(() => {
        updateVal(activeKey)
    }, [activeKey]);

    useEffect(() => {
        if (guessCnt>=5){
            setGameOver(true);
        }
    }, [guessCnt]);

    useEffect(() => {
        setHigh(user.guessInfo.hGuess);
        setLow(user.guessInfo.lGuess);
        setGuessCnt(user.guessInfo.guessCnt);
        setCompleted(user.guessInfo.completed)
    }, [user]);
    useEffect(() => {
        if (completed){
            setWin(true);
            setGameOver(true);
        }
    }, [completed]);

    useEffect(() => {
        userInput.current?.focus();
    }, [hasFocus]);



    const keyDict:{[key:string]:number} = {
        "1":1,
        "2":2,
        "3":3,
        "4":4,
        "5":5,
        "6":6,
        "7":7,
        "8":8,
        "9":9,
        "0":0,
        "Backspace":11,
        ".":10,
        "Enter":12

    }
    function parseIntoCode(input:string){
        if (keyDict.hasOwnProperty(input)) {
            return keyDict[input];
        }
        return -1;
    }

    // @ts-ignore
    const handleKeyDown = (event) => {
        setActiveKey(parseIntoCode(event.key));
        console.log(event.key);
        console.log(parseIntoCode(event.key));
        setTimeout(() => {
            setActiveKey(-1);
        }, 100);
    };

    function updateVal(n:number) {
        if (n>=0){
            if (n < 10) {
                if (dec) {
                    if (fn<10) {
                        setFn(fn * 10 + n);
                    }
                } else {
                    if (wn<100) {
                        setWn(wn * 10 + n);
                    }
                }
            } else {
                if (n===12){
                    let dec = fn;
                    while (dec > 1){
                        dec = dec/10
                    }
                    const guess = wn+dec;
                    if (guess>high && high > 0){
                        setMsg("Price cannot be higher than "+high.toString())
                    }else if (guess<low && low > 0){
                        console.log("invalid low")
                        setMsg("Price cannot be lower than "+low.toString())
                    }else if (guess > 0) {
                        let isHigh = false;
                        let isLow = false;
                        if ((guess <= high || high === 0) && guess >= gameData.price) {
                            setHigh(guess);
                            isHigh = true;
                        } else if (guess >= low && guess <= gameData.price) {
                            setLow(guess);
                            isLow = true;
                        }
                        let completed = guessDistance(guess) === 0;
                        sendGuessDB(guess, isHigh, isLow,completed,freshUser.userInfo,guessCnt).then(r => {
                            console.log("guess sent")
                            if (user.userInfo.channelID) {
                                updateChannel(user.userInfo.channelID, user.userInfo.userID).then(r => {
                                    if (r.ok){
                                        console.log("channel updated")
                                    } else{
                                        console.error("channel update failed")
                                    }
                                }).catch(r=>{
                                    console.error("channel update failed")
                                })
                            }
                        }).catch(r=>{
                            console.error("db post failed")
                        })
                        setGuessCnt(guessCnt + 1)
                        setCompleted(completed)
                    }else {
                        setMsg("Please input a value greater than 0")
                    }
                    setWn(0)
                    setFn(0)
                    setDec(false)

                }else if (n === 10) {
                    if (!dec) {
                        setDec(true);
                    }
                } else if (n === 11) {
                    if (dec) {
                        if (fn > 0) {
                            setFn(Math.floor(fn / 10));
                        } else {
                            setDec(false);
                        }
                    } else {
                        if (wn > 0) {
                            setWn(Math.floor(wn / 10));
                        }
                    }
                }
            }
        }
    }
    return (
        <div className='p-1 md:w-1/3 m-auto font-serif '>
            {(msgTimer>0 && msg.length>0)?
            <div className={"bg-gray-300 block w-1/2 md:w-1/4 fixed top-50 left-1/2 -translate-x-1/2 wrap-normal text-center border-gray-500 border-2 rounded-2xl"} ref={alert}>
                <p>
                    {msg}
                </p>
            </div>
                :<div></div>}
            {!completed?
                <p>Guess #{guessCnt} / 5 guesses</p>
                :<p>Congrats! you got it in {guessCnt} guesses today!</p>}
            <div className={"border-black border-2 p-2 bg-white mt-2"}>
                <div className={"text-left text-3xl ml-5"}>
                    Game #{gameData.date}
                </div>
                <div className={"text-left text-2xl"}>
                    {gameData.name}
                </div>
                {high > 0 && !completed?
                    (<div className={"grid grid-cols-2 w-full font-sans animate-fade-in"} key={high} style={guessDistance(high) === 2? {backgroundColor:"yellow"}
                        :high==0?
                            {backgroundColor:"white"}
                            :{backgroundColor:"red"}}>
                        <p className={"text-left font-bold text-sm"}>Price Is Less Than</p>
                        {(high>0) ?<p className={"text-right text-xl"}>{high}</p>
                        :<p></p>}
                    </div>)
                    :<div></div>}
                {!gameOver && !mobileCheck()?
                    <input
                        type="text"
                        onKeyDown={handleKeyDown}
                        placeholder="Press here..."
                        autoFocus={true}
                        onFocus={() => setHasFocus(true)}
                        onBlur={() => setHasFocus(false)}
                        ref={userInput}
                        className={"h-0 w-0 sm:hidden md:block"}
                    />
                    :<div></div>
                }
                {low > 0 && !completed?
                    (<div className={"grid grid-cols-2 w-full mt-1 font-sans border-solid border-b-2 border-black animate-fade-in"} key={low} style={guessDistance(low) === 2? {backgroundColor:"yellow"}
                        :low==0?
                            {backgroundColor:"white"}
                            :{backgroundColor:"red"}}>
                        <p className={"text-left font-bold text-sm"}>Price Is More Than</p>
                        {(low>0) ?<p className={"text-right text-xl"}>{low}</p>
                            :<p></p>}
                    </div>)
                    :<div></div>}
                <div className={"flex justify-end items-end"}>
                    <div className={"text-7xl font-bold"}>
                        {(gameOver)?<p>{gameData.price}</p>
                            :(wn>0 || fn>0 || dec)?
                                (dec) ?
                                    (<p className={"pl-16 "}>{wn}.{fn}</p>)
                                    :(<p className={"pl-16 "}>{wn}</p>)
                                :(<p className={"text-3xl mb-9"}>Start Typing!</p>)}
                    </div>
                </div>
            </div>
            <div className={"grid grid-cols-2 w-full mt-2"}>
                <div className={""}>
                    <img src={gameData.image} className={"w-full m-auto border-8 border-red-600" }/>
                </div>
                {!gameOver?
                    <div className={"w-full mt-2 m-auto h-full"}>
                        <GuessInput setVal={(x)=>updateVal(x)}/>
                    </div>
                    :<div></div>}
            </div>
        </div>
    );
}

export default Game;
