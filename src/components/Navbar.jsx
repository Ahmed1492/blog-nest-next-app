'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { assets } from "@/assets/assets";

const Navbar = () => {
  const { token, setToken, mounted } = useAppContext();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => pathname === path;

  const handleLogout = () => {
    setToken("");
    setIsMobileMenuOpen(false);
  };

  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="w-32 h-8 skeleton rounded-lg" />
          <div className="w-24 h-9 skeleton rounded-full" />
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-white border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img
              className="w-28 sm:w-36 cursor-pointer"
              src={assets.logo}
              alt="BlogNest"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {!pathname.includes("admin") &&
              navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(link.path)
                      ? "text-primary bg-primary/8"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              ))}
          </div>

          {/* Auth Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/search"
              className="p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-gray-50 transition-all"
              aria-label="Search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
            {pathname.includes("admin") && token ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium px-5 py-2 rounded-full transition-all duration-200 border border-red-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            ) : (
              <Link
                href="/admin"
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-medium px-5 py-2 rounded-full transition-all duration-200 shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                {token ? "Dashboard" : "Get Started"}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-50 transition-all"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 pb-4 space-y-1">
            {!pathname.includes("admin") &&
              navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(link.path)
                      ? "text-primary bg-primary/8"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

            <div className="pt-2 px-4">
              {pathname.includes("admin") && token ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-center bg-red-50 text-red-600 text-sm font-medium px-5 py-2.5 rounded-full border border-red-200"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-full"
                >
                  {token ? "Dashboard" : "Get Started"}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
