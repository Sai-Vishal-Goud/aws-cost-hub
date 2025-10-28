"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FilterBar } from "../filters/filter-bar"
import { Workflow, TrendingUp, Clock, DollarSign } from "lucide-react"
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

const jobCostData = [
  { name: "etl-customer-data", dpus: 10, runs: 120, cost: 4800 },
  { name: "transform-orders", dpus: 5, runs: 240, cost: 3600 },
  { name: "aggregate-analytics", dpus: 8, runs: 90, cost: 2880 },
  { name: "clean-product-data", dpus: 4, runs: 180, cost: 2160 },
]

const dailyCostTrend = [
  { date: "Jan 1", etl: 480, crawler: 120, catalog: 80 },
  { date: "Jan 8", etl: 520, crawler: 130, catalog: 85 },
  { date: "Jan 15", etl: 560, crawler: 140, catalog: 90 },
  { date: "Jan 22", etl: 610, crawler: 150, catalog: 95 },
  { date: "Jan 29", etl: 650, crawler: 160, catalog: 100 },
]

const jobDuration = [
  { job: "etl-customer-data", avgDuration: 28, successRate: 98 },
  { job: "transform-orders", avgDuration: 15, successRate: 99 },
  { job: "aggregate-analytics", avgDuration: 42, successRate: 96 },
  { job: "clean-product-data", avgDuration: 12, successRate: 99 },
]

export function AmazonGlue() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#232f3e] mb-1">Amazon Glue</h1>
        <p className="text-sm text-[#545b64]">ETL service cost analysis and job performance</p>
      </div>

      <FilterBar />

      <div className="grid grid-cols-4 gap-4">
        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-[#232f3e]">$13,440</div>
                <p className="text-sm text-[#545b64] mt-1">Total Glue Cost</p>
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
                <div className="text-2xl font-semibold text-[#232f3e]">18</div>
                <p className="text-sm text-[#545b64] mt-1">Active Jobs</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Workflow className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-[#232f3e]">630</div>
                <p className="text-sm text-[#545b64] mt-1">Monthly Runs</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-[#232f3e]">24 min</div>
                <p className="text-sm text-[#545b64] mt-1">Avg Job Duration</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AIRecommendations
        context={{
          pageType: "compute",
          metrics: {
            totalCost: 13440,
            activeJobs: 18,
            monthlyRuns: 630,
            avgJobDuration: 24,
            successRate: 98,
          },
        }}
      />

      <div className="grid grid-cols-2 gap-6">
        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <h3 className="text-sm font-semibold text-[#232f3e] mb-4">Top Jobs by Cost</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={jobCostData}>
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
            <h3 className="text-sm font-semibold text-[#232f3e] mb-4">Job Duration & Success Rate</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={jobDuration}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="job" tick={{ fill: "#545b64", fontSize: 12 }} />
                <YAxis tick={{ fill: "#545b64", fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgDuration" fill="#0972d3" name="Avg Duration (min)" />
                <Bar dataKey="successRate" fill="#00a1c9" name="Success Rate (%)" />
              </BarChart>
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
              <Line type="monotone" dataKey="etl" stroke="#0972d3" strokeWidth={2} name="ETL Jobs" />
              <Line type="monotone" dataKey="crawler" stroke="#00a1c9" strokeWidth={2} name="Crawlers" />
              <Line type="monotone" dataKey="catalog" stroke="#7d3ac1" strokeWidth={2} name="Data Catalog" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
