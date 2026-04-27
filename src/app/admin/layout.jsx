'use client';

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }) {
  const { token, mounted } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();

  // Only protect sub-routes (not the login page itself)
  const isLoginPage = pathname === "/admin";

  useEffect(() => {
    if (mounted && !token && !isLoginPage) {
      router.replace("/admin");
    }
  }, [mounted, token, isLoginPage]);

  if (!mounted) return null;

  // Login page — no sidebar
  if (isLoginPage) return <>{children}</>;

  // Protected pages — show sidebar
  if (!token) return null;

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
