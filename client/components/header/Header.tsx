import React from 'react';


function Header({toggleStat,toggleInfo}:{toggleStat:() => void ,toggleInfo:()=>void}) {
    return (
        <div className="grid grid-cols-3 w-full xl:w-1/3 text-center m-auto font-costco h-[50px] p-2 pt-20 md:pt-0">
            <button className={"text-blue-600"} onClick={toggleInfo}>
                How to play
            </button>
            <p className={"text-3xl text-red-600"}>Costcodle</p>
            <button className={"text-blue-600"} onClick={toggleStat}>
                Stats
            </button>
        </div>
    );
}

export default Header;
