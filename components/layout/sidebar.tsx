"use client"

import {
  LayoutDashboard,
  Server,
  TrendingUp,
  AlertTriangle,
  Wallet,
  Leaf,
  Cpu,
  Database,
  HardDrive,
  Sparkles,
  Layers,
  BarChart3,
  Table,
  Workflow,
  Zap,
  Search,
  Activity,
  Network,
  GitBranch,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Page } from "../cost-optimization-hub"

interface SidebarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

const navItems = [
  { id: "overview" as Page, label: "Overview", icon: LayoutDashboard },
  { id: "ai-recommendations" as Page, label: "AI Powered Recommendations", icon: Sparkles },
  { id: "workloads" as Page, label: "Workloads", icon: Server },
  { id: "compute" as Page, label: "Compute", icon: Cpu },
  { id: "storage" as Page, label: "Storage & Backup", icon: HardDrive },
  { id: "amazon-s3" as Page, label: "Amazon S3", icon: Database },
  { id: "amazon-rds" as Page, label: "Amazon RDS", icon: Database },
  { id: "amazon-redshift" as Page, label: "Amazon Redshift", icon: BarChart3 },
  { id: "amazon-dynamodb" as Page, label: "Amazon DynamoDB", icon: Table },
  { id: "amazon-emr" as Page, label: "Amazon EMR", icon: Layers },
  { id: "amazon-glue" as Page, label: "Amazon Glue", icon: Workflow },
  { id: "amazon-athena" as Page, label: "Amazon Athena", icon: Search },
  { id: "amazon-elasticache" as Page, label: "Amazon ElastiCache", icon: Zap },
  { id: "amazon-opensearch" as Page, label: "Amazon OpenSearch", icon: Activity },
  { id: "amazon-msk" as Page, label: "Amazon MSK", icon: Network },
  { id: "amazon-neptune" as Page, label: "Amazon Neptune", icon: GitBranch },
  { id: "optimization" as Page, label: "Optimization Hub", icon: TrendingUp },
  { id: "anomalies" as Page, label: "Anomalies", icon: AlertTriangle },
  { id: "budgets" as Page, label: "Budgets & Forecast", icon: Wallet },
  { id: "sustainability" as Page, label: "Sustainability", icon: Leaf },
]

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-[#e5e7eb] bg-white min-h-[calc(100vh-3.5rem)]">
      <nav className="p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
                currentPage === item.id
                  ? "bg-[#f0f7ff] text-[#0972d3] font-medium"
                  : "text-[#545b64] hover:bg-[#f7f7f8]",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
