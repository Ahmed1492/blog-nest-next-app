'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { DashboardCardSkeleton, TableSkeleton } from "@/components/Skeleton";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const categoryColors = {
  Technology: "bg-blue-50 text-blue-600",
  Startup:    "bg-orange-50 text-orange-600",
  Lifestyle:  "bg-green-50 text-green-600",
  Finance:    "bg-yellow-50 text-yellow-700",
};

export default function Dashboard() {
  const { backEndUrl, token } = useAppContext();
  const [data, setData]       = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(`${backEndUrl}/api/admin/dashboard-data`, {
        headers: { Authorization: token, "ngrok-skip-browser-warning": "true" },
      });
      if (res.data.success) setData(res.data.dashboardData);
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
        `${backEndUrl}/api/blog/toggle-publish`, { id },
        { headers: { Authorization: token, "ngrok-skip-browser-warning": "true" } }
      );
      if (res.data.success) { toast.success(res.data.message); fetchDashboard(); }
      else toast.error(res.data.message);
    } catch (err) { toast.error(err.message); }
  };

  const deleteBlog = async (id) => {
    try {
      const res = await axios.post(
        `${backEndUrl}/api/blog/delete-blog`, { id },
        { headers: { Authorization: token, "ngrok-skip-browser-warning": "true" } }
      );
      if (res.data.success) { toast.success(res.data.message); fetchDashboard(); }
      else toast.error(res.data.message);
    } catch (err) { toast.error(err.message); }
  };

  useEffect(() => { fetchDashboard(); }, []);

  /* ── stat cards config ── */
  const stats = [
    {
      label: "Total Blogs",
      value: data?.blogs,
      change: "+2 this week",
      gradient: "from-blue-500 to-indigo-500",
      bg: "bg-blue-50",
      text: "text-blue-600",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      label: "Comments",
      value: data?.comments,
      change: "Awaiting review",
      gradient: "from-emerald-500 to-teal-500",
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
    {
      label: "Drafts",
      value: data?.draftBlogs,
      change: "Unpublished",
      gradient: "from-orange-400 to-amber-500",
      bg: "bg-orange-50",
      text: "text-orange-500",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
  ];

  /* ── quick actions ── */
  const actions = [
    {
      label: "Write New Blog",
      href: "/admin/add-blog",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      primary: true,
    },
    {
      label: "Manage Blogs",
      href: "/admin/list-blogs",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
    },
    {
      label: "Review Comments",
      href: "/admin/comments",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="max-w-6xl space-y-8">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>
        <Link
          href="/admin/add-blog"
          className="hidden sm:flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-primary/25 hover:-translate-y-0.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          New Blog
        </Link>
      </motion.div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {isLoading ? (
          <>
            <DashboardCardSkeleton />
            <DashboardCardSkeleton />
            <DashboardCardSkeleton />
          </>
        ) : (
          stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="relative bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden group hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
          >
            {/* top gradient bar */}
            <div className={`h-1 w-full bg-gradient-to-r ${s.gradient}`} />

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl ${s.bg} ${s.text} flex items-center justify-center`}>
                  {s.icon}
                </div>
                {/* sparkline placeholder dots */}
                <div className="flex items-end gap-0.5 h-8">
                  {[3,5,4,6,5,7,6].map((h, j) => (
                    <div
                      key={j}
                      style={{ height: `${h * 4}px` }}
                      className={`w-1 rounded-full bg-gradient-to-t ${s.gradient} opacity-30 group-hover:opacity-60 transition-opacity duration-300`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-3xl font-extrabold text-gray-900">{s.value ?? "—"}</p>
              <p className="text-xs text-gray-400 mt-1">{s.change}</p>
            </div>
          </motion.div>
        ))
        )}
      </div>

      {/* ── Quick Actions ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.28 }}
      >
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {actions.map((a, i) => (
            <Link
              key={i}
              href={a.href}
              className={`flex items-center gap-3 px-5 py-4 rounded-2xl border text-sm font-medium transition-all duration-200 group ${
                a.primary
                  ? "bg-primary border-primary text-white shadow-sm shadow-primary/25 hover:bg-primary/90 hover:-translate-y-0.5"
                  : "bg-white border-gray-100 text-gray-700 shadow-card hover:border-primary/30 hover:text-primary hover:-translate-y-0.5 hover:shadow-card-hover"
              }`}
            >
              <span className={`${a.primary ? "text-white" : "text-gray-400 group-hover:text-primary"} transition-colors`}>
                {a.icon}
              </span>
              {a.label}
              <svg className="w-4 h-4 ml-auto opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* ── Recent Blogs ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.36 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden"
      >
        {/* table header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-gray-900">Recent Blogs</h2>
            <p className="text-xs text-gray-400 mt-0.5">Latest articles you've published or drafted</p>
          </div>
          <Link
            href="/admin/list-blogs"
            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            View all
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {isLoading ? (
          <div className="p-6">
            <TableSkeleton rows={4} columns={6} />
          </div>
        ) : !data?.recentBlogs?.length ? (
          <div className="py-20 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium mb-1">No blogs yet</p>
            <Link href="/admin/add-blog" className="text-sm text-primary hover:underline">
              Write your first article →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/70 text-xs text-gray-400 uppercase tracking-widest">
                  <th className="px-6 py-3 text-left font-medium">#</th>
                  <th className="px-4 py-3 text-left font-medium">Title</th>
                  <th className="px-4 py-3 text-left font-medium">Category</th>
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.recentBlogs.map((blog, i) => (
                  <motion.tr
                    key={blog._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                    className="hover:bg-gray-50/60 transition-colors group"
                  >
                    {/* index */}
                    <td className="px-6 py-4">
                      <span className="w-7 h-7 rounded-lg bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                    </td>

                    {/* title */}
                    <td className="px-4 py-4 max-w-[220px]">
                      <p className="font-semibold text-gray-800 truncate group-hover:text-primary transition-colors">
                        {blog.title}
                      </p>
                    </td>

                    {/* category */}
                    <td className="px-4 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[blog.category] ?? "bg-primary/8 text-primary"}`}>
                        {blog.category}
                      </span>
                    </td>

                    {/* date */}
                    <td className="px-4 py-4 text-gray-400 text-xs whitespace-nowrap">
                      {formatDate(blog.updatedAt)}
                    </td>

                    {/* status */}
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        blog.isPublished
                          ? "bg-green-50 text-green-700"
                          : "bg-orange-50 text-orange-600"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${blog.isPublished ? "bg-green-500" : "bg-orange-400"}`} />
                        {blog.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>

                    {/* actions */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleBlog(blog._id)}
                          className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-all ${
                            blog.isPublished
                              ? "border-orange-200 text-orange-600 hover:bg-orange-50"
                              : "border-green-200 text-green-700 hover:bg-green-50"
                          }`}
                        >
                          {blog.isPublished ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          onClick={() => deleteBlog(blog._id)}
                          className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
