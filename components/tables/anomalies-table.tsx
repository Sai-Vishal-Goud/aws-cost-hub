import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const anomalies = [
  {
    date: "2025-01-06",
    severity: "Critical",
    service: "EC2",
    account: "prod-payments",
    delta: "+$487,650",
    rootCause: "Multi-region deployment scaling",
  },
  {
    date: "2025-01-06",
    severity: "Critical",
    service: "Data Transfer",
    account: "prod-api",
    delta: "+$342,890",
    rootCause: "Cross-region replication spike",
  },
  {
    date: "2025-01-05",
    severity: "High",
    service: "RDS",
    account: "prod-database",
    delta: "+$234,560",
    rootCause: "Instance type upgrade",
  },
  {
    date: "2025-01-05",
    severity: "High",
    service: "EKS",
    account: "prod-containers",
    delta: "+$198,340",
    rootCause: "Auto-scaling event",
  },
  {
    date: "2025-01-04",
    severity: "High",
    service: "Redshift",
    account: "analytics",
    delta: "+$156,780",
    rootCause: "Cluster resize operation",
  },
  {
    date: "2025-01-04",
    severity: "Medium",
    service: "S3",
    account: "data-lake",
    delta: "+$87,920",
    rootCause: "Storage class misconfiguration",
  },
  {
    date: "2025-01-03",
    severity: "Medium",
    service: "Lambda",
    account: "prod-api",
    delta: "+$64,230",
    rootCause: "Increased invocation rate",
  },
  {
    date: "2025-01-03",
    severity: "Medium",
    service: "CloudFront",
    account: "prod-cdn",
    delta: "+$52,890",
    rootCause: "Traffic surge from new region",
  },
]

export function AnomaliesTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-[#e5e7eb]">
          <TableHead className="text-[#545b64]">Date</TableHead>
          <TableHead className="text-[#545b64]">Severity</TableHead>
          <TableHead className="text-[#545b64]">Service</TableHead>
          <TableHead className="text-[#545b64]">Account</TableHead>
          <TableHead className="text-[#545b64]">Cost Delta</TableHead>
          <TableHead className="text-[#545b64]">Root Cause</TableHead>
          <TableHead className="text-[#545b64]">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {anomalies.map((anomaly, idx) => (
          <TableRow key={idx} className="border-[#e5e7eb]">
            <TableCell className="text-sm text-[#545b64]">{anomaly.date}</TableCell>
            <TableCell>
              <Badge
                variant={anomaly.severity === "Critical" ? "destructive" : "default"}
                className={anomaly.severity === "High" ? "bg-orange-500" : ""}
              >
                {anomaly.severity}
              </Badge>
            </TableCell>
            <TableCell className="font-mono text-sm text-[#232f3e]">{anomaly.service}</TableCell>
            <TableCell className="text-sm text-[#545b64]">{anomaly.account}</TableCell>
            <TableCell className="font-semibold text-sm text-orange-600">{anomaly.delta}</TableCell>
            <TableCell className="text-sm text-[#545b64]">{anomaly.rootCause}</TableCell>
            <TableCell>
              <Button variant="link" size="sm" className="text-xs text-[#0972d3]">
                Investigate
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
