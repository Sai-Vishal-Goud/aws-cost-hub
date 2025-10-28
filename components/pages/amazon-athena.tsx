"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FilterBar } from "../filters/filter-bar"
import { Search, TrendingUp, Database, DollarSign } from "lucide-react"
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

const queryCostData = [
  { workgroup: "analytics-team", queries: 4200, dataScanned: 8.4, cost: 42 },
  { workgroup: "data-science", queries: 2800, dataScanned: 5.6, cost: 28 },
  { workgroup: "reporting", queries: 1900, dataScanned: 3.8, cost: 19 },
  { workgroup: "dev-team", queries: 1200, dataScanned: 2.4, cost: 12 },
]

const dailyCostTrend = [
  { date: "Jan 1", cost: 3.2, queries: 320, dataScanned: 1.6 },
  { date: "Jan 8", cost: 3.5, queries: 350, dataScanned: 1.75 },
  { date: "Jan 15", cost: 3.8, queries: 380, dataScanned: 1.9 },
  { date: "Jan 22", cost: 4.1, queries: 410, dataScanned: 2.05 },
  { date: "Jan 29", cost: 4.4, queries: 440, dataScanned: 2.2 },
]

export function AmazonAthena() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#232f3e] mb-1">Amazon Athena</h1>
        <p className="text-sm text-[#545b64]">Serverless query service cost analysis and optimization</p>
      </div>

      <FilterBar />

      <div className="grid grid-cols-4 gap-4">
        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-[#232f3e]">$101</div>
                <p className="text-sm text-[#545b64] mt-1">Total Athena Cost</p>
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
                <div className="text-2xl font-semibold text-[#232f3e]">10,100</div>
                <p className="text-sm text-[#545b64] mt-1">Total Queries</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Search className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-[#232f3e]">20.2 TB</div>
                <p className="text-sm text-[#545b64] mt-1">Data Scanned</p>
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
                <div className="text-2xl font-semibold text-[#232f3e]">$0.01</div>
                <p className="text-sm text-[#545b64] mt-1">Avg Cost/Query</p>
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
            totalCost: 101,
            totalQueries: 10100,
            dataScanned: 20.2,
            avgCostPerQuery: 0.01,
            workgroups: 4,
          },
        }}
      />

      <div className="grid grid-cols-2 gap-6">
        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <h3 className="text-sm font-semibold text-[#232f3e] mb-4">Cost by Workgroup</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={queryCostData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="workgroup" tick={{ fill: "#545b64", fontSize: 12 }} />
                <YAxis tick={{ fill: "#545b64", fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="cost" fill="#0972d3" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <h3 className="text-sm font-semibold text-[#232f3e] mb-4">Data Scanned by Workgroup (TB)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={queryCostData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="workgroup" tick={{ fill: "#545b64", fontSize: 12 }} />
                <YAxis tick={{ fill: "#545b64", fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="dataScanned" fill="#7d3ac1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-[#e5e7eb]">
        <CardContent className="pt-6">
          <h3 className="text-sm font-semibold text-[#232f3e] mb-4">Daily Query Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyCostTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fill: "#545b64", fontSize: 12 }} />
              <YAxis tick={{ fill: "#545b64", fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cost" stroke="#0972d3" strokeWidth={2} name="Cost ($)" />
              <Line type="monotone" dataKey="queries" stroke="#00a1c9" strokeWidth={2} name="Query Count" />
              <Line type="monotone" dataKey="dataScanned" stroke="#7d3ac1" strokeWidth={2} name="Data Scanned (TB)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
