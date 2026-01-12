import React from 'react';


function NumBtn({num,value,setVal}: {num: string,value:number,setVal:(x:number) => void}) {
    return (
        <div className="NumBtn h-full p-1">
            <button className={"w-full h-full text-center bg-gray-500 rounded-xl font-bold"} onClick={()=>setVal(value)}>{num}</button>
        </div>
    );
}

export default NumBtn;
