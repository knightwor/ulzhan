"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { File, FileCode, FileText, Github, Plus, X } from "lucide-react";
import LoadingDots from "@/components/LoadingDots";
import Link from "next/link";
import { useRouter } from "next/navigation";
import JSONValidationInfo from "@/components/JSONValidationInfo";
import JSONError from "@/components/JSONError";
import FileMenu from "@/components/FileMenu";
import FileInfo from "@/components/FileInfo";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showJsonInfo, setShowJsonInfo] = useState(false);
  const [showInvalidJson, setShowInvalidJson] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const jsonInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleGenerate = async () => {
    if (!topic && !file) {
      setError("Please enter a topic or upload a PDF!");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    if (topic) formData.append("topic", topic);
    if (file) formData.append("file", file);

    try {
      console.log("Sending request to /api/gemini...");
      const res = await fetch("/api/gemini", {
        method: "POST",
        body: formData,
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Received non-JSON response:", text.substring(0, 200));
        throw new Error("Server returned HTML instead of JSON. Check your API route path.");
      }

      const data = await res.json();
      console.log("Received data:", data);

      if (data.error) throw new Error(data.error);
      if (!data.words || !data.clues) throw new Error("Invalid puzzle data received");

      localStorage.setItem("puzzle", JSON.stringify(data));
      router.push("/puzzle");
    } catch (err) {
      console.error("Error generating puzzle:", err);
      alert("Failed to generate puzzle");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setError("Please select a PDF file");
        return;
      }

      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("PDF file must be smaller than 10MB");
        return;
      }

      setFile(selectedFile);
      setError("");
      console.log("File selected:", selectedFile.name, selectedFile.size, "bytes");
    }
  };

  const handleJsonChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.type !== "application/json") {
      setError("Please select a JSON file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target?.result as string);
        if (!jsonData.words || !jsonData.clues) {
          throw new Error("Invalid JSON structure: must include 'words' and 'clues'");
        }
        localStorage.setItem("puzzle", JSON.stringify(jsonData));
        router.push("/puzzle");
      } catch (err) {
        setShowInvalidJson(true);
      }
    };
    reader.readAsText(selectedFile);
  };

  return (
    <main className="min-h-dvh overflow-hidden flex flex-col items-center justify-center gap-5 text-center px-6">
      <motion.h1
        className="w-full text-[max(4rem,min(8vw,15rem))] heading uppercase text-cc-primery/0 text-center bg-linear-180 bg-clip-text from-cc-primery from-40% to-zinc-400 font-bold main"
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1,
          type: "spring",
          velocity: 100,
          ease: "circOut",
        }}
        viewport={{ once: false }}
      >
        Ulzhan
      </motion.h1>

      <motion.p
        className="w-[500px] max-[650px]:w-full origin-center text-center text-[max(14px,min(2vw,20px))] text-cc-primery/50 leading-[1.8] flex justify-center items-center"
        initial={{ scaleX: 0.8, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: false }}
        transition={{
          duration: 1,
          type: "spring",
          velocity: 0,
          ease: "circOut",
        }}
      >
        Enter a topic and attach a PDF or JSON to create a personalized puzzle.
      </motion.p>

      <input
        type="text"
        placeholder="Enter a topic (e.g. Space, Food...)"
        className="px-5 py-2.5 rounded-lg bg-cc-foreground text-cc-primery w-90 outline-none max-[400px]:w-full"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        disabled={loading}
      />

      {file && (
        <FileInfo file={file} action={setFile} />
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <input
        ref={jsonInputRef}
        type="file"
        accept="application/json"
        style={{ display: "none" }}
        onChange={handleJsonChange}
      />

      <div className="flex justify-center items-center gap-2 w-90 max-[400px]:w-full relative">
        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={loading || (!topic && !file)}
          onClick={handleGenerate}
          className="bg-cc-primery hover:opacity-80 transition-all cursor-pointer text-cc-background px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <span>Generating</span>
              <LoadingDots />
            </>
          ) : (
            "Generate Puzzle"
          )}
        </motion.button>

        <div className="relative">
          <motion.button
            onClick={() => setShowDropdown((p) => !p)}
            disabled={loading}
            className="bg-cc-foreground px-2.5 py-2.5 rounded-xl hover:bg-cc-hover transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center"
          >
            <motion.span
              animate={{ rotate: showDropdown ? 45 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Plus />
            </motion.span>
          </motion.button>

          <FileMenu
            show={showDropdown}
            close={setShowDropdown}
            ref={fileInputRef}
            action={setShowJsonInfo}
          />
        </div>

        <Link
          href={"https://github.com/knightwor/ulzhan"}
          className="bg-cc-foreground px-2.5 py-2.5 rounded-xl hover:bg-cc-hover transition-all"
        >
          <Github />
        </Link>
      </div>

      <JSONValidationInfo
        show={showJsonInfo}
        close={setShowJsonInfo}
        ref={jsonInputRef}
      />

      <JSONError
        show={showInvalidJson}
        close={setShowInvalidJson}
      />

    </main>
  );
}
