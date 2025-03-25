// Configuration settings for the application
export const config = {
  // Set to true to use dummy data instead of actual API calls
  useDummyData: true,

  // Dummy URLs for external services
  urls: {
    // Twilio webhook URLs
    twilioWebhook: "https://dummy-webhook.echolink.example/voice",
    twilioStatusCallback: "https://dummy-webhook.echolink.example/status",

    // LLAMA API endpoints
    llamaApiEndpoint: "https://api.dummy-llama.example/v1/chat/completions",

    // Application URLs
    appBaseUrl: "https://echolink-demo.example",

    // Ngrok URL for local development
    ngrokUrl: "https://dummy-ngrok.example",
  },

  // Dummy call data for testing
  dummyCalls: [
    {
      id: "dummy-1",
      caller: "John Smith",
      phoneNumber: "+1 (555) 123-4567",
      duration: "4m 12s",
      timestamp: "Today, 10:30 AM",
      status: "completed",
    },
    {
      id: "dummy-2",
      caller: "Sarah Johnson",
      phoneNumber: "+1 (555) 987-6543",
      duration: "2m 45s",
      timestamp: "Today, 9:15 AM",
      status: "completed",
    },
    {
      id: "dummy-3",
      caller: "Michael Brown",
      phoneNumber: "+1 (555) 456-7890",
      duration: "0m 0s",
      timestamp: "Yesterday, 4:30 PM",
      status: "missed",
    },
    {
      id: "dummy-4",
      caller: "Emma Wilson",
      phoneNumber: "+1 (555) 789-0123",
      duration: "8m 32s",
      timestamp: "Now",
      status: "ongoing",
    },
  ],

  // Dummy conversation for testing
  dummyConversation: [
    { speaker: "AI", text: "Hello, thank you for calling EchoLink. How can I assist you today?", time: "00:00" },
    { speaker: "User", text: "Hi, I'd like to check my account balance please.", time: "00:05" },
    {
      speaker: "AI",
      text: "I'd be happy to help you check your account balance. Could you please verify your identity by providing your account number?",
      time: "00:10",
    },
    { speaker: "User", text: "Sure, my account number is 12345678.", time: "00:20" },
    {
      speaker: "AI",
      text: "Thank you for providing your account number. For security purposes, could you also please confirm your date of birth?",
      time: "00:25",
    },
    { speaker: "User", text: "It's January 15, 1980.", time: "00:32" },
    {
      speaker: "AI",
      text: "Thank you for verifying your information. I can confirm that your current account balance is $1,250.75. Is there anything else you would like to know?",
      time: "00:38",
    },
  ],
}

