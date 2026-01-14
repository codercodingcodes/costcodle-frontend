// @ts-ignore
import React  from 'react';
// @ts-ignore
import xIcon from '../../resources/75519.png'
function ExitButton({toggle}:{toggle:()=>void}) {
    return (
        <button className={"flex flex-row fixed top-[75px] md:top-15 right-[40px] p-3"} onClick={toggle}>
            <img src={xIcon} className={"h-[20px] w-[20px] m-auto"}/>
        </button>
    );
}

export default ExitButton;
