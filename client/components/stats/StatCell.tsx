// @ts-ignore
import React ,{ useState } from 'react';
import {UserData} from "../../utils/types";
// @ts-ignore
import checkMark from "./Eo_circle_green_checkmark.svg.png";
// @ts-ignore
import cross from "./Red_X.svg.png";

function StatCell({user,price}:{user:UserData,price:number}) {
    const progress = [];
    const correct = (guessDistance(user.guessInfo.hGuess) === 0 || guessDistance(user.guessInfo.lGuess) === 0);
    function guessDistance(val:number){
        const diff = Math.abs(val - price);
        if (diff<price/20 || diff<1.4){
            return 0;
        }else if(diff<price/10 || diff<3.4){
            return 1;
        }else{
            return 2;
        }
    }
    for (let i=0;i<=Math.min(user.guessInfo.guessCnt,4);i++){
        if (correct && i == user.guessInfo.guessCnt) {
            progress.push(<img src={checkMark} className={"w-[20px] h-[20px]"}/>)
        } else{
            progress.push(<img src={cross} className={"w-[20px] h-[20px]"}/>)
        }
    }
    console.log(price)

    console.log("correct");
    console.log(user);
    return (
        <div className="inline-block rounded-xl border-gray-400 border-solid border-2 bg-gray-100 p-2">
            {user.userInfo.username}
            <img src={"https://cdn.discordapp.com/avatars/"+user.userInfo.userID+"/"+user.userInfo.avatar+".png"} className={"rounded-4xl border-solid border-2 border-black w-[100px] h-[100px]"}/>
            <div className={"grid grid-cols-5 w-full bg-gray-300"}>
                {progress}
            </div>
        </div>
    );
}

export default StatCell;
