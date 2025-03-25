import { NextResponse } from "next/server"
import twilio from "twilio"
import { config } from "@/lib/config"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const callSid = formData.get("CallSid") as string
    const from = formData.get("From") as string
    const to = formData.get("To") as string

    console.log(`Incoming call from ${from} to ${to} with SID: ${callSid}`)

    // Create a new TwiML response
    const twiml = new twilio.twiml.VoiceResponse()

    // Add a welcome message
    twiml.say(
      {
        voice: "Polly.Amy-Neural",
      },
      "Welcome to EchoLink, powered by Meta LLAMA 3.0. How can I assist you today?",
    )

    // Start a gather operation to collect user input
    const gather = twiml.gather({
      input: "speech",
      speechTimeout: "auto",
      speechModel: "phone_call",
      enhanced: "true",
      action: `${config.urls.appBaseUrl}/api/twilio/handle-input`,
      method: "POST",
    })

    gather.say(
      {
        voice: "Polly.Amy-Neural",
      },
      "Please speak after the tone.",
    )

    // If the user doesn't say anything, prompt them again
    twiml.redirect(
      {
        method: "POST",
      },
      `${config.urls.appBaseUrl}/api/twilio/voice`,
    )

    // Return the TwiML as the response
    return new NextResponse(twiml.toString(), {
      headers: {
        "Content-Type": "text/xml",
      },
    })
  } catch (error) {
    console.error("Error handling Twilio voice request:", error)
    return NextResponse.json({ error: "Failed to process voice request" }, { status: 500 })
  }
}

