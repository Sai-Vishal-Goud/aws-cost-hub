"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FilterBar } from "../filters/filter-bar"
import { Layers, TrendingUp, Cpu, DollarSign } from "lucide-react"
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
  { name: "prod-spark-cluster", instanceType: "m5.2xlarge", nodes: 8, cost: 18400 },
  { name: "analytics-cluster", instanceType: "r5.xlarge", nodes: 6, cost: 14200 },
  { name: "etl-pipeline", instanceType: "m5.xlarge", nodes: 4, cost: 9800 },
  { name: "dev-cluster", instanceType: "m5.large", nodes: 3, cost: 4600 },
]

const dailyCostTrend = [
  { date: "Jan 1", compute: 1800, storage: 400, dataTransfer: 200 },
  { date: "Jan 8", compute: 1950, storage: 420, dataTransfer: 220 },
  { date: "Jan 15", compute: 2100, storage: 450, dataTransfer: 240 },
  { date: "Jan 22", compute: 2280, storage: 480, dataTransfer: 260 },
  { date: "Jan 29", compute: 2450, storage: 500, dataTransfer: 280 },
]

const jobPerformance = [
  { hour: "00:00", duration: 45, jobs: 12 },
  { hour: "04:00", duration: 38, jobs: 8 },
  { hour: "08:00", duration: 62, jobs: 28 },
  { hour: "12:00", duration: 78, jobs: 42 },
  { hour: "16:00", duration: 68, jobs: 38 },
  { hour: "20:00", duration: 52, jobs: 22 },
]

export function AmazonEMR() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#232f3e] mb-1">Amazon EMR</h1>
        <p className="text-sm text-[#545b64]">Elastic MapReduce cost analysis and cluster optimization</p>
      </div>

      <FilterBar />

      <div className="grid grid-cols-4 gap-4">
        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-[#232f3e]">$47,000</div>
                <p className="text-sm text-[#545b64] mt-1">Total EMR Cost</p>
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
                <Layers className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-[#232f3e]">21</div>
                <p className="text-sm text-[#545b64] mt-1">Total Nodes</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Cpu className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-[#232f3e]">58 min</div>
                <p className="text-sm text-[#545b64] mt-1">Avg Job Duration</p>
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
          pageType: "compute",
          metrics: {
            totalCost: 47000,
            activeClusters: 4,
            totalNodes: 21,
            avgJobDuration: 58,
            clusterUtilization: 64,
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
            <h3 className="text-sm font-semibold text-[#232f3e] mb-4">Job Performance by Hour</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={jobPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="hour" tick={{ fill: "#545b64", fontSize: 12 }} />
                <YAxis tick={{ fill: "#545b64", fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="duration" stroke="#0972d3" strokeWidth={2} name="Avg Duration (min)" />
                <Line type="monotone" dataKey="jobs" stroke="#7d3ac1" strokeWidth={2} name="Job Count" />
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
