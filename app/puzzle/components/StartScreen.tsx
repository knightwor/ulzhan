import { Download } from 'lucide-react';
import React from 'react'

export default function StartScreen({ title, setStarted, handleDownload }: { title: string; setStarted: (val: boolean) => void; handleDownload: () => void; }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-6">
            <h1 className="text-4xl font-bold sub-heading ">{title}</h1>
            <p className="text-[max(14px,min(2vw,20px))] text-cc-primery/50 leading-[1.8] ">
                Guess the correct word based on each clue.
            </p>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => setStarted(true)}
                    className="bg-cc-primery hover:opacity-80 transition-all cursor-pointer text-cc-background px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2"
                >
                    Start Puzzle
                </button>

                <button
                    onClick={handleDownload}
                    className="bg-cc-foreground hover:bg-cc-hover text-cc-primery px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer border-2 border-cc-hover/50"
                >
                    <Download size={16} /> Download
                </button>
            </div>
        </div>
    )
}
