// POST /api/comment/approve-comment
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Comment from '@/models/Comment';
import { getAuthFromRequest } from '@/lib/auth';

export async function POST(request) {
  try {
    if (!getAuthFromRequest(request)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { id } = await request.json();
    const comment = await Comment.findById(id);
    if (!comment) return NextResponse.json({ success: false, message: 'Comment not found' }, { status: 404 });

    comment.isApproved = true;
    await comment.save();

    return NextResponse.json({ success: true, message: 'Comment approved!' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
