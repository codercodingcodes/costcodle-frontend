// @ts-ignore
import React ,{ useState } from 'react';
import {UserData} from "../../utils/types";
// @ts-ignore
import checkMark from "./Eo_circle_green_checkmark.svg.png";
// @ts-ignore
import cross from "./Red_X.svg.png";

function StatCell({user}:{user:UserData}) {
    const progress = [];

    for (let i=1;i<=Math.min(user.guessInfo.guessCnt,5);i++){
        if (user.guessInfo.completed && i == user.guessInfo.guessCnt) {
            progress.push(<img src={checkMark} className={"w-[20px] h-[20px]"}/>)
        } else{
            progress.push(<img src={cross} className={"w-[20px] h-[20px]"}/>)
        }
    }
    return (
        <div className="inline-block rounded-xl bg-gray-200 hover:bg-gray-300 p-2 mr-1 font-sans font-bold min-w-[220px] ml-2">
            {user.userInfo.avatar?
                <img src={"https://cdn.discordapp.com/avatars/"+user.userInfo.userID+"/"+user.userInfo.avatar+".png"} className={"rounded-4xl border-solid border-2 border-black w-[100px] h-[100px] m-auto"}/>
                :<img src={"https://cdn.discordapp.com/embed/avatars/0.png"} className={"rounded-4xl border-solid border-2 border-black w-[100px] h-[100px] m-auto"}/>
            }
            <p className={"w-full m-auto text-center"}>{user.userInfo.username}</p>
            <div className={"grid grid-cols-5 w-full m-auto"}>
                {progress}
            </div>
            <p>Games Played: {user.userInfo.guessHistory.gamesPlayed}</p>
            <p>Games Completed: {user.userInfo.guessHistory.gamesCompleted}</p>
            <p>Average Daily Guesses: {Math.floor(user.userInfo.guessHistory.totalGuesses/user.userInfo.guessHistory.gamesPlayed)}</p>
            <p>First Guess Aces: {user.userInfo.guessHistory.firstTries}</p>
        </div>
    );
}

export default StatCell;
