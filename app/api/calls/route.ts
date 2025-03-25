import { NextResponse } from "next/server"
import { getTwilioClient } from "@/lib/twilio"
import { config } from "@/lib/config"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")

    // Get Twilio client (real or mock)
    const client = getTwilioClient()

    // Build filter parameters
    const filterParams: any = {
      limit,
      page,
    }

    if (status && status !== "all") {
      filterParams.status = status
    }

    // Fetch calls from Twilio (real or mock)
    const calls = await client.calls.list(filterParams)

    // Transform the data for our frontend
    const transformedCalls = calls.map((call) => ({
      id: call.sid,
      caller: call.from,
      phoneNumber: call.to,
      duration: formatDuration(Number.parseInt(call.duration || "0")),
      timestamp: new Date(call.startTime || "").toLocaleString(),
      status: mapTwilioStatus(call.status),
    }))

    return NextResponse.json({
      calls: transformedCalls,
      pagination: {
        page,
        limit,
        total: config.useDummyData ? config.dummyCalls.length : calls.length,
      },
    })
  } catch (error) {
    console.error("Error fetching calls:", error)
    return NextResponse.json({ error: "Failed to fetch calls" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { to, from } = await request.json()

    if (!to || !from) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    if (config.useDummyData) {
      // In dummy mode, just return a dummy call SID
      console.log(`Making dummy call from ${from} to ${to}`)
      console.log(`Using webhook URL: ${config.urls.twilioWebhook}`)
      console.log(`Using status callback URL: ${config.urls.twilioStatusCallback}`)

      return NextResponse.json({ callSid: `DUMMY-CALL-${Date.now()}` })
    }

    const client = getTwilioClient()

    // Make a new call
    const call = await client.calls.create({
      to,
      from,
      url: config.urls.twilioWebhook,
      statusCallback: config.urls.twilioStatusCallback,
      statusCallbackEvent: ["initiated", "ringing", "answered", "completed"],
      statusCallbackMethod: "POST",
    })

    return NextResponse.json({ callSid: call.sid })
  } catch (error) {
    console.error("Error making call:", error)
    return NextResponse.json({ error: "Failed to make call" }, { status: 500 })
  }
}

// Helper functions
function formatDuration(seconds: number): string {
  if (isNaN(seconds)) return "0m 0s"
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}m ${remainingSeconds}s`
}

function mapTwilioStatus(status: string): "completed" | "ongoing" | "missed" {
  switch (status) {
    case "completed":
      return "completed"
    case "in-progress":
    case "ringing":
    case "queued":
    case "initiated":
      return "ongoing"
    case "busy":
    case "failed":
    case "no-answer":
    case "canceled":
      return "missed"
    default:
      return "completed"
  }
}

