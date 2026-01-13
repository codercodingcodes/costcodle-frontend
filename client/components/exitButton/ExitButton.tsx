// @ts-ignore
import React  from 'react';
// @ts-ignore
import xIcon from '../../resources/75519.png'
function StatBar({toggle}:{toggle:()=>void}) {
    return (
        <button className={"fixed top-[60px] md:top-10 right-[10px] text-3xl h-[30px]"} onClick={toggle}>
            <p>Return to game</p>
            <img src={xIcon} className={"h-[30px] w-[30px]"}/>
        </button>
    );
}

export default StatBar;
