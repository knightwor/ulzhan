import { AnimatePresence, motion } from 'framer-motion';
import JSONFormat from './JSONFormat';

export default function JSONError(
    { show, close }
        :
        { show: boolean, close: () => void}) {
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
              className="bg-[#fd5c63] border-[3px] border-cc-background rounded-[20px] p-5 w-[90%] max-w-md text-left text-sm text-cc-primery font-medium flex-col flex justify-start items-start gap-3"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-[1.4rem] font-bold text-cc-primery">Invalid JSON Format</h2>
              </div>

              <p className="text-cc-primery font-medium text-[1rem] rounded-[10px]">
                The uploaded file doesn’t match the required JSON structure.
                Please ensure it follows this format:
              </p>

              <JSONFormat />

              <div className="flex justify-end w-full">
                <button
                  onClick={close}
                  className="px-4 py-2 rounded-[10px] bg-cc-primery text-cc-background font-semibold border-[3px] border-cc-background"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
}
