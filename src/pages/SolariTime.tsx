import { useEffect, useState } from "react";

type SolariFlapProps = {
    flaps: string[] // all the available values to be displayed
    current: number // index of the current value
    variant: 'top' | 'bottom';
    animationDuration: number;
}


function SolariTop({ flaps, current, animationDuration }: SolariFlapProps) {
    const [last, setLast] = useState(-1); // last letter	
    const [changed, setChanged] = useState(false); // has the letter changed


    const [previousLetter, setPreviousLetter] = useState("");
    const [currentLetter, setCurrentLetter] = useState("");

    useEffect(() => {
        if (current != last) {
            setLast(current);
            setPreviousLetter(flaps[(flaps.length + current - 1) % flaps.length]);
            setCurrentLetter(flaps[current]);

            setChanged(true);
            setTimeout(() => {
                setChanged(false);
            }, animationDuration);
            return;
        }



    }, [current]);

    return (
        <div className="grid text-white text-5xl">
            <div className='col-start-1 row-start-1 w-32 h-16 overflow-hidden transition-transform duration-100 ease-in-out bg-neutral-700 rounded-t-lg'>
                <div className='text-8xl font-bold text-white leading-none flex items-start justify-center h-32 translate-y-[8%]'>
                    {currentLetter}
                </div>
            </div>
            <div
                className={`col-start-1 row-start-1 w-32 h-16 overflow-hidden bg-neutral-700 rounded-t-lg z-10 ${changed ? `transition-transform duration-${animationDuration} ease-in-out` : ''}`}
                style={{
                    transform: 'rotateX(-90deg)',
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'bottom center'
                }}
            >
                <div className={`text-8xl font-bold text-white leading-none flex items-start justify-center h-32 translate-y-[8%]`}>
                    {previousLetter}
                </div>
            </div>
        </div>
    )
}

function SolariBottom({ flaps, current, animationDuration }: SolariFlapProps) {
    const [last, setLast] = useState(-1); // last letter	
    const [changed, setChanged] = useState(false); // has the letter changed


    const [nextLetter, setNextLetter] = useState("");
    const [currentLetter, setCurrentLetter] = useState("");


    const [stage, setStage] = useState(0);

    function transform(stage: number) {
        return `rotateX(${stage * 90}deg)`;
    }

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.code === 'ArrowLeft') {
                setStage(stage => stage - 1);
            }
            if (e.code === 'ArrowRight') {
                setStage(stage => stage + 1);
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        // Don't forget to clean up
        return function cleanup() {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [])

    useEffect(() => {
        if (current != last) {
            setLast(current);
            setNextLetter(flaps[(current + 1) % flaps.length]);
            setCurrentLetter(flaps[current]);

            setChanged(true);
            setTimeout(() => {
                setChanged(false);
            }, animationDuration);
            return;
        }



    }, [current]);

    return (
        <div className="grid text-white text-5xl">
            <div className='col-start-1 row-start-1 w-32 h-16 overflow-hidden bg-neutral-700 rounded-b-lg'>
                <div className='text-8xl font-bold text-white leading-none flex items-start justify-center h-32 -translate-y-[45%]'>
                    {nextLetter}
                </div>
            </div>
            <div
                className={`col-start-1 row-start-1 w-32 h-16 overflow-hidden bg-neutral-700 rounded-b-lg z-10 transition-transform duration-${animationDuration}`}
                style={{
                    transform: transform(stage),
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'top center'
                }}
            >
                <div className={`text-8xl font-bold text-white leading-none flex items-start justify-center h-32 -translate-y-[45%]`}>
                    {currentLetter}
                </div>
            </div>
        </div>
    )
}


function SolariFlap({ flaps, current, variant, animationDuration }: SolariFlapProps) {

    const currentLetter = flaps[current]; // current letter
    const [last, setLast] = useState(-1); // last letter	
    const [changed, setChanged] = useState(false); // has the letter changed

    const isTop = variant === 'top';
    const roundedClass = isTop ? 'rounded-t-lg' : 'rounded-b-lg';
    const transformOrigin = isTop ? 'bottom center' : 'top center';
    const textTransform = isTop ? 'translate-y-[8%]' : '-translate-y-[45%]';



    useEffect(() => {
        if (current != last) {
            setLast(current);

            setChanged(true);
            setTimeout(() => {
                setChanged(false);
            }, animationDuration);
        }
    }, [current]);

    return (
        <div className={`${changed ? 'border-black' : 'border-amber-400'} border-2 w-32 h-16 overflow-hidden transition-transform duration-100 ease-in-out ${roundedClass}`}>
            <p>Current:{currentLetter}</p>
        </div>
        // <div className="grid text-white text-5xl">
        //     <div className={`col-start-1 row-start-1 w-32 h-16 overflow-hidden transition-transform duration-100 ease-in-out bg-neutral-700 ${roundedClass}`}>
        //         <div className={`text-8xl font-bold text-white leading-none flex items-start justify-center h-32 ${textTransform}`}>
        //             {isTop ? currentLetter : nextLetter}
        //         </div>
        //     </div>
        //     <div
        //         className={`col-start-1 row-start-1 w-32 h-16 overflow-hidden bg-neutral-700 ${roundedClass} z-10 ${isTransitioning ? `transition-transform duration-${animationDuration} ease-in-out` : ''}`}
        //         style={{
        //             transform: transform(stage),
        //             transformStyle: 'preserve-3d',
        //             transformOrigin: transformOrigin
        //         }}
        //     >
        //         <div className={`text-8xl font-bold text-white leading-none flex items-start justify-center h-32 ${textTransform}`}>
        //             {isTop ? nextLetter : currentLetter}
        //         </div>
        //     </div>
        // </div>
    );
}

type SolariProps = {
    flaps: string[];
    input: string;
    animationDuration: number;
}

function Solari({ flaps, input, animationDuration }: SolariProps) {

    const chars = input.split("");


    return (
        <div className="flex flex-row gap-4">
            {chars.map((c, i) => {
                return (
                    <div key={c + i} className="flex flex-col">
                        <SolariTop variant="top" current={flaps.indexOf(c)} flaps={flaps} animationDuration={animationDuration} />
                        <hr className="h-1 m-0 p-0 border-t-0 bg-neutral-950" />
                        <SolariBottom variant="bottom" current={flaps.indexOf(c)} flaps={flaps} animationDuration={animationDuration} />
                    </div>
                )
            })}
        </div>

    )
}

export default function SolariTime() {

    const alphabet = "0123456789".split("");

    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [seconds, setSeconds] = useState("");

    const [play, setPlay] = useState(true);


    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            console.log(e);

            if (e.key === 'p') {
                setPlay(play => !play);
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        // Don't forget to clean up
        return function cleanup() {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [])

    useEffect(() => {
        if (!play) {
            return;
        }
        const dateObject = new Date()

        setHours(dateObject.getHours().toString().padStart(2, '0'))
        setMinutes(dateObject.getMinutes().toString().padStart(2, '0'))
        setSeconds(dateObject.getSeconds().toString().padStart(2, '0'))

        const int = setInterval(() => {
            const dateObject = new Date()

            setHours(dateObject.getHours().toString().padStart(2, '0'))
            setMinutes(dateObject.getMinutes().toString().padStart(2, '0'))
            setSeconds(dateObject.getSeconds().toString().padStart(2, '0'))
        }, 1000)

        return () => clearInterval(int);
    }, [play])

    return (
        <div className="min-h-screen flex flex-col  items-center justify-center text-white bg-neutral-950">
            <div className="flex flex-row items-center gap-1">
                <Solari flaps={alphabet} input={hours} animationDuration={200} />
                <p className="text-5xl">:</p>
                <Solari flaps={alphabet} input={minutes} animationDuration={200} />
                <p className="text-5xl">:</p>
                <Solari flaps={alphabet} input={seconds} animationDuration={200} />
            </div>
        </div >
    );
}