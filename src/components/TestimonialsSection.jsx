'use client';

import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Tech Entrepreneur",
    content: "BlogNest has become my go-to source for staying updated with the latest in tech and business. The quality of content is exceptional!",
    initials: "SJ",
    color: "from-blue-500 to-indigo-500",
    stars: 5,
  },
  {
    name: "Mike Chen",
    role: "Software Developer",
    content: "The programming and technology articles here have helped me advance my career significantly. Highly recommended for any developer!",
    initials: "MC",
    color: "from-primary to-violet-500",
    stars: 5,
  },
  {
    name: "Emily Davis",
    role: "Financial Advisor",
    content: "The financial insights and tips shared on BlogNest are practical and easy to implement. A great resource for anyone managing their finances.",
    initials: "ED",
    color: "from-pink-500 to-rose-500",
    stars: 5,
  },
];

const Stars = ({ count }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="section-divider" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our <span className="gradient-text">Readers</span> Say
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base">
            Join thousands of satisfied readers who trust BlogNest for quality content and insights.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative bg-white rounded-2xl p-7 border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col gap-4"
            >
              {/* Quote icon */}
              <svg className="w-8 h-8 text-primary/15" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                "{t.content}"
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
                <Stars count={t.stars} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
