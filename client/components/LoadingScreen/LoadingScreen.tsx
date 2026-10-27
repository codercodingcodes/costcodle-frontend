// @ts-ignore
import React from 'react';
// @ts-ignore
import loading from './membership-card-business.png';

function LoadingScreen() {
    return (
        <div className="w-full h-full text-center">
            <div className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-md"}>
                <p className={"mb-4"}>We are aware of the image not found issue and are working on it. Sorry for the inconvenience.</p>
                <p className={"font-costco text-red-600 text-4xl animate-fade"}>loading...</p>
            </div>
            <p>Beta Version. Please contact us with any issues you've encountered in the support server</p>
        </div>
    );
}

export default LoadingScreen;
