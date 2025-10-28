"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FilterBar } from "../filters/filter-bar"
import { Zap, TrendingUp, Activity, DollarSign } from "lucide-react"
import { AIRecommendations } from "../ai/ai-recommendations"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts"

const clusterCostData = [
  { name: "prod-redis-cluster", nodeType: "cache.r6g.large", nodes: 3, cost: 4200 },
  { name: "session-cache", nodeType: "cache.m6g.large", nodes: 2, cost: 2800 },
  { name: "api-cache", nodeType: "cache.t3.medium", nodes: 2, cost: 1400 },
  { name: "dev-redis", nodeType: "cache.t3.small", nodes: 1, cost: 600 },
]

const engineDistribution = [
  { name: "Redis", value: 75, color: "#0972d3" },
  { name: "Memcached", value: 25, color: "#7d3ac1" },
]

const dailyCostTrend = [
  { date: "Jan 1", compute: 280, backup: 40, dataTransfer: 20 },
  { date: "Jan 8", compute: 295, backup: 42, dataTransfer: 22 },
  { date: "Jan 15", compute: 310, backup: 45, dataTransfer: 24 },
  { date: "Jan 22", compute: 328, backup: 48, dataTransfer: 26 },
  { date: "Jan 29", compute: 345, backup: 50, dataTransfer: 28 },
]

export function AmazonElastiCache() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#232f3e] mb-1">Amazon ElastiCache</h1>
        <p className="text-sm text-[#545b64]">In-memory caching service cost analysis and performance</p>
      </div>

      <FilterBar />

      <div className="grid grid-cols-4 gap-4">
        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-[#232f3e]">$9,000</div>
                <p className="text-sm text-[#545b64] mt-1">Total ElastiCache Cost</p>
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
                <div className="text-2xl font-semibold text-[#232f3e]">8</div>
                <p className="text-sm text-[#545b64] mt-1">Active Clusters</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Zap className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-[#232f3e]">98.2%</div>
                <p className="text-sm text-[#545b64] mt-1">Cache Hit Rate</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Activity className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-[#232f3e]">0.8ms</div>
                <p className="text-sm text-[#545b64] mt-1">Avg Latency</p>
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
            totalCost: 9000,
            activeClusters: 8,
            cacheHitRate: 98.2,
            avgLatency: 0.8,
            nodeUtilization: 72,
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
            <h3 className="text-sm font-semibold text-[#232f3e] mb-4">Engine Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={engineDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {engineDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
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
              <Line type="monotone" dataKey="backup" stroke="#00a1c9" strokeWidth={2} />
              <Line type="monotone" dataKey="dataTransfer" stroke="#7d3ac1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
