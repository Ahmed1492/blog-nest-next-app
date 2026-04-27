'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const AppContext = createContext();

export const AppProvider = ({ children, initialBlogs = [] }) => {
  const [token, setToken] = useState("");
  const [blogs, setBlogs] = useState(initialBlogs);
  const [input, setInput] = useState("");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const backEndUrl = "";

  useEffect(() => {
    setMounted(true);
    const savedToken = localStorage.getItem("blog-nest-token");
    if (savedToken) setToken(savedToken);
    // Only fetch if not pre-seeded by server
    if (initialBlogs.length === 0) fetchBlogs();
  }, []);

  // Update localStorage when token changes (only if mounted)
  useEffect(() => {
    if (mounted) {
      if (token) {
        localStorage.setItem("blog-nest-token", token);
      } else {
        localStorage.removeItem("blog-nest-token");
      }
    }
  }, [token, mounted]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${backEndUrl}/api/blog/`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });

      if (response.data.success) {
        setBlogs(response.data.blogs);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    backEndUrl,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
    fetchBlogs,
    mounted,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};