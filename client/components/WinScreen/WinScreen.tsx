// @ts-ignore
import React from 'react';
// @ts-ignore
import loading from './membership-card-business.png';
import {GameInfo, UserData} from "../../utils/types";
import StatCell from "../stats/StatCell";

function WinScreen({guessCnt,gameData,toggle,users}:{guessCnt:number,gameData:GameInfo,toggle:()=>void,users:UserData[]}) {
    return (
        <div className="w-full h-full text-center bg-gray-100 fixed">
            <div className="flex flex-row flex-nowrap overflow-auto fixed w-full bg-gray-100 pt-20 md:pt-2 p-2 top-[50px]">
                {users.map((user:UserData) => (
                    <StatCell user={user} price={gameData.price} />
                ))}
            </div>
            <p className={"absolute font-costco text-red-600 text:2xl md:text-4xl top:1/3 md:top-1/2 left-1/2 -translate-x-1/2"}>Congrats! You got today's item in {guessCnt} tries!</p>
            <p className={"absolute font-costco text:xl md:text-2xl top:1/2 md:top-3/4 left-1/2 -translate-x-1/2"}>Next game in : {24-Math.floor(gameData.time / 3600)} hrs</p>
            <button className={"fixed top-[60px] md:top-10 right-[10px] text-3xl bg-red-500 p-1 border-red-700 border-solid border-3 rounded-lg h-[30px]"} onClick={toggle}>
                <p className={"-translate-y-[14px]"}>
                    x
                </p>
            </button>
        </div>
    );
}

export default WinScreen;
