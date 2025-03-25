import { config } from "./config"

// Mock Twilio client for dummy mode
export function getTwilioClient() {
  if (config.useDummyData) {
    return {
      calls: {
        create: mockCreateCall,
        list: mockListCalls,
        fetch: mockFetchCall,
      },
      recordings: {
        list: mockListRecordings,
      },
    }
  }

  // In a real implementation, this would initialize the actual Twilio client
  throw new Error("Real Twilio client not implemented in dummy mode")
}

// Mock function for creating a call
async function mockCreateCall(params: any) {
  console.log("Mock create call with params:", params)

  // Validate that the URLs are using our dummy URLs
  if (params.url && !params.url.includes("dummy")) {
    console.warn("Warning: Using non-dummy URL for Twilio webhook:", params.url)
  }

  if (params.statusCallback && !params.statusCallback.includes("dummy")) {
    console.warn("Warning: Using non-dummy URL for Twilio status callback:", params.statusCallback)
  }

  return {
    sid: `DUMMY-CALL-${Date.now()}`,
    status: "initiated",
    from: params.from,
    to: params.to,
    dateCreated: new Date().toISOString(),
  }
}

// Mock function for listing calls
async function mockListCalls(params: any) {
  console.log("Mock list calls with params:", params)

  // Return dummy calls with Twilio-like structure
  return config.dummyCalls.map((call) => ({
    sid: call.id,
    from: call.caller,
    to: call.phoneNumber,
    duration: call.duration.replace("m", "").replace("s", ""),
    startTime: new Date().toISOString(),
    status: call.status === "completed" ? "completed" : call.status === "ongoing" ? "in-progress" : "no-answer",
    dateCreated: new Date().toISOString(),
  }))
}

// Mock function for fetching a specific call
async function mockFetchCall(callSid: string) {
  console.log("Mock fetch call with SID:", callSid)

  const dummyCall = config.dummyCalls.find((call) => call.id === callSid) || config.dummyCalls[0]

  return {
    sid: dummyCall.id,
    from: dummyCall.caller,
    to: dummyCall.phoneNumber,
    duration: dummyCall.duration.replace("m", "").replace("s", ""),
    startTime: new Date().toISOString(),
    status:
      dummyCall.status === "completed" ? "completed" : dummyCall.status === "ongoing" ? "in-progress" : "no-answer",
    dateCreated: new Date().toISOString(),
  }
}

// Mock function for listing recordings
async function mockListRecordings(params: any) {
  console.log("Mock list recordings with params:", params)
  return [
    {
      sid: "DUMMY-RECORDING-1",
      duration: "252",
      url: config.urls.appBaseUrl + "/dummy-recording.mp3",
      dateCreated: new Date().toISOString(),
    },
  ]
}

// Mock function for making an outbound call
export async function makeOutboundCall(to: string, from: string): Promise<string> {
  if (config.useDummyData) {
    console.log(`Mock outbound call from ${from} to ${to}`)

    // In a real implementation, we would use the actual app URL
    const webhookUrl = config.urls.twilioWebhook
    const statusCallbackUrl = config.urls.twilioStatusCallback

    console.log(`Using webhook URL: ${webhookUrl}`)
    console.log(`Using status callback URL: ${statusCallbackUrl}`)

    return `DUMMY-CALL-${Date.now()}`
  }

  // In a real implementation, this would make an actual Twilio call
  throw new Error("Real outbound calls not implemented in dummy mode")
}

// Mock function for getting call details
export async function getCallDetails(callSid: string): Promise<any> {
  if (config.useDummyData) {
    console.log(`Mock get call details for ${callSid}`)
    const dummyCall = config.dummyCalls.find((call) => call.id === callSid) || config.dummyCalls[0]

    return {
      sid: dummyCall.id,
      from: dummyCall.caller,
      to: dummyCall.phoneNumber,
      duration: dummyCall.duration.replace("m", "").replace("s", ""),
      startTime: new Date().toISOString(),
      status:
        dummyCall.status === "completed" ? "completed" : dummyCall.status === "ongoing" ? "in-progress" : "no-answer",
      dateCreated: new Date().toISOString(),
      url: config.urls.twilioWebhook,
      statusCallback: config.urls.twilioStatusCallback,
    }
  }

  // In a real implementation, this would fetch actual call details
  throw new Error("Real call details not implemented in dummy mode")
}

// Mock function for getting call recordings
export async function getCallRecordings(callSid: string): Promise<any[]> {
  if (config.useDummyData) {
    console.log(`Mock get call recordings for ${callSid}`)
    return [
      {
        sid: "DUMMY-RECORDING-1",
        duration: "252",
        url: config.urls.appBaseUrl + "/dummy-recording.mp3",
        dateCreated: new Date().toISOString(),
      },
    ]
  }

  // In a real implementation, this would fetch actual recordings
  throw new Error("Real call recordings not implemented in dummy mode")
}

