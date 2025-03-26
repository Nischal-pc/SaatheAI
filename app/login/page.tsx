"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  PhoneCall,
  Sparkles,
  Eye,
  EyeOff,
  ArrowRight,
  Github,
  Twitter,
  Facebook,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { getSupabaseClient } from "@/lib/supabase";
import { SparklesCore } from "@/components/ui/sparkles";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { login } = useAuth();
  const supabase = getSupabaseClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (
    provider: "google" | "github" | "facebook"
  ) => {
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
        description: error.message || `Failed to sign in with ${provider}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background with gradient and sparkles */}
      <div className="fixed inset-0 bg-gradient-to-r from-slate-950 to-slate-900 -z-10">
        <SparklesCore
          id="bgSparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={70}
          className="w-full h-full"
          particleColor="#8B5CF6"
          speed={0.5}
        />
      </div>

      {/* Additional sparkle layer */}
      <div className="fixed inset-0 pointer-events-none -z-5">
        <SparklesCore
          id="extraSparkles"
          background="transparent"
          minSize={0.8}
          maxSize={2.0}
          particleDensity={30}
          className="w-full h-full"
          particleColor="#FFFFFF"
          speed={0.4}
        />
      </div>

      {/* Header */}
      <header className="w-full py-6 px-8 relative z-10">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="relative">
            <PhoneCall className="h-6 w-6 text-purple-500" />
            <Sparkles className="absolute -right-2 -top-2 h-4 w-4 text-amber-400" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-50 to-neutral-400">
            EchoLink
          </span>
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="relative overflow-hidden rounded-2xl shadow-xl border border-slate-800/50 backdrop-blur-sm bg-slate-900/30">
            {/* Form sparkles */}
            <div className="absolute inset-0 pointer-events-none">
              <SparklesCore
                id="formSparkles"
                background="transparent"
                minSize={0.4}
                maxSize={1.0}
                particleDensity={40}
                className="w-full h-full"
                particleColor="#FFFFFF"
                speed={0.3}
              />
            </div>

            <div className="p-8 relative z-10">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-white">Welcome back</h1>
                <p className="text-slate-400 mt-1">
                  Sign in to your EchoLink account
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-slate-300">
                      Password
                    </Label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-purple-400 hover:text-purple-300 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 pr-10"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
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

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                    className="border-slate-700 data-[state=checked]:bg-purple-600"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="text-sm font-medium text-slate-300"
                  >
                    Remember me for 30 days
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-neutral-50 to-neutral-400 text-slate-950 hover:from-neutral-200 hover:to-neutral-500"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-slate-900/30 px-2 text-slate-400">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-slate-700 text-white hover:bg-slate-800"
                    onClick={() => handleOAuthLogin("google")}
                  >
                    <Image
                      src="/google-logo.svg"
                      alt="Google"
                      className="mr-2 h-4 w-4 bg-white rounded-full"
                      width={20}
                      height={20}
                    />
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-slate-700 text-white hover:bg-slate-800"
                    onClick={() => handleOAuthLogin("facebook")}
                  >
                    <Facebook className="mr-2 h-4 w-4" />
                    Facebook
                  </Button>
                </div>
              </div>

              <p className="mt-6 text-center text-sm text-slate-400">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-purple-400 hover:text-purple-300 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Feature highlight */}
          <div className="mt-8 text-center">
            <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Sparkles className="h-3 w-3" />
              New: Enhanced voice clarity with AI
            </span>
          </div>
        </motion.div>
      </main>

      {/* Footer sparkles */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none overflow-hidden z-0">
        <SparklesCore
          id="footerSparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.5}
          particleDensity={80}
          className="w-full h-full"
          particleColor="#8B5CF6"
          speed={0.5}
        />
      </div>
    </div>
  );
}
