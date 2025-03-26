// "use client";

// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   type ReactNode,
// } from "react";
// import type { User, Session } from "@supabase/supabase-js";
// import { getSupabaseClient } from "@/lib/supabase";
// import { useToast } from "@/hooks/use-toast";
// import { useRouter } from "next/navigation";
// import type { Profile } from "@/types/supabase";

// type AuthContextType = {
//   user: User | null;
//   profile: Profile | null;
//   isLoading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
//   refreshProfile: () => Promise<void>;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const { toast } = useToast();
//   const router = useRouter();
//   const supabase = getSupabaseClient();

//   const fetchUserProfile = async (userId: string) => {
//     try {
//       // Create a default profile since profiles table doesn't exist
//       // This fixes the 404 error for missing profiles table
//       const defaultProfile = {
//         id: userId,
//         username: "User",
//         full_name: "User",
//         avatar_url:
//           "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=256&h=256&fit=crop&auto=format",
//         updated_at: new Date().toISOString(),
//       };

//       setProfile(defaultProfile as unknown as Profile);
//     } catch (error: any) {
//       console.error("Error fetching user profile:", error.message);
//       // Set a default profile anyway to prevent further errors
//       setProfile({
//         id: userId,
//         username: "User",
//         full_name: "User",
//         avatar_url:
//           "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=256&h=256&fit=crop&auto=format",
//         updated_at: new Date().toISOString(),
//       } as unknown as Profile);
//     }
//   };

//   const refreshProfile = async () => {
//     if (user) {
//       await fetchUserProfile(user.id);
//     }
//   };

//   const login = async (email: string, password: string) => {
//     try {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });

//       if (error) {
//         throw error;
//       }

//       // Set user immediately to avoid loading flash
//       setUser(data.user);

//       if (data.user) {
//         await fetchUserProfile(data.user.id);
//       }

//       toast({
//         title: "Success",
//         description: "You have successfully logged in",
//       });

//       // Use replace instead of push to avoid back button issues
//       router.replace("/dashboard");
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.message || "Failed to log in",
//         variant: "destructive",
//       });
//       throw error;
//     }
//   };

//   const logout = async () => {
//     try {
//       // Clear user state first to prevent router issues
//       setUser(null);
//       setProfile(null);

//       // Then sign out from Supabase
//       const { error } = await supabase.auth.signOut();

//       if (error) {
//         console.error("Logout error:", error.message);
//         toast({
//           title: "Error",
//           description: error.message || "Failed to log out",
//           variant: "destructive",
//         });
//         return;
//       }

//       // Show success message
//       toast({
//         title: "Success",
//         description: "You have been logged out",
//       });

//       // Redirect after state is cleared and supabase is signed out
//       setTimeout(() => {
//         router.push("/login");
//       }, 100);
//     } catch (error: any) {
//       console.error("Logout error:", error);
//       toast({
//         title: "Error",
//         description: "An unexpected error occurred during logout",
//         variant: "destructive",
//       });
//     }
//   };

//   useEffect(() => {
//     let mounted = true;

//     // Check active sessions and sets the user
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       if (!mounted) return;

//       if (session?.user) {
//         setUser(session.user);
//         fetchUserProfile(session.user.id);
//       }
//       setIsLoading(false);
//     });

//     // Listen for changes on auth state (logged in, signed out, etc.)
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange(async (event, session) => {
//       if (!mounted) return;

//       if (session?.user) {
//         setUser(session.user);
//         await fetchUserProfile(session.user.id);
//       } else {
//         setUser(null);
//         setProfile(null);
//       }
//       setIsLoading(false);
//     });

//     return () => {
//       mounted = false;
//       subscription.unsubscribe();
//     };
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         profile,
//         isLoading,
//         login,
//         logout,
//         refreshProfile,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);

//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }

//   return context;
// }
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { User, Session } from "@supabase/supabase-js";
import { getSupabaseClient } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import type { Profile } from "@/types/supabase";

// Export the type for potential external use
export type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName?: string) => Promise<void>;
  logout: () => Promise<void>;
  oauthSignIn: (provider: "google" | "github" | "facebook") => Promise<void>;
  refreshProfile: () => Promise<void>;
};

// Create the context with explicit type
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Named export for the provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();
  const supabase = getSupabaseClient();

  const fetchUserProfile = async (userId: string) => {
    try {
      const defaultProfile = {
        id: userId,
        username: "User",
        full_name: "User",
        avatar_url:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=256&h=256&fit=crop&auto=format",
        updated_at: new Date().toISOString(),
      };

      setProfile(defaultProfile as unknown as Profile);
    } catch (error: any) {
      console.error("Error fetching user profile:", error.message);
      setProfile(defaultProfile as unknown as Profile);
    }
  };

  const signup = async (email: string, password: string, fullName?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName || "User",
          },
        },
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        setUser(data.user);
        await fetchUserProfile(data.user.id);
      }

      toast({
        title: "Success",
        description: "Account created successfully",
      });

      router.replace("/dashboard");
    } catch (error: any) {
      toast({
        title: "Signup Error",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
      throw error;
    }
  };

  const oauthSignIn = async (provider: "google" | "github" | "facebook") => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: `Signed in with ${provider}`,
      });
    } catch (error: any) {
      toast({
        title: "OAuth Sign In Error",
        description: error.message || `Failed to sign in with ${provider}`,
        variant: "destructive",
      });
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      setUser(data.user);

      if (data.user) {
        await fetchUserProfile(data.user.id);
      }

      toast({
        title: "Success",
        description: "You have successfully logged in",
      });

      router.replace("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to log in",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      setProfile(null);

      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Logout error:", error.message);
        toast({
          title: "Error",
          description: error.message || "Failed to log out",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "You have been logged out",
      });

      setTimeout(() => {
        router.push("/login");
      }, 100);
    } catch (error: any) {
      console.error("Logout error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during logout",
        variant: "destructive",
      });
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchUserProfile(user.id);
    }
  };

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;

      if (session?.user) {
        setUser(session.user);
        fetchUserProfile(session.user.id);
      }
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (session?.user) {
        setUser(session.user);
        await fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        login,
        signup,
        logout,
        oauthSignIn,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Named export for the hook
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
