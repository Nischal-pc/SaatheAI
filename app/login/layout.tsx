"use client";

import type React from "react";
import { AuthGuard } from "@/components/auth-guard";

interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return <AuthGuard>{children}</AuthGuard>;
}
