import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FilterBar } from "../filters/filter-bar"
import { OptimizationTable } from "../tables/optimization-table"
import { Badge } from "@/components/ui/badge"
import { AIRecommendations } from "../ai/ai-recommendations"

export function OptimizationHub() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#232f3e] mb-1">Optimization Hub</h1>
        <p className="text-sm text-[#545b64]">
          Recommendations from Compute Optimizer, Trusted Advisor, and custom heuristics
        </p>
      </div>

      <FilterBar />

      <div className="flex gap-4">
        <Card className="border-[#e5e7eb] flex-1">
          <CardContent className="pt-6">
            <div className="text-3xl font-semibold text-[#232f3e]">$2,845,670</div>
            <p className="text-sm text-[#545b64] mt-1">Total savings identified</p>
          </CardContent>
        </Card>
        <Card className="border-[#e5e7eb] flex-1">
          <CardContent className="pt-6">
            <div className="text-3xl font-semibold text-[#232f3e]">287</div>
            <p className="text-sm text-[#545b64] mt-1">Active recommendations</p>
          </CardContent>
        </Card>
        <Card className="border-[#e5e7eb] flex-1">
          <CardContent className="pt-6">
            <div className="text-3xl font-semibold text-[#232f3e]">64</div>
            <p className="text-sm text-[#545b64] mt-1">Implemented this month</p>
          </CardContent>
        </Card>
      </div>

      <AIRecommendations
        context={{
          pageType: "optimization-hub",
          metrics: {
            totalSavings: 2845670,
            activeRecommendations: 287,
            implementedThisMonth: 64,
            highImpact: 42,
            mediumImpact: 156,
            lowImpact: 89,
          },
        }}
      />

      <Card className="border-[#e5e7eb]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium text-[#232f3e]">Recommendations</CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs">
                High impact: 42
              </Badge>
              <Badge variant="outline" className="text-xs">
                Medium: 156
              </Badge>
              <Badge variant="outline" className="text-xs">
                Low: 89
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <OptimizationTable />
        </CardContent>
      </Card>
    </div>
  )
}
