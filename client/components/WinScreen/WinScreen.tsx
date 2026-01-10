// @ts-ignore
import React from 'react';
// @ts-ignore
import loading from './membership-card-business.png';

function WinScreen({guessCnt,time,toggle}:{guessCnt:number,time:number,toggle:()=>void}) {
    return (
        <div className="w-full h-full text-center">
            <p className={"absolute font-costco text-red-600 text-4xl top-1/2 left-1/2 -translate-x-1/2"}>Congrats! You got today's item in {guessCnt} tries!</p>
            <p className={"absolute font-costco text-red-600 text-4xl top-1/2 left-1/2 -translate-x-1/2"}>Next game in : {24-Math.floor(time / 3600)} hrs</p>
            <button className={"fixed top-[60px] md:top-10 right-[10px] text-3xl bg-red-500 p-1 border-red-700 border-solid border-3 rounded-lg h-[30px]"} onClick={toggle}>
                <p className={"-translate-y-[14px]"}>
                    x
                </p>
            </button>
        </div>
    );
}

export default WinScreen;
