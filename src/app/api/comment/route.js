// GET /api/comment?blogId=xxx  — approved comments for a blog
// POST /api/comment            — add a comment (pending approval)
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Comment from '@/models/Comment';
import Blog from '@/models/Blog';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const blogId = searchParams.get('blogId');

    const query = { isApproved: true };
    if (blogId) query.blog = blogId;

    const comments = await Comment.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, comments });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const { blog, name, content } = await request.json();

    if (!blog || !name || !content) {
      return NextResponse.json({ success: false, message: 'All fields required' }, { status: 400 });
    }

    const blogExists = await Blog.findById(blog);
    if (!blogExists) return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });

    const comment = await Comment.create({ blog, name, content });
    return NextResponse.json({ success: true, message: 'Comment added for review', comment });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
