"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus, AlertCircle, CheckCircle2, Database, HardDrive, Upload } from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts"
import { AIRecommendations } from "@/components/ai/ai-recommendations"

// Mock data for S3 dashboard
const s3Summary = {
  totalCost: 12847.32,
  costChange: 5.2,
  dataStored: 2847.5, // TB
  requestCost: 1247.89,
  topBucket: "analytics-data-prod",
  topRegion: "us-east-1",
}

const topAccountsData = [
  { account: "Production", cost: 4523.45 },
  { account: "Analytics", cost: 3214.67 },
  { account: "Data Lake", cost: 2156.89 },
  { account: "Backup", cost: 1847.23 },
  { account: "Development", cost: 1105.08 },
  { account: "Staging", cost: 892.34 },
  { account: "Archive", cost: 734.56 },
  { account: "Logs", cost: 623.45 },
  { account: "Media", cost: 512.78 },
  { account: "Testing", cost: 236.87 },
]

const regionalCostData = [
  { region: "us-east-1", cost: 4234.56, storage: 1245.3, requests: 234567 },
  { region: "us-west-2", cost: 3456.78, storage: 987.2, requests: 189234 },
  { region: "eu-west-1", cost: 2345.67, storage: 734.5, requests: 156789 },
  { region: "ap-southeast-1", cost: 1567.89, storage: 456.8, requests: 98765 },
  { region: "eu-central-1", cost: 1243.42, storage: 423.9, requests: 87654 },
]

const costTrendData = [
  { month: "Jul 2025", cost: 2530, change: 172.79, trend: "up" },
  { month: "Aug 2025", cost: 2083, change: -17.68, trend: "down" },
  { month: "Sep 2025", cost: 2071, change: -0.59, trend: "flat" },
  { month: "Oct 2025", cost: 2456, change: 18.59, trend: "up" },
  { month: "Nov 2025", cost: 2789, change: 13.55, trend: "up" },
  { month: "Dec 2025", cost: 2634, change: -5.56, trend: "down" },
]

const standardStorageBuckets = [
  { bucket: "analytics-data-prod", cost: 212.24 },
  { bucket: "user-uploads-main", cost: 165.85 },
  { bucket: "application-logs", cost: 80.6 },
]

const putOperationBuckets = [
  { bucket: "real-time-events", cost: 49.57 },
  { bucket: "analytics-data-prod", cost: 5.86 },
  { bucket: "monitoring-metrics", cost: 3.75 },
]

const topBucketsData = [
  { bucket: "analytics-data-prod", cost: 523.45 },
  { bucket: "user-uploads-main", cost: 456.78 },
  { bucket: "application-logs", cost: 389.23 },
  { bucket: "backup-archives", cost: 334.56 },
  { bucket: "real-time-events", cost: 298.67 },
  { bucket: "media-assets", cost: 267.89 },
  { bucket: "data-lake-raw", cost: 234.12 },
  { bucket: "monitoring-metrics", cost: 198.45 },
  { bucket: "ml-training-data", cost: 176.34 },
  { bucket: "cdn-origin", cost: 145.67 },
]

const usageTypeData = [
  { type: "Storage", cost: 7234.56, color: "#0972d3" },
  { type: "Requests", cost: 3456.78, color: "#00a1c9" },
  { type: "Data Transfer", cost: 2156.98, color: "#7dd3c0" },
]

const dailyCostData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  cost: 350 + Math.random() * 150,
  bucket1: 120 + Math.random() * 50,
  bucket2: 100 + Math.random() * 40,
  bucket3: 80 + Math.random() * 30,
}))

const dailyStorageData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  storage: 2500 + i * 10 + Math.random() * 50,
}))

const recommendations = [
  {
    icon: CheckCircle2,
    title: "Setup Amazon S3 Storage Lens",
    description: "Get organization-wide object storage visibility and analytics.",
  },
  {
    icon: AlertCircle,
    title: "Check Bucket Permissions",
    description: "Review Trusted Advisor for bucket permissions. Ensure no public writable buckets.",
  },
  {
    icon: TrendingUp,
    title: "Implement Lifecycle Policies",
    description: "Use S3 Intelligent-Tiering for backups and logs to optimize storage costs.",
  },
  {
    icon: Upload,
    title: "Batch PUT Operations",
    description: "Reduce API costs by batching frequent PUT operations where possible.",
  },
  {
    icon: Database,
    title: "Clean Up Multipart Uploads",
    description: "Use lifecycle rules to remove incomplete multipart uploads automatically.",
  },
]

export function AmazonS3() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#16191f] mb-2">Amazon S3</h1>
        <p className="text-sm text-[#545b64]">Gain insights into Amazon S3 spend and trends.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-[#e5e7eb]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-[#545b64] mb-1">Total S3 Cost (30d)</p>
              <p className="text-2xl font-semibold text-[#16191f]">${s3Summary.totalCost.toLocaleString()}</p>
            </div>
            <Database className="h-5 w-5 text-[#0972d3]" />
          </div>
          <div className="flex items-center gap-1 mt-2">
            {s3Summary.costChange > 0 ? (
              <TrendingUp className="h-3 w-3 text-[#d13212]" />
            ) : (
              <TrendingDown className="h-3 w-3 text-[#037f0c]" />
            )}
            <span className={`text-xs ${s3Summary.costChange > 0 ? "text-[#d13212]" : "text-[#037f0c]"}`}>
              {Math.abs(s3Summary.costChange)}% MoM
            </span>
          </div>
        </Card>

        <Card className="p-4 border-[#e5e7eb]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-[#545b64] mb-1">Data Stored</p>
              <p className="text-2xl font-semibold text-[#16191f]">{s3Summary.dataStored.toLocaleString()} TB</p>
            </div>
            <HardDrive className="h-5 w-5 text-[#00a1c9]" />
          </div>
          <p className="text-xs text-[#545b64] mt-2">Across all storage classes</p>
        </Card>

        <Card className="p-4 border-[#e5e7eb]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-[#545b64] mb-1">Request Cost</p>
              <p className="text-2xl font-semibold text-[#16191f]">${s3Summary.requestCost.toLocaleString()}</p>
            </div>
            <Upload className="h-5 w-5 text-[#7dd3c0]" />
          </div>
          <p className="text-xs text-[#545b64] mt-2">PUT/GET operations</p>
        </Card>

        <Card className="p-4 border-[#e5e7eb]">
          <div>
            <p className="text-xs text-[#545b64] mb-1">Top Bucket</p>
            <p className="text-lg font-semibold text-[#16191f] truncate">{s3Summary.topBucket}</p>
            <p className="text-xs text-[#545b64] mt-2">Region: {s3Summary.topRegion}</p>
          </div>
        </Card>
      </div>

      {/* AI-Powered Recommendations */}
      <AIRecommendations
        context={{
          pageType: "s3",
          metrics: {
            totalCost: s3Summary.totalCost,
            dataStored: s3Summary.dataStored,
            requestCost: s3Summary.requestCost,
            topBucket: s3Summary.topBucket,
            topRegion: s3Summary.topRegion,
            standardStorageCost: 458.69,
            putOperationCost: 59.18,
          },
          trends: {
            costChange: s3Summary.costChange,
            regionalDistribution: regionalCostData,
          },
        }}
      />

      {/* Recommendations */}
      <Card className="p-5 border-[#e5e7eb]">
        <h2 className="text-base font-semibold text-[#16191f] mb-4">💡 Quick Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((rec, idx) => {
            const Icon = rec.icon
            return (
              <div key={idx} className="flex gap-3">
                <Icon className="h-5 w-5 text-[#0972d3] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#16191f] mb-1">{rec.title}</p>
                  <p className="text-xs text-[#545b64] leading-relaxed">{rec.description}</p>
                </div>
              </div>
            )
          })}
        </div>
        <p className="text-xs text-[#545b64] mt-4 pt-4 border-t border-[#e5e7eb]">
          Note: Trusted Advisor offers 100+ optimization checks for Business and Enterprise support tiers.
        </p>
      </Card>

      {/* Top Accounts and Regional Cost */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5 border-[#e5e7eb]">
          <h2 className="text-base font-semibold text-[#16191f] mb-4">TOP 10 S3 Accounts by Total Usage Cost</h2>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={topAccountsData} layout="vertical" margin={{ left: 80, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" tick={{ fontSize: 12, fill: "#545b64" }} />
              <YAxis dataKey="account" type="category" tick={{ fontSize: 12, fill: "#545b64" }} width={75} />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "6px" }}
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Bar dataKey="cost" fill="#0972d3" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5 border-[#e5e7eb]">
          <h2 className="text-base font-semibold text-[#16191f] mb-4">Amazon S3 Total Cost by Region</h2>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={regionalCostData} margin={{ bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="region"
                tick={{ fontSize: 11, fill: "#545b64" }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 12, fill: "#545b64" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "6px" }}
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Bar dataKey="cost" fill="#00a1c9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Cost Trend Over Time */}
      <Card className="p-5 border-[#e5e7eb]">
        <h2 className="text-base font-semibold text-[#16191f] mb-4">S3 Storage Spend Over Time (Period-over-Period)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e5e7eb]">
                <th className="text-left py-3 px-4 font-medium text-[#545b64]">Month</th>
                <th className="text-right py-3 px-4 font-medium text-[#545b64]">Cost</th>
                <th className="text-right py-3 px-4 font-medium text-[#545b64]">Δ ($)</th>
                <th className="text-right py-3 px-4 font-medium text-[#545b64]">% Change</th>
                <th className="text-center py-3 px-4 font-medium text-[#545b64]">Trend</th>
              </tr>
            </thead>
            <tbody>
              {costTrendData.map((row, idx) => (
                <tr key={idx} className="border-b border-[#e5e7eb] hover:bg-[#f7f7f8]">
                  <td className="py-3 px-4 text-[#16191f]">{row.month}</td>
                  <td className="py-3 px-4 text-right text-[#16191f] font-medium">${row.cost.toLocaleString()}</td>
                  <td
                    className={`py-3 px-4 text-right font-medium ${row.change > 0 ? "text-[#d13212]" : "text-[#037f0c]"}`}
                  >
                    {row.change > 0 ? "+" : ""}${Math.abs(row.change).toFixed(2)}
                  </td>
                  <td
                    className={`py-3 px-4 text-right font-medium ${row.change > 0 ? "text-[#d13212]" : "text-[#037f0c]"}`}
                  >
                    {row.change > 0 ? "+" : ""}
                    {row.change}%
                  </td>
                  <td className="py-3 px-4 text-center">
                    {row.trend === "up" && <TrendingUp className="h-4 w-4 text-[#d13212] mx-auto" />}
                    {row.trend === "down" && <TrendingDown className="h-4 w-4 text-[#037f0c] mx-auto" />}
                    {row.trend === "flat" && <Minus className="h-4 w-4 text-[#545b64] mx-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={costTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#545b64" }} />
              <YAxis tick={{ fontSize: 12, fill: "#545b64" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "6px" }}
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Line type="monotone" dataKey="cost" stroke="#0972d3" strokeWidth={2} dot={{ fill: "#0972d3", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Focus Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5 border-[#e5e7eb]">
          <h2 className="text-base font-semibold text-[#16191f] mb-2">🔎 Focus Area: Standard Storage</h2>
          <p className="text-xs text-[#545b64] mb-4">Identify high-cost buckets in Standard Storage class</p>
          <div className="space-y-3">
            {standardStorageBuckets.map((bucket, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-[#f7f7f8] rounded-lg">
                <span className="text-sm text-[#16191f] font-mono">{bucket.bucket}</span>
                <span className="text-sm font-semibold text-[#16191f]">${bucket.cost.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-[#f0f7ff] rounded-lg border border-[#0972d3]/20">
            <p className="text-xs text-[#16191f] leading-relaxed">
              <strong>Recommendation:</strong> Move infrequently accessed objects in these buckets to
              Intelligent-Tiering or Glacier.
            </p>
          </div>
        </Card>

        <Card className="p-5 border-[#e5e7eb]">
          <h2 className="text-base font-semibold text-[#16191f] mb-2">⚙️ Focus Area: PUT Operations</h2>
          <p className="text-xs text-[#545b64] mb-4">Identify buckets with high PUT operation cost</p>
          <div className="space-y-3">
            {putOperationBuckets.map((bucket, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-[#f7f7f8] rounded-lg">
                <span className="text-sm text-[#16191f] font-mono">{bucket.bucket}</span>
                <span className="text-sm font-semibold text-[#16191f]">${bucket.cost.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-[#f0f7ff] rounded-lg border border-[#0972d3]/20">
            <p className="text-xs text-[#16191f] leading-relaxed">
              <strong>Recommendation:</strong> Batch frequent PUT operations to reduce API costs.
            </p>
          </div>
        </Card>
      </div>

      {/* Bucket Explorer */}
      <Card className="p-5 border-[#e5e7eb]">
        <h2 className="text-base font-semibold text-[#16191f] mb-4">🧮 Bucket Explorer</h2>

        {/* Top 10 Buckets */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-[#16191f] mb-3">TOP 10 Buckets Total Cost per Bucket</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topBucketsData} layout="vertical" margin={{ left: 120, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" tick={{ fontSize: 12, fill: "#545b64" }} />
              <YAxis dataKey="bucket" type="category" tick={{ fontSize: 11, fill: "#545b64" }} width={115} />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "6px" }}
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Bar dataKey="cost" fill="#0972d3" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Usage Type Breakdown */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-[#16191f] mb-3">Total Cost per Bucket by UsageType Group</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={usageTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="cost"
                >
                  {usageTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col justify-center space-y-3">
              {usageTypeData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-[#f7f7f8] rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-[#16191f]">{item.type}</span>
                  </div>
                  <span className="text-sm font-semibold text-[#16191f]">${item.cost.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Daily Cost Trend */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-[#16191f] mb-3">Daily Cost Bucket Explorer</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dailyCostData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 12, fill: "#545b64" }}
                label={{ value: "Day of Month", position: "insideBottom", offset: -5, fontSize: 12 }}
              />
              <YAxis tick={{ fontSize: 12, fill: "#545b64" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "6px" }}
                formatter={(value: number) => `$${value.toFixed(2)}`}
              />
              <Legend />
              <Line type="monotone" dataKey="cost" stroke="#0972d3" strokeWidth={2} name="Total Cost" />
              <Line type="monotone" dataKey="bucket1" stroke="#00a1c9" strokeWidth={1.5} name="Top Bucket" />
              <Line type="monotone" dataKey="bucket2" stroke="#7dd3c0" strokeWidth={1.5} name="2nd Bucket" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Storage */}
        <div>
          <h3 className="text-sm font-medium text-[#16191f] mb-3">Daily Storage Bucket Explorer (GB Stored)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={dailyStorageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 12, fill: "#545b64" }}
                label={{ value: "Day of Month", position: "insideBottom", offset: -5, fontSize: 12 }}
              />
              <YAxis tick={{ fontSize: 12, fill: "#545b64" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "6px" }}
                formatter={(value: number) => `${value.toFixed(1)} GB`}
              />
              <Area type="monotone" dataKey="storage" stroke="#0972d3" fill="#0972d3" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Insights */}
      <Card className="p-5 border-[#e5e7eb]">
        <h2 className="text-base font-semibold text-[#16191f] mb-4">📘 Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#f7f7f8] rounded-lg">
            <p className="text-sm text-[#16191f] mb-2">
              <strong>High-Cost Buckets Identified</strong>
            </p>
            <p className="text-xs text-[#545b64] leading-relaxed">
              Analytics and production buckets account for 45% of total S3 spend. Consider implementing lifecycle
              policies.
            </p>
          </div>
          <div className="p-4 bg-[#f7f7f8] rounded-lg">
            <p className="text-sm text-[#16191f] mb-2">
              <strong>PUT Operation Optimization</strong>
            </p>
            <p className="text-xs text-[#545b64] leading-relaxed">
              Real-time events bucket has high PUT costs. Batching operations could reduce costs by up to 30%.
            </p>
          </div>
          <div className="p-4 bg-[#f7f7f8] rounded-lg">
            <p className="text-sm text-[#16191f] mb-2">
              <strong>Regional Distribution</strong>
            </p>
            <p className="text-xs text-[#545b64] leading-relaxed">
              US-East-1 accounts for 33% of costs. Consider multi-region optimization strategies.
            </p>
          </div>
          <div className="p-4 bg-[#f7f7f8] rounded-lg">
            <p className="text-sm text-[#16191f] mb-2">
              <strong>Storage Class Opportunities</strong>
            </p>
            <p className="text-xs text-[#545b64] leading-relaxed">
              Migrate Standard storage to Intelligent-Tiering for potential 40-60% savings on infrequent access
              patterns.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
