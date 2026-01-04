// @ts-ignore
import React ,{ useState } from 'react';
import {UserData} from "../../utils/types";
import StatCell from "./StatCell";

function StatBar({users,toggle,price}:{users:UserData[],toggle:()=>void,price:number}) {
    return (
        <div className="fixed w-full bg-gray-100 pt-20 md:pt-2 p-2 top-[50px] border-black border-solid border-b-1">
            {users.map((user:UserData) => (
                <StatCell user={user} price={price} />
            ))}
            <button className={"fixed top-[60px] md:top-10 right-[10px] text-3xl"} onClick={toggle}>
                <p className={"bg-red-500 p-1 border-red-600"}>
                    X
                </p>
            </button>
        </div>
    );
}

export default StatBar;
