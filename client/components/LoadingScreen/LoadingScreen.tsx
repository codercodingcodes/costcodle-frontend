// @ts-ignore
import React from 'react';
// @ts-ignore
import loading from './membership-card-business.png';

function LoadingScreen() {
    return (
        <div className="w-full h-full text-center">
            <p className={"absolute font-costco text-red-600 text-4xl top-1/2 left-1/2 -translate-x-1/2 animate-fade"}>loading...</p>
            <p>Beta Version. Please contact us with any issues you've encountered in the support server</p>
        </div>
    );
}

export default LoadingScreen;
