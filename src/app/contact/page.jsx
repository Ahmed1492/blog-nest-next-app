'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import toast from 'react-hot-toast';

const contactInfo = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: "bg-blue-50 text-blue-600",
    title: "Email",
    content: "hello@blognest.com",
    description: "Send us an email anytime",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    color: "bg-green-50 text-green-600",
    title: "Live Chat",
    content: "Available 24/7",
    description: "Chat with our support team",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
      </svg>
    ),
    color: "bg-purple-50 text-purple-600",
    title: "Social Media",
    content: "@blognest",
    description: "Follow us on social platforms",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

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
              Get in Touch
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
              Contact <span className="gradient-text">Us</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Have questions, suggestions, or just want to say hello? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 text-center"
              >
                <div className={`w-14 h-14 rounded-2xl ${info.color} flex items-center justify-center mx-auto mb-5`}>
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{info.title}</h3>
                <p className="text-primary font-semibold text-sm mb-1">{info.content}</p>
                <p className="text-gray-400 text-sm">{info.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-card p-8 md:p-10"
            >
              <div className="text-center mb-8">
                <div className="section-divider" />
                <h2 className="text-3xl font-bold text-gray-900">Send us a Message</h2>
                <p className="text-gray-500 text-sm mt-2">We'll get back to you within 24 hours</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="input-field resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white py-3.5 px-6 rounded-xl font-semibold transition-all duration-200 shadow-sm shadow-primary/20"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
