import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FilterBar } from "../filters/filter-bar"
import { BudgetsTable } from "../tables/budgets-table"
import { Button } from "@/components/ui/button"
import { AIRecommendations } from "../ai/ai-recommendations"

export function BudgetsForecast() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#232f3e] mb-1">Budgets & Forecast</h1>
          <p className="text-sm text-[#545b64]">Monitor spending against budgets and forecasts</p>
        </div>
        <Button>Create budget</Button>
      </div>

      <FilterBar />

      <AIRecommendations
        context={{
          pageType: "budgets",
          metrics: {
            activeBudgets: 12,
            budgetsExceeded: 3,
            forecastAccuracy: 87,
            monthlySpend: 1245000,
          },
        }}
      />

      <Card className="border-[#e5e7eb]">
        <CardHeader>
          <CardTitle className="text-base font-medium text-[#232f3e]">Active Budgets</CardTitle>
        </CardHeader>
        <CardContent>
          <BudgetsTable />
        </CardContent>
      </Card>
    </div>
  )
}
