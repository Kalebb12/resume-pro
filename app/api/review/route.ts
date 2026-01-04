// app/api/analyze/route.ts
import { aiAnalyze } from '@/lib/aiAnalyze';
import { extractTextFromFile } from '@/lib/extractTextFromFile';
import { useUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
// Import your AI lib, e.g., import { OpenAI } from 'openai';

export async function POST(req: Request) {
  const { user } = useUser();
  const userId = user?.id;
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get('resume') as File;
  // Parse file contents...
  const resumeText = await extractTextFromFile(file); // Your parsing logic

  // Call AI
  const analysis = await aiAnalyze(resumeText); // e.g., OpenAI completion

  console.log(analysis)

  return NextResponse.json({ analysis });
}