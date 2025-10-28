"use server"

import { generateText } from "ai"

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

interface GenerateRecommendationsInput {
  pageType: "compute" | "storage" | "s3" | "optimization-hub" | "anomalies" | "budgets" | "sustainability"
  metrics: Record<string, any>
  trends?: Record<string, any>
}

export async function generateRecommendations(
  context: GenerateRecommendationsInput,
): Promise<{ success: boolean; recommendations?: Recommendation[]; error?: string }> {
  try {
    const prompt = `You are an expert cloud cost optimization AI assistant. Analyze the following ${context.pageType} metrics and generate 4 specific, actionable recommendations.

Context:
- Page Type: ${context.pageType}
- Metrics: ${JSON.stringify(context.metrics, null, 2)}
${context.trends ? `- Trends: ${JSON.stringify(context.trends, null, 2)}` : ""}

${getContextualGuidance(context.pageType)}

For each recommendation, provide:
1. A clear, specific title
2. A detailed description (2-3 sentences)
3. Impact level (high/medium/low)
4. Confidence score (0-100)
5. Estimated monthly savings (if applicable, as a dollar amount)
6. Priority (1-4, where 1 is highest)
7. Category (cost, performance, security, or efficiency)
8. 2-3 specific action items
9. Brief reasoning based on the data

Return ONLY a valid JSON array of recommendations. No markdown, no code blocks, just the JSON array.

Example format:
[
  {
    "id": "rec-1",
    "title": "Increase Savings Plan Coverage",
    "description": "Your current Savings Plan coverage is at 68.5%, leaving significant on-demand spend exposed. Based on your usage patterns, increasing coverage to 85% would provide substantial savings.",
    "impact": "high",
    "confidence": 92,
    "estimatedSavings": "$18,200",
    "priority": 1,
    "category": "cost",
    "actionItems": [
      "Review 90-day usage patterns to identify stable workloads",
      "Purchase additional Compute Savings Plans for consistent usage",
      "Set up automated alerts for coverage drops below 80%"
    ],
    "reasoning": "Analysis shows consistent baseline usage of $234K/month with only 68.5% coverage, indicating $73K in on-demand spend that could be covered."
  }
]`

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt,
      temperature: 0.7,
    })

    console.log("[v0] AI Response:", text)

    // Parse the response
    let parsedRecommendations: Recommendation[]
    try {
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        parsedRecommendations = JSON.parse(jsonMatch[0])
      } else {
        parsedRecommendations = JSON.parse(text)
      }
    } catch (parseError) {
      console.error("[v0] Failed to parse AI response:", parseError)
      return {
        success: false,
        error: "Failed to parse AI recommendations. Please try again.",
      }
    }

    return {
      success: true,
      recommendations: parsedRecommendations,
    }
  } catch (err) {
    console.error("[v0] Error generating recommendations:", err)
    return {
      success: false,
      error: "Failed to generate AI recommendations. Please try again.",
    }
  }
}

function getContextualGuidance(pageType: string): string {
  const guidance = {
    compute: `Focus on: VM instance optimization, Savings Plans, Spot instances, right-sizing, generation upgrades, and elasticity improvements.`,
    storage: `Focus on: Backup retention policies, storage tiering, cross-region replication costs, snapshot lifecycle, and unused backup cleanup.`,
    s3: `Focus on: Storage class optimization, lifecycle policies, request cost reduction, CloudFront integration, and intelligent tiering.`,
    "optimization-hub": `Focus on: Cross-service optimization opportunities, reserved capacity recommendations, unused resources, and architectural improvements.`,
    anomalies: `Focus on: Cost spike root causes, unusual usage patterns, potential waste, automated alerting, and preventive measures.`,
    budgets: `Focus on: Budget threshold optimization, forecast accuracy improvements, cost allocation strategies, and proactive budget management.`,
    sustainability: `Focus on: Carbon footprint reduction, renewable energy usage, resource efficiency, workload scheduling, and green architecture patterns.`,
  }
  return guidance[pageType as keyof typeof guidance] || ""
}
