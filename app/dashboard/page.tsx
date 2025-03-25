"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { PhoneCall, BarChart3, Settings, Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecentCalls } from "@/components/recent-calls"
import { CallMetrics } from "@/components/call-metrics"
import { CallVolume } from "@/components/call-volume"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const { toast } = useToast()
  const { user, profile } = useAuth()
  const [greeting, setGreeting] = useState("Good day")
  const [timeOfDay, setTimeOfDay] = useState("")

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours()
    if (hour < 12) {
      setGreeting("Good morning")
      setTimeOfDay("morning")
    } else if (hour < 18) {
      setGreeting("Good afternoon")
      setTimeOfDay("afternoon")
    } else {
      setGreeting("Good evening")
      setTimeOfDay("evening")
    }
  }, [])

  const handleNewCall = () => {
    toast({
      title: "Starting new call",
      description: "Initializing AI voice call...",
    })
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-gradient-to-r from-purple-50 to-cyan-50 dark:from-purple-950/40 dark:to-cyan-950/40 border-2 border-purple-100 dark:border-purple-900/30">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">
                  {greeting}, {profile?.full_name?.split(" ")[0] || "there"}!
                </h2>
                <p className="text-muted-foreground">
                  Welcome to your EchoLink dashboard. Here's what's happening this {timeOfDay}.
                </p>
              </div>
              <Button onClick={handleNewCall} variant="gradient" className="gap-1.5 whitespace-nowrap">
                <PhoneCall className="h-4 w-4" />
                New Call
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-cyan-50 dark:from-purple-950/40 dark:to-cyan-950/40 border-2 border-purple-100 dark:border-purple-900/30 hover:border-purple-300 dark:hover:border-purple-700/50 transition-all duration-300 hover:shadow-xl group overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">New AI Call</h3>
                  <p className="text-sm text-muted-foreground">Start a new AI-powered voice call</p>
                </div>
                <Button
                  onClick={handleNewCall}
                  className="rounded-full p-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white group-hover:scale-110 transition-transform duration-300 shadow-md"
                  size="icon"
                  variant="ghost"
                >
                  <PhoneCall className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/40 dark:to-blue-950/40 border-2 border-cyan-100 dark:border-cyan-900/30 hover:border-cyan-300 dark:hover:border-cyan-700/50 transition-all duration-300 hover:shadow-xl group overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">View Analytics</h3>
                  <p className="text-sm text-muted-foreground">Check your call performance</p>
                </div>
                <Button
                  asChild
                  className="rounded-full p-3 bg-gradient-to-r from-cyan-600 to-cyan-800 text-white group-hover:scale-110 transition-transform duration-300 shadow-md"
                  size="icon"
                  variant="ghost"
                >
                  <Link href="/dashboard/analytics">
                    <BarChart3 className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border-2 border-amber-100 dark:border-amber-900/30 hover:border-amber-300 dark:hover:border-amber-700/50 transition-all duration-300 hover:shadow-xl group overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Configure AI</h3>
                  <p className="text-sm text-muted-foreground">Customize your AI voice model</p>
                </div>
                <Button
                  asChild
                  className="rounded-full p-3 bg-gradient-to-r from-amber-500 to-amber-700 text-white group-hover:scale-110 transition-transform duration-300 shadow-md"
                  size="icon"
                  variant="ghost"
                >
                  <Link href="/dashboard/settings">
                    <Zap className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-muted/50 p-1 rounded-xl">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="calls"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
          >
            Recent Calls
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
                <PhoneCall className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,284</div>
                <div className="flex items-center mt-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1.5"></div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Calls</CardTitle>
                <PhoneCall className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <div className="flex items-center mt-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1.5"></div>
                  <p className="text-xs text-muted-foreground">3 more than average</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Call Duration</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4m 32s</div>
                <div className="flex items-center mt-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-rose-500 mr-1.5"></div>
                  <p className="text-xs text-muted-foreground">-8% from last week</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Status</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
                  <div className="text-2xl font-bold">Operational</div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">All systems normal</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Call Volume</CardTitle>
                <CardDescription>Call volume over the past 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <CallVolume />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Calls</CardTitle>
                <CardDescription>Your most recent voice calls</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentCalls />
              </CardContent>
              <CardFooter className="px-6 pb-4">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/calls">
                    View all calls
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6 mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Call Metrics</CardTitle>
              <CardDescription>Detailed analytics for your AI voice calls</CardDescription>
            </CardHeader>
            <CardContent>
              <CallMetrics />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button asChild variant="outline">
                <Link href="/dashboard/analytics">
                  View detailed analytics
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="calls" className="space-y-6 mt-0">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Call History</CardTitle>
                <CardDescription>Complete history of all voice calls</CardDescription>
              </div>
              <Button asChild size="sm" variant="outline">
                <Link href="/dashboard/calls">View All Calls</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <RecentCalls showAll />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

