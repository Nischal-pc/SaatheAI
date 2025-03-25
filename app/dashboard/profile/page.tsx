"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Upload, Save, User, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
  const { user, profile, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      if (profile) {
        setName(profile.full_name || "");
        setCompany(profile.company || "");
        setPhone(profile.phone_number || "");
      }

      if (user) {
        setEmail(user.email || "");
      }

      setIsPageLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [profile, user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });

      // Refresh profile data
      await refreshProfile();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Password updated",
        description: "Your password has been changed successfully",
      });

      // Reset password fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold">Your Profile</h2>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>
          <Button
            variant="gradient"
            className="gap-1.5"
            onClick={handleUpdateProfile}
            disabled={isLoading}
          >
            <Save className="h-4 w-4" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-2 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 overflow-hidden">
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>
                Update your profile picture and personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isPageLoading ? (
                <div className="flex flex-col items-center text-center space-y-3">
                  <Skeleton className="h-24 w-24 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-48" />
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="relative">
                      <Avatar className="h-24 w-24 mb-2 border-2 border-background shadow-md">
                        <AvatarImage
                          src={
                            profile?.avatar_url ||
                            "/placeholder.svg?height=96&width=96"
                          }
                          alt={profile?.full_name}
                        />
                        <AvatarFallback className="text-xl bg-gradient-to-br from-purple-500 to-cyan-500 text-white">
                          {profile?.full_name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") ||
                            user?.email?.substring(0, 2).toUpperCase() ||
                            "U"}
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        size="icon"
                        variant="outline"
                        className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-background shadow-md"
                      >
                        <Upload className="h-4 w-4" />
                        <span className="sr-only">Upload avatar</span>
                      </Button>
                    </div>
                    <h3 className="text-xl font-bold">
                      {profile?.full_name || "User"}
                    </h3>
                    <p className="text-muted-foreground">{user?.email}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Member since
                      </span>
                      <span className="text-sm font-medium">
                        {new Date(
                          user?.created_at || Date.now()
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Subscription
                      </span>
                      <span className="text-sm font-medium">
                        Professional Plan
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Usage
                      </span>
                      <span className="text-sm font-medium">1,284 calls</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="md:col-span-2 border-2 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 overflow-hidden">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Update your account details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isPageLoading ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              ) : (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-background/50 focus:bg-background transition-colors"
                        autoComplete="name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-background/50 focus:bg-background transition-colors"
                        disabled
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input
                      id="company"
                      placeholder="Your company name"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="bg-background/50 focus:bg-background transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      placeholder="Your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-background/50 focus:bg-background transition-colors"
                    />
                  </div>

                  <Button type="submit" className="mt-2" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <User className="mr-2 h-4 w-4" />
                        Update Profile
                      </>
                    )}
                  </Button>
                </form>
              )}

              <Separator className="my-6" />

              <div>
                <h3 className="text-lg font-medium mb-4">Change Password</h3>
                {isPageLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <Skeleton className="h-10 w-32" />
                  </div>
                ) : (
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showPassword ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="bg-background/50 focus:bg-background transition-colors pr-10"
                          autoComplete="current-password"
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          type={showPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="bg-background/50 focus:bg-background transition-colors"
                          autoComplete="new-password"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirm-password"
                          type={showPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="bg-background/50 focus:bg-background transition-colors"
                          autoComplete="new-password"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="outline"
                      className="mt-2"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Update Password"
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
