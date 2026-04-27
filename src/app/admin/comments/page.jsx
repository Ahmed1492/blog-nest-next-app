'use client';

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppContext } from "@/context/AppContext";
import { CommentSkeleton } from "@/components/Skeleton";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const avatarColors = [
  "from-blue-500 to-indigo-500",
  "from-primary to-violet-500",
  "from-pink-500 to-rose-500",
  "from-green-500 to-teal-500",
  "from-orange-500 to-amber-500",
];

export default function Comments() {
  const { backEndUrl, token } = useAppContext();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("Not Approved");

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${backEndUrl}/api/comment/comments-admin`, {
        headers: { Authorization: token, "ngrok-skip-browser-warning": "true" },
      });
      if (res.data.success) setComments(res.data.comments);
      else toast.error(res.data.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const approveComment = async (id) => {
    try {
      const res = await axios.post(
        `${backEndUrl}/api/comment/approve-comment`,
        { id },
        { headers: { Authorization: token, "ngrok-skip-browser-warning": "true" } }
      );
      if (res.data.success) { toast.success(res.data.message); fetchComments(); }
      else toast.error(res.data.message);
    } catch (err) { toast.error(err.message); }
  };

  const deleteComment = async (id) => {
    try {
      const res = await axios.post(
        `${backEndUrl}/api/comment/delete/${id}`,
        {},
        { headers: { Authorization: token, "ngrok-skip-browser-warning": "true" } }
      );
      if (res.data.success) { toast.success(res.data.message); fetchComments(); }
      else toast.error(res.data.message);
    } catch (err) { toast.error(err.message); }
  };

  useEffect(() => { fetchComments(); }, []);

  const filtered = comments.filter((c) => {
    if (filter === "Approved") return c.isApproved;
    if (filter === "Not Approved") return !c.isApproved;
    return true;
  });

  const counts = {
    All: comments.length,
    Approved: comments.filter((c) => c.isApproved).length,
    "Not Approved": comments.filter((c) => !c.isApproved).length,
  };

  return (
    <div className="max-w-4xl">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Comments</h1>
        <p className="text-gray-500 text-sm mb-8">Moderate and manage reader comments</p>
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex gap-2 mb-6"
      >
        {["Not Approved", "Approved", "All"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              filter === f
                ? "bg-primary text-white shadow-sm shadow-primary/20"
                : "bg-white border border-gray-200 text-gray-600 hover:border-primary/30 hover:text-primary"
            }`}
          >
            {f}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              filter === f ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
            }`}>
              {counts[f]}
            </span>
          </button>
        ))}
      </motion.div>

      {/* Comments list */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="space-y-3"
      >
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <CommentSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="font-medium text-gray-500">No comments in this category</p>
          </div>
        ) : (
          <AnimatePresence>
            {filtered.map((comment, i) => (
              <motion.div
                key={comment._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 hover:border-gray-200 transition-colors"
              >
                <div className="flex gap-4">
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                    {comment.name?.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900 text-sm">{comment.name}</span>
                          {comment.isApproved ? (
                            <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                              Approved
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                              Pending
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">{formatDate(comment.createdAt)}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        {!comment.isApproved && (
                          <button
                            onClick={() => approveComment(comment._id)}
                            className="flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-all"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => deleteComment(comment._id)}
                          className="flex items-center gap-1.5 text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-all"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Blog reference */}
                    {comment.blog?.title && (
                      <p className="text-xs text-gray-400 mb-2">
                        On: <span className="text-gray-600 font-medium">{comment.blog.title}</span>
                      </p>
                    )}

                    {/* Comment text */}
                    <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 rounded-xl px-4 py-3">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  );
}
