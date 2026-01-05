// @ts-ignore
import React from 'react';

function InfoPanel({toggle}:{toggle:() => void }) {
    return (
        <div className="fixed w-full h-full bg-gray-100 pt-20 md:pt-0 top-[50px]">
            <button className={"fixed top-[60px] md:top-10 right-[10px] text-3xl"} onClick={toggle}>
                <p className={"bg-red-500 p-1 border-red-600 border-solid border-2 rounded-lg h-[30px] -translate-y-[15px]"}>
                    x
                </p>
            </button>
            <div className={"wrap-break-word overflow-scroll text-center font-serif h-full w-full"}>
                <p className={"mt-[10px]"}>
                    DISCLOSURE!! This game was NOT invented by me but by @KermWasTaken and I merely adapted it to the discord format.
                </p>
                <p className={"mt-[10px]"}>
                    All credits of ideas goes to the original creator and please try out the original game linked below
                </p>
                <p className={"mt-[10px]"}>
                    https://costcodle.com/
                </p>
                <p className={"mt-[10px]"}>
                    The purpose of this game is to guess the price($USD) of the Costco item listed
                </p>
                <p className={"mt-[10px]"}>
                    You get 5 guesses per day to guess the price of the item
                </p>
                <p className={"mt-[10px]"}>
                    The game will tell you how close your guess is to the actual price via color
                </p>
                <p className={"mt-[10px]"}>
                    RED means that your guess is close! Keep making minor adjustments to your price and you will get it soon
                </p>
                <p className={"mt-[10px]"}>
                    YELLOW means that your guess is not quite in the ball park yet and you might need to make some bigger changes to your guesses
                </p>
                <p className={"mt-[10px]"}>
                    The item changes daily and you can see the performance of other uses in your channel when you click on the "Stats" in the header
                </p>
                <p className={"mt-[10px]"}>
                    Press the X on the top right corner of this page or the stats button on the header to close this screen and return to your game
                </p>
            </div>
        </div>
    );
}

export default InfoPanel;
