"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { date: "Dec 1", spend: 10200000 },
  { date: "Dec 8", spend: 10850000 },
  { date: "Dec 15", spend: 11340000 },
  { date: "Dec 22", spend: 11920000 },
  { date: "Dec 29", spend: 12547000 },
  { date: "Jan 5", spend: 13892000 },
]

const chartConfig = {
  spend: {
    label: "Spend",
    color: "#0972d3",
  },
} satisfies ChartConfig

export function SpendChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          style={{ fontSize: "12px", fill: "#545b64" }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
          style={{ fontSize: "12px", fill: "#545b64" }}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area type="monotone" dataKey="spend" stroke="#0972d3" fill="#e6f2ff" strokeWidth={2} />
      </AreaChart>
    </ChartContainer>
  )
}
