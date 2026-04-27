// POST /api/comment/delete/[id]
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Comment from '@/models/Comment';
import { getAuthFromRequest } from '@/lib/auth';

export async function POST(request, { params }) {
  try {
    if (!getAuthFromRequest(request)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const comment = await Comment.findByIdAndDelete(params.id);
    if (!comment) return NextResponse.json({ success: false, message: 'Comment not found' }, { status: 404 });

    return NextResponse.json({ success: true, message: 'Comment deleted successfully' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
