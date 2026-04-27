'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";

const BlogCard = ({ blog }) => {
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const getPlainText = (html) => {
    if (!html) return blog.subTitle || '';
    return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ');
  };

  const categoryColors = {
    Technology: 'bg-blue-50 text-blue-600 border-blue-100',
    Startup:    'bg-orange-50 text-orange-600 border-orange-100',
    Lifestyle:  'bg-green-50 text-green-600 border-green-100',
    Finance:    'bg-yellow-50 text-yellow-700 border-yellow-100',
  };
  const categoryStyle = categoryColors[blog.category] || 'bg-primary/8 text-primary border-primary/15';

  return (
    <Link
      href={`/blog/${blog._id}`}
      className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300"
    >
      {/* Image */}
      <div className="overflow-hidden aspect-video relative bg-gray-100">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category overlay */}
        <div className="absolute top-3 left-3">
          <span className={`py-1 px-2.5 text-xs font-semibold rounded-full border backdrop-blur-sm bg-white/80 ${categoryStyle}`}>
            {blog.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2.5 p-4 flex-1">
        {/* Title */}
        <h3 className="font-semibold text-gray-800 text-sm leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 flex-1">
          {truncateText(getPlainText(blog.description), 100)}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-50 mt-auto">
          <span className="text-xs text-gray-400">
            {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="text-xs font-medium text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-200">
            Read
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
