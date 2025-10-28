import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, TrendingDown } from "lucide-react"

const drivers = [
  { service: "EC2", account: "prod-payments", cost: "$3,245,890", change: "+12.4%", percent: "25.9%", trend: "up" },
  { service: "RDS", account: "prod-database", cost: "$2,187,450", change: "+8.7%", percent: "17.4%", trend: "up" },
  {
    service: "Data Transfer",
    account: "multi-region",
    cost: "$1,892,340",
    change: "+15.2%",
    percent: "15.1%",
    trend: "up",
  },
  { service: "S3", account: "data-lake", cost: "$1,456,780", change: "-3.2%", percent: "11.6%", trend: "down" },
  { service: "EKS", account: "prod-containers", cost: "$987,650", change: "+18.9%", percent: "7.9%", trend: "up" },
  { service: "Lambda", account: "prod-api", cost: "$654,320", change: "+6.3%", percent: "5.2%", trend: "up" },
  { service: "CloudFront", account: "prod-cdn", cost: "$543,210", change: "+4.1%", percent: "4.3%", trend: "up" },
  { service: "DynamoDB", account: "prod-nosql", cost: "$432,890", change: "+9.8%", percent: "3.5%", trend: "up" },
  { service: "ElastiCache", account: "prod-cache", cost: "$298,760", change: "-1.4%", percent: "2.4%", trend: "down" },
  { service: "Redshift", account: "analytics", cost: "$245,120", change: "+22.3%", percent: "2.0%", trend: "up" },
]

export function TopDriversTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-[#e5e7eb]">
          <TableHead className="text-[#545b64]">Service</TableHead>
          <TableHead className="text-[#545b64]">Account/OU</TableHead>
          <TableHead className="text-[#545b64]">Cost (30d)</TableHead>
          <TableHead className="text-[#545b64]">MoM Change</TableHead>
          <TableHead className="text-[#545b64]">% of Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {drivers.map((driver) => (
          <TableRow key={driver.service} className="border-[#e5e7eb]">
            <TableCell className="font-mono text-sm text-[#232f3e]">{driver.service}</TableCell>
            <TableCell className="text-sm text-[#545b64]">{driver.account}</TableCell>
            <TableCell className="font-semibold text-sm text-[#232f3e]">{driver.cost}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                {driver.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-orange-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-green-600" />
                )}
                <span className={`text-sm ${driver.trend === "up" ? "text-orange-600" : "text-green-600"}`}>
                  {driver.change}
                </span>
              </div>
            </TableCell>
            <TableCell className="text-sm text-[#545b64]">{driver.percent}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
