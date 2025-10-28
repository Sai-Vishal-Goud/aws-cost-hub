"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FilterBar } from "../filters/filter-bar"
import { BarChart3, TrendingUp, HardDrive, DollarSign } from "lucide-react"
import { AIRecommendations } from "../ai/ai-recommendations"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts"

const clusterCostData = [
  { name: "prod-analytics", nodeType: "ra3.4xlarge", nodes: 4, cost: 28400 },
  { name: "data-warehouse", nodeType: "ra3.xlplus", nodes: 2, cost: 18200 },
  { name: "reporting", nodeType: "dc2.large", nodes: 3, cost: 12600 },
  { name: "dev-cluster", nodeType: "dc2.large", nodes: 2, cost: 8400 },
]

const dailyCostTrend = [
  { date: "Jan 1", compute: 2200, storage: 800, dataTransfer: 400 },
  { date: "Jan 8", compute: 2350, storage: 850, dataTransfer: 420 },
  { date: "Jan 15", compute: 2500, storage: 900, dataTransfer: 450 },
  { date: "Jan 22", compute: 2680, storage: 950, dataTransfer: 480 },
  { date: "Jan 29", compute: 2850, storage: 1000, dataTransfer: 500 },
]

const queryPerformance = [
  { hour: "00:00", avgDuration: 2.4, queries: 120 },
  { hour: "04:00", avgDuration: 1.8, queries: 80 },
  { hour: "08:00", avgDuration: 3.2, queries: 280 },
  { hour: "12:00", avgDuration: 4.1, queries: 420 },
  { hour: "16:00", avgDuration: 3.8, queries: 380 },
  { hour: "20:00", avgDuration: 2.9, queries: 220 },
]

export function AmazonRedshift() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#232f3e] mb-1">Amazon Redshift</h1>
        <p className="text-sm text-[#545b64]">Data warehouse cost analysis and query performance</p>
      </div>

      <FilterBar />

      <div className="grid grid-cols-4 gap-4">
        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-[#232f3e]">$67,600</div>
                <p className="text-sm text-[#545b64] mt-1">Total Redshift Cost</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-[#232f3e]">4</div>
                <p className="text-sm text-[#545b64] mt-1">Active Clusters</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-[#232f3e]">12.8 TB</div>
                <p className="text-sm text-[#545b64] mt-1">Data Stored</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                <HardDrive className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-[#232f3e]">3.2s</div>
                <p className="text-sm text-[#545b64] mt-1">Avg Query Time</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AIRecommendations
        context={{
          pageType: "storage",
          metrics: {
            totalCost: 67600,
            activeClusters: 4,
            dataStored: 12.8,
            avgQueryTime: 3.2,
            nodeUtilization: 68,
          },
        }}
      />

      <div className="grid grid-cols-2 gap-6">
        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <h3 className="text-sm font-semibold text-[#232f3e] mb-4">Cluster Costs</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={clusterCostData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fill: "#545b64", fontSize: 12 }} />
                <YAxis tick={{ fill: "#545b64", fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="cost" fill="#0972d3" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <h3 className="text-sm font-semibold text-[#232f3e] mb-4">Query Performance by Hour</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={queryPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="hour" tick={{ fill: "#545b64", fontSize: 12 }} />
                <YAxis tick={{ fill: "#545b64", fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="avgDuration" stroke="#0972d3" strokeWidth={2} name="Avg Duration (s)" />
                <Line type="monotone" dataKey="queries" stroke="#7d3ac1" strokeWidth={2} name="Query Count" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-[#e5e7eb]">
        <CardContent className="pt-6">
          <h3 className="text-sm font-semibold text-[#232f3e] mb-4">Daily Cost Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyCostTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fill: "#545b64", fontSize: 12 }} />
              <YAxis tick={{ fill: "#545b64", fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="compute" stroke="#0972d3" strokeWidth={2} />
              <Line type="monotone" dataKey="storage" stroke="#00a1c9" strokeWidth={2} />
              <Line type="monotone" dataKey="dataTransfer" stroke="#7d3ac1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
