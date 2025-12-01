import React, { useEffect, useRef, useState } from 'react'
import FileInfo from './FileInfo'
import { useRouter } from 'next/navigation';
import GenerateButton from './ui/GenerateButton';
import TopicInput from './ui/TopicInput';
import PDFButton from './ui/PDFButton';
import JSONButton from './ui/JSONButton';
import ButtonGroup from './ButtonGroup';
import { AnimatePresence, motion } from 'framer-motion';
import Dailog from './Dailog';
import JSONValidationInfo from './JSONValidationInfo';
import JSONError from './JSONError';

export default function InputPanel() {
    const [topic, setTopic] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [showInvalidJson, setShowInvalidJson] = useState(false);
    const [showNoInputAlert, setShowNoInputAlert] = useState(false);
    const router = useRouter();

    function toggleNoInputAlert() {
        setShowNoInputAlert(!showNoInputAlert)
    }

    function toggleInvalidJsonError() {
        setShowInvalidJson(pre => !showInvalidJson)
    }

    const handleGenerate = async () => {

        if ((!topic && !file) || !topic) {
            toggleNoInputAlert()
            return;
        }

        setLoading(true);

        const formData = new FormData();
        if (topic) formData.append("topic", topic);
        if (file) formData.append("file", file);

        try {
            const res = await fetch("/api/gemini", {
                method: "POST",
                body: formData,
            });

            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = await res.text();
                throw new Error("Server returned HTML instead of JSON. Check your API route path.");
            }

            const data = await res.json();

            if (data.error) throw new Error(data.error);
            if (!data.words || !data.clues) throw new Error("Invalid puzzle data received");

            localStorage.setItem("puzzle", JSON.stringify(data));
            router.push("/puzzle");
        } catch (err) {
            alert("Failed to generate puzzle");
        } finally {
            setLoading(false);
        }
    };

    const handleImportPdf = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.type !== "application/pdf") {

                return;
            }

            if (selectedFile.size > 10 * 1024 * 1024) {

                return;
            }

            setFile(selectedFile);

            console.log("File selected:", selectedFile.name, selectedFile.size, "bytes");
        }
    };

    const handleImportJson = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        if (selectedFile.type !== "application/json") {

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
                toggleInvalidJsonError()
            }
        };
        reader.readAsText(selectedFile);
    };

    return (
        <div className='w-full h-full fixed top-0 left-0 z-99 flex flex-col items-center justify-center gap-2 px-4'>

            <TopicInput
                value={topic}
                action={setTopic}
                isDisabled={loading}
            />

            {file && (
                <FileInfo file={file} action={setFile} />
            )}

            <div className="flex justify-center items-center gap-2 w-90 max-[400px]:w-full relative">
                <GenerateButton action={handleGenerate} inProgress={loading} />
                <ButtonGroup>
                    <PDFButton action={handleImportPdf} />
                    <JSONButton action={handleImportJson} />
                </ButtonGroup>
            </div>

            <Dailog
                title='Input Required'
                body='You must provide a topic before continuing.'
                show={showNoInputAlert}
                close={toggleNoInputAlert}
            />

            <JSONError
                show={showInvalidJson}
                close={toggleInvalidJsonError}
            />

        </div>
    )
}
