"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, TrendingUp, AlertCircle, CheckCircle2, Loader2, ChevronRight } from "lucide-react"
import { generateRecommendations } from "@/app/actions/generate-recommendations"

interface Recommendation {
  id: string
  title: string
  description: string
  impact: "high" | "medium" | "low"
  confidence: number
  estimatedSavings?: string
  priority: number
  category: string
  actionItems: string[]
  reasoning: string
}

interface AIRecommendationsProps {
  context: {
    pageType: "compute" | "storage" | "s3" | "optimization-hub" | "anomalies" | "budgets" | "sustainability"
    metrics: Record<string, any>
    trends?: Record<string, any>
  }
}

export function AIRecommendations({ context }: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleGenerateRecommendations = async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await generateRecommendations(context)

      if (result.success && result.recommendations) {
        setRecommendations(result.recommendations)
      } else {
        setError(result.error || "Failed to generate recommendations")
      }
    } catch (err) {
      console.error("[v0] Error calling server action:", err)
      setError("Failed to generate AI recommendations. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      case "medium":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "low":
        return "text-blue-600 bg-blue-50 border-blue-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "high":
        return <AlertCircle className="h-4 w-4" />
      case "medium":
        return <TrendingUp className="h-4 w-4" />
      case "low":
        return <CheckCircle2 className="h-4 w-4" />
      default:
        return <CheckCircle2 className="h-4 w-4" />
    }
  }

  return (
    <Card className="p-6 border-[#e5e7eb] bg-gradient-to-br from-blue-50/50 to-purple-50/50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-[#16191f]">AI-Powered Recommendations</h2>
            <p className="text-xs text-[#545b64]">Intelligent insights based on your usage patterns</p>
          </div>
        </div>
        <Button
          onClick={handleGenerateRecommendations}
          disabled={loading}
          size="sm"
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Insights
            </>
          )}
        </Button>
      </div>

      {error && <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800 mb-4">{error}</div>}

      {recommendations.length > 0 && (
        <div className="space-y-3">
          {recommendations
            .sort((a, b) => a.priority - b.priority)
            .map((rec) => (
              <Card
                key={rec.id}
                className="p-4 border-l-4 hover:shadow-md transition-shadow cursor-pointer"
                style={{
                  borderLeftColor: rec.impact === "high" ? "#dc2626" : rec.impact === "medium" ? "#ea580c" : "#0972d3",
                }}
                onClick={() => setExpandedId(expandedId === rec.id ? null : rec.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium border ${getImpactColor(rec.impact)} flex items-center gap-1`}
                      >
                        {getImpactIcon(rec.impact)}
                        {rec.impact.toUpperCase()}
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                        {rec.category}
                      </span>
                      <span className="text-xs text-[#545b64]">Confidence: {rec.confidence}%</span>
                    </div>

                    <h3 className="text-sm font-semibold text-[#16191f] mb-1">{rec.title}</h3>
                    <p className="text-xs text-[#545b64] leading-relaxed mb-2">{rec.description}</p>

                    {rec.estimatedSavings && (
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 border border-green-200 rounded text-xs font-semibold text-green-700">
                        <TrendingUp className="h-3 w-3" />
                        Est. Savings: {rec.estimatedSavings}/mo
                      </div>
                    )}

                    {expandedId === rec.id && (
                      <div className="mt-4 pt-4 border-t border-[#e5e7eb] space-y-3">
                        <div>
                          <p className="text-xs font-semibold text-[#16191f] mb-2">Action Items:</p>
                          <ul className="space-y-1">
                            {rec.actionItems.map((item, idx) => (
                              <li key={idx} className="text-xs text-[#545b64] flex items-start gap-2">
                                <ChevronRight className="h-3 w-3 mt-0.5 flex-shrink-0 text-blue-500" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-xs font-semibold text-[#16191f] mb-1">AI Reasoning:</p>
                          <p className="text-xs text-[#545b64] leading-relaxed">{rec.reasoning}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <ChevronRight
                    className={`h-4 w-4 text-[#545b64] transition-transform flex-shrink-0 ${
                      expandedId === rec.id ? "rotate-90" : ""
                    }`}
                  />
                </div>
              </Card>
            ))}
        </div>
      )}

      {!loading && recommendations.length === 0 && (
        <div className="text-center py-8">
          <Sparkles className="h-12 w-12 text-[#545b64] mx-auto mb-3 opacity-50" />
          <p className="text-sm text-[#545b64]">Click "Generate Insights" to get AI-powered recommendations</p>
        </div>
      )}
    </Card>
  )
}
