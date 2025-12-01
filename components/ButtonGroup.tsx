import { motion } from 'framer-motion'
import React from 'react'

export default function ButtonGroup({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ scale: 0.8, y: -50, opacity: 0 }}
            whileInView={{ scale: 1, y: 0, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 100
            }}
            className=" text-cc-background rounded-0 font-semibold flex items-center w-[50%] justify-center border-0 border-cc-background uppercase">
            {children}
        </motion.div>

    )
}
