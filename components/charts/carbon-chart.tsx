"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { service: "EC2", co2e: 2845 },
  { service: "RDS", co2e: 1687 },
  { service: "Data Transfer", co2e: 1234 },
  { service: "S3", co2e: 892 },
  { service: "EKS", co2e: 654 },
  { service: "Lambda", co2e: 432 },
  { service: "CloudFront", co2e: 298 },
  { service: "DynamoDB", co2e: 203 },
]

const chartConfig = {
  co2e: {
    label: "CO₂e (tons)",
    color: "#16a34a",
  },
} satisfies ChartConfig

export function CarbonChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          type="number"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          style={{ fontSize: "12px", fill: "#545b64" }}
        />
        <YAxis
          type="category"
          dataKey="service"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          style={{ fontSize: "12px", fill: "#545b64" }}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="co2e" fill="#16a34a" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
