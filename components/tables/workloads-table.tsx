import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const workloads = [
  {
    name: "prod-payments",
    owner: "team-payments",
    env: "Production",
    cost: "$3,245,890",
    perfScore: 87,
    status: "Optimized",
  },
  {
    name: "prod-database",
    owner: "team-database",
    env: "Production",
    cost: "$2,187,450",
    perfScore: 91,
    status: "Optimized",
  },
  {
    name: "prod-api",
    owner: "team-backend",
    env: "Production",
    cost: "$1,892,340",
    perfScore: 72,
    status: "Needs attention",
  },
  {
    name: "data-lake",
    owner: "team-analytics",
    env: "Production",
    cost: "$1,456,780",
    perfScore: 94,
    status: "Optimized",
  },
  {
    name: "prod-containers",
    owner: "team-platform",
    env: "Production",
    cost: "$987,650",
    perfScore: 68,
    status: "Needs attention",
  },
  {
    name: "prod-cdn",
    owner: "team-frontend",
    env: "Production",
    cost: "$654,320",
    perfScore: 89,
    status: "Optimized",
  },
  {
    name: "analytics-cluster",
    owner: "team-analytics",
    env: "Production",
    cost: "$543,210",
    perfScore: 76,
    status: "Needs attention",
  },
  {
    name: "prod-cache",
    owner: "team-backend",
    env: "Production",
    cost: "$432,890",
    perfScore: 92,
    status: "Optimized",
  },
  {
    name: "staging-api",
    owner: "team-backend",
    env: "Staging",
    cost: "$298,760",
    perfScore: 65,
    status: "Needs attention",
  },
  {
    name: "prod-ml-training",
    owner: "team-ml",
    env: "Production",
    cost: "$245,120",
    perfScore: 71,
    status: "Needs attention",
  },
]

export function WorkloadsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-[#e5e7eb]">
          <TableHead className="text-[#545b64]">Workload</TableHead>
          <TableHead className="text-[#545b64]">Owner</TableHead>
          <TableHead className="text-[#545b64]">Environment</TableHead>
          <TableHead className="text-[#545b64]">Cost (30d)</TableHead>
          <TableHead className="text-[#545b64]">Perf. Efficiency</TableHead>
          <TableHead className="text-[#545b64]">Status</TableHead>
          <TableHead className="text-[#545b64]">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {workloads.map((workload) => (
          <TableRow key={workload.name} className="border-[#e5e7eb]">
            <TableCell className="font-mono text-sm text-[#232f3e]">{workload.name}</TableCell>
            <TableCell className="text-sm text-[#545b64]">{workload.owner}</TableCell>
            <TableCell>
              <Badge variant="outline" className="text-xs">
                {workload.env}
              </Badge>
            </TableCell>
            <TableCell className="font-semibold text-sm text-[#232f3e]">{workload.cost}</TableCell>
            <TableCell className="text-sm text-[#545b64]">{workload.perfScore}/100</TableCell>
            <TableCell>
              <Badge
                variant={workload.status === "Optimized" ? "default" : "secondary"}
                className={workload.status === "Optimized" ? "bg-green-600" : "bg-orange-500"}
              >
                {workload.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Button variant="link" size="sm" className="text-xs text-[#0972d3]">
                View details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
