// POST /api/blog/generate
import { NextResponse } from 'next/server';
import { generateBlogContent } from '@/lib/gemini';

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    if (!prompt) return NextResponse.json({ success: false, message: 'Prompt required' }, { status: 400 });

    const content = await generateBlogContent(prompt);
    return NextResponse.json({ success: true, content });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, err: err.message }, { status: 500 });
  }
}
