"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Sparkles,
  TrendingUp,
  DollarSign,
  Zap,
  ChevronDown,
  ChevronUp,
  Loader2,
  Filter,
  Cpu,
  Database,
  HardDrive,
  Server,
  Shield,
  Target,
  AlertTriangle,
  PieChart,
  Leaf,
} from "lucide-react"

interface Recommendation {
  id: string
  title: string
  description: string
  impact: "high" | "medium" | "low"
  confidence: number
  estimatedSavings?: string
  priority: number
  category: string
  service: string
  actionItems: string[]
  reasoning: string
}

const sampleRecommendations: Recommendation[] = [
  {
    id: "1",
    title: "Increase Savings Plans Coverage for VM Instances",
    description:
      "Current Savings Plans coverage is at 68.5%. Increasing to 85% could save approximately $15,234/month.",
    impact: "high",
    confidence: 92,
    estimatedSavings: "$15,234",
    priority: 1,
    category: "cost",
    service: "compute",
    actionItems: [
      "Analyze VM usage patterns over the last 90 days",
      "Purchase additional 1-year Savings Plans for stable workloads",
      "Set up automated recommendations for future purchases",
    ],
    reasoning:
      "Analysis shows 31.5% of VM instances are running on-demand with consistent usage patterns, making them ideal candidates for Savings Plans coverage.",
  },
  {
    id: "2",
    title: "Adopt Spot Instances for Non-Critical Workloads",
    description: "Only 12.3% of workloads use Spot instances. Increasing to 30% could reduce costs by $8,500/month.",
    impact: "high",
    confidence: 88,
    estimatedSavings: "$8,500",
    priority: 1,
    category: "cost",
    service: "compute",
    actionItems: [
      "Identify fault-tolerant and flexible workloads",
      "Implement Spot instance request strategies",
      "Set up automatic fallback to on-demand instances",
    ],
    reasoning:
      "Batch processing, CI/CD pipelines, and development environments show high tolerance for interruptions and are excellent Spot instance candidates.",
  },
  {
    id: "3",
    title: "Right-Size Underutilized VM Instances",
    description: "247 instances show average CPU utilization below 20%. Right-sizing could save $12,450/month.",
    impact: "high",
    confidence: 95,
    estimatedSavings: "$12,450",
    priority: 1,
    category: "cost",
    service: "compute",
    actionItems: [
      "Review CPU, memory, and network utilization metrics",
      "Downsize instances to appropriate sizes",
      "Monitor performance after changes",
    ],
    reasoning:
      "Persistent low utilization indicates over-provisioned resources. Right-sizing maintains performance while reducing costs.",
  },
  {
    id: "4",
    title: "Implement S3 Intelligent-Tiering",
    description: "Enable Intelligent-Tiering on 847 TB of S3 data to automatically optimize storage costs.",
    impact: "high",
    confidence: 90,
    estimatedSavings: "$18,900",
    priority: 1,
    category: "cost",
    service: "s3",
    actionItems: [
      "Analyze access patterns for top 50 buckets",
      "Enable Intelligent-Tiering on eligible buckets",
      "Monitor cost savings and access patterns",
    ],
    reasoning:
      "Access pattern analysis shows 65% of data hasn't been accessed in 90+ days, making it ideal for automatic tiering.",
  },
  {
    id: "5",
    title: "Optimize S3 Lifecycle Policies",
    description: "Configure lifecycle policies to transition infrequently accessed data to cheaper storage classes.",
    impact: "medium",
    confidence: 87,
    estimatedSavings: "$6,750",
    priority: 2,
    category: "cost",
    service: "s3",
    actionItems: [
      "Identify buckets without lifecycle policies",
      "Create policies to move data to Glacier after 90 days",
      "Set up deletion policies for temporary data",
    ],
    reasoning:
      "Many buckets lack lifecycle policies, resulting in data remaining in expensive Standard storage indefinitely.",
  },
  {
    id: "6",
    title: "Reduce Backup Retention Period",
    description: "Current 90-day retention exceeds compliance requirements. Reducing to 60 days saves $4,200/month.",
    impact: "medium",
    confidence: 85,
    estimatedSavings: "$4,200",
    priority: 2,
    category: "cost",
    service: "storage",
    actionItems: [
      "Review compliance and regulatory requirements",
      "Update backup retention policies",
      "Implement tiered retention for critical vs non-critical data",
    ],
    reasoning: "Compliance audit shows 60-day retention meets all requirements, making extended retention unnecessary.",
  },
  {
    id: "7",
    title: "Consolidate Multi-Region Backups",
    description: "Backups are replicated across 4 regions. Consolidating to 2 regions could save $5,600/month.",
    impact: "medium",
    confidence: 82,
    estimatedSavings: "$5,600",
    priority: 2,
    category: "cost",
    service: "storage",
    actionItems: [
      "Assess disaster recovery requirements",
      "Identify primary and secondary backup regions",
      "Migrate backups and update policies",
    ],
    reasoning:
      "Current multi-region strategy exceeds disaster recovery needs, resulting in unnecessary replication costs.",
  },
  {
    id: "8",
    title: "Upgrade to Latest Generation Instances",
    description:
      "342 instances are running on previous generation hardware. Upgrading improves performance and reduces costs by $7,800/month.",
    impact: "high",
    confidence: 91,
    estimatedSavings: "$7,800",
    priority: 1,
    category: "performance",
    service: "compute",
    actionItems: [
      "Identify instances on previous generation types",
      "Test workloads on new generation instances",
      "Schedule rolling upgrades with minimal downtime",
    ],
    reasoning: "Latest generation instances offer 20-30% better price-performance ratio with improved capabilities.",
  },
  {
    id: "9",
    title: "Enable RDS Reserved Instances",
    description: "All RDS instances are on-demand. Purchasing Reserved Instances could save $9,200/month.",
    impact: "high",
    confidence: 94,
    estimatedSavings: "$9,200",
    priority: 1,
    category: "cost",
    service: "rds",
    actionItems: [
      "Analyze RDS instance usage patterns",
      "Purchase 1-year or 3-year Reserved Instances",
      "Set up monitoring for utilization",
    ],
    reasoning:
      "RDS instances show consistent 24/7 usage patterns, making them ideal candidates for Reserved Instance savings.",
  },
  {
    id: "10",
    title: "Implement RDS Storage Auto-Scaling",
    description: "Enable auto-scaling to prevent over-provisioning and reduce storage costs by $2,100/month.",
    impact: "medium",
    confidence: 86,
    estimatedSavings: "$2,100",
    priority: 2,
    category: "cost",
    service: "rds",
    actionItems: [
      "Review current storage utilization",
      "Enable auto-scaling with appropriate thresholds",
      "Monitor scaling events and adjust policies",
    ],
    reasoning: "Many RDS instances have 40-50% unused storage capacity, indicating over-provisioning.",
  },
  {
    id: "11",
    title: "Optimize Redshift Cluster Size",
    description:
      "Redshift cluster is over-provisioned. Downsizing could save $11,500/month without impacting performance.",
    impact: "high",
    confidence: 89,
    estimatedSavings: "$11,500",
    priority: 1,
    category: "cost",
    service: "redshift",
    actionItems: [
      "Analyze query performance and resource utilization",
      "Test workloads on smaller cluster configuration",
      "Implement resize during maintenance window",
    ],
    reasoning: "Cluster utilization averages 35%, indicating significant over-provisioning opportunity.",
  },
  {
    id: "12",
    title: "Enable Redshift Concurrency Scaling",
    description: "Configure concurrency scaling to handle peak loads efficiently and reduce cluster size.",
    impact: "medium",
    confidence: 84,
    estimatedSavings: "$3,400",
    priority: 2,
    category: "performance",
    service: "redshift",
    actionItems: [
      "Enable concurrency scaling for read queries",
      "Set appropriate scaling thresholds",
      "Monitor query performance and costs",
    ],
    reasoning:
      "Peak load analysis shows temporary spikes that could be handled by concurrency scaling instead of permanent capacity.",
  },
  {
    id: "13",
    title: "Implement DynamoDB On-Demand Pricing",
    description: "Switch unpredictable workloads from provisioned to on-demand pricing to save $4,800/month.",
    impact: "medium",
    confidence: 87,
    estimatedSavings: "$4,800",
    priority: 2,
    category: "cost",
    service: "dynamodb",
    actionItems: [
      "Identify tables with unpredictable traffic patterns",
      "Switch to on-demand capacity mode",
      "Monitor costs and adjust as needed",
    ],
    reasoning: "Several tables show highly variable traffic patterns with frequent over-provisioning to handle peaks.",
  },
  {
    id: "14",
    title: "Enable DynamoDB Auto Scaling",
    description: "Configure auto-scaling for provisioned capacity tables to optimize costs by $3,200/month.",
    impact: "medium",
    confidence: 85,
    estimatedSavings: "$3,200",
    priority: 2,
    category: "cost",
    service: "dynamodb",
    actionItems: [
      "Review tables with provisioned capacity",
      "Enable auto-scaling with target utilization of 70%",
      "Set appropriate min/max capacity limits",
    ],
    reasoning: "Many provisioned tables show utilization varying between 20-80%, ideal for auto-scaling optimization.",
  },
  {
    id: "15",
    title: "Optimize EMR Cluster Configuration",
    description: "Right-size EMR clusters and use Spot instances for task nodes to save $6,900/month.",
    impact: "high",
    confidence: 88,
    estimatedSavings: "$6,900",
    priority: 1,
    category: "cost",
    service: "emr",
    actionItems: [
      "Analyze cluster utilization patterns",
      "Use Spot instances for task nodes",
      "Implement auto-termination for idle clusters",
    ],
    reasoning:
      "EMR clusters show periods of low utilization and task nodes are fault-tolerant, making them ideal for Spot instances.",
  },
  {
    id: "16",
    title: "Implement Glue Job Bookmarks",
    description: "Enable job bookmarks to process only new data and reduce processing costs by $2,800/month.",
    impact: "medium",
    confidence: 86,
    estimatedSavings: "$2,800",
    priority: 2,
    category: "efficiency",
    service: "glue",
    actionItems: [
      "Enable job bookmarks for incremental ETL jobs",
      "Test bookmark functionality with sample data",
      "Monitor job execution times and costs",
    ],
    reasoning: "Many Glue jobs are reprocessing entire datasets instead of only new data, wasting compute resources.",
  },
  {
    id: "17",
    title: "Optimize Glue Crawler Schedules",
    description: "Reduce crawler frequency from hourly to daily for stable schemas to save $1,200/month.",
    impact: "low",
    confidence: 83,
    estimatedSavings: "$1,200",
    priority: 3,
    category: "cost",
    service: "glue",
    actionItems: [
      "Review crawler schedules and schema change frequency",
      "Adjust schedules to match actual data update patterns",
      "Implement event-driven crawlers where appropriate",
    ],
    reasoning: "Schema analysis shows most data sources have stable schemas that don't require hourly crawling.",
  },
  {
    id: "18",
    title: "Enable Athena Query Result Reuse",
    description: "Configure query result caching to reduce redundant queries and save $1,800/month.",
    impact: "low",
    confidence: 84,
    estimatedSavings: "$1,800",
    priority: 3,
    category: "cost",
    service: "athena",
    actionItems: [
      "Enable query result reuse with appropriate TTL",
      "Educate users on cache benefits",
      "Monitor cache hit rates",
    ],
    reasoning: "Query log analysis shows 35% of queries are duplicates that could benefit from result caching.",
  },
  {
    id: "19",
    title: "Partition Athena Tables",
    description: "Implement partitioning on large tables to reduce data scanned and save $3,600/month.",
    impact: "medium",
    confidence: 89,
    estimatedSavings: "$3,600",
    priority: 2,
    category: "performance",
    service: "athena",
    actionItems: [
      "Identify large tables without partitioning",
      "Implement date-based or category-based partitioning",
      "Update queries to use partition filters",
    ],
    reasoning: "Large tables without partitioning result in full table scans, significantly increasing query costs.",
  },
  {
    id: "20",
    title: "Optimize ElastiCache Node Types",
    description: "Switch to memory-optimized node types for cache-heavy workloads to save $2,400/month.",
    impact: "medium",
    confidence: 85,
    estimatedSavings: "$2,400",
    priority: 2,
    category: "performance",
    service: "elasticache",
    actionItems: [
      "Analyze cache hit rates and memory utilization",
      "Test memory-optimized node types",
      "Migrate during low-traffic periods",
    ],
    reasoning:
      "Current general-purpose nodes are memory-constrained, while memory-optimized nodes offer better price-performance.",
  },
  {
    id: "21",
    title: "Implement ElastiCache Reserved Nodes",
    description: "Purchase Reserved Nodes for production caches to save $5,100/month.",
    impact: "high",
    confidence: 92,
    estimatedSavings: "$5,100",
    priority: 1,
    category: "cost",
    service: "elasticache",
    actionItems: [
      "Identify production caches with consistent usage",
      "Purchase 1-year or 3-year Reserved Nodes",
      "Monitor utilization and adjust as needed",
    ],
    reasoning: "Production caches run 24/7 with predictable usage, making them ideal for Reserved Node savings.",
  },
  {
    id: "22",
    title: "Enable OpenSearch Reserved Instances",
    description: "Purchase Reserved Instances for OpenSearch domains to save $7,300/month.",
    impact: "high",
    confidence: 91,
    estimatedSavings: "$7,300",
    priority: 1,
    category: "cost",
    service: "opensearch",
    actionItems: [
      "Review OpenSearch domain usage patterns",
      "Purchase Reserved Instances for stable workloads",
      "Set up cost monitoring",
    ],
    reasoning:
      "OpenSearch domains show consistent 24/7 usage, offering significant Reserved Instance savings opportunity.",
  },
  {
    id: "23",
    title: "Optimize OpenSearch Index Lifecycle",
    description: "Implement index lifecycle policies to move old data to UltraWarm storage, saving $4,500/month.",
    impact: "medium",
    confidence: 87,
    estimatedSavings: "$4,500",
    priority: 2,
    category: "cost",
    service: "opensearch",
    actionItems: [
      "Analyze index access patterns",
      "Configure lifecycle policies for indices older than 30 days",
      "Enable UltraWarm storage tier",
    ],
    reasoning: "Most queries target recent data, while older indices remain in expensive hot storage unnecessarily.",
  },
  {
    id: "24",
    title: "Implement MSK Tiered Storage",
    description: "Enable tiered storage for Kafka topics to reduce storage costs by $3,800/month.",
    impact: "medium",
    confidence: 86,
    estimatedSavings: "$3,800",
    priority: 2,
    category: "cost",
    service: "msk",
    actionItems: [
      "Identify topics with long retention periods",
      "Enable tiered storage for eligible topics",
      "Monitor performance and costs",
    ],
    reasoning:
      "Many topics have long retention periods with infrequent access to older messages, ideal for tiered storage.",
  },
  {
    id: "25",
    title: "Right-Size MSK Broker Instances",
    description: "Downsize over-provisioned Kafka brokers to save $5,200/month.",
    impact: "high",
    confidence: 88,
    estimatedSavings: "$5,200",
    priority: 1,
    category: "cost",
    service: "msk",
    actionItems: [
      "Analyze broker CPU, memory, and network utilization",
      "Test smaller instance types in non-production",
      "Implement rolling broker updates",
    ],
    reasoning: "Broker utilization averages 30%, indicating significant over-provisioning opportunity.",
  },
  {
    id: "26",
    title: "Optimize Neptune Instance Size",
    description: "Current Neptune instance is over-provisioned. Downsizing could save $4,100/month.",
    impact: "medium",
    confidence: 84,
    estimatedSavings: "$4,100",
    priority: 2,
    category: "cost",
    service: "neptune",
    actionItems: [
      "Review query performance and resource utilization",
      "Test smaller instance types",
      "Implement resize during maintenance window",
    ],
    reasoning: "Neptune instance shows average utilization of 25%, suggesting over-provisioning.",
  },
  {
    id: "27",
    title: "Implement Cost Anomaly Detection Alerts",
    description: "Set up automated alerts for cost anomalies to catch unexpected spending early.",
    impact: "high",
    confidence: 93,
    estimatedSavings: "$8,900",
    priority: 1,
    category: "cost",
    service: "anomalies",
    actionItems: [
      "Configure anomaly detection with appropriate thresholds",
      "Set up email and Slack notifications",
      "Create runbooks for common anomaly types",
    ],
    reasoning:
      "Historical data shows 8 cost anomalies in the past quarter that went undetected for days, resulting in unnecessary spending.",
  },
  {
    id: "28",
    title: "Investigate Recurring Cost Spikes",
    description: "Weekly cost spikes detected every Friday. Investigation could prevent $2,300/month in waste.",
    impact: "medium",
    confidence: 87,
    estimatedSavings: "$2,300",
    priority: 2,
    category: "efficiency",
    service: "anomalies",
    actionItems: [
      "Analyze resource usage during spike periods",
      "Identify root cause (scheduled jobs, traffic patterns, etc.)",
      "Optimize or reschedule problematic workloads",
    ],
    reasoning: "Consistent weekly pattern suggests scheduled processes that could be optimized or spread across time.",
  },
  {
    id: "29",
    title: "Set Up Budget Alerts for All Accounts",
    description: "Configure budget alerts to prevent overspending and improve cost visibility.",
    impact: "medium",
    confidence: 90,
    estimatedSavings: "$5,600",
    priority: 2,
    category: "cost",
    service: "budgets",
    actionItems: [
      "Create budgets for each account and service",
      "Set up alerts at 80%, 90%, and 100% thresholds",
      "Assign budget owners and escalation paths",
    ],
    reasoning: "3 accounts exceeded budgets last quarter without alerts, resulting in unexpected costs.",
  },
  {
    id: "30",
    title: "Improve Budget Forecast Accuracy",
    description: "Refine forecasting models to improve accuracy from 87% to 95%.",
    impact: "low",
    confidence: 82,
    estimatedSavings: "$1,500",
    priority: 3,
    category: "efficiency",
    service: "budgets",
    actionItems: [
      "Incorporate seasonal trends into forecasts",
      "Use machine learning for better predictions",
      "Review and adjust forecasts monthly",
    ],
    reasoning: "Current forecasts don't account for seasonal patterns, leading to 12% average variance.",
  },
  {
    id: "31",
    title: "Migrate to Renewable Energy Regions",
    description: "Move workloads to regions with higher renewable energy usage to reduce carbon footprint by 25%.",
    impact: "high",
    confidence: 88,
    estimatedSavings: "$0",
    priority: 1,
    category: "efficiency",
    service: "sustainability",
    actionItems: [
      "Identify workloads suitable for migration",
      "Select target regions with high renewable energy",
      "Plan and execute migration with minimal disruption",
    ],
    reasoning: "Current regions have 42% renewable energy. Target regions offer 80%+ renewable energy usage.",
  },
  {
    id: "32",
    title: "Implement Carbon-Aware Workload Scheduling",
    description: "Schedule non-urgent workloads during periods of high renewable energy availability.",
    impact: "medium",
    confidence: 85,
    estimatedSavings: "$0",
    priority: 2,
    category: "efficiency",
    service: "sustainability",
    actionItems: [
      "Identify batch jobs and flexible workloads",
      "Implement scheduling based on carbon intensity data",
      "Monitor carbon footprint reduction",
    ],
    reasoning:
      "18% of workloads are flexible and could be scheduled during low-carbon periods without business impact.",
  },
  {
    id: "33",
    title: "Optimize Resource Utilization for Sustainability",
    description: "Improve resource efficiency to reduce waste and lower carbon footprint by 15%.",
    impact: "medium",
    confidence: 86,
    estimatedSavings: "$4,200",
    priority: 2,
    category: "efficiency",
    service: "sustainability",
    actionItems: [
      "Right-size over-provisioned resources",
      "Implement auto-scaling policies",
      "Shut down unused resources",
    ],
    reasoning:
      "Better resource utilization reduces both costs and environmental impact through reduced energy consumption.",
  },
  {
    id: "34",
    title: "Consolidate Optimization Recommendations",
    description: "47 optimization recommendations are pending. Implementing top 10 could save $23,400/month.",
    impact: "high",
    confidence: 94,
    estimatedSavings: "$23,400",
    priority: 1,
    category: "cost",
    service: "optimization-hub",
    actionItems: [
      "Prioritize recommendations by savings potential",
      "Create implementation plan with timelines",
      "Assign owners for each recommendation",
    ],
    reasoning:
      "Many high-value recommendations have been pending for 30+ days, representing significant missed savings.",
  },
  {
    id: "35",
    title: "Automate Optimization Implementation",
    description: "Set up automated implementation for low-risk optimizations to reduce manual effort.",
    impact: "medium",
    confidence: 87,
    estimatedSavings: "$6,700",
    priority: 2,
    category: "efficiency",
    service: "optimization-hub",
    actionItems: [
      "Identify low-risk, high-confidence recommendations",
      "Configure automated implementation with approval workflows",
      "Monitor results and adjust automation rules",
    ],
    reasoning:
      "Average implementation time of 3.2 days could be reduced to hours with automation for routine optimizations.",
  },
  {
    id: "36",
    title: "Delete Unused EBS Volumes",
    description: "156 unattached EBS volumes detected. Deleting them could save $3,900/month.",
    impact: "medium",
    confidence: 91,
    estimatedSavings: "$3,900",
    priority: 2,
    category: "cost",
    service: "storage",
    actionItems: [
      "Identify unattached volumes older than 30 days",
      "Create snapshots for volumes that might be needed",
      "Delete unused volumes",
    ],
    reasoning: "Many volumes remain unattached after instance termination, resulting in unnecessary storage costs.",
  },
  {
    id: "37",
    title: "Convert EBS Volumes to GP3",
    description: "Migrate GP2 volumes to GP3 for better performance and 20% cost savings of $5,400/month.",
    impact: "high",
    confidence: 92,
    estimatedSavings: "$5,400",
    priority: 1,
    category: "cost",
    service: "storage",
    actionItems: [
      "Identify GP2 volumes eligible for migration",
      "Test GP3 performance in non-production",
      "Schedule rolling migration",
    ],
    reasoning:
      "GP3 offers better baseline performance at lower cost compared to GP2, with no downside for most workloads.",
  },
  {
    id: "38",
    title: "Implement S3 Request Metrics",
    description: "Enable request metrics to identify and optimize high-cost API operations.",
    impact: "low",
    confidence: 84,
    estimatedSavings: "$2,100",
    priority: 3,
    category: "efficiency",
    service: "s3",
    actionItems: [
      "Enable request metrics for top buckets",
      "Analyze PUT, GET, and LIST operation patterns",
      "Optimize application code to reduce unnecessary requests",
    ],
    reasoning: "Request costs of $12,345/month suggest potential inefficiencies in API usage patterns.",
  },
  {
    id: "39",
    title: "Enable S3 Transfer Acceleration",
    description: "Use Transfer Acceleration for global uploads to improve performance and reduce transfer costs.",
    impact: "low",
    confidence: 81,
    estimatedSavings: "$1,300",
    priority: 3,
    category: "performance",
    service: "s3",
    actionItems: [
      "Identify buckets with global upload patterns",
      "Enable Transfer Acceleration",
      "Update application endpoints",
    ],
    reasoning: "Global user base shows high latency for uploads from distant regions, impacting user experience.",
  },
  {
    id: "40",
    title: "Optimize RDS Backup Retention",
    description: "Reduce automated backup retention from 35 to 7 days to save $1,800/month.",
    impact: "low",
    confidence: 83,
    estimatedSavings: "$1,800",
    priority: 3,
    category: "cost",
    service: "rds",
    actionItems: [
      "Review backup and recovery requirements",
      "Adjust automated backup retention period",
      "Implement manual snapshots for long-term retention",
    ],
    reasoning:
      "Extended automated backup retention exceeds recovery point objectives and increases costs unnecessarily.",
  },
  {
    id: "41",
    title: "Enable RDS Performance Insights",
    description: "Activate Performance Insights to identify and resolve database performance issues.",
    impact: "medium",
    confidence: 88,
    estimatedSavings: "$3,200",
    priority: 2,
    category: "performance",
    service: "rds",
    actionItems: [
      "Enable Performance Insights on production databases",
      "Set up monitoring dashboards",
      "Train team on performance analysis",
    ],
    reasoning:
      "Performance issues are causing application slowdowns that could be diagnosed and resolved with better visibility.",
  },
  {
    id: "42",
    title: "Implement Redshift Workload Management",
    description: "Configure WLM queues to optimize query performance and resource utilization.",
    impact: "medium",
    confidence: 86,
    estimatedSavings: "$2,700",
    priority: 2,
    category: "performance",
    service: "redshift",
    actionItems: [
      "Analyze query patterns and resource usage",
      "Create WLM queues for different workload types",
      "Monitor queue performance and adjust",
    ],
    reasoning:
      "Mixed workload types are competing for resources, causing performance degradation for critical queries.",
  },
  {
    id: "43",
    title: "Enable Redshift Automatic Table Optimization",
    description: "Activate automatic table optimization to improve query performance without manual tuning.",
    impact: "low",
    confidence: 85,
    estimatedSavings: "$1,600",
    priority: 3,
    category: "performance",
    service: "redshift",
    actionItems: [
      "Enable automatic table optimization",
      "Monitor optimization recommendations",
      "Review and apply suggested improvements",
    ],
    reasoning: "Manual table optimization is time-consuming and often delayed, impacting query performance.",
  },
  {
    id: "44",
    title: "Optimize DynamoDB Table Design",
    description: "Redesign tables with hot partitions to improve performance and reduce costs by $4,100/month.",
    impact: "medium",
    confidence: 87,
    estimatedSavings: "$4,100",
    priority: 2,
    category: "performance",
    service: "dynamodb",
    actionItems: [
      "Identify tables with hot partition issues",
      "Redesign partition keys for better distribution",
      "Migrate data to optimized tables",
    ],
    reasoning: "Hot partitions are causing throttling and requiring over-provisioning to maintain performance.",
  },
  {
    id: "45",
    title: "Enable DynamoDB Point-in-Time Recovery",
    description: "Activate PITR for critical tables to improve data protection with minimal cost impact.",
    impact: "low",
    confidence: 89,
    estimatedSavings: "$0",
    priority: 3,
    category: "security",
    service: "dynamodb",
    actionItems: [
      "Identify critical tables without PITR",
      "Enable point-in-time recovery",
      "Document recovery procedures",
    ],
    reasoning:
      "Critical tables lack point-in-time recovery, creating risk of data loss from accidental deletions or corruption.",
  },
  {
    id: "46",
    title: "Optimize EMR Instance Fleet Configuration",
    description: "Use instance fleets with multiple instance types to improve Spot availability and reduce costs.",
    impact: "medium",
    confidence: 86,
    estimatedSavings: "$3,800",
    priority: 2,
    category: "cost",
    service: "emr",
    actionItems: [
      "Configure instance fleets with diverse instance types",
      "Set appropriate allocation strategies",
      "Monitor fleet composition and costs",
    ],
    reasoning:
      "Single instance type limits Spot availability and increases interruption risk, impacting both cost and reliability.",
  },
  {
    id: "47",
    title: "Implement Glue Data Quality Rules",
    description: "Set up data quality rules to catch issues early and reduce downstream processing costs.",
    impact: "low",
    confidence: 84,
    estimatedSavings: "$1,900",
    priority: 3,
    category: "efficiency",
    service: "glue",
    actionItems: [
      "Define data quality rules for critical datasets",
      "Configure Glue Data Quality checks",
      "Set up alerts for quality failures",
    ],
    reasoning:
      "Data quality issues are discovered late in pipelines, requiring expensive reprocessing and impacting downstream systems.",
  },
  {
    id: "48",
    title: "Optimize Athena Query Performance",
    description: "Use columnar formats and compression to reduce data scanned and save $4,300/month.",
    impact: "medium",
    confidence: 88,
    estimatedSavings: "$4,300",
    priority: 2,
    category: "cost",
    service: "athena",
    actionItems: [
      "Convert CSV/JSON data to Parquet format",
      "Enable compression for all datasets",
      "Update queries to leverage columnar format",
    ],
    reasoning:
      "Text-based formats result in scanning 5-10x more data than necessary, significantly increasing query costs.",
  },
  {
    id: "49",
    title: "Implement ElastiCache Connection Pooling",
    description: "Configure connection pooling to reduce connection overhead and improve performance.",
    impact: "low",
    confidence: 85,
    estimatedSavings: "$1,400",
    priority: 3,
    category: "performance",
    service: "elasticache",
    actionItems: [
      "Implement connection pooling in application code",
      "Configure appropriate pool sizes",
      "Monitor connection metrics",
    ],
    reasoning: "High connection churn is causing performance issues and unnecessary resource consumption.",
  },
  {
    id: "50",
    title: "Enable OpenSearch Auto-Tune",
    description: "Activate Auto-Tune to automatically optimize domain configuration for better performance.",
    impact: "low",
    confidence: 86,
    estimatedSavings: "$2,200",
    priority: 3,
    category: "performance",
    service: "opensearch",
    actionItems: [
      "Enable Auto-Tune on OpenSearch domains",
      "Review and apply recommended optimizations",
      "Monitor performance improvements",
    ],
    reasoning: "Manual tuning is infrequent and suboptimal, while Auto-Tune can continuously optimize configuration.",
  },
]

const serviceIcons = {
  compute: Cpu,
  storage: HardDrive,
  s3: Database,
  rds: Server,
  redshift: Database,
  dynamodb: Database,
  emr: Server,
  glue: Zap,
  athena: Database,
  elasticache: Database,
  opensearch: Database,
  msk: Server,
  neptune: Database,
  network: Zap,
  security: Shield,
  "optimization-hub": Target,
  anomalies: AlertTriangle,
  budgets: PieChart,
  sustainability: Leaf,
}

const impactColors = {
  high: "bg-red-100 text-red-700 border-red-200",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  low: "bg-blue-100 text-blue-700 border-blue-200",
}

const categoryColors = {
  cost: "bg-green-100 text-green-700",
  performance: "bg-purple-100 text-purple-700",
  security: "bg-red-100 text-red-700",
  efficiency: "bg-blue-100 text-blue-700",
}

export function AIRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(false)
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())

  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set())
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set())
  const [selectedImpacts, setSelectedImpacts] = useState<Set<string>>(new Set())
  const [selectedPriorities, setSelectedPriorities] = useState<Set<string>>(new Set())

  const toggleCard = (id: string) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedCards(newExpanded)
  }

  const generateAllRecommendations = async () => {
    setLoading(true)
    try {
      // Simulate loading delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setRecommendations(sampleRecommendations)
    } catch (error) {
      console.error("[v0] Error loading recommendations:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleServiceFilter = (service: string) => {
    const newServices = new Set(selectedServices)
    if (newServices.has(service)) {
      newServices.delete(service)
    } else {
      newServices.add(service)
    }
    setSelectedServices(newServices)
  }

  const toggleCategoryFilter = (category: string) => {
    const newCategories = new Set(selectedCategories)
    if (newCategories.has(category)) {
      newCategories.delete(category)
    } else {
      newCategories.add(category)
    }
    setSelectedCategories(newCategories)
  }

  const toggleImpactFilter = (impact: string) => {
    const newImpacts = new Set(selectedImpacts)
    if (newImpacts.has(impact)) {
      newImpacts.delete(impact)
    } else {
      newImpacts.add(impact)
    }
    setSelectedImpacts(newImpacts)
  }

  const togglePriorityFilter = (priority: string) => {
    const newPriorities = new Set(selectedPriorities)
    if (newPriorities.has(priority)) {
      newPriorities.delete(priority)
    } else {
      newPriorities.add(priority)
    }
    setSelectedPriorities(newPriorities)
  }

  const filteredRecommendations = recommendations.filter((rec) => {
    if (selectedServices.size > 0 && !selectedServices.has(rec.service)) return false
    if (selectedCategories.size > 0 && !selectedCategories.has(rec.category)) return false
    if (selectedImpacts.size > 0 && !selectedImpacts.has(rec.impact)) return false
    if (selectedPriorities.size > 0 && !selectedPriorities.has(rec.priority.toString())) return false
    return true
  })

  const totalSavings = filteredRecommendations
    .filter((rec) => rec.estimatedSavings)
    .reduce((sum, rec) => {
      const savings = rec.estimatedSavings?.replace(/[$,]/g, "") || "0"
      return sum + Number.parseFloat(savings)
    }, 0)

  const uniqueServices = Array.from(new Set(recommendations.map((r) => r.service)))
  const uniqueCategories = Array.from(new Set(recommendations.map((r) => r.category)))
  const uniqueImpacts = ["high", "medium", "low"]
  const uniquePriorities = ["1", "2", "3"]

  return (
    <div className="flex gap-6">
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#16191f]">AI Powered Recommendations</h1>
            <p className="text-sm text-[#545b64] mt-1">
              Intelligent cost optimization insights across all your cloud services
            </p>
          </div>
          <Button
            onClick={generateAllRecommendations}
            disabled={loading}
            className="bg-[#0972d3] hover:bg-[#0862bc] text-white"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating Insights...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate AI Recommendations
              </>
            )}
          </Button>
        </div>

        {recommendations.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4 border-[#e5e7eb]">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Target className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-[#545b64]">Total Recommendations</p>
                    <p className="text-2xl font-semibold text-[#16191f]">{filteredRecommendations.length}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border-[#e5e7eb]">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-[#545b64]">Potential Savings</p>
                    <p className="text-2xl font-semibold text-[#16191f]">${totalSavings.toLocaleString()}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border-[#e5e7eb]">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-[#545b64]">High Priority</p>
                    <p className="text-2xl font-semibold text-[#16191f]">
                      {filteredRecommendations.filter((r) => r.priority === 1).length}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border-[#e5e7eb]">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-[#545b64]">Avg Confidence</p>
                    <p className="text-2xl font-semibold text-[#16191f]">
                      {filteredRecommendations.length > 0
                        ? Math.round(
                            filteredRecommendations.reduce((sum, r) => sum + r.confidence, 0) /
                              filteredRecommendations.length,
                          )
                        : 0}
                      %
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}

        {recommendations.length === 0 && !loading && (
          <Card className="p-12 border-[#e5e7eb] text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-purple-100 rounded-full">
                <Sparkles className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#16191f] mb-2">No Recommendations Yet</h3>
                <p className="text-sm text-[#545b64] max-w-md">
                  Click "Generate AI Recommendations" to analyze your cloud infrastructure and receive intelligent
                  optimization insights across all services.
                </p>
              </div>
            </div>
          </Card>
        )}

        <div className="space-y-4">
          {filteredRecommendations.map((rec) => {
            const isExpanded = expandedCards.has(rec.id)
            const ServiceIcon = serviceIcons[rec.service as keyof typeof serviceIcons] || Target

            return (
              <Card
                key={rec.id}
                className={`border-l-4 ${
                  rec.priority === 1
                    ? "border-l-red-500"
                    : rec.priority === 2
                      ? "border-l-orange-500"
                      : rec.priority === 3
                        ? "border-l-yellow-500"
                        : "border-l-blue-500"
                } border-[#e5e7eb]`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <ServiceIcon className="h-4 w-4 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-[#16191f]">{rec.title}</h3>
                        <Badge variant="outline" className={`${impactColors[rec.impact]} border text-xs`}>
                          {rec.impact.toUpperCase()} IMPACT
                        </Badge>
                        <Badge variant="outline" className={`${categoryColors[rec.category]} text-xs`}>
                          {rec.category.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-[#545b64] mb-4">{rec.description}</p>

                      <div className="flex items-center gap-6 text-sm">
                        {rec.estimatedSavings && (
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            <span className="font-semibold text-green-600">{rec.estimatedSavings}/mo</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-purple-600" />
                          <span className="text-[#545b64]">
                            Confidence: <span className="font-semibold">{rec.confidence}%</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-blue-600" />
                          <span className="text-[#545b64]">
                            Priority: <span className="font-semibold">{rec.priority}</span>
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs capitalize">
                          {rec.service.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>

                    <Button variant="ghost" size="sm" onClick={() => toggleCard(rec.id)} className="ml-4">
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>

                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-[#e5e7eb] space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-[#16191f] mb-2">Action Items</h4>
                        <ul className="space-y-2">
                          {rec.actionItems.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-[#545b64]">
                              <span className="text-[#0972d3] mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-[#16191f] mb-2">AI Reasoning</h4>
                        <p className="text-sm text-[#545b64] bg-[#f7f7f8] p-3 rounded-md">{rec.reasoning}</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {recommendations.length > 0 && (
        <div className="w-80 space-y-4">
          <Card className="p-4 border-[#e5e7eb] sticky top-4">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-4 w-4 text-[#545b64]" />
              <h3 className="font-semibold text-[#16191f]">Filters</h3>
            </div>

            <div className="space-y-6">
              {/* Service Filters */}
              <div>
                <h4 className="text-sm font-semibold text-[#16191f] mb-3">Service</h4>
                <div className="space-y-2">
                  {uniqueServices.map((service) => (
                    <div key={service} className="flex items-center gap-2">
                      <Checkbox
                        id={`service-${service}`}
                        checked={selectedServices.has(service)}
                        onCheckedChange={() => toggleServiceFilter(service)}
                      />
                      <Label
                        htmlFor={`service-${service}`}
                        className="text-sm text-[#545b64] cursor-pointer capitalize"
                      >
                        {service.replace("-", " ")} ({recommendations.filter((r) => r.service === service).length})
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Filters */}
              <div>
                <h4 className="text-sm font-semibold text-[#16191f] mb-3">Category</h4>
                <div className="space-y-2">
                  {uniqueCategories.map((category) => (
                    <div key={category} className="flex items-center gap-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.has(category)}
                        onCheckedChange={() => toggleCategoryFilter(category)}
                      />
                      <Label
                        htmlFor={`category-${category}`}
                        className="text-sm text-[#545b64] cursor-pointer capitalize"
                      >
                        {category} ({recommendations.filter((r) => r.category === category).length})
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Filters */}
              <div>
                <h4 className="text-sm font-semibold text-[#16191f] mb-3">Impact</h4>
                <div className="space-y-2">
                  {uniqueImpacts.map((impact) => (
                    <div key={impact} className="flex items-center gap-2">
                      <Checkbox
                        id={`impact-${impact}`}
                        checked={selectedImpacts.has(impact)}
                        onCheckedChange={() => toggleImpactFilter(impact)}
                      />
                      <Label htmlFor={`impact-${impact}`} className="text-sm text-[#545b64] cursor-pointer capitalize">
                        {impact} ({recommendations.filter((r) => r.impact === impact).length})
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Priority Filters */}
              <div>
                <h4 className="text-sm font-semibold text-[#16191f] mb-3">Priority</h4>
                <div className="space-y-2">
                  {uniquePriorities.map((priority) => (
                    <div key={priority} className="flex items-center gap-2">
                      <Checkbox
                        id={`priority-${priority}`}
                        checked={selectedPriorities.has(priority)}
                        onCheckedChange={() => togglePriorityFilter(priority)}
                      />
                      <Label htmlFor={`priority-${priority}`} className="text-sm text-[#545b64] cursor-pointer">
                        Priority {priority} ({recommendations.filter((r) => r.priority.toString() === priority).length})
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clear Filters Button */}
              {(selectedServices.size > 0 ||
                selectedCategories.size > 0 ||
                selectedImpacts.size > 0 ||
                selectedPriorities.size > 0) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedServices(new Set())
                    setSelectedCategories(new Set())
                    setSelectedImpacts(new Set())
                    setSelectedPriorities(new Set())
                  }}
                  className="w-full"
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
