import React from 'react';


function NumBtn({num,value,setVal}: {num: string,value:number,setVal:(x:number) => void}) {
    return (
        <div className="NumBtn m-1">
            <button className={"w-full h-full bg-gray-300 p-2 lg:p-4 rounded-xl border-gray-400 border-solid border-2 bg-gray-300"} onClick={()=>setVal(value)}>{num}</button>
        </div>
    );
}

export default NumBtn;
