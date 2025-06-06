import { useEffect, useRef, useState } from "react";

type SolariProps = {
    flaps: string[] // all the available values to be displayed
    current: number // index of the current value
}

const animationDuration = 200;

function SolariTop({ flaps, current }: SolariProps) {
    const currentLetter = flaps[current];
    const nextLetter = flaps[(current + 1) % flaps.length];

    const [isTransitioning, setIsTransitioning] = useState(false);
    const [stage, setStage] = useState(0);

    const isFirstRender = useRef(true);

    const transform = (stage: number) => {
        switch (stage) {
            case 0:
                return 'rotateX(-90deg)';
            case 1:
                return 'rotateX(0deg)';
            default:
                return 'rotateX(-90deg)';
        }
    };

    useEffect(() => {
        console.log("running use effect: " + isFirstRender.current);
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        console.log("running use effect: " + isFirstRender.current);


        setIsTransitioning(false);
        setStage(0);
        const timeout = setTimeout(() => {
            setIsTransitioning(true);
            setStage(1);
        }, animationDuration * 2);

        return () => {
            clearTimeout(timeout);
        }
    }, [flaps, current])

    return (
        <div className="grid text-white text-5xl">
            <div
                className="col-start-1 row-start-1 w-32 h-16 overflow-hidden transition-transform duration-100 ease-in-out bg-neutral-700 rounded-t-lg"
            >
                <div className="text-8xl font-bold text-white leading-none flex items-start justify-center h-32 ">
                    {currentLetter}
                </div>
            </div>
            <div
                className={`col-start-1 row-start-1 w-32 h-16 overflow-hidden bg-neutral-700 rounded-t-lg z-10 ${isTransitioning ? `transition-transform duration-${animationDuration} ease-in-out` : ''}`}
                style={{
                    transform: transform(stage),
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'bottom center'
                }}
            >
                <div className="text-8xl font-bold text-white leading-none flex items-start justify-center h-32 ">
                    {nextLetter}
                </div>
            </div>
        </div>
    )
}

function SolariBottom({ flaps, current }: SolariProps) {
    const currentLetter = flaps[current];
    const nextLetter = flaps[(current + 1) % flaps.length];

    const [isTransitioning, setIsTransitioning] = useState(false);
    const [stage, setStage] = useState(0);

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        setIsTransitioning(false);
        setStage(0);
        const interval = setInterval(() => {
            setIsTransitioning(true);
            setStage(1);
        }, animationDuration);

        return () => {
            clearInterval(interval);
        }
    }, [flaps, current])

    const transform = (stage: number) => {
        switch (stage) {
            case 0:
                return 'rotateX(0deg)';
            case 1:
                return 'rotateX(90deg)';
            default:
                return 'rotateX(-90deg)';
        }
    };

    return (
        <div className="grid text-white text-5xl">
            <div
                className="col-start-1 row-start-1 w-32 h-16 overflow-hidden ease-in-out bg-neutral-700 rounded-b-lg"
            >
                <div className="text-8xl font-bold text-white leading-none flex items-start justify-center h-32 -translate-y-1/2">
                    {nextLetter}
                </div>
            </div>
            <div
                className={`col-start-1 row-start-1 w-32 h-16 overflow-hidden bg-neutral-700 rounded-b-lg z-10 ${isTransitioning ? `transition-transform duration-${animationDuration} ease-in-out` : ''}`}
                style={{
                    transform: transform(stage),
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'top center'
                }}
            >
                <div className="text-8xl font-bold text-white leading-none flex items-start justify-center -translate-y-1/2 h-32 ">
                    {currentLetter}
                </div>
            </div>
        </div>
    )
}


export default function SolariTime() {

    const alphabet = "0123456789".split("");
    const [current, setCurrent] = useState(0);

    const reset = () => {
        setCurrent(0);
    }


    const [paused, setPaused] = useState(false);

    // useEffect(() => {
    //     if (paused) return;
    //     const inter = setInterval(() => {
    //         setCurrent((c) => (c + 1) % alphabet.length);
    //     }, 1000);
    //     return () => {
    //         clearInterval(inter);
    //     }
    // }, [paused])


    return (
        // <HingeRotateDiv />
        <div className="min-h-screen flex flex-col  items-center justify-evenly text-white bg-neutral-950">
            <div className="flex flex-col">
                <SolariTop current={current} flaps={alphabet} />
                <hr className="h-0.5 m-0 p-0 border-t-0 bg-neutral-950" />
                <SolariBottom current={current} flaps={alphabet} />
            </div>
            <button className="bg-neutral-900 px-4 py-2 rounded-lg shadow-lg" onClick={() => reset()}>Reset</button>
            <button className="bg-neutral-900 px-4 py-2 rounded-lg shadow-lg" onClick={() => setPaused(!paused)}>Pause</button>
        </div >
    );
}