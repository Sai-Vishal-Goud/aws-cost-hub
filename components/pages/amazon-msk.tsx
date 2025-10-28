"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FilterBar } from "../filters/filter-bar"
import { Network, TrendingUp, Activity, DollarSign } from "lucide-react"
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
  { name: "prod-kafka-cluster", brokerType: "kafka.m5.large", brokers: 3, cost: 5400 },
  { name: "analytics-stream", brokerType: "kafka.m5.large", brokers: 2, cost: 3600 },
  { name: "event-pipeline", brokerType: "kafka.t3.small", brokers: 2, cost: 1200 },
]

const dailyCostTrend = [
  { date: "Jan 1", compute: 320, storage: 140, dataTransfer: 80 },
  { date: "Jan 8", compute: 340, storage: 150, dataTransfer: 85 },
  { date: "Jan 15", compute: 360, storage: 160, dataTransfer: 90 },
  { date: "Jan 22", compute: 385, storage: 170, dataTransfer: 95 },
  { date: "Jan 29", compute: 410, storage: 180, dataTransfer: 100 },
]

const throughputMetrics = [
  { hour: "00:00", messagesPerSec: 12000, bytesPerSec: 24 },
  { hour: "04:00", messagesPerSec: 8000, bytesPerSec: 16 },
  { hour: "08:00", messagesPerSec: 28000, bytesPerSec: 56 },
  { hour: "12:00", messagesPerSec: 42000, bytesPerSec: 84 },
  { hour: "16:00", messagesPerSec: 38000, bytesPerSec: 76 },
  { hour: "20:00", messagesPerSec: 22000, bytesPerSec: 44 },
]

export function AmazonMSK() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#232f3e] mb-1">Amazon MSK</h1>
        <p className="text-sm text-[#545b64]">Managed Streaming for Apache Kafka cost and performance</p>
      </div>

      <FilterBar />

      <div className="grid grid-cols-4 gap-4">
        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-[#232f3e]">$10,200</div>
                <p className="text-sm text-[#545b64] mt-1">Total MSK Cost</p>
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
                <Network className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#e5e7eb]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-[#232f3e]">25K/s</div>
                <p className="text-sm text-[#545b64] mt-1">Avg Messages/Sec</p>
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
                <div className="text-2xl font-semibold text-[#232f3e]">50 MB/s</div>
                <p className="text-sm text-[#545b64] mt-1">Avg Throughput</p>
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
            totalCost: 10200,
            activeClusters: 3,
            avgMessagesPerSec: 25000,
            avgThroughput: 50,
            brokerUtilization: 68,
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
            <h3 className="text-sm font-semibold text-[#232f3e] mb-4">Throughput by Hour</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={throughputMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="hour" tick={{ fill: "#545b64", fontSize: 12 }} />
                <YAxis tick={{ fill: "#545b64", fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="messagesPerSec" stroke="#0972d3" strokeWidth={2} name="Messages/Sec" />
                <Line type="monotone" dataKey="bytesPerSec" stroke="#7d3ac1" strokeWidth={2} name="MB/Sec" />
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
