'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success("You're subscribed! 🎉");
    setEmail("");
  };

  return (
    <section className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative max-w-4xl mx-auto overflow-hidden rounded-3xl"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-indigo-600 to-violet-600" />

        {/* Decorative shapes */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/5 blur-3xl" />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 px-8 py-16 text-center">
          {/* Icon */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
          >
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </motion.div>

          <h2 className="text-white text-3xl md:text-4xl font-bold mb-3">
            Never Miss a Blog!
          </h2>
          <p className="text-white/70 mb-8 text-base max-w-lg mx-auto">
            Subscribe to get the latest articles, tech insights, and exclusive news delivered straight to your inbox.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 w-full h-12 px-5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25 text-white placeholder:text-white/50 outline-none focus:bg-white/20 focus:border-white/50 transition-all duration-200 text-sm"
            />
            <button
              type="submit"
              className="h-12 px-7 bg-white text-primary font-semibold text-sm rounded-xl hover:bg-white/90 active:scale-95 transition-all duration-200 whitespace-nowrap shadow-lg"
            >
              Subscribe
            </button>
          </form>

          <p className="text-white/40 text-xs mt-4">
            No spam, ever. Unsubscribe at any time.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default NewsLetter;
