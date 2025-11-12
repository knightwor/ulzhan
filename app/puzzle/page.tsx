"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Timer, Trophy, RefreshCcw } from "lucide-react";

export default function PuzzlePage() {
  const [puzzle, setPuzzle] = useState<any>(null);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("puzzle");
    if (saved) {
      const parsed = JSON.parse(saved);
      setPuzzle(parsed);
      setShuffledWords([...parsed.words].sort(() => Math.random() - 0.5));
    }
  }, []);

  useEffect(() => {
    if (started && !completed) {
      const id = setInterval(() => setTime((prev) => prev + 1), 1000);
      setIntervalId(id);
      return () => clearInterval(id);
    } else if (completed && intervalId) {
      clearInterval(intervalId);
    }
  }, [started, completed]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const handleAnswer = (word: string) => {
    if (!puzzle || selected) return; 
    setSelected(word);
    const correct = puzzle.words[currentIndex];

    if (word === correct) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 < puzzle.words.length) {
        setCurrentIndex((i) => i + 1);
        setSelected(null);
        setShuffledWords([...puzzle.words].sort(() => Math.random() - 0.5));
      } else {
        setCompleted(true);
      }
    }, 800);
  };

  if (!puzzle) {
    return (
      <div className="min-h-screen flex items-center justify-center text-cc-primery/50">
        No puzzle found.
      </div>
    );
  }

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-6">
        <h1 className="text-4xl font-bold sub-heading ">{puzzle.title}</h1>
        <p className="text-[max(14px,min(2vw,20px))] text-cc-primery/50 leading-[1.8] ">
          Guess the correct word based on each clue.
        </p>

        <button
          onClick={() => setStarted(true)}
          className="bg-cc-primery hover:opacity-80 transition-all cursor-pointer text-cc-background px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2"
        >
          Start Puzzle
        </button>
      </div>
    );
  }

  if (completed) {
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
              {score}/{puzzle.words.length}
            </span>
          </p>
          <p className="text-[max(14px,min(2vw,20px))] flex justify-center items-center gap-3">
            <span className="w-15 flex justify-start items-center font-bold">
              Time
            </span>
            :
            <span className="w-15 flex justify-start items-center text-cc-primery/70">
              {formatTime(time)}
            </span>
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => {
              setStarted(false);
              setCompleted(false);
              setTime(0);
              setScore(0);
              setCurrentIndex(0);
              setSelected(null);
              setShuffledWords([...puzzle.words].sort(() => Math.random() - 0.5));
            }}
            className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-xl flex items-center gap-2"
          >
            <RefreshCcw size={16} /> Restart
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-cc-primery hover:opacity-80 transition-all cursor-pointer text-cc-background px-5 py-2 rounded-xl font-semibold flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Go Back
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center space-y-6 px-6">
      <div className="flex items-center gap-3 text-cc-primery/50">
        <Timer size={18} /> <span>{formatTime(time)}</span>
      </div>

      <h1 className="text-4xl font-bold text-cc-accent sub-heading">
        Clue {currentIndex + 1} of {puzzle.words.length}
      </h1>
      <p className="max-w-md text-[max(14px,min(2vw,20px))] text-cc-primery/50 leading-[1.8] flex justify-center items-center">
        {puzzle.clues[currentIndex]}
      </p>

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 gap-3 mt-6 w-full max-w-xs"
      >
        {shuffledWords.map((word: string, i: number) => {
          const correct = puzzle.words[currentIndex];
          const isSelected = selected === word;
          const isCorrect = word === correct;

          let colorClass = "bg-gray-800 hover:bg-gray-700";
          if (selected) {
            if (isSelected && isCorrect) colorClass = "bg-green-600 border-green-400";
            else if (isSelected && !isCorrect) colorClass = "bg-red-600 border-red-400";
            else colorClass = "bg-gray-800 opacity-50";
          }

          return (
            <motion.button
              whileTap={{ scale: 0.9 }}
              key={i}
              onClick={() => handleAnswer(word)}
              disabled={!!selected}
              className={`${colorClass} rounded-xl p-3 font-semibold cursor-pointer transition-colors duration-200 border border-transparent`}
            >
              {word}
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
