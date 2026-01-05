// @ts-ignore
import React from 'react';
// @ts-ignore
import loading from './membership-card-business.png';

function LoadingScreen({progress}:{progress:number}) {
    return (
        <div className="w-full h-full text-center">
            {/*<div className={"absolute sm:w-1/3 md:w-1/12 top-1/3 left-1/2 -translate-x-1/2 "}>*/}
            {/*    <img src={loading} className={" animate-spin w-full h-full"} />*/}
            {/*</div>*/}
            <p className={"absolute font-costco text-red-600 text-4xl top-1/2 left-1/2 -translate-x-1/2"}>loading</p>

        </div>
    );
}

export default LoadingScreen;
