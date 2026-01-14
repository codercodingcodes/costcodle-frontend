// @ts-ignore
import React  from 'react';
// @ts-ignore
import xIcon from '../../resources/75519.png'
function StatBar({toggle}:{toggle:()=>void}) {
    return (
        <button className={"flex flex-row fixed top-[60px] md:top-10 right-[30px]"} onClick={toggle}>
            <img src={xIcon} className={"h-[20px] w-[20px] m-auto"}/>
        </button>
    );
}

export default StatBar;
