// @ts-ignore
import React  from 'react';
// @ts-ignore
import xIcon from '../../resources/75519.png'
function StatBar({toggle}:{toggle:()=>void}) {
    return (
        <button className={"flex flex-row fixed top-[60px] md:top-10 right-[20px]"} onClick={toggle}>
            <p className={"text-center w-full h-full mt-0 pt-0 pr-1"}>Return to game</p>
            <img src={xIcon} className={"h-[15px] w-[15px] m-auto"}/>
        </button>
    );
}

export default StatBar;
