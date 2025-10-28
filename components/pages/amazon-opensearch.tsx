"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FilterBar } from "../filters/filter-bar"
import { Activity, TrendingUp, Search, DollarSign } from "lucide-react"
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

const domainCostData = [
  { name: "prod-logs", instanceType: "r6g.xlarge.search", nodes: 3, cost: 6200 },
  { name: "analytics-search", instanceType: "m6g.large.search", nodes: 2, cost: 3800 },
  { name: "app-search", instanceType: "t3.medium.search", nodes: 2, cost: 2400 },
  { name: "dev-domain", instanceType: "t3.small.search", nodes: 1, cost: 800 },
]

const dailyCostTrend = [
  { date: "Jan 1", compute: 420, storage: 180, dataTransfer: 60 },
  { date: "Jan 8", compute: 445, storage: 190, dataTransfer: 65 },
  { date: "Jan 15", compute: 470, storage: 200, dataTransfer: 70 },
  { date: "Jan 22", compute: 498, storage: 210, dataTransfer: 75 },
  { date: "Jan 29", compute: 525, storage: 220, dataTransfer: 80 },
]

const searchPerformance = [
  { hour: "00:00", avgLatency: 45, searches: 1200 },
  { hour: "04:00", avgLatency: 38, searches: 800 },
  { hour: "08:00", avgLatency: 62, searches: 2800 },
  { hour: "12:00", avgLatency: 78, searches: 4200 },
  { hour: "16:00", avgLatency: 68, searches: 3800 },
  { hour: "20:00", avgLatency: 52, searches: 2200 },
]

export function AmazonOpenSearch() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#232f3e] mb-1">Amazon OpenSearch</h1>
        <p className="text-sm text-[#545b64]">Search and analytics service cost and performance analysis</p>
      </div>

      <FilterBar />

      <div className="grid grid-cols-4 gap-4">
        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-[#232f3e]">$13,200</div>
                <p className="text-sm text-[#545b64] mt-1">Total OpenSearch Cost</p>
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
                <p className="text-sm text-[#545b64] mt-1">Active Domains</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Activity className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-[#232f3e]">2.4M</div>
                <p className="text-sm text-[#545b64] mt-1">Daily Searches</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Search className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-[#232f3e]">58ms</div>
                <p className="text-sm text-[#545b64] mt-1">Avg Search Latency</p>
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
            totalCost: 13200,
            activeDomains: 4,
            dailySearches: 2400000,
            avgLatency: 58,
            nodeUtilization: 65,
          },
        }}
      />

      <div className="grid grid-cols-2 gap-6">
        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <h3 className="text-sm font-semibold text-[#232f3e] mb-4">Domain Costs</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={domainCostData}>
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
            <h3 className="text-sm font-semibold text-[#232f3e] mb-4">Search Performance by Hour</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={searchPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="hour" tick={{ fill: "#545b64", fontSize: 12 }} />
                <YAxis tick={{ fill: "#545b64", fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="avgLatency" stroke="#0972d3" strokeWidth={2} name="Avg Latency (ms)" />
                <Line type="monotone" dataKey="searches" stroke="#7d3ac1" strokeWidth={2} name="Search Count" />
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
