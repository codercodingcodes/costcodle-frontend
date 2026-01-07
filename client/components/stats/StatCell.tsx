// @ts-ignore
import React ,{ useState } from 'react';
import {UserData} from "../../utils/types";
// @ts-ignore
import checkMark from "./Eo_circle_green_checkmark.svg.png";
// @ts-ignore
import cross from "./Red_X.svg.png";

function StatCell({user,price}:{user:UserData,price:number}) {
    const progress = [];

    for (let i=0;i<=Math.min(user.guessInfo.guessCnt,4);i++){
        if (user.guessInfo.completed && i == user.guessInfo.guessCnt) {
            progress.push(<img src={checkMark} className={"w-[20px] h-[20px]"}/>)
        } else{
            progress.push(<img src={cross} className={"w-[20px] h-[20px]"}/>)
        }
    }
    console.log(price)

    console.log("correct");
    console.log(user);
    return (
        <div className="inline-block rounded-xl border-gray-400 border-solid border-2 bg-gray-100 p-2 mr-1 font-serif">

            <img src={"https://cdn.discordapp.com/avatars/"+user.userInfo.userID+"/"+user.userInfo.avatar+".png"} className={"rounded-4xl border-solid border-2 border-black w-[100px] h-[100px] m-auto"}/>
            {user.userInfo.username}
            <div className={"grid grid-cols-5 w-full bg-gray-300 m-auto "}>
                {progress}
            </div>
            <p>Games Played: {user.userInfo.guessHistory.gamesPlayed}</p>
            <p>Games Completed: {user.userInfo.guessHistory.gamesCompleted}</p>
            <p>Average Daily Guesses: {user.userInfo.guessHistory.totalGuesses/user.userInfo.guessHistory.gamesPlayed}</p>
            <p>First Guess Aces: {user.userInfo.guessHistory.firstTries}</p>
        </div>
    );
}

export default StatCell;
