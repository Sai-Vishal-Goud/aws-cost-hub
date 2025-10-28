"use client"

import { useState } from "react"
import { Header } from "./layout/header"
import { Sidebar } from "./layout/sidebar"
import { Overview } from "./pages/overview"
import { OptimizationHub } from "./pages/optimization-hub"
import { Anomalies } from "./pages/anomalies"
import { Workloads } from "./pages/workloads"
import { BudgetsForecast } from "./pages/budgets-forecast"
import { Sustainability } from "./pages/sustainability"
import { Compute } from "./pages/compute"
import { AmazonS3 } from "./pages/amazon-s3"
import { Storage } from "./pages/storage"
import { AIRecommendations } from "./pages/ai-recommendations"
import { AgentPanel } from "./agent/agent-panel"
import { AmazonRDS } from "./pages/amazon-rds"
import { AmazonRedshift } from "./pages/amazon-redshift"
import { AmazonDynamoDB } from "./pages/amazon-dynamodb"
import { AmazonEMR } from "./pages/amazon-emr"
import { AmazonGlue } from "./pages/amazon-glue"
import { AmazonAthena } from "./pages/amazon-athena"
import { AmazonElastiCache } from "./pages/amazon-elasticache"
import { AmazonOpenSearch } from "./pages/amazon-opensearch"
import { AmazonMSK } from "./pages/amazon-msk"
import { AmazonNeptune } from "./pages/amazon-neptune"

export type Page =
  | "overview"
  | "workloads"
  | "optimization"
  | "anomalies"
  | "budgets"
  | "sustainability"
  | "compute"
  | "amazon-s3"
  | "storage"
  | "ai-recommendations"
  | "amazon-rds"
  | "amazon-redshift"
  | "amazon-dynamodb"
  | "amazon-emr"
  | "amazon-glue"
  | "amazon-athena"
  | "amazon-elasticache"
  | "amazon-opensearch"
  | "amazon-msk"
  | "amazon-neptune"

export function CostOptimizationHub() {
  const [currentPage, setCurrentPage] = useState<Page>("overview")
  const [agentOpen, setAgentOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f7f7f8]">
      <Header onToggleAgent={() => setAgentOpen(!agentOpen)} agentOpen={agentOpen} />

      <div className="flex">
        <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

        <main className="flex-1 p-6">
          {currentPage === "overview" && <Overview />}
          {currentPage === "workloads" && <Workloads />}
          {currentPage === "optimization" && <OptimizationHub />}
          {currentPage === "anomalies" && <Anomalies />}
          {currentPage === "budgets" && <BudgetsForecast />}
          {currentPage === "sustainability" && <Sustainability />}
          {currentPage === "compute" && <Compute />}
          {currentPage === "amazon-s3" && <AmazonS3 />}
          {currentPage === "storage" && <Storage />}
          {currentPage === "ai-recommendations" && <AIRecommendations />}
          {currentPage === "amazon-rds" && <AmazonRDS />}
          {currentPage === "amazon-redshift" && <AmazonRedshift />}
          {currentPage === "amazon-dynamodb" && <AmazonDynamoDB />}
          {currentPage === "amazon-emr" && <AmazonEMR />}
          {currentPage === "amazon-glue" && <AmazonGlue />}
          {currentPage === "amazon-athena" && <AmazonAthena />}
          {currentPage === "amazon-elasticache" && <AmazonElastiCache />}
          {currentPage === "amazon-opensearch" && <AmazonOpenSearch />}
          {currentPage === "amazon-msk" && <AmazonMSK />}
          {currentPage === "amazon-neptune" && <AmazonNeptune />}
        </main>

        <AgentPanel isOpen={agentOpen} onClose={() => setAgentOpen(false)} />
      </div>
    </div>
  )
}
