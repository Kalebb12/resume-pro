import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
export async function GET() {
  const { has } = await auth()
  const isPro = has({ plan: 'pro' })

  return NextResponse.json({ isPro })
}