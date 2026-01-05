import React, {use, useEffect, useRef} from 'react';
import GuessInput from "../guessInput/GuessInput";
import { useState } from 'react';
import {UserData,GameInfo,UserInfo} from "../../utils/types";


async function sendGuessDB(guess:number,isHigh:boolean,isLow:boolean,completed:boolean,userInfo:UserInfo,guessCnt:number){
    await fetch("/api/guess",{
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

async function updateChannel(channelID:string,userID:string){
    await fetch("/api/channel",{
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
            updateChannel(user.userInfo.channelID, user.userInfo.userID)
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
                                updateChannel(user.userInfo.channelID, user.userInfo.userID)
                            }
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
        <div className='Game sm:w-2/3 md:w-1/3 m-auto font-serif '>
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
                    (<div className={"grid grid-cols-2 w-full font-sans"} style={guessDistance(high) === 2? {backgroundColor:"yellow"}
                        :high==0?
                            {backgroundColor:"white"}
                            :{backgroundColor:"red"}}>
                        <p className={"text-left font-bold text-sm"}>Price Is Less Than</p>
                        {(high>0) ?<p className={"text-right text-xl"}>{high}</p>
                        :<p></p>}
                    </div>)
                    :<div></div>}
                {!gameOver?
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
                    (<div className={"grid grid-cols-2 w-full mt-1 font-sans border-solid border-b-2 border-black"} style={guessDistance(low) === 2? {backgroundColor:"yellow"}
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
                                :(<p className={"text-3xl"}>Start Typing!</p>)}
                    </div>
                </div>
            </div>
            <div className={"grid grid-cols-2 w-full mt-2 align-bottom bottom-0"}>
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
