"use client"

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react'

interface Char {
    id: any
    x: number;
    y: number;
    rotation: number;
    char: string;
    color: string;
}

export default function ReshuffledTitle() {
    const boxRef = useRef<HTMLDivElement>(null);

    const colors = ['#eec0c8', '#B0C4DE', '#D0F0C0', '#F0E68C', '#FA8072']
        ;

    const [title, setTitle] = useState<Char[]>([
        { x: 0, y: 0, rotation: 0, char: 'U', color: '', id: crypto.randomUUID() },
        { x: 0, y: 0, rotation: 0, char: 'L', color: '', id: crypto.randomUUID() },
        { x: 0, y: 0, rotation: 0, char: 'Z', color: '', id: crypto.randomUUID() },
        { x: 0, y: 0, rotation: 0, char: 'H', color: '', id: crypto.randomUUID() },
        { x: 0, y: 0, rotation: 0, char: 'A', color: '', id: crypto.randomUUID() },
        { x: 0, y: 0, rotation: 0, char: 'N', color: '', id: crypto.randomUUID() },
    ]);

    function initializeTitle() {
        const boxW = boxRef.current?.clientWidth || 0;
        const boxH = boxRef.current?.clientHeight || 0;

        const letterCount = title.length;
        const sectionWidth = boxW / letterCount
        const lanes = 3;

        const newTitle = title.map((char, index) => {
            const minX = sectionWidth * index + 100;
            const maxX = sectionWidth * (index + 1) - 300;

            const laneHeight = boxH / (lanes * 2);
            const lane = Math.floor(Math.random() * lanes);

            return {
                ...char,
                x: Math.trunc(Math.random() * (maxX - minX) + minX),
                y: lane * laneHeight + Math.random() * (laneHeight * 0.4),
                rotation: Math.random() * 20 - 10,
                color: colors[Math.floor(Math.random() * colors.length)],
            };
        });

        setTitle(newTitle);
    }

    function initializeTitleForMobile() {
        const boxW = boxRef.current?.clientWidth || 0;
        const boxH = boxRef.current?.clientHeight || 0;

        const sectionWidth = boxW / title.length;

        const newTitle = title.map((char, index) => {
            const x = sectionWidth * index + sectionWidth / 5;

            return {
                ...char,
                x: x,
                y: Math.random() * (boxH * 0.3),
                rotation: Math.random() * 30 - 15,
                color: colors[Math.floor(Math.random() * colors.length)],
            };
        });

         setTitle(newTitle);

    }   


    useEffect(() => {
        if (screen.width <= 1500)
            initializeTitleForMobile()
        else    
            initializeTitle();


    }, []);
    return (
        <div className='w-[90%] h-full relative mb-auto z-0' ref={boxRef}>

            <AnimatePresence>
                {
                    title.map((char, index) => (
                        <motion.span
                            key={char.id}
                            exit={{ opacity: 0 }}
                            initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                            animate={{ opacity: 1, scale: 1, rotate: char.rotation }}
                            transition={{ delay: index * 0.07, type: 'spring', stiffness: 100 }}
                            className='heading uppercase font-black text-[15vw] max-[500px]:text-[20vw] absolute select-none pointer-events-none text-stroke'
                            style={{
                                top: `${char.y}px`,
                                left: `${char.x}px`,
                                color: char.color,
                            }}>
                            {char.char}
                        </motion.span>
                    ))
                }
            </AnimatePresence>
        </div>
    )
}
