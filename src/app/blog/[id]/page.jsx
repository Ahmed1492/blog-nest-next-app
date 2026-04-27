// Server Component — fetches blog data at request time (no client JS needed)
import BlogDetails from '@/components/BlogDetails';
import BlogComments from '@/components/BlogComments';
import Footer from '@/components/Footer';
import { BlogDetailSkeleton } from '@/components/Loader';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';
import Link from 'next/link';

async function getBlog(id) {
  try {
    await connectDB();
    const blog = await Blog.findById(id).lean();
    if (!blog) return null;
    // Convert ObjectId / Date to plain strings for serialization
    return JSON.parse(JSON.stringify(blog));
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const blog = await getBlog(params.id);
  if (!blog) return { title: 'Blog Not Found' };
  return {
    title: `${blog.title} — BlogNest`,
    description: blog.subTitle || '',
  };
}

export default async function BlogPage({ params }) {
  const blog = await getBlog(params.id);

  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Blog Not Found</h2>
            <p className="text-gray-500 mb-6">This article doesn't exist or has been removed.</p>
            <Link href="/" className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors text-sm font-medium">
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <BlogDetails blog={blog} />
      <div className="max-w-3xl mx-auto px-4 pb-12">
        <BlogComments blogId={params.id} />
      </div>
      <Footer />
    </div>
  );
}
