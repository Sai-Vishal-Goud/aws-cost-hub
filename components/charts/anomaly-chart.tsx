"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { date: "Jan 1", anomalies: 8 },
  { date: "Jan 2", anomalies: 5 },
  { date: "Jan 3", anomalies: 12 },
  { date: "Jan 4", anomalies: 9 },
  { date: "Jan 5", anomalies: 15 },
  { date: "Jan 6", anomalies: 18 },
  { date: "Jan 7", anomalies: 6 },
]

const chartConfig = {
  anomalies: {
    label: "Anomalies",
    color: "#d13212",
  },
} satisfies ChartConfig

export function AnomalyChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          style={{ fontSize: "12px", fill: "#545b64" }}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} style={{ fontSize: "12px", fill: "#545b64" }} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="anomalies" fill="#d13212" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
