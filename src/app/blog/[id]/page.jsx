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
    
    // Validate MongoDB ObjectId format
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      console.log('Invalid ObjectId format:', id);
      return null;
    }
    
    // Find blog and check if it's published (for public access)
    const blog = await Blog.findOne({ _id: id, isPublished: true }).lean();
    if (!blog) {
      console.log('Blog not found or not published for id:', id);
      return null;
    }
    
    // Convert ObjectId / Date to plain strings for serialization
    return JSON.parse(JSON.stringify(blog));
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const blog = await getBlog(id);
  if (!blog) return { title: 'Blog Not Found' };
  return {
    title: `${blog.title} — BlogNest`,
    description: blog.subTitle || '',
  };
}

export default async function BlogPage({ params }) {
  const { id } = await params;
  const blog = await getBlog(id);

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
            <p className="text-gray-500 mb-2">This article doesn't exist, has been removed, or is not published yet.</p>
            <p className="text-xs text-gray-400 mb-6">If you're the admin, make sure the blog is published.</p>
            <Link href="/" className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors text-sm font-medium inline-block">
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
        <BlogComments blogId={id} />
      </div>
      <Footer />
    </div>
  );
}
