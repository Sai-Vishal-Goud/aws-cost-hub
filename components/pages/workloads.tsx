import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FilterBar } from "../filters/filter-bar"
import { WorkloadsTable } from "../tables/workloads-table"

export function Workloads() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#232f3e] mb-1">Workloads</h1>
        <p className="text-sm text-[#545b64]">Resource groups derived from tags and FOCUS data</p>
      </div>

      <FilterBar />

      <Card className="border-[#e5e7eb]">
        <CardHeader>
          <CardTitle className="text-base font-medium text-[#232f3e]">All Workloads</CardTitle>
        </CardHeader>
        <CardContent>
          <WorkloadsTable />
        </CardContent>
      </Card>
    </div>
  )
}
