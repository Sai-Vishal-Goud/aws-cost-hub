import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

const recommendations = [
  {
    resource: "rds-prod-cluster-payments-01",
    type: "Reserved Instance",
    savings: "$284,500/mo",
    effort: "Low",
    confidence: "High",
    owner: "team-payments",
  },
  {
    resource: "eks-prod-cluster-api",
    type: "Compute Savings Plan",
    savings: "$156,800/mo",
    effort: "Low",
    confidence: "High",
    owner: "team-platform",
  },
  {
    resource: "i-0a1b2c3d4e5f6g7h8",
    type: "Rightsizing",
    savings: "$124,300/mo",
    effort: "Low",
    confidence: "High",
    owner: "team-payments",
  },
  {
    resource: "redshift-analytics-cluster",
    type: "Reserved Instance",
    savings: "$98,450/mo",
    effort: "Low",
    confidence: "High",
    owner: "team-analytics",
  },
  {
    resource: "vol-0x9y8z7w6v5u4t3s2",
    type: "EBS gp3 migration",
    savings: "$87,200/mo",
    effort: "Low",
    confidence: "High",
    owner: "team-database",
  },
  {
    resource: "i-9z8y7x6w5v4u3t2s",
    type: "Idle resource",
    savings: "$76,890/mo",
    effort: "Medium",
    confidence: "Medium",
    owner: "team-analytics",
  },
  {
    resource: "nat-gateway-us-east-1a",
    type: "NAT Gateway optimization",
    savings: "$54,320/mo",
    effort: "Medium",
    confidence: "High",
    owner: "team-network",
  },
  {
    resource: "s3-bucket-logs-archive",
    type: "S3 Intelligent-Tiering",
    savings: "$43,670/mo",
    effort: "Low",
    confidence: "High",
    owner: "team-security",
  },
  {
    resource: "elasticache-prod-redis",
    type: "Reserved Instance",
    savings: "$38,920/mo",
    effort: "Low",
    confidence: "High",
    owner: "team-cache",
  },
  {
    resource: "lambda-prod-image-processor",
    type: "Graviton2 migration",
    savings: "$32,450/mo",
    effort: "Medium",
    confidence: "Medium",
    owner: "team-media",
  },
]

export function OptimizationTable() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          Create ticket
        </Button>
        <Button variant="outline" size="sm">
          Notify owner
        </Button>
        <Button variant="outline" size="sm">
          Mark implemented
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-[#e5e7eb]">
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead className="text-[#545b64]">Resource</TableHead>
            <TableHead className="text-[#545b64]">Type</TableHead>
            <TableHead className="text-[#545b64]">Projected Savings</TableHead>
            <TableHead className="text-[#545b64]">Effort</TableHead>
            <TableHead className="text-[#545b64]">Confidence</TableHead>
            <TableHead className="text-[#545b64]">Owner</TableHead>
            <TableHead className="text-[#545b64]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recommendations.map((rec) => (
            <TableRow key={rec.resource} className="border-[#e5e7eb]">
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell className="font-mono text-xs text-[#232f3e]">{rec.resource}</TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs">
                  {rec.type}
                </Badge>
              </TableCell>
              <TableCell className="font-semibold text-sm text-[#232f3e]">{rec.savings}</TableCell>
              <TableCell>
                <Badge variant={rec.effort === "Low" ? "secondary" : "outline"} className="text-xs">
                  {rec.effort}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={rec.confidence === "High" ? "default" : "secondary"} className="text-xs">
                  {rec.confidence}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-[#545b64]">{rec.owner}</TableCell>
              <TableCell>
                <Button variant="link" size="sm" className="text-xs text-[#0972d3]">
                  View details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
