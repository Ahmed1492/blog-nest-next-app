// GET /api/comment/comments-admin — all comments (auth required)
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Comment from '@/models/Comment';
import { getAuthFromRequest } from '@/lib/auth';

export async function GET(request) {
  try {
    if (!getAuthFromRequest(request)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const comments = await Comment.find({}).populate('blog').sort({ createdAt: -1 });
    return NextResponse.json({ success: true, comments });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
