"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, BarChart3, PieChart, LineChart, Users, Calendar, ArrowUp, ArrowDown, Filter } from "lucide-react"
import { CallMetrics } from "@/components/call-metrics"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { Skeleton } from "@/components/ui/skeleton"

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [timeframe, setTimeframe] = useState("30days")
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const { profile } = useAuth()

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  const handleExport = () => {
    toast({
      title: "Exporting report",
      description: "Your analytics report is being generated and will download shortly.",
    })

    // Simulate download after a delay
    setTimeout(() => {
      toast({
        title: "Export complete",
        description: "Your analytics report has been downloaded.",
      })
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
            <p className="text-muted-foreground">
              View detailed insights and metrics for your calls, {profile?.full_name?.split(" ")[0]}
            </p>
          </div>
          <Button variant="outline" className="gap-1.5" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-1.5 w-full md:w-auto"
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>

          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px] bg-background/50 focus:bg-background transition-colors">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mb-6"
            >
              <Card className="border-dashed">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Call Type</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by call type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Calls</SelectItem>
                          <SelectItem value="inbound">Inbound</SelectItem>
                          <SelectItem value="outbound">Outbound</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Status</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="missed">Missed</SelectItem>
                          <SelectItem value="ongoing">Ongoing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Duration</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any Duration</SelectItem>
                          <SelectItem value="short">Short (&lt; 2 min)</SelectItem>
                          <SelectItem value="medium">Medium (2-5 min)</SelectItem>
                          <SelectItem value="long">Long (&gt; 5 min)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-[120px]" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-[80px] mb-2" />
                  <Skeleton className="h-4 w-[100px]" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <motion.div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item}>
              <Card className="border-2 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 hover:shadow-md overflow-hidden group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">1,284</div>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center text-emerald-500">
                          <ArrowUp className="h-3 w-3 mr-1" />
                          <span className="text-xs font-medium">12%</span>
                        </div>
                        <span className="text-xs text-muted-foreground ml-1.5">from last month</span>
                      </div>
                    </div>
                    <div className="h-12 w-16 bg-muted/50 rounded-md flex items-end overflow-hidden">
                      <div className="h-6 w-2 mx-0.5 bg-primary/60 rounded-t-sm"></div>
                      <div className="h-8 w-2 mx-0.5 bg-primary/70 rounded-t-sm"></div>
                      <div className="h-10 w-2 mx-0.5 bg-primary/80 rounded-t-sm"></div>
                      <div className="h-12 w-2 mx-0.5 bg-primary rounded-t-sm"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-2 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 hover:shadow-md overflow-hidden group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Call Duration</CardTitle>
                  <LineChart className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">4m 32s</div>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center text-rose-500">
                          <ArrowDown className="h-3 w-3 mr-1" />
                          <span className="text-xs font-medium">8%</span>
                        </div>
                        <span className="text-xs text-muted-foreground ml-1.5">from last week</span>
                      </div>
                    </div>
                    <div className="h-12 w-16 bg-muted/50 rounded-md flex items-center overflow-hidden px-1">
                      <div className="h-px w-full bg-primary/50 relative">
                        <div className="absolute top-0 left-0 right-0 h-8 w-full">
                          <svg viewBox="0 0 100 20" className="w-full h-full">
                            <path
                              d="M0,10 Q25,20 50,10 T100,10"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="text-primary"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-2 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 hover:shadow-md overflow-hidden group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">85%</div>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center text-emerald-500">
                          <ArrowUp className="h-3 w-3 mr-1" />
                          <span className="text-xs font-medium">3%</span>
                        </div>
                        <span className="text-xs text-muted-foreground ml-1.5">from last month</span>
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="h-8 w-8 rounded-full bg-primary/40 flex items-center justify-center">
                          <div className="h-6 w-6 rounded-full bg-primary/60 flex items-center justify-center">
                            <div className="h-4 w-4 rounded-full bg-primary"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-2 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 hover:shadow-md overflow-hidden group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">573</div>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center text-emerald-500">
                          <ArrowUp className="h-3 w-3 mr-1" />
                          <span className="text-xs font-medium">18%</span>
                        </div>
                        <span className="text-xs text-muted-foreground ml-1.5">from last month</span>
                      </div>
                    </div>
                    <div className="flex -space-x-2">
                      <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center text-xs font-medium text-purple-500">
                        +5
                      </div>
                      <div className="h-8 w-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs font-medium text-cyan-500">
                        +8
                      </div>
                      <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center text-xs font-medium text-amber-500">
                        +12
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}

        <div className="mt-6">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="bg-muted/50 p-1 rounded-xl">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="calls"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
              >
                Call Analytics
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
              >
                User Analytics
              </TabsTrigger>
              <TabsTrigger
                value="performance"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
              >
                Performance
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="overview" className="space-y-4 mt-0">
                  <CallMetrics />
                </TabsContent>

                <TabsContent value="calls" className="space-y-4 mt-0">
                  <Card className="border-2 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 overflow-hidden">
                    <CardHeader>
                      <CardTitle>Call Analytics</CardTitle>
                      <CardDescription>Detailed analysis of call patterns and performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border border-dashed">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Call Volume by Time of Day</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-[200px] w-full bg-muted/50 rounded-lg flex items-center justify-center overflow-hidden">
                              <div className="w-full h-full px-4 py-6">
                                <div className="w-full h-full relative">
                                  {/* Time labels */}
                                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground">
                                    <span>12am</span>
                                    <span>6am</span>
                                    <span>12pm</span>
                                    <span>6pm</span>
                                    <span>12am</span>
                                  </div>

                                  {/* Bars */}
                                  <div className="absolute bottom-6 left-0 right-0 flex items-end justify-between h-[calc(100%-24px)]">
                                    {[5, 3, 2, 4, 10, 18, 22, 25, 20, 15, 12, 8].map((value, index) => (
                                      <div
                                        key={index}
                                        className="w-2 bg-gradient-to-t from-primary/80 to-primary/40 rounded-t-sm"
                                        style={{ height: `${(value / 25) * 100}%` }}
                                      ></div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border border-dashed">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Call Duration Distribution</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-[200px] w-full bg-muted/50 rounded-lg flex items-center justify-center overflow-hidden">
                              <div className="w-full h-full flex items-center justify-center">
                                <div className="w-32 h-32 rounded-full border-8 border-primary/20 relative">
                                  <div
                                    className="absolute inset-0 border-8 border-primary rounded-full"
                                    style={{
                                      clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)",
                                    }}
                                  ></div>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                      <div className="text-lg font-bold">30%</div>
                                      <div className="text-xs text-muted-foreground">1-3 min</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="users" className="space-y-4 mt-0">
                  <Card className="border-2 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 overflow-hidden">
                    <CardHeader>
                      <CardTitle>User Analytics</CardTitle>
                      <CardDescription>User engagement and behavior analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border border-dashed">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">User Growth</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-[200px] w-full bg-muted/50 rounded-lg flex items-center justify-center overflow-hidden">
                              <div className="w-full h-full px-4 py-6">
                                <div className="w-full h-full relative">
                                  <svg viewBox="0 0 100 50" className="w-full h-full">
                                    <defs>
                                      <linearGradient id="growthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.5" />
                                        <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.1" />
                                      </linearGradient>
                                    </defs>
                                    <path
                                      d="M0,50 L0,45 C10,40 20,38 30,35 C40,32 50,30 60,25 C70,20 80,15 90,10 L100,5 L100,50 Z"
                                      fill="url(#growthGradient)"
                                    />
                                    <path
                                      d="M0,45 C10,40 20,38 30,35 C40,32 50,30 60,25 C70,20 80,15 90,10 L100,5"
                                      fill="none"
                                      stroke="var(--color-primary)"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border border-dashed">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Active Users by Platform</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-[200px] w-full bg-muted/50 rounded-lg flex items-center justify-center overflow-hidden">
                              <div className="grid grid-cols-3 gap-4 w-full px-6">
                                <div className="flex flex-col items-center">
                                  <div className="w-full bg-muted rounded-full h-2 mb-2">
                                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                                  </div>
                                  <span className="text-xs">Mobile</span>
                                  <span className="text-xs font-bold">65%</span>
                                </div>
                                <div className="flex flex-col items-center">
                                  <div className="w-full bg-muted rounded-full h-2 mb-2">
                                    <div className="bg-cyan-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                                  </div>
                                  <span className="text-xs">Desktop</span>
                                  <span className="text-xs font-bold">25%</span>
                                </div>
                                <div className="flex flex-col items-center">
                                  <div className="w-full bg-muted rounded-full h-2 mb-2">
                                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: "10%" }}></div>
                                  </div>
                                  <span className="text-xs">Tablet</span>
                                  <span className="text-xs font-bold">10%</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="performance" className="space-y-4 mt-0">
                  <Card className="border-2 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 overflow-hidden">
                    <CardHeader>
                      <CardTitle>System Performance</CardTitle>
                      <CardDescription>AI model performance and system metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border border-dashed">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">AI Response Time</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-[200px] w-full bg-muted/50 rounded-lg flex items-center justify-center overflow-hidden">
                              <div className="w-full h-full px-4 py-6">
                                <div className="w-full h-full relative">
                                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between h-full pt-6">
                                    {[0.8, 0.7, 0.9, 1.2, 0.6, 0.5, 0.7, 0.8, 0.6, 0.9, 0.7, 0.6].map(
                                      (value, index) => (
                                        <div key={index} className="flex flex-col items-center">
                                          <div
                                            className="w-4 bg-primary/80 rounded-t-sm"
                                            style={{ height: `${(value / 1.5) * 100}%` }}
                                          ></div>
                                          <span className="text-[10px] text-muted-foreground mt-1">{value}s</span>
                                        </div>
                                      ),
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border border-dashed">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">System Uptime</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-[200px] w-full bg-muted/50 rounded-lg flex items-center justify-center overflow-hidden">
                              <div className="w-full h-full px-4 py-6">
                                <div className="w-full h-full relative">
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative h-32 w-32">
                                      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                                        <circle
                                          className="text-muted"
                                          strokeWidth="8"
                                          stroke="currentColor"
                                          fill="transparent"
                                          r="40"
                                          cx="50"
                                          cy="50"
                                        />
                                        <circle
                                          className="text-emerald-500"
                                          strokeWidth="8"
                                          strokeDasharray={`${99.8 * 2.5} ${100 * 2.5}`}
                                          strokeLinecap="round"
                                          stroke="currentColor"
                                          fill="transparent"
                                          r="40"
                                          cx="50"
                                          cy="50"
                                        />
                                      </svg>
                                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-2xl font-bold">99.8%</span>
                                        <span className="text-xs text-muted-foreground">Uptime</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </div>
      </motion.div>
    </div>
  )
}

