"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FilterBar } from "../filters/filter-bar"
import { Database, TrendingUp, HardDrive, DollarSign } from "lucide-react"
import { AIRecommendations } from "../ai/ai-recommendations"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const instanceCostData = [
  { name: "db.r6g.xlarge", cost: 45200, instances: 12 },
  { name: "db.r5.2xlarge", cost: 38900, instances: 8 },
  { name: "db.m6g.large", cost: 28400, instances: 15 },
  { name: "db.t3.medium", cost: 18700, instances: 24 },
  { name: "db.r6i.large", cost: 15300, instances: 6 },
]

const engineDistribution = [
  { name: "PostgreSQL", value: 42, color: "#0972d3" },
  { name: "MySQL", value: 28, color: "#00a1c9" },
  { name: "Aurora PostgreSQL", value: 18, color: "#7d3ac1" },
  { name: "Aurora MySQL", value: 8, color: "#af52de" },
  { name: "MariaDB", value: 4, color: "#5856d6" },
]

const dailyCostTrend = [
  { date: "Jan 1", cost: 4200, storage: 1800, backup: 600 },
  { date: "Jan 8", cost: 4350, storage: 1850, backup: 620 },
  { date: "Jan 15", cost: 4500, storage: 1900, backup: 650 },
  { date: "Jan 22", cost: 4680, storage: 1950, backup: 680 },
  { date: "Jan 29", cost: 4850, storage: 2000, backup: 700 },
]

const topDatabases = [
  { name: "prod-analytics-db", engine: "PostgreSQL", instance: "db.r6g.xlarge", cost: 12400, storage: 2400 },
  { name: "prod-app-db", engine: "Aurora PostgreSQL", instance: "db.r6i.2xlarge", cost: 9800, storage: 1800 },
  { name: "staging-db", engine: "MySQL", instance: "db.m6g.large", cost: 6200, storage: 1200 },
  { name: "dev-analytics", engine: "PostgreSQL", instance: "db.t3.large", cost: 4800, storage: 900 },
  { name: "reporting-db", engine: "Aurora MySQL", instance: "db.r5.xlarge", cost: 4200, storage: 800 },
]

export function AmazonRDS() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#232f3e] mb-1">Amazon RDS</h1>
        <p className="text-sm text-[#545b64]">Relational Database Service cost analysis and optimization</p>
      </div>

      <FilterBar />

      <div className="grid grid-cols-4 gap-4">
        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-[#232f3e]">$146,500</div>
                <p className="text-sm text-[#545b64] mt-1">Total RDS Cost</p>
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
                <div className="text-2xl font-semibold text-[#232f3e]">65</div>
                <p className="text-sm text-[#545b64] mt-1">Active Instances</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Database className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-[#232f3e]">8.4 TB</div>
                <p className="text-sm text-[#545b64] mt-1">Total Storage</p>
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
                <div className="text-2xl font-semibold text-[#232f3e]">$18,200</div>
                <p className="text-sm text-[#545b64] mt-1">Backup Costs</p>
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
            totalCost: 146500,
            activeInstances: 65,
            totalStorage: 8.4,
            backupCosts: 18200,
            avgUtilization: 62,
          },
        }}
      />

      <div className="grid grid-cols-2 gap-6">
        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <h3 className="text-sm font-semibold text-[#232f3e] mb-4">Cost by Instance Type</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={instanceCostData}>
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
            <h3 className="text-sm font-semibold text-[#232f3e] mb-4">Database Engine Distribution</h3>
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
          <h3 className="text-sm font-semibold text-[#232f3e] mb-4">Daily Cost Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyCostTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fill: "#545b64", fontSize: 12 }} />
              <YAxis tick={{ fill: "#545b64", fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cost" stroke="#0972d3" strokeWidth={2} />
              <Line type="monotone" dataKey="storage" stroke="#00a1c9" strokeWidth={2} />
              <Line type="monotone" dataKey="backup" stroke="#7d3ac1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-[#e5e7eb]">
        <CardContent className="pt-6">
          <h3 className="text-sm font-semibold text-[#232f3e] mb-4">Top 5 Databases by Cost</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e5e7eb]">
                  <th className="text-left text-xs font-medium text-[#545b64] pb-3">Database Name</th>
                  <th className="text-left text-xs font-medium text-[#545b64] pb-3">Engine</th>
                  <th className="text-left text-xs font-medium text-[#545b64] pb-3">Instance Type</th>
                  <th className="text-right text-xs font-medium text-[#545b64] pb-3">Monthly Cost</th>
                  <th className="text-right text-xs font-medium text-[#545b64] pb-3">Storage (GB)</th>
                </tr>
              </thead>
              <tbody>
                {topDatabases.map((db, idx) => (
                  <tr key={idx} className="border-b border-[#e5e7eb]">
                    <td className="py-3 text-sm text-[#232f3e]">{db.name}</td>
                    <td className="py-3 text-sm text-[#545b64]">{db.engine}</td>
                    <td className="py-3 text-sm text-[#545b64]">{db.instance}</td>
                    <td className="py-3 text-sm text-[#232f3e] text-right font-medium">${db.cost.toLocaleString()}</td>
                    <td className="py-3 text-sm text-[#545b64] text-right">{db.storage.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
