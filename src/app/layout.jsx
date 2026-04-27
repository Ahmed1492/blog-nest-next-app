import './globals.css'
import { Toaster } from 'react-hot-toast'
import { AppProvider } from '@/context/AppContext'
import Navbar from '@/components/Navbar'
import { connectDB } from '@/lib/db'
import Blog from '@/models/Blog'

export const metadata = {
  title: 'BlogNest - Your Blogging Platform',
  description: 'Discover insightful articles on technology, lifestyle, finance, and startups.',
  authors: [{ name: 'Ahmed Mohamed' }],
  creator: 'Ahmed Mohamed',
  publisher: 'Ahmed Mohamed',
  keywords: ['blog', 'technology', 'lifestyle', 'finance', 'startups', 'articles', 'blogging platform'],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://blognest.vercel.app',
    title: 'BlogNest - Your Blogging Platform',
    description: 'Discover insightful articles on technology, lifestyle, finance, and startups.',
    siteName: 'BlogNest',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlogNest - Your Blogging Platform',
    description: 'Discover insightful articles on technology, lifestyle, finance, and startups.',
    creator: '@ahmedmohamed',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

async function getInitialBlogs() {
  try {
    await connectDB();
    const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(blogs));
  } catch {
    return [];
  }
}

export default async function RootLayout({ children }) {
  const initialBlogs = await getInitialBlogs();

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AppProvider initialBlogs={initialBlogs}>
          <Toaster />
          <Navbar />
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
