import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import React from 'react'
import JSONFormat from './JSONFormat';

export default function JSONValidationInfo(
    { show, close, ref }
        :
        { show: boolean, close: (val: boolean) => void,  ref: React.RefObject<HTMLInputElement | null>; }) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 bg-cc-background/80 backdrop-blur-[15px] flex justify-center items-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ duration: 0.25 }}
                        className="bg-cc-foreground border-2 border-cc-hover rounded-xl p-6 w-[90%] max-w-md text-left text-sm text-cc-primery/60 shadow-lg"
                    >
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-lg font-bold text-cc-primery">Accepted JSON Format</h2>
                            <button
                                onClick={() => close(false)}
                                className="text-cc-primery/50 hover:text-cc-primery/70 cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <JSONFormat />

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => close(false)}
                                className="px-4 py-2 rounded-lg bg-cc-primery/5 hover:bg-cc-hover text-cc-primery/60 font-medium cursor-pointer transition-all"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    close(false);
                                    ref.current?.click();
                                }}
                                className="px-4 py-2 rounded-lg bg-cc-primery hover:opacity-80 text-cc-background font-semibold cursor-pointer"
                            >
                                Got it, Upload JSON
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
