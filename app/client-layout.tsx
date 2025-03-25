"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { AuthGuard } from "@/components/auth-guard";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Reset any loading states when the path changes
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("isNavigatingBack");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pathname]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <AuthGuard>{children}</AuthGuard>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}
