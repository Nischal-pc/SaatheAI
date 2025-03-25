"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  PhoneCall,
  PhoneOff,
  Download,
  Play,
  Volume2,
  Share2,
  Pause,
  SkipBack,
  SkipForward,
  ArrowLeft,
} from "lucide-react"
import { config } from "@/lib/config"
import { getConversationForUI } from "@/lib/llama"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"

export default function CallDetailsPage({ params }: { params: { id: string } }) {
  const callId = params.id
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeTab, setActiveTab] = useState("transcript")
  const [volume, setVolume] = useState(80)

  // Get dummy call data for the specified ID
  const dummyCall = config.dummyCalls.find((call) => call.id === callId) || config.dummyCalls[0]

  // This would normally be fetched from an API
  const call = {
    id: callId,
    caller: dummyCall.caller,
    phoneNumber: dummyCall.phoneNumber,
    duration: dummyCall.duration,
    timestamp: dummyCall.timestamp,
    status: dummyCall.status,
    avatar: "/placeholder.svg?height=80&width=80",
    transcription: getConversationForUI(callId),
    summary:
      "Customer called to check their account balance and inquire about their last transaction. The balance was confirmed as $1,250.75, and the last transaction was identified as a $500 deposit on October 15, 2023.",
    sentiment: "Positive",
    topics: ["Account Balance", "Transaction History"],
    aiModel: "Meta LLAMA 3.0",
    audioUrl: "#",
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/dashboard/calls">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Call with {call.caller}</h1>
          <p className="text-muted-foreground">Call details and analytics for call #{callId}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:col-span-1"
        >
          <Card className="border-2 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 overflow-hidden">
            <CardHeader>
              <CardTitle>Call Information</CardTitle>
              <CardDescription>Details about this call</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="relative">
                  <Avatar className="h-24 w-24 mb-2 border-2 border-background shadow-md">
                    <AvatarImage src={call.avatar} alt={call.caller} />
                    <AvatarFallback className="text-xl bg-gradient-to-br from-purple-500 to-cyan-500 text-white">
                      {call.caller
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 rounded-full border-2 border-background">
                    <Badge
                      variant={
                        call.status === "completed" ? "outline" : call.status === "ongoing" ? "default" : "destructive"
                      }
                      className="flex items-center space-x-1 px-2.5 py-1"
                    >
                      {call.status === "completed" ? (
                        <PhoneOff className="h-3 w-3 mr-1" />
                      ) : call.status === "ongoing" ? (
                        <PhoneCall className="h-3 w-3 mr-1" />
                      ) : (
                        <PhoneOff className="h-3 w-3 mr-1" />
                      )}
                      <span>
                        {call.status === "completed" ? "Completed" : call.status === "ongoing" ? "Active" : "Missed"}
                      </span>
                    </Badge>
                  </div>
                </div>
                <h3 className="text-xl font-bold">{call.caller}</h3>
                <p className="text-muted-foreground">{call.phoneNumber}</p>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium">{call.timestamp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{call.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">AI Model:</span>
                  <span className="font-medium">{call.aiModel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sentiment:</span>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 mr-1.5"></div>
                    <span className="font-medium">{call.sentiment}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <h4 className="font-medium">Topics Discussed</h4>
                <div className="flex flex-wrap gap-2">
                  {call.topics.map((topic) => (
                    <Badge key={topic} variant="secondary" className="px-2.5 py-0.5">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Call Summary</h4>
                <p className="text-sm text-muted-foreground">{call.summary}</p>
              </div>

              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Button variant="outline" size="sm" className="w-full gap-1.5">
                  <Download className="h-4 w-4" />
                  Download Audio
                </Button>
                <Button variant="outline" size="sm" className="w-full gap-1.5">
                  <Download className="h-4 w-4" />
                  Download Transcript
                </Button>
                <Button variant="outline" size="sm" className="w-full gap-1.5">
                  <Share2 className="h-4 w-4" />
                  Share Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="md:col-span-2"
        >
          <Card className="border-2 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 overflow-hidden">
            <CardHeader>
              <CardTitle>Call Recording & Transcript</CardTitle>
              <CardDescription>Listen to the call and view the transcript</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 w-full">
                    <div className="flex items-center space-x-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-10 w-10 rounded-full hover:bg-primary/10 transition-colors"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full hover:bg-primary/10 transition-colors"
                      >
                        <SkipBack className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full hover:bg-primary/10 transition-colors"
                      >
                        <SkipForward className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "33%" }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>01:25</span>
                        <span>04:12</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                    <Slider
                      value={[volume]}
                      onValueChange={(value) => setVolume(value[0])}
                      max={100}
                      step={1}
                      className="w-20 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3"
                    />
                  </div>
                </div>
              </div>

              <Tabs defaultValue="transcript" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-muted/50 p-1 rounded-xl">
                  <TabsTrigger
                    value="transcript"
                    className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
                  >
                    Transcript
                  </TabsTrigger>
                  <TabsTrigger
                    value="analysis"
                    className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
                  >
                    AI Analysis
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="transcript" className="mt-4 space-y-4">
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {call.transcription.map((item, index) => (
                      <motion.div
                        key={index}
                        className={`flex ${item.speaker === "AI" ? "justify-start" : "justify-end"}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <div
                          className={`flex items-start space-x-2 max-w-[80%] ${item.speaker === "AI" ? "" : "flex-row-reverse space-x-reverse"}`}
                        >
                          <Avatar className="h-8 w-8">
                            {item.speaker === "AI" ? (
                              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-cyan-500 text-white">
                                AI
                              </AvatarFallback>
                            ) : (
                              <AvatarFallback className="bg-muted">U</AvatarFallback>
                            )}
                          </Avatar>
                          <div
                            className={`space-y-1 ${
                              item.speaker === "AI"
                                ? "bg-card dark:bg-card/80 border border-border"
                                : "bg-primary text-primary-foreground"
                            } p-3 rounded-xl shadow-sm`}
                          >
                            <div className="flex justify-between items-start">
                              <span className="font-medium text-xs">{item.speaker}</span>
                              <span className="text-xs opacity-70">{item.time}</span>
                            </div>
                            <p className="text-sm">{item.text}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="analysis" className="mt-4 space-y-4">
                  <Card className="border-2 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300">
                    <CardHeader>
                      <CardTitle>Sentiment Analysis</CardTitle>
                      <CardDescription>AI-detected sentiment throughout the call</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] w-full bg-muted/50 rounded-xl flex items-center justify-center">
                        <div className="w-full px-8">
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 rounded-full"></div>
                          </div>
                          <div className="flex justify-between mt-2">
                            <span className="text-xs text-rose-500">Negative</span>
                            <span className="text-xs text-amber-500">Neutral</span>
                            <span className="text-xs text-emerald-500">Positive</span>
                          </div>
                          <div className="mt-8 flex justify-center">
                            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm">
                              <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                              <span className="font-medium">Overall: Positive</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300">
                    <CardHeader>
                      <CardTitle>Key Insights</CardTitle>
                      <CardDescription>Important information extracted from the call</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <motion.li
                          className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <div className="mt-1 h-5 w-5 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                            <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-medium">Customer account balance:</span>
                            <span className="ml-1">$1,250.75</span>
                          </div>
                        </motion.li>
                        <motion.li
                          className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        >
                          <div className="mt-1 h-5 w-5 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                            <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-medium">Last transaction:</span>
                            <span className="ml-1">$500 deposit on October 15, 2023</span>
                          </div>
                        </motion.li>
                        <motion.li
                          className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                        >
                          <div className="mt-1 h-5 w-5 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                            <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-medium">Customer verified identity with:</span>
                            <span className="ml-1">Account number and DOB</span>
                          </div>
                        </motion.li>
                        <motion.li
                          className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 }}
                        >
                          <div className="mt-1 h-5 w-5 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                            <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-medium">Customer expressed:</span>
                            <span className="ml-1">Satisfaction with service</span>
                          </div>
                        </motion.li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

