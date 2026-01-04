"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const handleChange = (file: File | File[]) => {
    if (Array.isArray(file)) return setFile(file[0]);
    setFile(file);
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please upload a file first.");
      return;
    }

    const res = await fetch("/api/review", {
      method: "POST",
      body: (() => {
        const formData = new FormData();
        formData.append("resume", file);
        return formData;
      })(),
    });

    if (!res.ok) {
      alert("Failed to upload and analyze the resume.");
      return;
    }

    const data = await res.json();
    console.log("Analysis Result:", data);
    alert("Resume analyzed successfully! Check console for results.");
  };
  return (
    <div>
      <h1>Upload Page</h1>
      <p>
        This is a placeholder for the upload page. Implement upload
        functionality here.
      </p>

      <FileUploader
        multiple={false}
        handleChange={handleChange}
        types={["pdf"]}
      />

      <Button onClick={handleAnalyze}>Upload Resume</Button>
    </div>
  );
}
