import { NextResponse } from "next/server"
import { saveConversationHistory } from "@/lib/llama"
import { config } from "@/lib/config"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const callSid = formData.get("CallSid") as string
    const callStatus = formData.get("CallStatus") as string

    console.log(`Call ${callSid} status update: ${callStatus}`)
    console.log(`Using callback URL: ${config.urls.twilioStatusCallback}`)

    // If the call is completed, save the conversation history
    if (callStatus === "completed") {
      await saveConversationHistory(callSid)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error handling call status update:", error)
    return NextResponse.json({ error: "Failed to process call status update" }, { status: 500 })
  }
}

