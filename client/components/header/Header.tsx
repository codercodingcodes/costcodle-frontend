import React from 'react';
// @ts-ignore
import infoIcon from '../../resources/tl.webp'
// @ts-ignore
import statsIcon from '../../resources/stats_icon-icons.com_69449.webp'


function Header({toggleStat,toggleInfo}:{toggleStat:() => void ,toggleInfo:()=>void}) {
    return (
        <div className="grid grid-cols-3 w-full xl:w-1/3 text-center m-auto font-costco pt-20 md:pt-0 bg-white border-b-1 border-solid border-black">
            <button onClick={toggleInfo}>
                <img src={infoIcon} className="h-[30px] w-[30px] m-auto"/>
            </button>
            <p className={"text-3xl text-red-600 w-full h-full m-auto"}>Costcodle</p>
            <button onClick={toggleStat}>
                <img src={statsIcon} className="h-[30px] w-[30px] m-auto"/>
            </button>
        </div>
    );
}

export default Header;
