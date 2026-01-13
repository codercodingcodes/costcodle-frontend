// @ts-ignore
import React  from 'react';
// @ts-ignore
import xIcon from '../../resources/75519.png'
function StatBar({toggle}:{toggle:()=>void}) {
    return (
        <button className={"flex flex-row fixed top-[60px] md:top-10 right-[20px] h-[10px] w-[50px]"} onClick={toggle}>
            <p className={"text-center w-full h-full m-auto"}>Return to game</p>
            <img src={xIcon} className={"h-[10px] w-[10px]"}/>
        </button>
    );
}

export default StatBar;
