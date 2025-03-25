"use client";

import type React from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { AuthGuard } from "@/components/auth-guard";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <AuthGuard>
      <DashboardShell>{children}</DashboardShell>
    </AuthGuard>
  );
}
