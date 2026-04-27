'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import toast from 'react-hot-toast';

const BlogComments = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", content: "" });

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/comment?blogId=${blogId}`);
      if (response.data.success) {
        setComments(response.data.comments);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/comment', {
        blog: blogId,
        name: formData.name,
        content: formData.content,
      });

      if (response.data.success) {
        toast.success('Comment submitted for review!');
        setFormData({ name: "", content: "" });
        fetchComments();
      } else {
        toast.error(response.data.message || 'Failed to submit comment');
      }
    } catch (error) {
      toast.error('Failed to submit comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const avatarColors = [
    'from-blue-500 to-indigo-500',
    'from-primary to-violet-500',
    'from-pink-500 to-rose-500',
    'from-green-500 to-teal-500',
    'from-orange-500 to-amber-500',
  ];

  return (
    <section className="mt-16 border-t border-gray-100 pt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          Comments
          {!isLoading && (
            <span className="text-sm font-medium text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full">
              {comments.length}
            </span>
          )}
        </h3>

        {/* Comment Form */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 mb-10 border border-gray-100">
          <h4 className="text-base font-semibold text-gray-900 mb-5 flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Leave a Comment
          </h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Your name"
            />
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={4}
              className="input-field resize-none"
              placeholder="Share your thoughts..."
            />
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white py-2.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm shadow-primary/20"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Comment
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </>
              )}
            </motion.button>
          </form>
        </div>

        {/* Comments List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 p-5 rounded-2xl border border-gray-100">
                <div className="w-10 h-10 rounded-full skeleton shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="w-32 h-4 skeleton rounded" />
                  <div className="w-full h-3 skeleton rounded" />
                  <div className="w-3/4 h-3 skeleton rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="font-medium text-gray-500">No comments yet</p>
            <p className="text-sm mt-1">Be the first to share your thoughts!</p>
          </div>
        ) : (
          <AnimatePresence>
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <motion.div
                  key={comment._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex gap-4 p-5 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 transition-colors duration-200"
                >
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                    {comment.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h5 className="font-semibold text-gray-900 text-sm">{comment.name}</h5>
                      <span className="text-xs text-gray-400 shrink-0">
                        {new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{comment.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </motion.div>
    </section>
  );
};

export default BlogComments;
