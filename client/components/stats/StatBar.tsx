// @ts-ignore
import React ,{ useState } from 'react';
import {UserData} from "../../utils/types";
import StatCell from "./StatCell";
import ExitButton from "../exitButton/ExitButton";

function StatBar({users,self,toggle}:{users:UserData[],self:string,toggle:()=>void}) {
    return (
        <div className="flex flex-row flex-nowrap overflow-auto fixed w-full bg-gray-100 pt-20 md:pt-2 p-2 top-[50px] ">
            {users.map((user:UserData) => {
                if(!(user.userInfo.userID === self)) {
                    return(<StatCell user={user}/>)
                }
            })}
            <ExitButton toggle={toggle}/>
        </div>

    );
}

export default StatBar;
