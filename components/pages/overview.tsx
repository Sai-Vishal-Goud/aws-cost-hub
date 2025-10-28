import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, Zap, Leaf } from "lucide-react"
import { FilterBar } from "../filters/filter-bar"
import { SpendChart } from "../charts/spend-chart"
import { TopDriversTable } from "../tables/top-drivers-table"
import { Button } from "@/components/ui/button"

const kpis = [
  { label: "Total Monthly Spend", value: "$12,547,893", change: "+8.3%", icon: DollarSign },
  { label: "Forecast (Next 30d)", value: "$13,892,450", change: "+10.7%", icon: TrendingUp },
  { label: "Savings Identified", value: "$2,845,670", change: "Available", icon: Zap },
  { label: "Carbon Impact", value: "8,245 tons CO₂e", change: "-3.8%", icon: Leaf },
]

export function Overview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#232f3e] mb-1">Overview</h1>
        <p className="text-sm text-[#545b64]">Cost optimization and sustainability insights</p>
      </div>

      <FilterBar />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <Card key={kpi.label} className="border-[#e5e7eb]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#545b64]">{kpi.label}</CardTitle>
                <Icon className="h-4 w-4 text-[#545b64]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-[#232f3e]">{kpi.value}</div>
                <p className="text-xs text-[#545b64] mt-1">{kpi.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="border-[#e5e7eb]">
        <CardHeader>
          <CardTitle className="text-base font-medium text-[#232f3e]">Spend Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <SpendChart />
        </CardContent>
      </Card>

      <Card className="border-[#e5e7eb]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-medium text-[#232f3e]">Top Cost Drivers</CardTitle>
          <Button variant="outline" size="sm" className="text-xs bg-transparent">
            View all
          </Button>
        </CardHeader>
        <CardContent>
          <TopDriversTable />
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" size="sm">
          Create budget
        </Button>
        <Button variant="outline" size="sm">
          Review rightsizing
        </Button>
        <Button variant="outline" size="sm">
          Download FOCUS export
        </Button>
      </div>
    </div>
  )
}
