import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PhoneCall, PhoneOff, Search, ArrowLeft, ArrowRight, Clock, Download } from "lucide-react"
import Link from "next/link"

// Sample call data
const calls = [
  {
    id: "1",
    caller: "John Smith",
    phoneNumber: "+1 (555) 123-4567",
    duration: "4m 12s",
    timestamp: "Today, 10:30 AM",
    status: "completed",
  },
  {
    id: "2",
    caller: "Sarah Johnson",
    phoneNumber: "+1 (555) 987-6543",
    duration: "2m 45s",
    timestamp: "Today, 9:15 AM",
    status: "completed",
  },
  {
    id: "3",
    caller: "Michael Brown",
    phoneNumber: "+1 (555) 456-7890",
    duration: "0m 0s",
    timestamp: "Yesterday, 4:30 PM",
    status: "missed",
  },
  {
    id: "4",
    caller: "Emma Wilson",
    phoneNumber: "+1 (555) 789-0123",
    duration: "8m 32s",
    timestamp: "Now",
    status: "ongoing",
  },
  {
    id: "5",
    caller: "David Lee",
    phoneNumber: "+1 (555) 234-5678",
    duration: "1m 18s",
    timestamp: "Yesterday, 2:45 PM",
    status: "completed",
  },
  {
    id: "6",
    caller: "Lisa Chen",
    phoneNumber: "+1 (555) 345-6789",
    duration: "5m 22s",
    timestamp: "Yesterday, 1:10 PM",
    status: "completed",
  },
  {
    id: "7",
    caller: "Robert Taylor",
    phoneNumber: "+1 (555) 567-8901",
    duration: "0m 0s",
    timestamp: "2 days ago, 11:30 AM",
    status: "missed",
  },
  {
    id: "8",
    caller: "Jennifer Garcia",
    phoneNumber: "+1 (555) 678-9012",
    duration: "3m 45s",
    timestamp: "2 days ago, 9:15 AM",
    status: "completed",
  },
  {
    id: "9",
    caller: "William Martinez",
    phoneNumber: "+1 (555) 789-0123",
    duration: "6m 10s",
    timestamp: "3 days ago, 3:20 PM",
    status: "completed",
  },
  {
    id: "10",
    caller: "Amanda Rodriguez",
    phoneNumber: "+1 (555) 890-1234",
    duration: "0m 0s",
    timestamp: "3 days ago, 10:45 AM",
    status: "missed",
  },
]

export default function CallsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to dashboard</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Call History</h1>
          <p className="text-muted-foreground">View and manage your AI voice call history</p>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search calls..." className="pl-8" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
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
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <PhoneCall className="mr-2 h-4 w-4" />
            New Call
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
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
            {calls.map((call) => (
              <TableRow key={call.id}>
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
                      call.status === "completed" ? "outline" : call.status === "ongoing" ? "default" : "destructive"
                    }
                    className="flex w-24 items-center justify-center space-x-1"
                  >
                    {call.status === "completed" ? (
                      <PhoneOff className="h-3 w-3" />
                    ) : call.status === "ongoing" ? (
                      <PhoneCall className="h-3 w-3" />
                    ) : (
                      <PhoneOff className="h-3 w-3" />
                    )}
                    <span>
                      {call.status === "completed" ? "Completed" : call.status === "ongoing" ? "Active" : "Missed"}
                    </span>
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/calls/${call.id}`}>View Details</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>1</strong> to <strong>10</strong> of <strong>42</strong> results
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

