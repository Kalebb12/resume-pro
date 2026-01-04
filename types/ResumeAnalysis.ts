export type ResumeAnalysisType = {
  overallScore: number; // 1-100
  summary: string; // Short 2-4 sentence overview
  strengths: string[]; // 4-8 bullet points
  areasForImprovement: string[]; // 4-8 bullet points
  keySuggestions: {
    description: string;
    priority: 'high' | 'medium' | 'low';
  }[]; // Actionable fixes
  atsCompatibility: {
    score: number; // 1-100
    missingKeywords?: string[];
    recommendations: string[];
  };
  tailoredFit?: { // Only if jobDescription provided
    matchScore: number; // 1-100
    matchingSkills: string[];
    missingSkills: string[];
    tailoredBulletSuggestions: string[]; // Rewritten bullets
  };
  rewrittenSummary?: string; // Optional improved professional summary
}