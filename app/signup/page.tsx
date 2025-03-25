"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  PhoneCall,
  Sparkles,
  Eye,
  EyeOff,
  ArrowRight,
  Github,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { getSupabaseClient } from "@/lib/supabase";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { signup } = useAuth();
  const supabase = getSupabaseClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (!agreeTerms) {
      toast({
        title: "Error",
        description: "You must agree to the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await signup(name, email, password);
    } catch (error) {
      // Error is already handled in the signup function
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignup = async (provider: "github" | "twitter") => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || `Failed to sign up with ${provider}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background with gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 -z-10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-purple-200 dark:bg-purple-900/20 blur-3xl opacity-30" />
          <div className="absolute top-40 -left-40 w-80 h-80 rounded-full bg-cyan-200 dark:bg-cyan-900/20 blur-3xl opacity-30" />
          <div className="absolute bottom-40 right-20 w-60 h-60 rounded-full bg-amber-200 dark:bg-amber-900/20 blur-3xl opacity-20" />
        </div>
      </div>

      {/* Header */}
      <header className="w-full py-6 px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="relative">
            <PhoneCall className="h-6 w-6 text-primary" />
            <Sparkles className="absolute -right-2 -top-2 h-4 w-4 text-amber-400" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600">
            EchoLink
          </span>
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700"
          >
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">Create an account</h1>
              <p className="text-muted-foreground mt-1">Sign up for EchoLink</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-slate-50 dark:bg-slate-900"
                  autoComplete="name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-50 dark:bg-slate-900"
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-slate-50 dark:bg-slate-900 pr-10"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-slate-50 dark:bg-slate-900"
                  autoComplete="new-password"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) =>
                    setAgreeTerms(checked as boolean)
                  }
                  required
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    terms and conditions
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full"
                variant="gradient"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-slate-800 px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleOAuthSignup("github")}
                >
                  <Github className="mr-2 h-4 w-4" />
                  Github
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleOAuthSignup("twitter")}
                >
                  <Twitter className="mr-2 h-4 w-4" />
                  Twitter
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
