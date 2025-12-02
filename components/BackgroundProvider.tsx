'use client'

import React, { useEffect, useState } from 'react'

export default function BackgroundProvider({ children }: { children: React.ReactNode }) {
    const bgColors = ['#FBCEB1', '#B0C4DE', '#ACE1AF', '#FFDEAD'];
    const baseColor = "#FBCEB1";
    const [color, setColor] = useState(baseColor);

    useEffect(() => {
        const newColor = bgColors[Math.floor(Math.random() * bgColors.length)];
        const timer = setTimeout(() => {
            setColor(newColor);
        }, 50);

        return () => clearTimeout(timer);
    }, []);
    return (
        <main
            className='w-dvw h-dvh transition-colors duration-700 ease-out flex justify-center items-center'
            style={{ backgroundColor: color }}>
            {children}
        </main>
    )
}
