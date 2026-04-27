// POST /api/blog/toggle-publish
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';
import { getAuthFromRequest } from '@/lib/auth';

export async function POST(request) {
  try {
    if (!getAuthFromRequest(request)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { id } = await request.json();
    const blog = await Blog.findById(id);
    if (!blog) return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });

    blog.isPublished = !blog.isPublished;
    await blog.save();

    return NextResponse.json({
      success: true,
      message: `Blog ${blog.isPublished ? 'published' : 'unpublished'}`,
      isPublished: blog.isPublished,
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
