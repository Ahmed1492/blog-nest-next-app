// GET /api/admin/dashboard-data
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';
import Comment from '@/models/Comment';
import { getAuthFromRequest } from '@/lib/auth';

export async function GET(request) {
  try {
    if (!getAuthFromRequest(request)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const [recentBlogs, blogs, comments, draftBlogs] = await Promise.all([
      Blog.find({}).sort({ createdAt: -1 }).limit(5),
      Blog.countDocuments(),
      Comment.countDocuments(),
      Blog.countDocuments({ isPublished: false }),
    ]);

    return NextResponse.json({
      success: true,
      dashboardData: { recentBlogs, blogs, comments, draftBlogs },
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
