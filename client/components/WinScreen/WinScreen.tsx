// @ts-ignore
import React from 'react';
// @ts-ignore
import loading from './membership-card-business.png';
import {GameInfo, UserData} from "../../utils/types";
import StatBar from "../stats/StatBar";
import ExitButton from "../exitButton/ExitButton";

function WinScreen({guessCnt,gameData,toggle,users,self}:{guessCnt:number,gameData:GameInfo,toggle:()=>void,users:UserData[],self:string}) {
    return (
        <div className="w-full h-full text-center bg-gray-100 fixed animate-fade-in-fast">
            <StatBar users={users} self={self} toggle={toggle}/>
            <p className={"font-costco text-red-600 text-2xl md:text-4xl left-1/2 -translate-x-1/2 w-full"}>Congrats! You got today's item in {guessCnt} tries!</p>
            <p className={"font-costco text-xl md:text-2xl left-1/2 -translate-x-1/2 w-full"}>Next game in : {24-Math.floor(gameData.time / 3600)} hrs</p>
        </div>
    );
}

export default WinScreen;
