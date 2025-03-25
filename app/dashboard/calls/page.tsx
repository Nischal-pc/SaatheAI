"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  PhoneCall,
  PhoneOff,
  Search,
  ArrowLeft,
  ArrowRight,
  Clock,
  Download,
  Filter,
  Trash2,
  MoreHorizontal,
  Plus,
} from "lucide-react"
import Link from "next/link"
import { config } from "@/lib/config"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"

interface Call {
  id: string
  caller: string
  phoneNumber: string
  duration: string
  timestamp: string
  status: "completed" | "ongoing" | "missed"
}

export default function CallsPage() {
  // Use dummy calls data
  const [calls, setCalls] = useState<Call[]>(config.dummyCalls)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
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

  const filteredCalls = calls.filter((call) => {
    const matchesSearch =
      call.caller.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || call.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleDeleteCall = (id: string) => {
    toast({
      title: "Call deleted",
      description: "The call has been removed from your history.",
    })

    setCalls(calls.filter((call) => call.id !== id))
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search calls..."
              className="pl-9 bg-background/50 focus:bg-background transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="gap-1.5">
              <Filter className="h-4 w-4" />
              {showFilters ? "Hide Filters" : "Filters"}
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm" variant="gradient" asChild>
              <Link href="/dashboard/calls/new">
                <Plus className="h-4 w-4 mr-1" />
                New Call
              </Link>
            </Button>
          </div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mb-6"
          >
            <Card className="border-dashed">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Calls</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="missed">Missed</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date Range</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select date range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="yesterday">Yesterday</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
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
                        <SelectItem value="short">Short ({"<"} 2 min)</SelectItem>
                        <SelectItem value="medium">Medium (2-5 min)</SelectItem>
                        <SelectItem value="long">Long ({">"} 5 min)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <Card className="border-2 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="p-4 space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Caller</TableHead>
                      <TableHead>Phone Number</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCalls.length > 0 ? (
                      filteredCalls.map((call, index) => (
                        <TableRow key={call.id} className="group hover:bg-muted/50 transition-colors">
                          <TableCell className="font-medium">{call.caller}</TableCell>
                          <TableCell>{call.phoneNumber}</TableCell>
                          <TableCell>{call.duration}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                              <span>{call.timestamp}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                call.status === "completed"
                                  ? "outline"
                                  : call.status === "ongoing"
                                    ? "default"
                                    : "destructive"
                              }
                              className="flex w-24 items-center justify-center space-x-1 px-2.5 py-0.5"
                            >
                              {call.status === "completed" ? (
                                <PhoneOff className="h-3 w-3 mr-1" />
                              ) : call.status === "ongoing" ? (
                                <PhoneCall className="h-3 w-3 mr-1" />
                              ) : (
                                <PhoneOff className="h-3 w-3 mr-1" />
                              )}
                              <span>
                                {call.status === "completed"
                                  ? "Completed"
                                  : call.status === "ongoing"
                                    ? "Active"
                                    : "Missed"}
                              </span>
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                asChild
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Link href={`/dashboard/calls/${call.id}`}>View Details</Link>
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">More options</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem asChild>
                                    <Link href={`/dashboard/calls/${call.id}`}>View Details</Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Download Recording</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-destructive focus:text-destructive"
                                    onClick={() => handleDeleteCall(call.id)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Call
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <PhoneOff className="h-8 w-8 text-muted-foreground" />
                            <p>No calls found.</p>
                            <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between p-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing <strong>{filteredCalls.length}</strong> of <strong>{calls.length}</strong> calls
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled className="gap-1.5">
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

