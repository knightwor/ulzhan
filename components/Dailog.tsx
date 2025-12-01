import { AnimatePresence, motion } from 'framer-motion';

export default function Dailog(
    { show, close, title, body }
        :
        { title: string, body: string, show: boolean, close: (val: boolean) => void }) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 bg-red-100/30 backdrop-blur-[10px] flex justify-center items-center z-999"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ duration: 0.25 }}
                        className="bg-[#fd5c63] border-[3px] border-cc-background rounded-[20px] p-5 w-[90%] max-w-md text-left text-sm text-cc-primery font-medium flex-col flex justify-start items-start gap-5"
                    >
                        <div className="flex justify-between items-center w-full">
                            <h2 className="text-[1.4rem] font-bold text-cc-primery">{title}</h2>
                            
                        </div>

                        <p className=" text-cc-primery italic font-medium text-[1.05rem] bg-red-900/30 rounded-[10px] border-l-[5px] border-l-red-900 px-5 py-2.5">
                            {body}
                        </p>

                        <div className="flex justify-end w-full">
                            <motion.button
                                whileTap={{ scale: 0.7, rotate: -2 }}
                                whileHover={{ scale: 1.05, rotate: 2 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 100
                                }}
                                onClick={() => close(false)}
                                className="px-4 py-2 rounded-[10px] bg-cc-primery text-cc-background font-semibold border-[3px] border-cc-background"
                            >
                                Got it
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
