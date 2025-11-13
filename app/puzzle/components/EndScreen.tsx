import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCcw, Trophy } from 'lucide-react';
import React from 'react'

export default function EndScreen({ score, time, handleRestart }: { score: string; time: string; handleRestart: () => void; }) {
  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-screen space-y-6"
      >
        <Trophy size={64} className="text-yellow-400" />
        <h1 className="text-3xl font-bold sub-heading">Puzzle Completed</h1>

        <div className="flex flex-col justify-center items-start gap-2">
          <p className="text-[max(14px,min(2vw,20px))] flex justify-center items-center gap-3">
            <span className="w-15 flex justify-start items-center font-bold">
              Score
            </span>
            :
            <span className="w-15 flex justify-start items-center text-cc-primery/70">
              {score}
            </span>
          </p>
          <p className="text-[max(14px,min(2vw,20px))] flex justify-center items-center gap-3">
            <span className="w-15 flex justify-start items-center font-bold">
              Time
            </span>
            :
            <span className="w-15 flex justify-start items-center text-cc-primery/70">
              {time}
            </span>
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleRestart}
            className="bg-cc-primery hover:opacity-80 transition-all cursor-pointer text-cc-background px-5 py-2 rounded-xl font-semibold flex items-center gap-2"
          >
            <RefreshCcw size={16} /> Restart
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-cc-foreground hover:bg-cc-hover transition-all text-cc-primery px-5 py-2 rounded-xl flex items-center gap-2 border-2 border-cc-hover/50 cursor-pointer"
          >
            <ArrowLeft size={16} /> Go Back
          </button>
        </div>
      </motion.div>
  )
}
