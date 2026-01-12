import React from 'react';


function NumBtn({num,value,setVal}: {num: string,value:number,setVal:(x:number) => void}) {
    return (
        <div className="NumBtn h-full p-1 font-bold font-sans">
            <button className={"w-full h-full text-center bg-gray-400 rounded-xl "} onClick={()=>setVal(value)}>{num}</button>
        </div>
    );
}

export default NumBtn;
