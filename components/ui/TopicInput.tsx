"use client"

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface TopicInput {
    value: string
    action: (val: string) => void
    isDisabled: boolean
}

export default function TopicInput({ value, action, isDisabled }: TopicInput) {

    const [placeholder, setPlaceholder] = useState("Enter a topic");

    useEffect(() => {
        if (window.innerWidth > 600) {
            setPlaceholder("Enter a topic (e.g. Space, Food...)");
        }
    }, []);

    return (
        <motion.input
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                type: "spring",
                stiffness: 100
            }}
            type="text"
            placeholder={placeholder}
            className="px-10 py-2.5 h-[100px] rounded-[20px] bg-cc-primery font-semibold text-cc-background border-[3px] border-cc-background w-[600px] outline-none max-[600px]:w-full text-[1.5rem]"
            value={value}
            onChange={(e) => action(e.target.value)}
            disabled={isDisabled}
        />
    )
}
