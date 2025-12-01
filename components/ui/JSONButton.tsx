import { motion } from 'framer-motion'
import React, { useRef } from 'react'

export default function JSONButton({ action }: { action: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    const jsonInputRef = useRef<HTMLInputElement>(null);
    return (
        <>
            <input
                ref={jsonInputRef}
                type="file"
                accept="application/json"
                style={{ display: "none" }}
                onChange={action}
            />

            <motion.button
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.05, x: 2 }}
                transition={{
                    type: "spring",
                    stiffness: 100
                }}
                className='w-[50%] h-full flex justify-center transition-colors duration-500 items-center rounded-r-[20px] border-[3px] border-cc-background bg-amber-200 text-cc-background border-l-2 font-semibold px-7 py-3.5'
                onClick={() => {
                    jsonInputRef.current?.click()
                }}
            >
                JSON
            </motion.button>
        </>
    )
}
