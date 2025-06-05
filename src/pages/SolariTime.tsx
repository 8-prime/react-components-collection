import { useState } from "react";



export default function SolariTime() {
    const current = "A"
    const next = "B"

    const [lowerStage, setLowerStage] = useState(0);
    const [upperStage, setUpperStage] = useState(0);

    const flip = () => {
        setLowerStage(1)
        const flipTimer2 = setTimeout(() => {
            setUpperStage(1)
        }, 100);
        return () => {
            clearTimeout(flipTimer2);
        };
    }


    const reset = () => {
        setLowerStage(0);
        setUpperStage(0);
    };

    const getUpperTransform = (stage: number) => {
        switch (stage) {
            case 0:
                return 'rotateX(0deg)';
            case 1:
                return 'rotateX(90deg)';
            default:
                return 'rotateX(0deg)';
        }
    };

    const getLowerTransform = (stage: number) => {
        switch (stage) {
            case 0:
                return 'rotateX(-90deg)';
            case 1:
                return 'rotateX(0deg)';
            default:
                return 'rotateX(-90deg)';
        }
    };

    return (
        // <HingeRotateDiv />
        <div className="min-h-screen flex flex-col  items-center justify-evenly text-white bg-neutral-950">
            <div className="flex flex-col">
                <div
                    className="col-start-1 row-start-1 w-32 h-16 overflow-hidden transition-transform duration-100 ease-in-out bg-neutral-700 rounded-b-lg z-10"
                    style={{
                        transform: getLowerTransform(upperStage),
                        transformStyle: 'preserve-3d',
                        transformOrigin: 'top center',
                    }}
                >
                    {/* The letter itself */}
                    <div className="text-8xl font-bold text-white leading-none flex items-start justify-center h-32 ">
                        B
                    </div>
                </div>
                {/* Container for the half letter with 3D transform */}
                <div
                    className="col-start-1 row-start-1 w-32 h-16 overflow-hidden transition-transform duration-100 ease-in-out bg-neutral-700 rounded-b-lg z-10"
                    style={{
                        transform: getUpperTransform(lowerStage),
                        transformStyle: 'preserve-3d',
                        transformOrigin: 'bottom center'
                    }}
                >
                    {/* The letter itself */}
                    <div className="text-8xl font-bold text-white leading-none flex items-start justify-center h-32 -translate-y-1/2">
                        A
                    </div>
                </div>


                {/* Reference line to show the "cut" */}
                <div className="absolute top-0 left-0 w-full h-px bg-red-500 opacity-50"></div>
            </div>
            <button onClick={() => reset()}>Reset</button>
            <button onClick={() => flip()}>Flip</button>
        </div >
    );
}