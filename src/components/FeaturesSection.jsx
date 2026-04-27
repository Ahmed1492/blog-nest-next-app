'use client';

import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
      </svg>
    ),
    color: "bg-blue-50 text-blue-600",
    title: "Latest Tech Trends",
    description: "Stay ahead with cutting-edge technology insights, tutorials, and innovations from industry experts.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "bg-orange-50 text-orange-500",
    title: "Startup Stories",
    description: "Learn from successful entrepreneurs, their journeys, failures, and the lessons that shaped them.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "bg-green-50 text-green-600",
    title: "Financial Wisdom",
    description: "Master your finances with expert advice, investment strategies, and practical money management tips.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    color: "bg-pink-50 text-pink-500",
    title: "Lifestyle Tips",
    description: "Enhance your daily life with practical guidance on wellness, productivity, and personal growth.",
  },
];

const FeaturesSection = () => {
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
            Why Choose <span className="gradient-text">BlogNest</span>?
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base">
            Discover what makes our platform the perfect destination for curious minds seeking quality content.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-violet-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              <div className={`relative w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                {feature.icon}
              </div>
              <h3 className="relative text-base font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="relative text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
