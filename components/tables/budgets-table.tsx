import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const budgets = [
  {
    name: "Production Monthly",
    scope: "prod-* accounts",
    limit: "$15,000,000",
    actual: "$12,547,893",
    forecast: "$13,892,450",
    daysLeft: 24,
    status: "On track",
    percent: 84,
  },
  {
    name: "Development Quarterly",
    scope: "dev-* accounts",
    limit: "$4,500,000",
    actual: "$3,892,340",
    forecast: "$4,420,000",
    daysLeft: 67,
    status: "On track",
    percent: 87,
  },
  {
    name: "Data Transfer Monthly",
    scope: "All accounts",
    limit: "$1,500,000",
    actual: "$1,892,340",
    forecast: "$2,100,000",
    daysLeft: 24,
    status: "Exceeded",
    percent: 126,
  },
  {
    name: "Analytics Quarterly",
    scope: "analytics-* accounts",
    limit: "$2,000,000",
    actual: "$1,456,780",
    forecast: "$1,890,000",
    daysLeft: 67,
    status: "On track",
    percent: 73,
  },
  {
    name: "ML Training Monthly",
    scope: "ml-* accounts",
    limit: "$800,000",
    actual: "$734,560",
    forecast: "$820,000",
    daysLeft: 24,
    status: "At risk",
    percent: 92,
  },
]

export function BudgetsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-[#e5e7eb]">
          <TableHead className="text-[#545b64]">Budget</TableHead>
          <TableHead className="text-[#545b64]">Scope</TableHead>
          <TableHead className="text-[#545b64]">Limit</TableHead>
          <TableHead className="text-[#545b64]">Actual</TableHead>
          <TableHead className="text-[#545b64]">Forecast</TableHead>
          <TableHead className="text-[#545b64]">Progress</TableHead>
          <TableHead className="text-[#545b64]">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {budgets.map((budget) => (
          <TableRow key={budget.name} className="border-[#e5e7eb]">
            <TableCell className="font-medium text-sm text-[#232f3e]">{budget.name}</TableCell>
            <TableCell className="text-sm text-[#545b64]">{budget.scope}</TableCell>
            <TableCell className="text-sm text-[#545b64]">{budget.limit}</TableCell>
            <TableCell className="font-semibold text-sm text-[#232f3e]">{budget.actual}</TableCell>
            <TableCell className="text-sm text-[#545b64]">{budget.forecast}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <Progress value={budget.percent} className="h-2" />
                <span className="text-xs text-[#545b64]">{budget.percent}%</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge
                variant={budget.status === "Exceeded" ? "destructive" : "default"}
                className={
                  budget.status === "On track" ? "bg-green-600" : budget.status === "At risk" ? "bg-orange-500" : ""
                }
              >
                {budget.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
