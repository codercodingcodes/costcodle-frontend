// @ts-ignore
import React  from 'react';
// @ts-ignore
import xIcon from '../../resources/75519.png'
function StatBar({toggle}:{toggle:()=>void}) {
    return (
        <button className={"flex flex-row fixed top-[60px] md:top-10 right-[10px] text-3xl h-[30px]"} onClick={toggle}>
            <p className={"h-full text-lg"}>Return to game</p>
            <img src={xIcon} className={"h-[20px] w-[20px]"}/>
        </button>
    );
}

export default StatBar;
