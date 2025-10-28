import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FilterBar } from "../filters/filter-bar"
import { AnomaliesTable } from "../tables/anomalies-table"
import { AnomalyChart } from "../charts/anomaly-chart"
import { Badge } from "@/components/ui/badge"
import { AIRecommendations } from "../ai/ai-recommendations"

export function Anomalies() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#232f3e] mb-1">Cost Anomalies</h1>
        <p className="text-sm text-[#545b64]">Detected anomalies from Cost Anomaly Detection and custom queries</p>
      </div>

      <FilterBar />

      <div className="grid grid-cols-3 gap-4">
        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Badge variant="destructive" className="text-xs">
                Critical
              </Badge>
              <span className="text-2xl font-semibold text-[#232f3e]">8</span>
            </div>
            <p className="text-sm text-[#545b64] mt-1">Require immediate attention</p>
          </CardContent>
        </Card>
        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Badge className="text-xs bg-orange-500">High</Badge>
              <span className="text-2xl font-semibold text-[#232f3e]">23</span>
            </div>
            <p className="text-sm text-[#545b64] mt-1">Significant cost impact</p>
          </CardContent>
        </Card>
        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                Medium
              </Badge>
              <span className="text-2xl font-semibold text-[#232f3e]">47</span>
            </div>
            <p className="text-sm text-[#545b64] mt-1">Monitor closely</p>
          </CardContent>
        </Card>
      </div>

      <AIRecommendations
        context={{
          pageType: "anomalies",
          metrics: {
            criticalAnomalies: 8,
            highAnomalies: 23,
            mediumAnomalies: 47,
            totalAnomalies: 78,
          },
        }}
      />

      <Card className="border-[#e5e7eb]">
        <CardHeader>
          <CardTitle className="text-base font-medium text-[#232f3e]">Anomaly Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <AnomalyChart />
        </CardContent>
      </Card>

      <Card className="border-[#e5e7eb]">
        <CardHeader>
          <CardTitle className="text-base font-medium text-[#232f3e]">Recent Anomalies</CardTitle>
        </CardHeader>
        <CardContent>
          <AnomaliesTable />
        </CardContent>
      </Card>
    </div>
  )
}
