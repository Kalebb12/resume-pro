"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Upload, FileText, AlertCircle, Loader2, Sparkles } from "lucide-react";
import { ResumeAnalysisType } from "@/types/ResumeAnalysis";
import AnalysisReslut from "@/components/AnalysisReslut";

type LoadingState = "idle" | "uploading" | "analyzing" | "complete" | "error";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysis, setAnalysis] = useState<ResumeAnalysisType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setError("Please upload a PDF file");
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        // 10MB limit
        setError("File size must be less than 10MB");
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      if (droppedFile.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }
      setFile(droppedFile);
      setError(null);
    } else {
      setError("Please upload a PDF file");
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setError(null);
    setLoadingState("uploading");
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const formData = new FormData();
      formData.append("resume", file);

      setLoadingState("analyzing");
      setUploadProgress(95);

      const res = await fetch("/api/review", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to analyze resume");
      }

      const data = await res.json();
      const analysisData = data.analysis as ResumeAnalysisType;

      setAnalysis(analysisData);
      setLoadingState("complete");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze resume");
      setLoadingState("error");
      setUploadProgress(0);
    }
  };
  const handleReset = () => {
    setFile(null);
    setAnalysis(null);
    setLoadingState("idle");
    setUploadProgress(0);
    setError(null);
  };
  return (
    <main className="flex-1 bg-gray-50">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Upload Your Resume
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Get instant AI-powered feedback on your resume
          </p>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="mt-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Upload Section */}
          {!analysis && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Select Your Resume</CardTitle>
                <CardDescription>
                  Upload a PDF file to get started with your free analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* File Upload Area */}
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className={`relative mt-4 flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors ${
                    file
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 bg-white hover:border-gray-400"
                  }`}
                >
                  {file ? (
                    <div className="flex flex-col items-center gap-4">
                      <FileText className="h-12 w-12 text-blue-600" />
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-900">
                          {file.name}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setFile(null)}
                      >
                        Remove File
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <Upload className="h-12 w-12 text-gray-400" />
                      <div className="text-center">
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-500"
                        >
                          Click to upload
                        </label>
                        <p className="mt-1 text-xs text-gray-500">
                          or drag and drop
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          PDF up to 10MB
                        </p>
                      </div>
                      <input
                        id="file-upload"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>

                {/* Loading States */}
                {(loadingState === "uploading" ||
                  loadingState === "analyzing") && (
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {loadingState === "uploading"
                          ? "Uploading resume..."
                          : "Analyzing with AI..."}
                      </span>
                      <span className="font-medium text-gray-900">
                        {uploadProgress}%
                      </span>
                    </div>
                    <Progress value={uploadProgress} />
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>This may take a few moments...</span>
                    </div>
                  </div>
                )}

                {/* Analyze Button */}
                {file && loadingState === "idle" && (
                  <div className="mt-6">
                    <Button
                      onClick={handleAnalyze}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      size="lg"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Analyze Resume
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Analysis Results */}
          {analysis && loadingState === "complete" && (
            <AnalysisReslut analysis={analysis} handleReset={handleReset} />
          )}
        </div>
      </div>
    </main>
  );
}
