"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UploadForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const res = await fetch("/api/gemini", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    localStorage.setItem("puzzleData", JSON.stringify(data));
    router.push("/puzzle");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-4 bg-gray-900 p-6 rounded-2xl shadow-lg"
    >
      <input
        name="topic"
        type="text"
        placeholder="Enter topic..."
        className="w-full p-3 rounded-lg bg-gray-800 focus:outline-none"
      />
      <input
        name="file"
        type="file"
        accept=".pdf"
        className="w-full p-3 "
      />
      <button
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-lg flex items-center gap-2"
      >
        {loading ? <Loader2 className="animate-spin" /> : "Generate Puzzle"}
      </button>
    </form>
  );
}
