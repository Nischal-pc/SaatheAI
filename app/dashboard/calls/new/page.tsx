"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { PhoneCall, Info } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"

export default function NewCallPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [callType, setCallType] = useState("outbound")
  const [notes, setNotes] = useState("")
  const [recordCall, setRecordCall] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!phoneNumber) {
      toast({
        title: "Error",
        description: "Please enter a phone number",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would make an API call to initiate the call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Call initiated",
        description: `Starting ${callType} call to ${phoneNumber}`,
      })

      // Reset form
      setPhoneNumber("")
      setNotes("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initiate call",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle>New Call</CardTitle>
            <CardDescription>Start a new AI-powered voice call</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone-number">Phone Number</Label>
                  <Input
                    id="phone-number"
                    placeholder="+1 (555) 123-4567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="call-type">Call Type</Label>
                  <Select value={callType} onValueChange={setCallType}>
                    <SelectTrigger id="call-type">
                      <SelectValue placeholder="Select call type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="outbound">Outbound Call</SelectItem>
                      <SelectItem value="inbound">Inbound Call</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Call Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any notes or context for this call"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="record-call">Record Call</Label>
                    <p className="text-sm text-muted-foreground">Save a recording of this call for later review</p>
                  </div>
                  <Switch id="record-call" checked={recordCall} onCheckedChange={setRecordCall} />
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 flex items-start space-x-2">
                <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium">Important Note</p>
                  <p className="text-muted-foreground">
                    By initiating this call, you confirm that you have the necessary permissions to record and that all
                    parties will be informed that the call is being recorded.
                  </p>
                </div>
              </div>

              <Button type="submit" className="w-full" variant="gradient" disabled={isLoading}>
                <PhoneCall className="mr-2 h-4 w-4" />
                {isLoading ? "Initiating Call..." : "Start Call"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

