import { motion } from 'framer-motion';
import React, { useRef } from 'react'

interface PDFButton {
    action: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function PDFButton({ action }: PDFButton) {
    const pdfInputRef = useRef<HTMLInputElement>(null);
    return (
        <>
            <input
                ref={pdfInputRef}
                type="file"
                accept="application/pdf"
                style={{ display: "none" }}
                onChange={action}
            />

            <motion.button
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.05, x: -2 }}
                transition={{
                    type: "spring",
                    stiffness: 100
                }}
                className='w-[50%] h-full flex justify-center transition-colors duration-500 items-center rounded-l-[20px] border-[3px] border-cc-background px-7 border-r-2 py-3.5 bg-cc-primery text-cc-background font-semibold'
                onClick={() => {
                    pdfInputRef.current?.click()
                }}
            >
                PDF
            </motion.button>
        </>
    )
}
