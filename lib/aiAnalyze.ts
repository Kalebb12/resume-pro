// utils/aiAnalyze.ts
import OpenAI from 'openai';
import { z } from 'zod'; // or use Pydantic equivalent if preferred

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const ResumeAnalysisSchema = z.object({
  overallScore: z.number().min(1).max(100),
  summary: z.string(),
  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  keySuggestions: z.array(z.object({
    description: z.string(),
    priority: z.enum(['high', 'medium', 'low']),
  })),
  atsCompatibility: z.object({
    score: z.number().min(1).max(100),
    missingKeywords: z.array(z.string()).optional(),
    recommendations: z.array(z.string()),
  }),
  tailoredFit: z.object({
    matchScore: z.number().min(1).max(100),
    matchingSkills: z.array(z.string()),
    missingSkills: z.array(z.string()),
    tailoredBulletSuggestions: z.array(z.string()),
  }).optional(),
  rewrittenSummary: z.string().optional(),
});

export async function aiAnalyze(
  resumeText: string,
  jobDescription?: string
): Promise<typeof ResumeAnalysisSchema> {
  const systemPrompt = `You are an expert resume reviewer and career coach. 
Provide honest, professional, actionable feedback. 
Be constructive but direct. 
Score objectively based on clarity, impact, ATS-friendliness, quantifiable achievements, and relevance.
Always respond ONLY with valid JSON matching the exact schema.`;

  const userPrompt = `Resume text:\n${resumeText}\n\n${jobDescription ? `Job description to tailor against:\n${jobDescription}\n\n` : ''
    }Analyze this resume and return structured feedback.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini-2024-07-18', // Cheap + supports structured outputs
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'resume_analysis',
        strict: true,
        schema: ResumeAnalysisSchema.parse({}), // Convert Zod to JSON Schema (use zod-to-json-schema lib)
      },
    },
    temperature: 0.7,
    max_tokens: 1500,
  });

  const content = response.choices[0].message.content;
  if (!content) throw new Error('No analysis generated');

  return JSON.parse(content) as typeof ResumeAnalysisSchema;
}