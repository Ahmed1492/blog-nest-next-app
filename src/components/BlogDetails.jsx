'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlogDetailsSkeleton } from "./Skeleton";

const BlogDetails = ({ blog, isLoading = false }) => {
  if (isLoading) {
    return <BlogDetailsSkeleton />;
  }

  if (!blog) return null;

  const categoryColors = {
    Technology: 'bg-blue-50 text-blue-600 border-blue-100',
    Startup:    'bg-orange-50 text-orange-600 border-orange-100',
    Lifestyle:  'bg-green-50 text-green-600 border-green-100',
    Finance:    'bg-yellow-50 text-yellow-700 border-yellow-100',
  };
  const categoryStyle = categoryColors[blog.category] || 'bg-primary/8 text-primary border-primary/15';

  const readTime = Math.max(1, Math.ceil((blog.description?.replace(/<[^>]*>/g, '').length || 0) / 1000));

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-8 group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all articles
        </Link>

        {/* Category */}
        <span className={`inline-block py-1 px-3 text-xs font-semibold rounded-full border mb-5 ${categoryStyle}`}>
          {blog.category}
        </span>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5 leading-tight tracking-tight">
          {blog.title}
        </h1>

        {/* Subtitle */}
        {blog.subTitle && (
          <p className="text-xl text-gray-500 mb-7 leading-relaxed font-light">
            {blog.subTitle}
          </p>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-10 pb-8 border-b border-gray-100">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {readTime} min read
          </div>
        </div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full aspect-video mb-10 rounded-2xl overflow-hidden shadow-card"
        >
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rich-text"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex items-center gap-3">
          <span className="text-sm font-medium text-gray-500">Tagged in:</span>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${categoryStyle}`}>
            {blog.category}
          </span>
        </div>

        {/* Share */}
        <div className="mt-6 flex items-center gap-3">
          <span className="text-sm font-medium text-gray-500">Share:</span>
          {['Twitter', 'Facebook', 'Copy link'].map((platform) => (
            <button
              key={platform}
              className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-primary hover:text-white text-gray-600 transition-all duration-200"
            >
              {platform}
            </button>
          ))}
        </div>
      </motion.div>
    </article>
  );
};

export default BlogDetails;
