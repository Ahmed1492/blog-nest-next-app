// GET /api/blog  — all published blogs
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, blogs });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
