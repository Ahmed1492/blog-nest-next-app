'use client';

import React, { useState } from "react";
import BlogCard from "./BlogCard";
import { motion, AnimatePresence } from "framer-motion";
import { BlogListSkeleton } from "./Skeleton";
import { useAppContext } from "@/context/AppContext";

const BlogList = ({ initialBlogs = [] }) => {
  const filters = ["All", "Technology", "Startup", "Lifestyle", "Finance"];
  const [currentFilter, setCurrentFilter] = useState("All");
  const { blogs: contextBlogs, input, isLoadingBlogs } = useAppContext();

  // Use server-provided blogs first, fall back to context (client fetch)
  const blogs = contextBlogs.length > 0 ? contextBlogs : initialBlogs;
  
  // Show loading only when actively fetching from client
  const isLoading = isLoadingBlogs && blogs.length === 0;
  
  // Show empty state when not loading and no blogs exist
  const hasNoBlogs = !isLoading && blogs.length === 0;

  const filterBlogs = () => {
    let filtered = blogs;

    if (input !== "") {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(input.toLowerCase()) ||
          blog.category.toLowerCase().includes(input.toLowerCase())
      );
    }

    if (currentFilter !== "All") {
      filtered = filtered.filter((blog) => blog.category === currentFilter);
    }

    return filtered;
  };

  const filtered = filterBlogs();

  // Show skeleton only during initial load
  if (isLoading) {
    return (
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="section-divider" />
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Latest <span className="gradient-text">Articles</span>
            </h2>
            <p className="text-gray-500 text-base max-w-2xl mx-auto">
              Loading amazing content for you...
            </p>
          </motion.div>
          <BlogListSkeleton />
        </div>
      </section>
    );
  }

  // Show empty state if no blogs exist at all
  if (hasNoBlogs) {
    return (
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="section-divider" />
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Latest <span className="gradient-text">Articles</span>
            </h2>
            <p className="text-gray-500 text-base max-w-2xl mx-auto">
              Explore our most recent posts across all categories
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-lg font-medium text-gray-700 mb-1">No blogs published yet</p>
            <p className="text-sm text-gray-400">Check back soon for new content!</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="section-divider" />
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Latest <span className="gradient-text">Articles</span>
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto">
            Explore our most recent posts across all categories
          </p>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center justify-center gap-2 flex-wrap mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setCurrentFilter(filter)}
              className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                currentFilter === filter
                  ? "text-white bg-primary shadow-sm shadow-primary/30"
                  : "text-gray-600 bg-white border border-gray-200 hover:border-primary/30 hover:text-primary"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Blog grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-lg font-medium text-gray-700 mb-1">No blogs found</p>
              <p className="text-sm text-gray-400">Try a different search or category</p>
            </motion.div>
          ) : (
            <motion.div
              key={currentFilter + input}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <BlogCard blog={blog} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BlogList;
