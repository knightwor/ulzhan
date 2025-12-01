import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCcw, Trophy } from 'lucide-react';

export default function EndScreen({ score, time, handleRestart }: { score: string; time: string; handleRestart: () => void; }) {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100
      }}
      className="flex flex-col items-center justify-center p-5 bg-violet-200 w-[400px] max-[450px]:w-[95%] max-[450px]:p-3 rounded-[20px] border-[3px] border-cc-background text-center gap-3 "
    >
      <Trophy size={100} className="text-cc-background" />
      <h1 className="text-3xl font-bold sub-heading text-gray-900">Puzzle Completed</h1>

      <div className="flex flex-col justify-center items-start gap-2">
        <p className="text-[max(14px,min(2vw,20px))] flex justify-center items-center gap-3 text-gray-900">
          <span className="w-15 flex justify-start items-center font-bold">
            Score
          </span>
          :
          <span className="w-15 flex justify-start items-center font-medium italic">
            {score}
          </span>
        </p>
        <p className="text-[max(14px,min(2vw,20px))] text-gray-900 flex justify-center items-center gap-3">
          <span className="w-15 flex justify-start items-center font-bold">
            Time
          </span>
          :
          <span className="w-15 flex justify-start items-center font-medium italic">
            {time}
          </span>
        </p>
      </div>

      <div className="flex gap-4">
        <motion.button
          initial={{ scale: 0.8, y: -50, opacity: 0 }}
          whileInView={{ scale: 1, y: 0, opacity: 1 }}
          whileTap={{ scale: 0.7, rotate: -2 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{
            type: "spring",
            stiffness: 100
          }}
          onClick={handleRestart}
          className="bg-cc-primery hover:opacity-80 transition-colors duration-400 border-[3px] border-cc-background text-cc-background px-5 py-2.5  rounded-[20px] font-semibold flex items-center gap-3"
        >
          <RefreshCcw size={20} strokeWidth={2.5} /> Restart
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
          onClick={() => (window.location.href = "/")}
          className="bg-cc-foreground text-cc-primery px-5 py-2.5 rounded-[20px] flex items-center gap-3 transition-colors duration-400 border-[3px] border-cc-foreground font-semibold"
        >
          <ArrowLeft size={20} strokeWidth={2.5} /> Go Back
        </motion.button>
      </div>
    </motion.div>
  )
}
