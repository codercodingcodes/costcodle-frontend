import React from 'react';


function NumBtn({num,value,setVal}: {num: string,value:number,setVal:(x:number) => void}) {
    return (
        <div className="NumBtn h-full p-1">
            <button className={"w-full h-full text-center bg-gray-300 rounded-xl border-gray-400 border-solid border-2"} onClick={()=>setVal(value)}>{num}</button>
        </div>
    );
}

export default NumBtn;
