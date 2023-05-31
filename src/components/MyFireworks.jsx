import React, {useState} from 'react';
import {Fireworks} from "fireworks/lib/react";

const MyFireworks = ({duration=5000}) => {
    const [fireworksOn, setFireworksOn] = useState(true);

    let fxProps = {
        count: 1,
        interval: 500,
        canvasWidth: window.innerWidth*0.9,
        canvasHeight: window.innerHeight*0.9,
        canvasTopOffset: window.innerHeight/2,
        canvasLeftOffset: window.innerWidth/2,
        particleTimeout: 6000,
        colors: ['#7828c4', '#4CAF50', '#f8b304', '#d70606', '#8191c7'],
        calc: (props, i) => ({
            ...props,
            x: (i + 1) * (window.innerWidth / 3) - (i + 1) * 100,
            y: 200 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0)
        })
    };


    const fireworksBlock = ()=>{
        if (fireworksOn){
            setTimeout(()=>{
                setFireworksOn(false);
            },duration)
            return(
                <Fireworks {...fxProps} />
            )
        }
    }

    return (
        fireworksBlock()
    );
};

export default MyFireworks;