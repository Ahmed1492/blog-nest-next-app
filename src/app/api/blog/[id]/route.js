// GET /api/blog/[id]
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const blog = await Blog.findById(params.id);
    if (!blog) return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });
    return NextResponse.json({ success: true, blog });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
