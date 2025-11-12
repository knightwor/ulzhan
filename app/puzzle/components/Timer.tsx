"use client";
import { useEffect } from "react";

export default function Timer({
  running,
  onTick,
}: {
  running: boolean;
  onTick: (time: number) => void;
}) {
  useEffect(() => {
    if (!running) return;
    let t = 0;
    const interval = setInterval(() => {
      t++;
      onTick(t);
    }, 1000);
    return () => clearInterval(interval);
  }, [running, onTick]);

  return <div className="font-mono text-sm"> Timer running...</div>;
}
