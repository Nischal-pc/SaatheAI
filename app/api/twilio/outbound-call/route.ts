import { NextResponse } from "next/server"
import twilio from "twilio"
import { config } from "@/lib/config"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const callSid = formData.get("CallSid") as string

    console.log(`Handling outbound call ${callSid}`)
    console.log(`Using webhook URL: ${config.urls.twilioWebhook}`)

    // Create a new TwiML response
    const twiml = new twilio.twiml.VoiceResponse()

    // Add a welcome message
    twiml.say(
      {
        voice: "Polly.Amy-Neural",
      },
      "Hello, this is EchoLink calling. How can I assist you today?",
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
      `${config.urls.appBaseUrl}/api/twilio/outbound-call`,
    )

    // Return the TwiML as the response
    return new NextResponse(twiml.toString(), {
      headers: {
        "Content-Type": "text/xml",
      },
    })
  } catch (error) {
    console.error("Error handling outbound call:", error)
    return NextResponse.json({ error: "Failed to process outbound call" }, { status: 500 })
  }
}

