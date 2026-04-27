'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export default function ListBlogs() {
  const { backEndUrl, token } = useAppContext();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${backEndUrl}/api/blog/admin-blogs`, {
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      if (res.data.success) setBlogs(res.data.blogs);
      else toast.error(res.data.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleBlog = async (id) => {
    try {
      const res = await axios.post(
        `${backEndUrl}/api/blog/toggle-publish`,
        { id },
        { headers: { Authorization: token, "ngrok-skip-browser-warning": "true" } }
      );
      if (res.data.success) { toast.success(res.data.message); fetchBlogs(); }
      else toast.error(res.data.message);
    } catch (err) { toast.error(err.message); }
  };

  const deleteBlog = async (id) => {
    if (!confirm("Delete this blog?")) return;
    try {
      const res = await axios.post(
        `${backEndUrl}/api/blog/delete-blog`,
        { id },
        { headers: { Authorization: token, "ngrok-skip-browser-warning": "true" } }
      );
      if (res.data.success) { toast.success(res.data.message); fetchBlogs(); }
      else toast.error(res.data.message);
    } catch (err) { toast.error(err.message); }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const filtered = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">All Blogs</h1>
            <p className="text-gray-500 text-sm">{blogs.length} total articles</p>
          </div>
          <Link
            href="/admin/add-blog"
            className="flex items-center gap-2 bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all shadow-sm shadow-primary/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Blog
          </Link>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative mb-6"
      >
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or category..."
          className="input-field pl-10 max-w-sm"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden"
      >
        {isLoading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-4 items-center">
                <div className="w-8 h-4 skeleton rounded" />
                <div className="flex-1 h-4 skeleton rounded" />
                <div className="w-20 h-4 skeleton rounded" />
                <div className="w-24 h-4 skeleton rounded" />
                <div className="w-20 h-4 skeleton rounded" />
                <div className="w-32 h-8 skeleton rounded-lg" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="font-medium text-gray-500">No blogs found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-400 uppercase tracking-wide border-b border-gray-100 bg-gray-50/50">
                  <th className="px-6 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((blog, i) => (
                  <motion.tr
                    key={blog._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-gray-400">{i + 1}</td>
                    <td className="px-4 py-4 text-gray-800 font-medium max-w-xs">
                      <span className="line-clamp-1">{blog.title}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-primary/8 text-primary font-medium">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-500 whitespace-nowrap">{formatDate(blog.updatedAt)}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        blog.isPublished ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-600"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${blog.isPublished ? "bg-green-500" : "bg-orange-400"}`} />
                        {blog.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleBlog(blog._id)}
                          className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:border-primary/30 hover:text-primary text-gray-600 transition-all whitespace-nowrap"
                        >
                          {blog.isPublished ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          onClick={() => deleteBlog(blog._id)}
                          className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
