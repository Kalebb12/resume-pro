
import { aiAnalyze } from '@/lib/aiAnalyze';
import { extractTextFromFile } from '@/lib/extractTextFromFile';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  const user = await currentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const formData = await req.formData();
  const file = formData.get('resume') as File;
  // Parse file contents...
  const resumeText = await extractTextFromFile(file); // Your parsing logic

  // Call AI
  try {
    const analysis = await aiAnalyze(resumeText); // e.g., OpenAI completion
    return NextResponse.json({ analysis });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to analyze resume' }, { status: 500 });
  }
}