"use client";

import { ResumeAnalysisType } from "@/types/ResumeAnalysis";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "./ui/card";
import {
  AlertCircle,
  Badge,
  BadgeAlert,
  CheckCircle2,
  Dumbbell,
  ShieldHalf,
  Sparkle,
  TrendingUp,
} from "lucide-react";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { useState } from "react";

const AnalysisReslut = ({
  analysis,
  handleReset,
}: {
  analysis: ResumeAnalysisType;
  handleReset: () => void;
}) => {
  const [isPro, setIsPro] = useState(true); // TODO: Check from Clerk subscription

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-700";
      case "medium":
        return "text-yellow-700";
      case "low":
        return "text-blue-700";
      default:
        return "text-gray-700";
    }
  };

  return (
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
          <CardTitle className="flex items-center gap-5">
            <div className="bg-gray-200 p-4 rounded-md border-2 border-gray-200">
              <Dumbbell className="h-5 w-5 text-green-600" />
            </div>
            Strengths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {analysis.strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                <span className="text-base text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Areas for Improvement Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-5">
            <div className="bg-gray-100 p-4 rounded-md border-2 border-gray-200">
              <Sparkle className="h-5 w-5 text-yellow-600" />
            </div>
            Areas for Improvement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {analysis.areasForImprovement.map((area, index) => (
              <li key={index} className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-600" />
                <span className="text-base text-gray-700">{area}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* ATS Compatibility Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-5">
            <div className="bg-gray-100 p-4 rounded-md border-2 border-gray-200">
              <ShieldHalf className="h-5 w-5 text-blue-600" />
            </div>
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
              .slice(0, isPro ? -1 : 2)
              .map((suggestion, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="flex-1 text-base text-gray-700">
                      {suggestion.description}
                    </p>
                    <BadgeAlert className={getPriorityColor(suggestion.priority)} />
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
        <Button onClick={handleReset} variant="outline" className="flex-1">
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
  );
};

export default AnalysisReslut;
