// @ts-ignore
import React ,{ useState } from 'react';
import {UserData} from "../../utils/types";
import StatCell from "./StatCell";

function StatBar({users,toggle,price}:{users:UserData[],toggle:()=>void,price:number}) {
    return (
        <div className="fixed w-full bg-gray-100 pt-20 md:pt-0">
            {users.map((user:UserData) => (
                <StatCell user={user} price={price} />
            ))}
            <button className={"fixed top-20 md:top-10 right-0 text-3xl"} onClick={toggle}>
                <p>
                    X
                </p>
            </button>
        </div>
    );
}

export default StatBar;
