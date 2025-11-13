"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Timer, Trophy, RefreshCcw, Download } from "lucide-react";
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
      <EndScreen score={`${score} / ${puzzle.words.length}` } time={formatTime(time)} handleRestart={handleRestart} />
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

          let colorClass = "bg-cc-foreground hover:bg-cc-hover";
          if (selected) {
            if (isSelected && isCorrect) colorClass = "bg-green-600 border-green-400";
            else if (isSelected && !isCorrect) colorClass = "bg-red-600 border-red-400";
            else colorClass = "bg-cc-foreground opacity-50";
          }

          return (
            <motion.button
              whileTap={{ scale: 0.9 }}
              key={i}
              onClick={() => handleAnswer(word)}
              disabled={!!selected}
              className={`${colorClass} rounded-xl p-3 font-semibold cursor-pointer transition-all border-2 border-transparent`}
            >
              {word}
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
