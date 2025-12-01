import { motion } from 'framer-motion'
import LoadingDots from '../LoadingDots'

export default function GenerateButton({ action, inProgress }: { inProgress: boolean, action: () => void}) {
    return (
        <motion.button
            initial={{ scale: 0.8, y: -50, opacity: 0 }}
            whileInView={{ scale: 1, y: 0, opacity: 1 }}
            whileTap={{ scale: 0.7, rotate: -2 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{
                type: "spring",
                stiffness: 100
            }}
            onClick={action}
            className="hover:bg-green-300 bg-green-200 transition-colors duration-500 text-cc-background px-7 py-3.5 rounded-[20px] font-semibold flex items-center gap-2 w-[50%] justify-center border-[3px] border-cc-background uppercase"
        >
            {inProgress ? (
                <>
                    <span>Generating</span>
                    <LoadingDots />
                </>
            ) : (
                "Generate"
            )}
        </motion.button>
    )
}
