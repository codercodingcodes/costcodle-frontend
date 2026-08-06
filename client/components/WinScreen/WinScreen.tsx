// @ts-ignore
import React, {useEffect, useState} from 'react';
// @ts-ignore
import {GameInfo, UserData} from "../../utils/types";
import StatBar from "../stats/StatBar";
import { BarChart } from '@mui/x-charts/BarChart';

async function getWinDistribution(){
    const response = await fetch("/api/winDistribution", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        console.error("win distribution fetch failed");
        return [0, 0, 0, 0, 0];
    }
    return await response.json();
}

function WinScreen({guessCnt,gameData,toggle,users,self}:{guessCnt:number,gameData:GameInfo,toggle:()=>void,users:UserData[],self:string}) {
    const [distribution, setDistribution] = useState<number[]>([0, 0, 0, 0, 0]);

    useEffect(() => {
        getWinDistribution().then((counts: number[]) => {
            const total = counts.reduce((sum, n) => sum + n, 0);
            if (total === 0) {
                setDistribution([0, 0, 0, 0, 0]);
                return;
            }
            setDistribution(counts.map((n) => Math.round((n / total) * 100)));
        });
    }, []);

    return (
        <div className="top-0 w-full h-full text-center bg-gray-100 fixed animate-fade-in-fast">
            <BarChart
                xAxis={[{scaleType: 'band', data: [1, 2, 3, 4, 5]}]}
                yAxis={[{valueFormatter: (v: number | null) => `${v ?? 0}%`}]}
                series={[
                    {
                        data: distribution,
                        valueFormatter: (v: number | null) => `${v ?? 0}%`,
                    },
                ]}
            />
            <StatBar users={users} self={self} toggle={toggle}/>
            <p className={"absolute font-costco text-red-600 text-2xl md:text-4xl top-2/3 left-1/2 -translate-x-1/2 w-full"}>Congrats! You got today's item in {guessCnt} tries!</p>
            <p className={"absolute font-costco text-xl md:text-2xl top-4/5 left-1/2 -translate-x-1/2 w-full"}>Next game in : {24-Math.floor(gameData.time / 3600)} hrs</p>
        </div>
    );
}

export default WinScreen;
