"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Check, Info, Save, RefreshCw, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { config } from "@/lib/config"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("twilio")
  const [testingConnection, setTestingConnection] = useState(false)
  const [testSuccess, setTestSuccess] = useState<boolean | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const { profile } = useAuth()

  // Form states
  const [accountSid, setAccountSid] = useState("")
  const [authToken, setAuthToken] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [webhookUrl, setWebhookUrl] = useState("")
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(1024)
  const [streamingEnabled, setStreamingEnabled] = useState(true)
  const [systemPromptEnabled, setSystemPromptEnabled] = useState(false)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setAccountSid("AC00000000000000000000000000000000")
      setAuthToken("0000000000000000000000000000000000")
      setPhoneNumber("+15555555555")
      setWebhookUrl(config.urls.twilioWebhook)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleTestConnection = () => {
    setTestingConnection(true)
    // Simulate API call
    setTimeout(() => {
      setTestSuccess(true)
      setTestingConnection(false)
      toast({
        title: "Connection successful",
        description: "Your Twilio account is properly configured.",
      })
    }, 1500)
  }

  const handleSaveChanges = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold">Settings</h2>
            <p className="text-muted-foreground">Configure your EchoLink AI voice calling system</p>
          </div>
          <Button variant="gradient" className="gap-1.5" onClick={handleSaveChanges} disabled={isSaving}>
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save All Changes"}
          </Button>
        </div>

        <Tabs defaultValue="twilio" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-muted/50 p-1 rounded-xl">
            <TabsTrigger
              value="twilio"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
            >
              Twilio
            </TabsTrigger>
            <TabsTrigger
              value="huggingface"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
            >
              HuggingFace
            </TabsTrigger>
            <TabsTrigger
              value="llama"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
            >
              LLAMA 3.0
            </TabsTrigger>
            <TabsTrigger
              value="general"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
            >
              General
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="twilio" className="mt-0">
                <Card className="border-2 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 overflow-hidden">
                  <CardHeader>
                    <CardTitle>Twilio Configuration</CardTitle>
                    <CardDescription>Configure your Twilio account settings for voice calling</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {isLoading ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full" />
                          </div>
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-10 w-full" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="account-sid">Account SID</Label>
                            <Input
                              id="account-sid"
                              placeholder="Enter your Twilio Account SID"
                              value={accountSid}
                              onChange={(e) => setAccountSid(e.target.value)}
                              className="bg-background/50 focus:bg-background transition-colors"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="auth-token">Auth Token</Label>
                            <Input
                              id="auth-token"
                              type="password"
                              placeholder="Enter your Twilio Auth Token"
                              value={authToken}
                              onChange={(e) => setAuthToken(e.target.value)}
                              className="bg-background/50 focus:bg-background transition-colors"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone-number">Twilio Phone Number</Label>
                          <Input
                            id="phone-number"
                            placeholder="+1234567890"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="webhook-url">Webhook URL</Label>
                          <Input
                            id="webhook-url"
                            placeholder="https://your-ngrok-url.ngrok.io/voice"
                            value={webhookUrl}
                            onChange={(e) => setWebhookUrl(e.target.value)}
                            className="bg-background/50 focus:bg-background transition-colors"
                          />
                          <p className="text-xs text-muted-foreground">
                            This is the URL Twilio will use to communicate with your application
                          </p>
                        </div>

                        {testSuccess !== null && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div
                              className={`p-3 rounded-lg flex items-center gap-2 ${testSuccess ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/10 text-rose-600 dark:text-rose-400"}`}
                            >
                              {testSuccess ? (
                                <Check className="h-4 w-4 flex-shrink-0" />
                              ) : (
                                <Info className="h-4 w-4 flex-shrink-0" />
                              )}
                              <p className="text-sm">
                                {testSuccess
                                  ? "Connection successful! Your Twilio account is properly configured."
                                  : "Connection failed. Please check your credentials and try again."}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={handleTestConnection}
                      disabled={testingConnection || isLoading}
                      className="gap-1.5"
                    >
                      {testingConnection ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Testing...
                        </>
                      ) : (
                        "Test Connection"
                      )}
                    </Button>
                    <Button variant="gradient" onClick={handleSaveChanges} disabled={isSaving || isLoading}>
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="llama" className="mt-0">
                <Card className="border-2 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 overflow-hidden">
                  <CardHeader>
                    <CardTitle>Meta LLAMA 3.0 Configuration</CardTitle>
                    <CardDescription>Configure settings for Meta's LLAMA 3.0 large language model</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {isLoading ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Skeleton className="h-10 w-full" />
                          <Skeleton className="h-10 w-full" />
                        </div>
                        <Skeleton className="h-4 w-24" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Skeleton className="h-24 w-full" />
                          <Skeleton className="h-24 w-full" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Skeleton className="h-16 w-full" />
                          <Skeleton className="h-16 w-full" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="llama-endpoint">API Endpoint</Label>
                            <Input
                              id="llama-endpoint"
                              placeholder="Enter the LLAMA API endpoint"
                              defaultValue={config.urls.llamaApiEndpoint}
                              className="bg-background/50 focus:bg-background transition-colors"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="llama-key">API Key</Label>
                            <Input
                              id="llama-key"
                              type="password"
                              placeholder="Enter your LLAMA API key"
                              defaultValue="dummy_llama_api_key"
                              className="bg-background/50 focus:bg-background transition-colors"
                            />
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="space-y-4">
                          <Label>Model Parameters</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4 p-4 rounded-lg bg-muted/50">
                              <div className="flex justify-between">
                                <Label htmlFor="temperature">Temperature</Label>
                                <span className="text-sm text-muted-foreground">{temperature}</span>
                              </div>
                              <Slider
                                id="temperature"
                                value={[temperature]}
                                onValueChange={(value) => setTemperature(value[0])}
                                max={1}
                                step={0.1}
                                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-primary [&_[role=slider]]:border-2 [&_[role=slider]]:border-background"
                              />
                              <p className="text-xs text-muted-foreground">
                                Controls randomness: Lower values are more deterministic, higher values are more
                                creative.
                              </p>
                            </div>

                            <div className="space-y-4 p-4 rounded-lg bg-muted/50">
                              <div className="flex justify-between">
                                <Label htmlFor="max-tokens">Max Tokens</Label>
                                <span className="text-sm text-muted-foreground">{maxTokens}</span>
                              </div>
                              <Slider
                                id="max-tokens"
                                value={[maxTokens]}
                                onValueChange={(value) => setMaxTokens(value[0])}
                                max={2048}
                                step={64}
                                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-primary [&_[role=slider]]:border-2 [&_[role=slider]]:border-background"
                              />
                              <p className="text-xs text-muted-foreground">
                                Maximum number of tokens to generate in the completion.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2 flex items-center justify-between p-4 rounded-lg bg-muted/50">
                            <div className="space-y-0.5">
                              <Label htmlFor="streaming">Enable Streaming</Label>
                              <p className="text-sm text-muted-foreground">Stream responses for faster interaction</p>
                            </div>
                            <Switch id="streaming" checked={streamingEnabled} onCheckedChange={setStreamingEnabled} />
                          </div>

                          <div className="space-y-2 flex items-center justify-between p-4 rounded-lg bg-muted/50">
                            <div className="space-y-0.5">
                              <Label htmlFor="system-prompt">Use Custom System Prompt</Label>
                              <p className="text-sm text-muted-foreground">Define custom behavior for the AI</p>
                            </div>
                            <Switch
                              id="system-prompt"
                              checked={systemPromptEnabled}
                              onCheckedChange={setSystemPromptEnabled}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" disabled={isLoading}>
                      Test Model
                    </Button>
                    <Button variant="gradient" onClick={handleSaveChanges} disabled={isSaving || isLoading}>
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="huggingface" className="mt-0">
                <Card className="border-2 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 overflow-hidden">
                  <CardHeader>
                    <CardTitle>HuggingFace Configuration</CardTitle>
                    <CardDescription>
                      Configure your HuggingFace API settings for natural language processing
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {isLoading ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Skeleton className="h-10 w-full" />
                          <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Skeleton className="h-24 w-full" />
                          <Skeleton className="h-24 w-full" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="hf-token">API Token</Label>
                            <Input
                              id="hf-token"
                              type="password"
                              placeholder="Enter your HuggingFace API token"
                              defaultValue="dummy_huggingface_token"
                              className="bg-background/50 focus:bg-background transition-colors"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="hf-model">Model</Label>
                            <Input
                              id="hf-model"
                              placeholder="Enter the model name (e.g., gpt2, bert-base-uncased)"
                              defaultValue="bert-base-uncased"
                              className="bg-background/50 focus:bg-background transition-colors"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2 flex items-center justify-between p-4 rounded-lg bg-muted/50">
                            <div className="space-y-0.5">
                              <Label htmlFor="cache-responses">Cache Responses</Label>
                              <p className="text-sm text-muted-foreground">
                                Cache model responses to improve performance
                              </p>
                            </div>
                            <Switch id="cache-responses" defaultChecked />
                          </div>

                          <div className="space-y-2 flex items-center justify-between p-4 rounded-lg bg-muted/50">
                            <div className="space-y-0.5">
                              <Label htmlFor="use-quantized">Use Quantized Models</Label>
                              <p className="text-sm text-muted-foreground">Optimize for speed with quantized models</p>
                            </div>
                            <Switch id="use-quantized" />
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" disabled={isLoading}>
                      Test API
                    </Button>
                    <Button variant="gradient" onClick={handleSaveChanges} disabled={isSaving || isLoading}>
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="general" className="mt-0">
                <Card className="border-2 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 overflow-hidden">
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>Configure general settings for your EchoLink system</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {isLoading ? (
                      <div className="space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Skeleton className="h-24 w-full" />
                          <Skeleton className="h-24 w-full" />
                        </div>
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="system-name">System Name</Label>
                          <Input
                            id="system-name"
                            placeholder="EchoLink"
                            defaultValue="EchoLink"
                            className="bg-background/50 focus:bg-background transition-colors"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2 flex items-center justify-between p-4 rounded-lg bg-muted/50">
                            <div className="space-y-0.5">
                              <Label htmlFor="logging">Enable Logging</Label>
                              <p className="text-sm text-muted-foreground">
                                Log all calls and interactions for analysis
                              </p>
                            </div>
                            <Switch id="logging" defaultChecked />
                          </div>

                          <div className="space-y-2 flex items-center justify-between p-4 rounded-lg bg-muted/50">
                            <div className="space-y-0.5">
                              <Label htmlFor="analytics">Enable Analytics</Label>
                              <p className="text-sm text-muted-foreground">Collect usage data to improve the system</p>
                            </div>
                            <Switch id="analytics" defaultChecked />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="ngrok-url">Ngrok URL</Label>
                          <Input
                            id="ngrok-url"
                            placeholder="https://your-ngrok-url.ngrok.io"
                            defaultValue={config.urls.ngrokUrl}
                            className="bg-background/50 focus:bg-background transition-colors"
                          />
                          <p className="text-xs text-muted-foreground">
                            Your Ngrok URL for exposing your local server to the internet
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="app-url">Application URL</Label>
                          <Input
                            id="app-url"
                            placeholder="https://your-app-url.com"
                            defaultValue={config.urls.appBaseUrl}
                            className="bg-background/50 focus:bg-background transition-colors"
                          />
                          <p className="text-xs text-muted-foreground">
                            The base URL of your application (used for callbacks and webhooks)
                          </p>
                        </div>
                      </>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" disabled={isLoading}>
                      Reset to Defaults
                    </Button>
                    <Button variant="gradient" onClick={handleSaveChanges} disabled={isSaving || isLoading}>
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </div>
  )
}

