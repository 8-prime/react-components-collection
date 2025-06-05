import React, { useState } from 'react';

const FlipDiv = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isHiddenAndTranslated, setIsHiddenAndTranslated] = useState(false); // New state for combined effect

    const toggleFlip = () => {
        setIsFlipped(!isFlipped);
        setIsHiddenAndTranslated(false); // Reset other state
    };

    const toggleHideAndTranslate = () => {
        setIsHiddenAndTranslated(!isHiddenAndTranslated);
        setIsFlipped(false); // Reset other state
    };

    // Determine the transform string
    let transformString = '';
    if (isFlipped) {
        transformString = 'rotateX(180deg)';
    } else if (isHiddenAndTranslated) {
        // Combined transform: rotate 90deg and then translate up by 100% of its own height
        // We'll apply this via style prop because Tailwind doesn't combine transforms easily
        // If you want to use Tailwind classes, you'd need to create a specific utility
        // for this combined transform, which is less flexible.
        transformString = 'rotateX(90deg) translateY(-100%)';
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div
                className="
          relative /* Needed for z-index context if you have other elements */
          w-64 h-32 md:w-96 md:h-48
          perspective-1000
          border border-gray-300
          mb-8
          overflow-hidden /* Hide content that translates outside */
        "
            >
                <div
                    className={`
            relative w-full h-full
            [transform-style:preserve-3d] /* Tailwind arbitrary value */
            transition-transform duration-700 ease-in-out
            transform-origin-top-center
          `}
                    style={{ transform: transformString }} // Apply the combined transform here
                >
                    {/* Front Face */}
                    <div
                        className="
              absolute top-0 left-0
              w-full h-full
              bg-blue-500 text-white
              flex items-center justify-center text-xl font-bold
              [backface-visibility:hidden]
              rounded-md
            "
                    >
                        Front Content
                    </div>

                    {/* Back Face */}
                    <div
                        className="
              absolute top-0 left-0
              w-full h-full
              bg-red-500 text-white
              flex items-center justify-center text-xl font-bold
              rotate-x-180 /* Initial state of the back face */
              [backface-visibility:hidden]
              rounded-md
            "
                    >
                        Back Content
                    </div>
                </div>
            </div>

            <div className="flex space-x-4">
                <button
                    onClick={toggleFlip}
                    className="
            px-6 py-3 bg-green-500 text-white font-semibold rounded-lg
            shadow-md hover:bg-green-600 focus:outline-none focus:ring-2
            focus:ring-green-400 focus:ring-opacity-75
          "
                >
                    {isFlipped ? 'Flip Back' : 'Flip Full'}
                </button>

                <button
                    onClick={toggleHideAndTranslate}
                    className="
            px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg
            shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2
            focus:ring-purple-400 focus:ring-opacity-75
          "
                >
                    {isHiddenAndTranslated ? 'Show' : 'Hide & Translate Up'}
                </button>
            </div>
        </div>
    );
};

export default FlipDiv;