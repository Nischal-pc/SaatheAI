import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
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
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Configure your EchoLink AI voice calling system</p>
        </div>
      </div>

      <Tabs defaultValue="twilio" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="twilio">Twilio</TabsTrigger>
          <TabsTrigger value="huggingface">HuggingFace</TabsTrigger>
          <TabsTrigger value="llama">LLAMA 3.0</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>

        <TabsContent value="twilio">
          <Card>
            <CardHeader>
              <CardTitle>Twilio Configuration</CardTitle>
              <CardDescription>Configure your Twilio account settings for voice calling</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="account-sid">Account SID</Label>
                <Input id="account-sid" placeholder="Enter your Twilio Account SID" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="auth-token">Auth Token</Label>
                <Input id="auth-token" type="password" placeholder="Enter your Twilio Auth Token" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone-number">Twilio Phone Number</Label>
                <Input id="phone-number" placeholder="+1234567890" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input id="webhook-url" placeholder="https://your-ngrok-url.ngrok.io/voice" />
                <p className="text-xs text-muted-foreground">
                  This is the URL Twilio will use to communicate with your application
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Test Connection</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="huggingface">
          <Card>
            <CardHeader>
              <CardTitle>HuggingFace Configuration</CardTitle>
              <CardDescription>Configure your HuggingFace API settings for natural language processing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hf-token">API Token</Label>
                <Input id="hf-token" type="password" placeholder="Enter your HuggingFace API token" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hf-model">Model</Label>
                <Input id="hf-model" placeholder="Enter the model name (e.g., gpt2, bert-base-uncased)" />
              </div>
              <div className="space-y-2 flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="cache-responses">Cache Responses</Label>
                  <p className="text-sm text-muted-foreground">Cache model responses to improve performance</p>
                </div>
                <Switch id="cache-responses" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Test API</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="llama">
          <Card>
            <CardHeader>
              <CardTitle>Meta LLAMA 3.0 Configuration</CardTitle>
              <CardDescription>Configure settings for Meta's LLAMA 3.0 large language model</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="llama-endpoint">API Endpoint</Label>
                <Input id="llama-endpoint" placeholder="Enter the LLAMA API endpoint" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="llama-key">API Key</Label>
                <Input id="llama-key" type="password" placeholder="Enter your LLAMA API key" />
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                <Label>Model Parameters</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature</Label>
                    <Input id="temperature" type="number" placeholder="0.7" min="0" max="1" step="0.1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-tokens">Max Tokens</Label>
                    <Input id="max-tokens" type="number" placeholder="1024" min="1" />
                  </div>
                </div>
              </div>
              <div className="space-y-2 flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="streaming">Enable Streaming</Label>
                  <p className="text-sm text-muted-foreground">Stream responses for faster interaction</p>
                </div>
                <Switch id="streaming" defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Test Model</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure general settings for your EchoLink system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="system-name">System Name</Label>
                <Input id="system-name" placeholder="EchoLink" />
              </div>
              <div className="space-y-2 flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="logging">Enable Logging</Label>
                  <p className="text-sm text-muted-foreground">Log all calls and interactions for analysis</p>
                </div>
                <Switch id="logging" defaultChecked />
              </div>
              <div className="space-y-2 flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="analytics">Enable Analytics</Label>
                  <p className="text-sm text-muted-foreground">Collect usage data to improve the system</p>
                </div>
                <Switch id="analytics" defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ngrok-url">Ngrok URL</Label>
                <Input id="ngrok-url" placeholder="https://your-ngrok-url.ngrok.io" />
                <p className="text-xs text-muted-foreground">
                  Your Ngrok URL for exposing your local server to the internet
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

