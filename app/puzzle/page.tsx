"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {  ClockFading, Lightbulb } from "lucide-react";
import StartScreen from "./components/StartScreen";
import EndScreen from "./components/EndScreen";

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

  const handleDownload = () => {
    if (!puzzle) return;
    const blob = new Blob([JSON.stringify(puzzle, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${puzzle.title || "puzzle"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRestart = () => {
    setStarted(false);
    setCompleted(false);
    setTime(0);
    setScore(0);
    setCurrentIndex(0);
    setSelected(null);
    setShuffledWords([...puzzle.words].sort(() => Math.random() - 0.5));
  }

  if (!puzzle) {
    return (
      <div className="min-h-screen flex items-center justify-center text-cc-primery/50">
        No puzzle found.
      </div>
    );
  }

  if (!started) {
    return <StartScreen title={puzzle.title || "Word Puzzle"} setStarted={setStarted} handleDownload={handleDownload} />;
  }

  if (completed) {
    return (
      <EndScreen score={`${score} / ${puzzle.words.length}`} time={formatTime(time)} handleRestart={handleRestart} />
    );
  }

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100
      }}
      className="flex flex-col items-center justify-center p-5 bg-violet-200 w-[400px] max-[450px]:w-[95%] max-[450px]:p-3 rounded-[20px] border-[3px] border-cc-background text-center gap-3 ">
      <motion.div
        initial={{ y: -10, scale: 0.9, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100
        }}
        className="flex items-center gap-3 text-cc-background font-bold justify-center bg-cc-primery border-[3px] border-cc-background rounded-[20px] px-3 py-2.5 mr-auto">
        <ClockFading size={24} strokeWidth={2.5} /> <span>{formatTime(time)}</span>
      </motion.div>

      <motion.h1
        initial={{ y: -10, scale: 0.5, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100
        }}
        className="text-4xl font-bold text-gray-900 sub-heading">
        Clue {currentIndex + 1} of {puzzle.words.length}
      </motion.h1>
      <motion.p
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: 0.1,
          type: "spring",
          stiffness: 100
        }}
        className="max-w-md text-[1.1rem] text-cc-background italic underline font-semibold leading-[1.8] flex justify-center items-center gap-2">
        <span>
          <Lightbulb size={24} />
        </span>
        <span>
          {puzzle.clues[currentIndex]}
        </span>
      </motion.p>

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

          let colorClass = " bg-cc-primery text-cc-background hover:bg-cc-background hover:text-cc-primery border-cc-background";
          if (selected) {
            if (isSelected && isCorrect) colorClass = "bg-green-200 border-cc-background text-cc-background";
            else if (isSelected && !isCorrect) colorClass = "bg-[#fd5c63] border-cc-background text-cc-primery";
            else colorClass = "bg-cc-background text-cc-primery border-cc-background";
          }

          return (
            <motion.button
              initial={{ scale: 0.8, y: 0, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                delay: i * 0.05,
                type: "spring",
                stiffness: 100
              }}
              key={i}
              onClick={() => handleAnswer(word)}
              disabled={!!selected}
              className={`${colorClass} rounded-[20px] w-full p-3 font-semibold transition-colors duration-400 border-[3px] `}
            >
              {word}
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
