// @ts-ignore
import React from 'react';
import ExitButton from "../exitButton/ExitButton";

function InfoPanel({toggle}:{toggle:() => void }) {
    return (
        <div className="fixed w-full h-full bg-gray-100 pt-20 md:pt-0 top-[50px]">
           <ExitButton toggle={toggle}/>
            <div className={"wrap-break-word overflow-scroll text-center h-full w-full font-sans"}>
                <p className={"mt-[10px]"}>
                    Guess the price($USD) of the Costco item listed
                </p>
                <p className={"mt-[10px]"}>
                    <a className={"bg-red-600"}>RED</a> means that your guess is within 10% of the price
                </p>
                <p className={"mt-[10px] w-full border-gray-400 border-b-2 border-solid m-auto pb-5" }>
                    <a className={"bg-yellow-300"}>YELLOW</a> means that your guess is over 10% of the price
                </p>
                <p className={"mt-5"}>
                    You get 5 guesses per day to guess the price of the item
                </p>
                <p className={"mt-[10px]"}>
                    The game will tell you how close your guess is to the actual price via color
                </p>
                <p className={"mt-[10px] w-full border-gray-400 border-b-2 border-solid m-auto pb-5"}>
                    The item changes daily and you can see the performance of other users in your channel when you click on the "Friends" in the header
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
                <p className={"mt-[10px]"}>
                    Press the X on the top right corner of this page or the Friends button on the header to close this screen and return to your game
                </p>
            </div>
        </div>
    );
}

export default InfoPanel;
