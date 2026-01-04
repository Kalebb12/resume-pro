"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  TrendingUp,
  Shield,
  Sparkles,
} from "lucide-react";
import { ResumeAnalysisType } from "@/types/ResumeAnalysis";

type LoadingState = "idle" | "uploading" | "analyzing" | "complete" | "error";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysis, setAnalysis] = useState<ResumeAnalysisType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPro, setIsPro] = useState(false); // TODO: Check from Clerk subscription

  // Load saved analysis from localStorage on mount
  useEffect(() => {
    const savedAnalysis = localStorage.getItem("resumeAnalysis");
    if (savedAnalysis) {
      try {
        const parsed = JSON.parse(savedAnalysis);
        setAnalysis(parsed);
        setLoadingState("complete");
      } catch (e) {
        console.error("Failed to parse saved analysis", e);
      }
    }
  }, []);

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

      // Save to localStorage
      localStorage.setItem("resumeAnalysis", JSON.stringify(analysisData));
      localStorage.setItem("resumeFileName", file.name);

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
    localStorage.removeItem("resumeAnalysis");
    localStorage.removeItem("resumeFileName");
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
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
              <div className="mt-6 space-y-6">
                {/* Overall Score Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      Overall Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div
                        className={`text-5xl font-bold ${getScoreColor(
                          analysis.overallScore
                        )}`}
                      >
                        {analysis.overallScore}
                      </div>
                      <div className="flex-1">
                        <Progress value={analysis.overallScore} className="h-3" />
                        <p className="mt-2 text-sm text-gray-600">
                          {analysis.overallScore >= 80
                            ? "Excellent resume! Minor improvements can make it even better."
                            : analysis.overallScore >= 60
                            ? "Good foundation. There are several areas to enhance."
                            : "Your resume needs significant improvements to be competitive."}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Summary Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base leading-7 text-gray-700">
                      {analysis.summary}
                    </p>
                  </CardContent>
                </Card>

                {/* Strengths Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {analysis.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                          <span className="text-base text-gray-700">
                            {strength}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Areas for Improvement Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                      Areas for Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {analysis.areasForImprovement.map((area, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-600" />
                          <span className="text-base text-gray-700">
                            {area}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* ATS Compatibility Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      ATS Compatibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`text-3xl font-bold ${getScoreColor(
                            analysis.atsCompatibility.score
                          )}`}
                        >
                          {analysis.atsCompatibility.score}
                        </div>
                        <div className="flex-1">
                          <Progress
                            value={analysis.atsCompatibility.score}
                            className="h-2"
                          />
                        </div>
                      </div>
                      {analysis.atsCompatibility.recommendations.length > 0 && (
                        <div>
                          <h4 className="mb-2 text-sm font-semibold text-gray-900">
                            Recommendations:
                          </h4>
                          <ul className="space-y-2">
                            {analysis.atsCompatibility.recommendations.map(
                              (rec, index) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-2 text-sm text-gray-700"
                                >
                                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                                  {rec}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Key Suggestions - Free users see limited, Pro see all */}
                <Card>
                  <CardHeader>
                    <CardTitle>Key Suggestions</CardTitle>
                    {!isPro && (
                      <CardDescription>
                        Upgrade to Pro to see all detailed suggestions
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysis.keySuggestions
                        .slice(0, isPro ? undefined : 2)
                        .map((suggestion, index) => (
                          <div
                            key={index}
                            className="rounded-lg border p-4"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <p className="flex-1 text-base text-gray-700">
                                {suggestion.description}
                              </p>
                              <Badge
                                variant="outline"
                                className={getPriorityColor(
                                  suggestion.priority
                                )}
                              >
                                {suggestion.priority}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      {!isPro && analysis.keySuggestions.length > 2 && (
                        <div className="rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 p-6 text-center">
                          <p className="text-sm font-medium text-blue-900">
                            {analysis.keySuggestions.length - 2} more suggestions
                            available
                          </p>
                          <Button
                            variant="outline"
                            className="mt-3 border-blue-600 text-blue-600 hover:bg-blue-50"
                            onClick={() => {
                              // TODO: Navigate to upgrade page
                              console.log("Navigate to upgrade");
                            }}
                          >
                            Upgrade to Pro
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="flex-1"
                  >
                    Analyze Another Resume
                  </Button>
                  {!isPro && (
                    <Button
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        // TODO: Navigate to upgrade page
                        console.log("Navigate to upgrade");
                      }}
                    >
                      Upgrade to Pro for Full Analysis
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
  );
}
