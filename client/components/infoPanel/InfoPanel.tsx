// @ts-ignore
import React from 'react';
import ExitButton from "../exitButton/ExitButton";

function InfoPanel({toggle}:{toggle:() => void }) {
    return (
        <div className={"fixed h-full w-full"}>
            <button className={"h-full w-full fixed opacity-20 bg-black"} onClick={toggle}/>
            <div className="fixed w-full bg-gray-100 pt-20 md:pt-0 top-[50px] border-black border-3 border-solid">
               <ExitButton toggle={toggle}/>
                <div className={"fixed p-4 wrap-break-word overflow-scroll text-center font-sans icon:w-full md:w-1/2 icon:top-0 md:top-1/2 icon:left-0 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-gray-200"}>
                    <p className={"mt-[10px]"}>
                        Guess the price($USD) of the Costco item listed in 5 guesses
                    </p>
                    <p className={"mt-[10px]"}>
                        <a className={"bg-red-600"}>RED</a> means that your guess is within 10% of the price
                    </p>
                    <p className={"mt-[10px] w-full border-gray-400 border-b-2 border-solid m-auto pb-5" }>
                        <a className={"bg-yellow-300"}>YELLOW</a> means that your guess is over 10% of the price
                    </p>
                    <p className={"mt-5"}>
                        DISCLOSURE!! This game was NOT invented by me but by @KermWasTaken and I merely adapted it to the discord format.
                    </p>
                    <p className={"mt-[10px]"}>
                        All credits of ideas goes to the original creator and please try out the original game linked below
                    </p>
                    <p className={"mt-[10px]"}>
                        https://costcodle.com/
                    </p>
                </div>
            </div>

        </div>
    );
}

export default InfoPanel;
