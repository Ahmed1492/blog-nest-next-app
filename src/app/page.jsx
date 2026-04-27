// Server Component — pre-fetches blogs for instant render
import Hero from '@/components/Hero';
import BlogList from '@/components/BlogList';
import NewsLetter from '@/components/NewsLetter';
import Footer from '@/components/Footer';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';

async function getBlogs() {
  try {
    await connectDB();
    const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(blogs));
  } catch {
    return [];
  }
}

export default async function Home() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <FeaturesSection />
      <BlogList initialBlogs={blogs} />
      <TestimonialsSection />
      <NewsLetter />
      <Footer />
    </div>
  );
}
