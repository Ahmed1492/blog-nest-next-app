'use client';

import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: "bg-blue-50 text-blue-600",
    title: "Quality Content",
    description: "Curated articles on technology, lifestyle, finance, and startups from expert writers.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "bg-orange-50 text-orange-500",
    title: "Latest Trends",
    description: "Stay updated with the newest developments in tech and the business world.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: "bg-yellow-50 text-yellow-600",
    title: "Insights & Tips",
    description: "Practical advice and actionable insights to help you grow personally and professionally.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: "bg-green-50 text-green-600",
    title: "Community",
    description: "Join a community of curious minds sharing knowledge and experiences.",
  },
];

const stats = [
  { number: "10+", label: "Articles Published", icon: "📝" },
  { number: "5", label: "Categories", icon: "🗂️" },
  { number: "100%", label: "Free Content", icon: "🎁" },
  { number: "24/7", label: "Available", icon: "⚡" },
];

const team = [
  { name: "Ahmed Mohamed", role: "Founder & Lead Writer", initials: "AM", color: "from-primary to-violet-500" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-br from-primary/5 via-white to-violet-50">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-violet-400/5 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 py-1.5 px-4 bg-primary/10 border border-primary/20 text-primary font-semibold text-sm rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Our Story
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
              About <span className="gradient-text">BlogNest</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Your go-to platform for discovering insightful articles, staying updated with the latest trends,
              and connecting with a community of curious minds.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="section-divider mb-6" style={{ margin: '0 0 1.5rem' }} />
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-5">
                At BlogNest, we believe in the power of knowledge sharing. Our mission is to create
                a platform where writers can share their expertise and readers can discover valuable
                insights across various domains.
              </p>
              <p className="text-gray-500 text-lg leading-relaxed">
                Whether you're looking to stay updated with the latest technology trends, improve your
                lifestyle, understand financial concepts, or learn about startups — we've got you covered.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative bg-gradient-to-br from-primary to-violet-600 rounded-3xl p-8 text-white overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10" />
                <h3 className="text-2xl font-bold mb-6 relative z-10">Why Choose BlogNest?</h3>
                <ul className="space-y-4 relative z-10">
                  {[
                    "Expert-curated content",
                    "Multiple categories",
                    "Regular updates",
                    "Free access forever",
                    "Community-driven",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-card"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-extrabold gradient-text mb-1">{stat.number}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="section-divider" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Discover the features that make BlogNest your ideal destination for quality content.
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
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 text-center"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mx-auto mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="section-divider" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet the Team</h2>
          </motion.div>
          <div className="flex justify-center">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-card text-center max-w-xs"
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4`}>
                  {member.initials}
                </div>
                <h4 className="font-bold text-gray-900 text-lg">{member.name}</h4>
                <p className="text-gray-500 text-sm mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
