import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FilterBar } from "../filters/filter-bar"
import { Leaf } from "lucide-react"
import { CarbonChart } from "../charts/carbon-chart"
import { AIRecommendations } from "../ai/ai-recommendations"

export function Sustainability() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#232f3e] mb-1">Sustainability</h1>
        <p className="text-sm text-[#545b64]">Carbon emissions and sustainability metrics</p>
      </div>

      <FilterBar />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-[#e5e7eb]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#545b64]">Total CO₂e</CardTitle>
            <Leaf className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#232f3e]">8,245 tons</div>
            <p className="text-xs text-green-600 mt-1">-3.8% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-[#e5e7eb]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#545b64]">Carbon per $1K Spend</CardTitle>
            <Leaf className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#232f3e]">0.657 tons</div>
            <p className="text-xs text-green-600 mt-1">-6.2% efficiency gain</p>
          </CardContent>
        </Card>
        <Card className="border-[#e5e7eb]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#545b64]">Green Region Usage</CardTitle>
            <Leaf className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#232f3e]">67%</div>
            <p className="text-xs text-[#545b64] mt-1">Target: 80%</p>
          </CardContent>
        </Card>
      </div>

      <AIRecommendations
        context={{
          pageType: "sustainability",
          metrics: {
            totalCO2e: 8245,
            carbonPerThousand: 0.657,
            greenRegionUsage: 67,
            targetGreenUsage: 80,
            monthlyChange: -3.8,
          },
        }}
      />

      <Card className="border-[#e5e7eb]">
        <CardHeader>
          <CardTitle className="text-base font-medium text-[#232f3e]">Carbon Emissions by Service</CardTitle>
        </CardHeader>
        <CardContent>
          <CarbonChart />
        </CardContent>
      </Card>
    </div>
  )
}
