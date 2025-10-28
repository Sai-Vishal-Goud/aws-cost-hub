"use client"

import { useState } from "react"
import { X, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface AgentPanelProps {
  isOpen: boolean
  onClose: () => void
}

const suggestedPrompts = [
  "Top 10 savings opportunities this week by account",
  "Explain yesterday's $487K anomaly for prod-payments",
  "Show EC2 SP coverage and what to buy to reach 80%",
  "Which workloads have the highest carbon per $1K?",
  "Analyze data transfer costs across regions",
  "Compare RDS vs Aurora costs for prod workloads",
]

const mockResponses = [
  {
    prompt: "Top savings opportunities",
    insight: "I found 10 high-impact opportunities totaling $1.2M/month in savings",
    recommendations: [
      { title: "Purchase RDS Reserved Instances", savings: "$284,500/mo", confidence: "High" },
      { title: "Compute Savings Plan for EKS", savings: "$156,800/mo", confidence: "High" },
      { title: "Rightsize EC2 instances", savings: "$124,300/mo", confidence: "High" },
    ],
  },
]

export function AgentPanel({ isOpen, onClose }: AgentPanelProps) {
  const [messages, setMessages] = useState<Array<{ role: "user" | "agent"; content: string }>>([])
  const [input, setInput] = useState("")

  const handleSend = (prompt?: string) => {
    const message = prompt || input
    if (!message.trim()) return

    setMessages([...messages, { role: "user", content: message }])
    setInput("")

    // Mock agent response with enterprise-scale data
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          content:
            "I found 10 high-impact opportunities totaling $1.2M/month in savings across your infrastructure. The top recommendation is to purchase RDS Reserved Instances for prod-database clusters, which would save $284,500/month with high confidence. The second priority is implementing a Compute Savings Plan for your EKS workloads, saving $156,800/month.",
        },
      ])
    }, 1000)
  }

  return (
    <div
      className={cn(
        "fixed right-0 top-14 h-[calc(100vh-3.5rem)] w-96 border-l border-[#e5e7eb] bg-white shadow-lg transition-transform duration-300",
        isOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-[#e5e7eb] p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#0972d3]" />
            <h2 className="font-semibold text-[#232f3e]">AI Agent</h2>
            <Badge variant="secondary" className="text-xs">
              Preview
            </Badge>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-[#545b64]">
                Ask me anything about your AWS costs, optimizations, or anomalies. I can analyze your $150M annual spend
                and provide actionable insights.
              </p>

              <div className="space-y-2">
                <p className="text-xs font-medium text-[#545b64]">Suggested prompts:</p>
                {suggestedPrompts.map((prompt, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left text-xs h-auto py-2 px-3 bg-transparent"
                    onClick={() => handleSend(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message, idx) => (
              <div
                key={idx}
                className={cn(
                  "rounded-lg p-3 text-sm",
                  message.role === "user" ? "bg-[#f0f7ff] text-[#232f3e] ml-8" : "bg-[#f7f7f8] text-[#232f3e] mr-8",
                )}
              >
                {message.content}
              </div>
            ))
          )}

          {messages.length > 0 && messages[messages.length - 1].role === "agent" && (
            <Card className="border-[#e5e7eb]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-[#232f3e]">Recommended Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs bg-transparent">
                  Create Jira ticket
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-xs bg-transparent">
                  Notify resource owners
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-xs bg-transparent">
                  View detailed analysis
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-xs bg-transparent">
                  Export to CSV
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="border-t border-[#e5e7eb] p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 text-sm"
            />
            <Button size="icon" onClick={() => handleSend()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
