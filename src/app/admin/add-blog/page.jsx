'use client';

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { parse } from "marked";
import { useAppContext } from "@/context/AppContext";

const categories = ["Technology", "Startup", "Lifestyle", "Finance"];

export default function AddBlog() {
  const { backEndUrl, token } = useAppContext();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Technology");
  const [isPublished, setIsPublished] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !quillRef.current && editorRef.current) {
      import("quill").then(({ default: Quill }) => {
        // Only initialize once
        if (!editorRef.current.classList.contains('ql-container')) {
          quillRef.current = new Quill(editorRef.current, { 
            theme: "snow",
            modules: {
              toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['blockquote', 'code-block'],
                ['link'],
                ['clean']
              ]
            }
          });
        }
      });
    }
  }, []);

  const generateContent = async () => {
    if (!title) return toast.error("Enter a title first");
    setIsGenerating(true);
    try {
      const res = await axios.post(
        `${backEndUrl}/api/blog/generate`,
        { prompt: title },
        { headers: { "ngrok-skip-browser-warning": "true" } }
      );
      if (res.data.success) {
        quillRef.current.root.innerHTML = parse(res.data.content);
        toast.success("Content generated!");
      } else {
        // Parse error message if it's JSON
        let errorMessage = "Generation failed";
        try {
          const errorData = JSON.parse(res.data.err);
          if (errorData.error?.code === 503 || errorData.error?.status === "UNAVAILABLE") {
            errorMessage = "AI service is experiencing high demand. Please try again in a few moments.";
          } else if (errorData.error?.message) {
            errorMessage = errorData.error.message;
          }
        } catch {
          errorMessage = res.data.err || res.data.message || "Generation failed";
        }
        toast.error(errorMessage, { duration: 5000 });
      }
    } catch (err) {
      // Handle network or other errors
      let errorMessage = "Failed to generate content";
      if (err.response?.data?.err) {
        try {
          const errorData = JSON.parse(err.response.data.err);
          if (errorData.error?.code === 503 || errorData.error?.status === "UNAVAILABLE") {
            errorMessage = "AI service is experiencing high demand. Please try again in a few moments.";
          } else if (errorData.error?.message) {
            errorMessage = errorData.error.message;
          }
        } catch {
          errorMessage = err.response.data.err || err.message;
        }
      } else {
        errorMessage = err.message;
      }
      toast.error(errorMessage, { duration: 5000 });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return toast.error("Please upload a thumbnail");
    setIsAdding(true);
    try {
      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
      };
      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);

      const res = await axios.post(`${backEndUrl}/api/blog/create-blog`, formData, {
        headers: { Authorization: token, "ngrok-skip-browser-warning": "true" },
      });

      if (res.data.success) {
        const successMessage = isPublished 
          ? "Blog published successfully! 🎉" 
          : "Blog saved as draft. Publish it to make it visible.";
        toast.success(successMessage, { duration: 4000 });
        
        // Reset form
        setTitle(""); 
        setSubTitle(""); 
        setImage(null); 
        setCategory("Technology"); 
        setIsPublished(false);
        quillRef.current.root.innerHTML = "";
        
        // Redirect to list after a short delay
        setTimeout(() => {
          window.location.href = "/admin/list-blogs";
        }, 1500);
      } else {
        toast.error(res.data.err || res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Add New Blog</h1>
        <p className="text-gray-500 text-sm mb-8">Create and publish a new article</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 md:p-8 space-y-6"
      >
        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail Image</label>
          <label
            htmlFor="upload-image"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-primary/40 hover:bg-primary/2 transition-all duration-200 overflow-hidden"
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">Click to upload thumbnail</span>
                <span className="text-xs text-gray-300">PNG, JPG, WEBP up to 5MB</span>
              </div>
            )}
          </label>
          <input
            id="upload-image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Blog Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            placeholder="Enter a compelling title..."
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Subtitle</label>
          <input
            type="text"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            className="input-field"
            placeholder="A short description..."
          />
        </div>

        {/* Editor */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <button
              type="button"
              onClick={generateContent}
              disabled={isGenerating}
              className="flex items-center gap-1.5 text-xs font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-60 px-4 py-2 rounded-lg transition-all shadow-sm"
            >
              {isGenerating ? (
                <>
                  <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate with AI
                </>
              )}
            </button>
          </div>
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white quill-wrapper">
            <div ref={editorRef} className="min-h-[320px]" />
          </div>
        </div>

        {/* Category + Publish row */}
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex-1 min-w-[160px]">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 pt-5">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </label>
            <div>
              <span className="text-sm font-medium text-gray-700">Publish immediately</span>
              <p className="text-xs text-gray-400 mt-0.5">
                {isPublished ? "Blog will be visible to everyone" : "Save as draft (not visible publicly)"}
              </p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={isAdding}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white py-3 px-8 rounded-xl font-semibold text-sm transition-all shadow-sm shadow-primary/20"
        >
          {isAdding ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Publishing...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {isPublished ? "Publish Blog" : "Save as Draft"}
            </>
          )}
        </motion.button>
      </motion.form>
    </div>
  );
}
