'use client';

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

const Hero = () => {
  const { input, setInput } = useAppContext();
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) {
      router.push(`/search?q=${encodeURIComponent(input.trim())}`);
    } else {
      router.push("/search");
    }
  };

  const stats = [
    { value: "10+", label: "Articles" },
    { value: "5", label: "Categories" },
    { value: "100%", label: "Free" },
  ];

  return (
    <section className="bg-hero relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/8 blur-3xl animate-blob" />
        <div className="absolute -bottom-32 -right-32 w-[450px] h-[450px] rounded-full bg-violet-400/8 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-indigo-300/6 blur-3xl animate-blob animation-delay-4000" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235044e5' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-7">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 py-2 px-5 bg-primary/10 border border-primary/20 text-primary font-semibold text-sm rounded-full"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          New: AI feature integrated
          <span className="text-yellow-500">⭐</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.1] tracking-tight text-gray-900"
        >
          Your own{" "}
          <span className="relative inline-block">
            <span className="gradient-text">blogging</span>
            <motion.svg
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 200 12"
              fill="none"
            >
              <path
                d="M2 8 Q50 2 100 8 Q150 14 198 8"
                stroke="url(#underlineGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <defs>
                <linearGradient id="underlineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#5044e5" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </motion.svg>
          </span>
          <br />
          platform.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-500 max-w-2xl text-lg leading-relaxed"
        >
          Discover insightful articles on technology, lifestyle, finance, and
          startups. Write, share, and connect with a community of curious minds.
        </motion.p>

        {/* Search bar */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-xl bg-white rounded-2xl border border-gray-200 shadow-card hover:shadow-card-hover focus-within:border-primary/40 focus-within:shadow-glow transition-all duration-300 flex items-center p-1.5 gap-2"
        >
          <svg className="w-5 h-5 text-gray-400 ml-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400 bg-transparent py-2"
            type="text"
            placeholder="Search blogs by title or category..."
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 active:scale-95 py-2.5 px-6 rounded-xl text-white text-sm font-semibold transition-all duration-200 shadow-sm shadow-primary/30 shrink-0"
          >
            Search
          </button>
        </motion.form>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center gap-2 text-sm text-gray-400"
        >
          {stats.map((stat, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="w-1 h-1 rounded-full bg-gray-300" />}
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-gray-700">{stat.value}</span>
                <span>{stat.label}</span>
              </div>
            </React.Fragment>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex flex-col items-center gap-1 text-gray-300 mt-2"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
