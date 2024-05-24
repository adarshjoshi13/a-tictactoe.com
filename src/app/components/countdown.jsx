import React, { useState, useEffect } from 'react';

export default function Countdown({passFunction}) {
    const [countdown, setCountdown] = useState(3);
    const [colors, setColors] = useState(['text-lime-500', 'text-amber-900', 'text-sky-500', 'text-black']);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        if (countdown === 0) {
            clearInterval(interval);
            setCountdown('Get Ready!')
            passFunction()
        }

        return () => clearInterval(interval);
    }, [countdown]);

    return (
        <>
            {countdown !== NaN && (
                <div className={`absolute top-0 right-0 m-4 p-2  ${colors[countdown]} rounded-lg`}>
                    <h1 id="countdown">{countdown? countdown: null }</h1>
                </div>
            )}
        </>
    );
}
