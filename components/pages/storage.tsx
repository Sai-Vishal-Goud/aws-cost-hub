"use client"

import { Card } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Database,
  HardDrive,
  Clock,
  DollarSign,
  AlertCircle,
  Lightbulb,
  Shield,
} from "lucide-react"
import { AIRecommendations } from "@/components/ai/ai-recommendations"

// Mock data for backup spend per region
const backupSpendByRegion = [
  { region: "eu-central-1", cost: 1247.83, quantity: 28253.46, service: "Multiple" },
  { region: "us-east-1", cost: 892.45, quantity: 19876.32, service: "Multiple" },
  { region: "eu-west-1", cost: 654.21, quantity: 14532.87, service: "Multiple" },
  { region: "us-west-2", cost: 487.92, quantity: 10843.21, service: "Multiple" },
  { region: "ap-southeast-1", cost: 321.54, quantity: 7145.98, service: "Multiple" },
  { region: "ap-northeast-1", cost: 298.76, quantity: 6638.42, service: "Multiple" },
]

// Mock data for backup spend per usage type
const backupSpendByUsageType = [
  { name: "Aurora:BackupUsage", value: 1876.43, percentage: 42 },
  { name: "TimedBackupStorage", value: 1245.87, percentage: 28 },
  { name: "FSx:BackupUsage", value: 892.34, percentage: 20 },
  { name: "RDS:ChargedBackupUsage", value: 445.67, percentage: 10 },
]

// Mock data for daily backup spend per service
const dailyBackupSpend = [
  { date: "Jan 1", RDS: 45.2, DynamoDB: 32.1, FSx: 28.5, EBS: 15.3 },
  { date: "Jan 5", RDS: 48.7, DynamoDB: 35.4, FSx: 31.2, EBS: 16.8 },
  { date: "Jan 10", RDS: 52.3, DynamoDB: 38.9, FSx: 29.8, EBS: 18.2 },
  { date: "Jan 15", RDS: 49.8, DynamoDB: 36.2, FSx: 33.4, EBS: 17.5 },
  { date: "Jan 20", RDS: 54.1, DynamoDB: 41.3, FSx: 35.7, EBS: 19.1 },
  { date: "Jan 25", RDS: 51.6, DynamoDB: 39.8, FSx: 32.9, EBS: 18.4 },
  { date: "Jan 30", RDS: 56.2, DynamoDB: 43.5, FSx: 37.2, EBS: 20.3 },
]

// Mock data for top 20 backup resources
const topBackupResources = [
  {
    quantity: 9136.14,
    cost: 493.35,
    unit: "GB-Mo",
    usageType: "EUC1-BackupUsage",
    region: "eu-central-1",
    service: "Amazon FSx",
    account: "prod-main",
    resource: "backup/qoKNLMJNv7S",
  },
  {
    quantity: 12987.96,
    cost: 298.72,
    unit: "GB-Mo",
    usageType: "EUC1-Aurora:BackupUsage",
    region: "eu-central-1",
    service: "Amazon RDS",
    account: "g1mr",
    resource: "FkzxyoORUy5P:Grbc5NYHj4A2",
  },
  {
    quantity: 13100.83,
    cost: 275.12,
    unit: "GB-Month",
    usageType: "USE1-TimedBackupStorage-ByteHrs",
    region: "us-east-1",
    service: "Amazon DynamoDB",
    account: "h16C",
    resource: "table/Ab0x3V1fC3mH",
  },
  {
    quantity: 3028.49,
    cost: 269.66,
    unit: "GB-Mo",
    usageType: "EUC1-RDS:ChargedBackupUsage",
    region: "eu-central-1",
    service: "Amazon RDS",
    account: "g1mr",
    resource: "e9wl0WlO+YR4:lZaXQ+D7BfW+",
  },
  {
    quantity: 7845.32,
    cost: 245.89,
    unit: "GB-Mo",
    usageType: "USW2-Aurora:BackupUsage",
    region: "us-west-2",
    service: "Amazon RDS",
    account: "prod-west",
    resource: "aurora-cluster-backup-001",
  },
  {
    quantity: 6234.21,
    cost: 198.45,
    unit: "GB-Mo",
    usageType: "USE1-EBS:SnapshotUsage",
    region: "us-east-1",
    service: "Amazon EBS",
    account: "dev-team",
    resource: "snap-0a1b2c3d4e5f6",
  },
  {
    quantity: 5432.87,
    cost: 187.32,
    unit: "GB-Mo",
    usageType: "EUW1-FSx:BackupUsage",
    region: "eu-west-1",
    service: "Amazon FSx",
    account: "prod-eu",
    resource: "backup/FSxBackup789",
  },
  {
    quantity: 4987.65,
    cost: 165.78,
    unit: "GB-Month",
    usageType: "APS1-TimedBackupStorage",
    region: "ap-southeast-1",
    service: "Amazon DynamoDB",
    account: "apac-prod",
    resource: "table/UserData",
  },
  {
    quantity: 4321.09,
    cost: 154.23,
    unit: "GB-Mo",
    usageType: "USE1-Aurora:BackupUsage",
    region: "us-east-1",
    service: "Amazon RDS",
    account: "analytics",
    resource: "aurora-analytics-backup",
  },
  {
    quantity: 3876.54,
    cost: 142.87,
    unit: "GB-Mo",
    usageType: "EUC1-EBS:SnapshotUsage",
    region: "eu-central-1",
    service: "Amazon EBS",
    account: "infra-team",
    resource: "snap-backup-vol-001",
  },
  {
    quantity: 3654.32,
    cost: 134.56,
    unit: "GB-Mo",
    usageType: "USW2-RDS:ChargedBackupUsage",
    region: "us-west-2",
    service: "Amazon RDS",
    account: "prod-west",
    resource: "rds-postgres-backup",
  },
  {
    quantity: 3298.76,
    cost: 128.43,
    unit: "GB-Mo",
    usageType: "APN1-FSx:BackupUsage",
    region: "ap-northeast-1",
    service: "Amazon FSx",
    account: "japan-prod",
    resource: "backup/FSxJapan001",
  },
  {
    quantity: 2987.43,
    cost: 118.92,
    unit: "GB-Month",
    usageType: "EUW1-TimedBackupStorage",
    region: "eu-west-1",
    service: "Amazon DynamoDB",
    account: "eu-services",
    resource: "table/Orders",
  },
  {
    quantity: 2765.89,
    cost: 109.87,
    unit: "GB-Mo",
    usageType: "USE1-RDS:ChargedBackupUsage",
    region: "us-east-1",
    service: "Amazon RDS",
    account: "legacy-db",
    resource: "mysql-backup-primary",
  },
  {
    quantity: 2543.21,
    cost: 98.76,
    unit: "GB-Mo",
    usageType: "USW2-EBS:SnapshotUsage",
    region: "us-west-2",
    service: "Amazon EBS",
    account: "backup-vault",
    resource: "snap-weekly-backup",
  },
  {
    quantity: 2398.65,
    cost: 92.34,
    unit: "GB-Mo",
    usageType: "EUC1-Aurora:BackupUsage",
    region: "eu-central-1",
    service: "Amazon RDS",
    account: "prod-db",
    resource: "aurora-prod-backup-02",
  },
  {
    quantity: 2187.43,
    cost: 87.21,
    unit: "GB-Mo",
    usageType: "APS1-Aurora:BackupUsage",
    region: "ap-southeast-1",
    service: "Amazon RDS",
    account: "singapore-prod",
    resource: "aurora-sg-backup",
  },
  {
    quantity: 1987.32,
    cost: 79.45,
    unit: "GB-Month",
    usageType: "USE1-TimedBackupStorage",
    region: "us-east-1",
    service: "Amazon DynamoDB",
    account: "mobile-backend",
    resource: "table/Sessions",
  },
  {
    quantity: 1876.54,
    cost: 74.32,
    unit: "GB-Mo",
    usageType: "EUW1-RDS:ChargedBackupUsage",
    region: "eu-west-1",
    service: "Amazon RDS",
    account: "eu-prod",
    resource: "postgres-eu-backup",
  },
  {
    quantity: 1654.87,
    cost: 68.91,
    unit: "GB-Mo",
    usageType: "USW2-FSx:BackupUsage",
    region: "us-west-2",
    service: "Amazon FSx",
    account: "file-services",
    resource: "backup/FSxWest002",
  },
]

const COLORS = ["#0972d3", "#00a1c9", "#7aa116", "#f89406"]

export function Storage() {
  const totalBackupCost = backupSpendByRegion.reduce((sum, item) => sum + item.cost, 0)
  const totalBackupStorage = backupSpendByRegion.reduce((sum, item) => sum + item.quantity, 0)
  const avgDailyCost =
    dailyBackupSpend.reduce((sum, day) => sum + day.RDS + day.DynamoDB + day.FSx + day.EBS, 0) / dailyBackupSpend.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#16191f]">Storage & Backup</h1>
        <p className="text-sm text-[#545b64] mt-1">Backup spend analysis across regions, services, and resources</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-[#e5e7eb]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-[#545b64] font-medium">Total Backup Cost</p>
              <p className="text-2xl font-semibold text-[#16191f] mt-1">${totalBackupCost.toFixed(2)}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-3 w-3 text-[#d13212]" />
                <span className="text-xs text-[#d13212]">+8.3% vs last month</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-lg bg-[#f0f7ff] flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-[#0972d3]" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border-[#e5e7eb]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-[#545b64] font-medium">Total Storage</p>
              <p className="text-2xl font-semibold text-[#16191f] mt-1">{(totalBackupStorage / 1000).toFixed(1)}TB</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-3 w-3 text-[#d13212]" />
                <span className="text-xs text-[#d13212]">+12.1% vs last month</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-lg bg-[#e6f2e6] flex items-center justify-center">
              <Database className="h-5 w-5 text-[#7aa116]" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border-[#e5e7eb]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-[#545b64] font-medium">Avg Daily Cost</p>
              <p className="text-2xl font-semibold text-[#16191f] mt-1">${avgDailyCost.toFixed(2)}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="h-3 w-3 text-[#1d8102]" />
                <span className="text-xs text-[#1d8102]">-2.4% vs last week</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-lg bg-[#fff4e6] flex items-center justify-center">
              <Clock className="h-5 w-5 text-[#f89406]" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border-[#e5e7eb]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-[#545b64] font-medium">Active Regions</p>
              <p className="text-2xl font-semibold text-[#16191f] mt-1">{backupSpendByRegion.length}</p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-xs text-[#545b64]">Across 4 services</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-lg bg-[#e6f7f7] flex items-center justify-center">
              <HardDrive className="h-5 w-5 text-[#00a1c9]" />
            </div>
          </div>
        </Card>
      </div>

      {/* AI-Powered Recommendations */}
      <AIRecommendations
        context={{
          pageType: "storage",
          metrics: {
            totalBackupCost,
            totalBackupStorage,
            avgDailyCost,
            activeRegions: backupSpendByRegion.length,
            topUsageType: "Aurora:BackupUsage",
            topRegion: "eu-central-1",
          },
          trends: {
            costChange: 8.3,
            storageChange: 12.1,
            dailyCostChange: -2.4,
          },
        }}
      />

      {/* Recommendations Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-[#0972d3] border-[#e5e7eb]">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-lg bg-[#f0f7ff] flex items-center justify-center flex-shrink-0">
              <Lightbulb className="h-4 w-4 text-[#0972d3]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#16191f]">Lifecycle Policies</h3>
              <p className="text-xs text-[#545b64] mt-1">
                Enable backup lifecycle policies to move older backups to cold storage
              </p>
              <p className="text-xs font-medium text-[#0972d3] mt-2">Est. savings: $420/mo</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-l-[#7aa116] border-[#e5e7eb]">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-lg bg-[#e6f2e6] flex items-center justify-center flex-shrink-0">
              <Clock className="h-4 w-4 text-[#7aa116]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#16191f]">Retention Tuning</h3>
              <p className="text-xs text-[#545b64] mt-1">
                Optimize Aurora and DynamoDB backup retention to control snapshot frequency
              </p>
              <p className="text-xs font-medium text-[#7aa116] mt-2">Est. savings: $315/mo</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-l-[#00a1c9] border-[#e5e7eb]">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-lg bg-[#e6f7f7] flex items-center justify-center flex-shrink-0">
              <Shield className="h-4 w-4 text-[#00a1c9]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#16191f]">Consolidate Backups</h3>
              <p className="text-xs text-[#545b64] mt-1">Use Backup Vault Lock to consolidate cross-region backups</p>
              <p className="text-xs font-medium text-[#00a1c9] mt-2">Est. savings: $280/mo</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-l-[#f89406] border-[#e5e7eb]">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-lg bg-[#fff4e6] flex items-center justify-center flex-shrink-0">
              <AlertCircle className="h-4 w-4 text-[#f89406]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#16191f]">Cleanup Stale Backups</h3>
              <p className="text-xs text-[#545b64] mt-1">Schedule automated cleanup of redundant or unused backups</p>
              <p className="text-xs font-medium text-[#f89406] mt-2">Est. savings: $195/mo</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Backup Spend per Region & Usage Type */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-[#e5e7eb]">
          <h2 className="text-base font-semibold text-[#16191f] mb-4">Backup Spend per Region</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={backupSpendByRegion} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#545b64" fontSize={12} />
              <YAxis dataKey="region" type="category" stroke="#545b64" fontSize={12} width={100} />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "6px" }}
                formatter={(value: number) => `$${value.toFixed(2)}`}
              />
              <Bar dataKey="cost" fill="#0972d3" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 border-[#e5e7eb]">
          <h2 className="text-base font-semibold text-[#16191f] mb-4">Backup Spend per Usage Type</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={backupSpendByUsageType}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name.split(":")[0]} (${percentage}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {backupSpendByUsageType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "6px" }}
                formatter={(value: number) => `$${value.toFixed(2)}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Daily Backup Spend per Service */}
      <Card className="p-6 border-[#e5e7eb]">
        <h2 className="text-base font-semibold text-[#16191f] mb-4">Daily Backup Spend per Service</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyBackupSpend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#545b64" fontSize={12} />
            <YAxis stroke="#545b64" fontSize={12} />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "6px" }}
              formatter={(value: number) => `$${value.toFixed(2)}`}
            />
            <Legend />
            <Line type="monotone" dataKey="RDS" stroke="#0972d3" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="DynamoDB" stroke="#00a1c9" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="FSx" stroke="#7aa116" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="EBS" stroke="#f89406" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Top 20 Backup Resources Table */}
      <Card className="p-6 border-[#e5e7eb]">
        <h2 className="text-base font-semibold text-[#16191f] mb-4">Top 20 Backup Resources by Cost</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e5e7eb]">
                <th className="text-left py-3 px-2 font-medium text-[#545b64]">Resource</th>
                <th className="text-left py-3 px-2 font-medium text-[#545b64]">Service</th>
                <th className="text-left py-3 px-2 font-medium text-[#545b64]">Usage Type</th>
                <th className="text-left py-3 px-2 font-medium text-[#545b64]">Region</th>
                <th className="text-right py-3 px-2 font-medium text-[#545b64]">Quantity</th>
                <th className="text-right py-3 px-2 font-medium text-[#545b64]">Unit</th>
                <th className="text-right py-3 px-2 font-medium text-[#545b64]">Cost</th>
              </tr>
            </thead>
            <tbody>
              {topBackupResources.map((resource, index) => (
                <tr key={index} className="border-b border-[#e5e7eb] hover:bg-[#f7f7f8]">
                  <td className="py-3 px-2 text-[#16191f] font-mono text-xs">{resource.resource}</td>
                  <td className="py-3 px-2 text-[#545b64]">{resource.service}</td>
                  <td className="py-3 px-2 text-[#545b64] text-xs">{resource.usageType}</td>
                  <td className="py-3 px-2 text-[#545b64]">{resource.region}</td>
                  <td className="py-3 px-2 text-right text-[#545b64]">{resource.quantity.toFixed(2)}</td>
                  <td className="py-3 px-2 text-right text-[#545b64]">{resource.unit}</td>
                  <td className="py-3 px-2 text-right font-medium text-[#16191f]">${resource.cost.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
