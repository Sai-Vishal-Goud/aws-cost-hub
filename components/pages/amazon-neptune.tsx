"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FilterBar } from "../filters/filter-bar"
import { GitBranch, TrendingUp, Database, DollarSign } from "lucide-react"
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
  { name: "prod-graph-db", instanceType: "db.r6g.xlarge", instances: 2, cost: 8400 },
  { name: "knowledge-graph", instanceType: "db.r5.large", instances: 1, cost: 3200 },
  { name: "dev-neptune", instanceType: "db.t3.medium", instances: 1, cost: 1200 },
]

const dailyCostTrend = [
  { date: "Jan 1", compute: 420, storage: 180, backup: 60 },
  { date: "Jan 8", compute: 445, storage: 190, backup: 65 },
  { date: "Jan 15", compute: 470, storage: 200, backup: 70 },
  { date: "Jan 22", compute: 498, storage: 210, backup: 75 },
  { date: "Jan 29", compute: 525, storage: 220, backup: 80 },
]

const queryPerformance = [
  { hour: "00:00", avgLatency: 12, queries: 1200 },
  { hour: "04:00", avgLatency: 10, queries: 800 },
  { hour: "08:00", avgLatency: 18, queries: 2800 },
  { hour: "12:00", avgLatency: 24, queries: 4200 },
  { hour: "16:00", avgLatency: 21, queries: 3800 },
  { hour: "20:00", avgLatency: 15, queries: 2200 },
]

export function AmazonNeptune() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#232f3e] mb-1">Amazon Neptune</h1>
        <p className="text-sm text-[#545b64]">Graph database cost analysis and query performance</p>
      </div>

      <FilterBar />

      <div className="grid grid-cols-4 gap-4">
        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-[#232f3e]">$12,800</div>
                <p className="text-sm text-[#545b64] mt-1">Total Neptune Cost</p>
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
                <div className="text-2xl font-semibold text-[#232f3e]">3</div>
                <p className="text-sm text-[#545b64] mt-1">Active Clusters</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <GitBranch className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-[#232f3e]">2.8 TB</div>
                <p className="text-sm text-[#545b64] mt-1">Graph Data Size</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Database className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-[#232f3e]">16ms</div>
                <p className="text-sm text-[#545b64] mt-1">Avg Query Latency</p>
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
            totalCost: 12800,
            activeClusters: 3,
            graphDataSize: 2.8,
            avgQueryLatency: 16,
            instanceUtilization: 71,
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
                <Line type="monotone" dataKey="avgLatency" stroke="#0972d3" strokeWidth={2} name="Avg Latency (ms)" />
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
              <Line type="monotone" dataKey="backup" stroke="#7d3ac1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
