import { GoogleGenAI } from "@google/genai/web";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const max_char = 12000

export async function aiAnalyze(
  resumeText: string,
  jobDescription?: string
) {
  const result = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Resume:
      ${resumeText.slice(0, max_char)}
      ${jobDescription ? `Job Description:\n${jobDescription}` : ""}`,
    config: {
      systemInstruction: `You are an expert resume reviewer and career coach.
        Analyze the resume content and return ONLY valid JSON using this exact structure:

        {
          "overallScore": number (1-100),
          "summary": string,
          "strengths": string[],
          "areasForImprovement": string[],
          "keySuggestions": {
            "description": string,
            "priority": "high" | "medium" | "low"
          }[],
          "atsCompatibility": {
            "score": number (1-100),
            "recommendations": string[]
          }
        }

        Be direct, ATS-aware, and actionable.`
    }
  });

  const text = result.text;

  // Clean markdown fences if Gemini adds them
  const clean = text?.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(clean!);
  } catch {
    throw new Error("AI returned invalid JSON");
  }
}
