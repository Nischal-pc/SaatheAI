"use client";

import { useState } from "react";
import Link from "next/link";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { getSupabaseClient } from "@/lib/supabase";
import { SparklesCore } from "@/components/ui/sparkles";

export default function RegisterPage() {
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
      router.push("/dashboard");
    } catch (error) {
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
                <h1 className="text-2xl font-bold text-white">
                  Create an account
                </h1>
                <p className="text-slate-400 mt-1">
                  Join EchoLink and transform your voice calls
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-300">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                    autoComplete="name"
                  />
                </div>

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
                  <Label htmlFor="password" className="text-slate-300">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 pr-10"
                      autoComplete="new-password"
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-slate-300">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
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
                    className="border-slate-700 data-[state=checked]:bg-purple-600"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium text-slate-300"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-purple-400 hover:text-purple-300 hover:underline"
                    >
                      terms and conditions
                    </Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-neutral-50 to-neutral-400 text-slate-950 hover:from-neutral-200 hover:to-neutral-500"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create account"}
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
                    onClick={() => handleOAuthSignup("github")}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-slate-700 text-white hover:bg-slate-800"
                    onClick={() => handleOAuthSignup("twitter")}
                  >
                    <Twitter className="mr-2 h-4 w-4" />
                    Twitter
                  </Button>
                </div>
              </div>

              <p className="mt-6 text-center text-sm text-slate-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-purple-400 hover:text-purple-300 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
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
