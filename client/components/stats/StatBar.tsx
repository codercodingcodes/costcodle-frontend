// @ts-ignore
import React ,{ useState } from 'react';
import {UserData} from "../../utils/types";
import StatCell from "./StatCell";
import ExitButton from "../exitButton/ExitButton";

function StatBar({users,self,toggle,embedded}:{users:UserData[],self:string,toggle:()=>void,embedded?:boolean}) {
    return (
        <div className={`flex flex-row flex-nowrap overflow-y-hidden w-full bg-gray-100 pt-20 md:pt-2 p-2 ${embedded ? 'relative h-full' : 'fixed'}`}>
            {users.map((user:UserData) => {
                return(<StatCell user={user}/>)
            })}
            <ExitButton toggle={toggle}/>
        </div>

    );
}

export default StatBar;
