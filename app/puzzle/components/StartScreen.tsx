import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

export default function StartScreen({ title, setStarted, handleDownload }: { title: string; setStarted: (val: boolean) => void; handleDownload: () => void; }) {
    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 100
            }}
            className="flex flex-col items-center justify-center p-5 bg-violet-200 w-[400px] max-[450px]:w-[95%] max-[450px]:p-3 rounded-[20px] border-[3px] border-cc-background text-center gap-3 ">
            <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 100
                }}
                className="text-[max(2rem,min(2vw,6rem))] text-gray-900 font-bold max-w-[300px] sub-heading text-ellipsis overflow-hidden whitespace-nowrap">{title}</motion.h1>
            <motion.p
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 100
                }}
                className="text-[1.1rem] px-5 py-2.5 bg-cc-primery text-left w-full rounded-[20px] text-cc-background border-[3px] border-cc-background font-medium leading-[1.8] ">
                Guess the correct word based on each clue.
            </motion.p>

            <div className="flex items-center gap-2 justify-center">
                <motion.button
                    initial={{ scale: 0.8, y: -50, opacity: 0 }}
                    whileInView={{ scale: 1, y: 0, opacity: 1 }}
                    whileTap={{ scale: 0.7, rotate: -2 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{
                        type: "spring",
                        stiffness: 100
                    }}
                    onClick={() => setStarted(true)}
                    className="hover:bg-green-300 bg-green-200 transition-colors duration-500 text-cc-background px-5 py-2.5 rounded-[20px] font-semibold flex items-center gap-2 w-[50%] justify-center border-[3px] border-cc-background uppercase whitespace-nowrap"
                >
                    Let's go
                </motion.button>

                <motion.button
                    initial={{ scale: 0.8, y: -50, opacity: 0 }}
                    whileInView={{ scale: 1, y: 0, opacity: 1 }}
                    whileTap={{ scale: 0.7, rotate: -2 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{
                        type: "spring",
                        stiffness: 100
                    }}
                    onClick={handleDownload}
                    className="bg-cc-background transition-colors duration-500 text-cc-primery px-5 py-2.5 rounded-[20px] font-semibold flex items-center gap-2 w-[50%] justify-center border-[3px] border-cc-background uppercase"
                >
                    <Download size={20} strokeWidth={2.5} /> Download
                </motion.button>
            </div>
        </motion.div>
    )
}
