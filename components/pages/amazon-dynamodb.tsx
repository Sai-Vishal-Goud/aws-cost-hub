"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FilterBar } from "../filters/filter-bar"
import { Table, TrendingUp, Zap, DollarSign } from "lucide-react"
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

const tableCostData = [
  { name: "user-sessions", readUnits: 5000, writeUnits: 2000, cost: 8400 },
  { name: "product-catalog", readUnits: 3500, writeUnits: 1500, cost: 6200 },
  { name: "order-history", readUnits: 2800, writeUnits: 1200, cost: 4800 },
  { name: "analytics-events", readUnits: 2200, writeUnits: 900, cost: 3600 },
]

const capacityMode = [
  { name: "On-Demand", value: 65, color: "#0972d3" },
  { name: "Provisioned", value: 35, color: "#7d3ac1" },
]

const dailyCostTrend = [
  { date: "Jan 1", read: 1200, write: 800, storage: 400 },
  { date: "Jan 8", read: 1350, write: 850, storage: 420 },
  { date: "Jan 15", read: 1500, write: 900, storage: 450 },
  { date: "Jan 22", read: 1680, write: 950, storage: 480 },
  { date: "Jan 29", read: 1850, write: 1000, storage: 500 },
]

export function AmazonDynamoDB() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#232f3e] mb-1">Amazon DynamoDB</h1>
        <p className="text-sm text-[#545b64]">NoSQL database cost analysis and capacity optimization</p>
      </div>

      <FilterBar />

      <div className="grid grid-cols-4 gap-4">
        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-[#232f3e]">$23,000</div>
                <p className="text-sm text-[#545b64] mt-1">Total DynamoDB Cost</p>
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
                <div className="text-2xl font-semibold text-[#232f3e]">28</div>
                <p className="text-sm text-[#545b64] mt-1">Active Tables</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Table className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-[#232f3e]">1.2B</div>
                <p className="text-sm text-[#545b64] mt-1">Monthly Requests</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Zap className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-[#232f3e]">842 GB</div>
                <p className="text-sm text-[#545b64] mt-1">Total Storage</p>
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
            totalCost: 23000,
            activeTables: 28,
            monthlyRequests: 1200000000,
            totalStorage: 842,
            onDemandPercent: 65,
          },
        }}
      />

      <div className="grid grid-cols-2 gap-6">
        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <h3 className="text-sm font-semibold text-[#232f3e] mb-4">Top Tables by Cost</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tableCostData}>
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
            <h3 className="text-sm font-semibold text-[#232f3e] mb-4">Capacity Mode Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={capacityMode} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {capacityMode.map((entry, index) => (
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
              <Line type="monotone" dataKey="read" stroke="#0972d3" strokeWidth={2} name="Read Capacity" />
              <Line type="monotone" dataKey="write" stroke="#00a1c9" strokeWidth={2} name="Write Capacity" />
              <Line type="monotone" dataKey="storage" stroke="#7d3ac1" strokeWidth={2} name="Storage" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
