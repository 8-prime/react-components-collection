import React, { useState } from 'react';
import '../hinge-rotate.css'; // You'd create this file

const HingeRotateDiv = () => {
    const [rotated, setRotated] = useState(false);

    const handleRotate = () => {
        setRotated(!rotated);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div
                className={`w-48 h-48 bg-blue-500 text-white flex items-center justify-center text-lg font-bold ${rotated ? 'hinge-animation' : ''} `}
            >
                Hinged Div
            </div>

            <button
                onClick={handleRotate}
                className="ml-8 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Toggle Rotation
            </button>
        </div>
    );
};

export default HingeRotateDiv;