
import { aiAnalyze } from '@/lib/aiAnalyze';
import { extractTextFromFile } from '@/lib/extractTextFromFile';
import { NextResponse } from 'next/server';

export const runtime = "nodejs";
export async function POST(req: Request) {
  if (!true) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get('resume') as File;
  // Parse file contents...
  const resumeText = await extractTextFromFile(file); // Your parsing logic

  // Call AI
  const analysis = await aiAnalyze(resumeText); // e.g., OpenAI completion

  console.log(analysis)

  return NextResponse.json({ analysis });
}