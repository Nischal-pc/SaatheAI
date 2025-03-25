"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PhoneCall, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { getSupabaseClient } from "@/lib/supabase";
import { SparklesCore } from "@/components/ui/sparkles";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const supabase = getSupabaseClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw error;
      }

      setIsSuccess(true);
      toast({
        title: "Success",
        description: "Password reset email sent. Please check your inbox.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send reset email",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
                  Reset your password
                </h1>
                <p className="text-slate-400 mt-1">
                  {isSuccess
                    ? "Check your email for a reset link"
                    : "Enter your email to receive a reset link"}
                </p>
              </div>

              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-300">
                      Email address
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

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-neutral-50 to-neutral-400 text-slate-950 hover:from-neutral-200 hover:to-neutral-500"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send reset instructions"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-purple-600/30 flex items-center justify-center border border-purple-500/50">
                    <Sparkles className="h-8 w-8 text-purple-400" />
                  </div>
                  <p className="text-slate-300">
                    We've sent you an email with a link to reset your password.
                    Please check your inbox.
                  </p>
                  <Button
                    type="button"
                    className="mt-4 w-full"
                    variant="outline"
                    onClick={() => setIsSuccess(false)}
                  >
                    Try another email
                  </Button>
                </div>
              )}

              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center text-purple-400 hover:text-purple-300 hover:underline"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to sign in
                </Link>
              </div>
            </div>
          </div>

          {/* Help box */}
          <div className="mt-8 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 backdrop-blur-sm">
            <h3 className="text-sm font-medium text-slate-300">Need help?</h3>
            <p className="mt-1 text-xs text-slate-400">
              If you're having trouble accessing your account, please contact
              our support team at{" "}
              <a
                href="mailto:support@echolink.com"
                className="text-purple-400 hover:text-purple-300 hover:underline"
              >
                support@echolink.com
              </a>
            </p>
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
