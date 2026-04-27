'use client';

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";

const categories = ["All", "Technology", "Startup", "Lifestyle", "Finance"];

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" /></div>}>
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { blogs } = useAppContext();

  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [inputValue, setInputValue] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const inputRef = useRef(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Sync URL param → state
  useEffect(() => {
    const q = searchParams.get("q") || "";
    setQuery(q);
    setInputValue(q);
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(inputValue);
    const params = new URLSearchParams();
    if (inputValue) params.set("q", inputValue);
    router.replace(`/search?${params.toString()}`, { scroll: false });
  };

  const getResults = () => {
    let results = [...blogs];

    if (query.trim()) {
      const q = query.toLowerCase();
      results = results.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          b.subTitle?.toLowerCase().includes(q) ||
          b.description?.replace(/<[^>]*>/g, "").toLowerCase().includes(q)
      );
    }

    if (activeCategory !== "All") {
      results = results.filter((b) => b.category === activeCategory);
    }

    if (sortBy === "newest") {
      results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "oldest") {
      results.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === "az") {
      results.sort((a, b) => a.title.localeCompare(b.title));
    }

    return results;
  };

  const results = getResults();
  const hasQuery = query.trim().length > 0;

  // Highlight matching text
  const highlight = (text, q) => {
    if (!q || !text) return text;
    const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    return text.replace(regex, '<mark class="bg-yellow-100 text-yellow-800 rounded px-0.5">$1</mark>');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Search Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-white to-violet-50 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
              {hasQuery ? (
                <>
                  Results for{" "}
                  <span className="gradient-text">"{query}"</span>
                </>
              ) : (
                <>
                  Search <span className="gradient-text">Articles</span>
                </>
              )}
            </h1>
            <p className="text-gray-500 mb-8">
              {hasQuery
                ? `${results.length} article${results.length !== 1 ? "s" : ""} found`
                : "Discover articles across all categories"}
            </p>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex items-center bg-white rounded-2xl border border-gray-200 shadow-card hover:shadow-card-hover focus-within:border-primary/40 focus-within:shadow-glow transition-all duration-300 p-1.5 gap-2">
              <svg className="w-5 h-5 text-gray-400 ml-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search by title, category, or keyword..."
                className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400 bg-transparent py-2"
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={() => { setInputValue(""); setQuery(""); router.replace("/search"); }}
                  className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 active:scale-95 py-2.5 px-6 rounded-xl text-white text-sm font-semibold transition-all duration-200 shadow-sm shadow-primary/30 shrink-0"
              >
                Search
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-sm shadow-primary/20"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-gray-200 rounded-xl px-3 py-1.5 outline-none focus:border-primary/40 text-gray-600 bg-white"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="az">A → Z</option>
          </select>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {results.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No results found</h3>
                <p className="text-gray-400 mb-6">
                  {hasQuery
                    ? `No articles match "${query}". Try different keywords.`
                    : "No articles in this category yet."}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["Technology", "Startup", "Finance", "Lifestyle"].map((s) => (
                    <button
                      key={s}
                      onClick={() => { setInputValue(s); setQuery(s); setActiveCategory("All"); }}
                      className="px-4 py-2 text-sm bg-primary/8 text-primary rounded-full hover:bg-primary/15 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={query + activeCategory + sortBy}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {results.map((blog, i) => (
                  <motion.div
                    key={blog._id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                  >
                    <BlogCard blog={blog} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
}
