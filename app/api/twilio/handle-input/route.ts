import { NextResponse } from "next/server"
import twilio from "twilio"
import { generateLlamaResponse } from "@/lib/llama"
import { config } from "@/lib/config"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const callSid = formData.get("CallSid") as string
    const speechResult = formData.get("SpeechResult") as string

    console.log(`Received speech input for call ${callSid}: ${speechResult}`)

    // Process the user's speech with LLAMA 3.0
    const aiResponse = await generateLlamaResponse(speechResult, callSid)

    // Create a new TwiML response
    const twiml = new twilio.twiml.VoiceResponse()

    // Respond with the AI-generated text
    twiml.say(
      {
        voice: "Polly.Amy-Neural",
      },
      aiResponse,
    )

    // Continue the conversation by gathering more input
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
      "Is there anything else I can help you with?",
    )

    // If the user doesn't say anything, end the call
    twiml.say(
      {
        voice: "Polly.Amy-Neural",
      },
      "Thank you for calling EchoLink. Goodbye!",
    )
    twiml.hangup()

    // Return the TwiML as the response
    return new NextResponse(twiml.toString(), {
      headers: {
        "Content-Type": "text/xml",
      },
    })
  } catch (error) {
    console.error("Error handling speech input:", error)

    // Create an error response
    const twiml = new twilio.twiml.VoiceResponse()
    twiml.say(
      {
        voice: "Polly.Amy-Neural",
      },
      "I apologize, but I encountered an error processing your request. Please try again later.",
    )
    twiml.hangup()

    return new NextResponse(twiml.toString(), {
      headers: {
        "Content-Type": "text/xml",
      },
    })
  }
}

