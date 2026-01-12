import React from 'react';
import NumBtn from "./NumBtn";
import { useState } from 'react';

function GuessInput({setVal}:{setVal:(x:number) => void}) {
    return (
        <div className="GuessInput grid grid-cols-4 m-auto h-full w-full pl-1">
            <NumBtn num={"1"} setVal={setVal} value={1}/>
            <NumBtn num={"2"} setVal={setVal} value={2}/>
            <NumBtn num={"3"} setVal={setVal} value={3}/>
            <NumBtn num={"4"} setVal={setVal} value={4}/>
            <NumBtn num={"5"} setVal={setVal} value={5}/>
            <NumBtn num={"6"} setVal={setVal} value={6}/>
            <NumBtn num={"7"} setVal={setVal} value={7}/>
            <NumBtn num={"8"} setVal={setVal} value={8}/>
            <NumBtn num={"del"} setVal={setVal} value={11}/>
            <NumBtn num={"9"} setVal={setVal} value={9}/>
            <NumBtn num={"0"} setVal={setVal} value={0}/>
            <NumBtn num={"."} setVal={setVal} value={10}/>
            <div className={"col-span-4"}>
                <NumBtn num={"Enter"} setVal={setVal} value={12}/>
            </div>
        </div>
    );
}

export default GuessInput;
