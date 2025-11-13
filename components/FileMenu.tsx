import { AnimatePresence, motion } from 'framer-motion';
import { FileCode, FileText } from 'lucide-react';
import React from 'react'

export default function FileMenu({ show, close, ref, action }
    :
    { show: boolean, close: (val: boolean) => void, action: (val: boolean) => void, ref: React.RefObject<HTMLInputElement | null>; }) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 mt-2 bg-cc-foreground w-[100px] rounded-lg shadow-lg border-2 border-cc-hover/50 z-10 origin-top overflow-hidden"
                >
                    <button
                        onClick={() => {
                            close(false);
                            ref.current?.click();
                        }}
                        className="w-full text-left px-2 py-2 hover:bg-cc-hover text-cc-primery text-sm flex gap-2 justify-start items-center cursor-pointer font-semibold transition-all"
                    >
                        <FileText size={18} strokeWidth={2} />
                        <span>PDF</span>
                    </button>

                    <button
                        onClick={() => {
                            close(false);
                            action(true);
                        }}
                        className="w-full text-left px-2 py-2 hover:bg-cc-hover text-cc-primery text-sm flex gap-2 justify-start items-center cursor-pointer font-semibold transition-all"
                    >
                        <FileCode size={18} strokeWidth={2} />
                        <span>JSON</span>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
