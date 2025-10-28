"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  Legend,
  ResponsiveContainer,
  Cell,
  ComposedChart,
} from "recharts"
import { TrendingUp, TrendingDown, Info, AlertCircle, Lightbulb, DollarSign, Zap, Shield } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AIRecommendations } from "@/components/ai/ai-recommendations"

// Mock data for VM Compute Unit Cost and Normalized Hours
const computeUnitData = [
  { month: "Jul", onDemand: 0.12, reserved: 0.08, savingsPlan: 0.09, spot: 0.04, hours: 125000 },
  { month: "Aug", onDemand: 0.13, reserved: 0.08, savingsPlan: 0.09, spot: 0.03, hours: 132000 },
  { month: "Sep", onDemand: 0.12, reserved: 0.08, savingsPlan: 0.09, spot: 0.04, hours: 128000 },
]

// Mock data for VM Coverage by Purchase Option
const coverageData = [
  { month: "Jul", onDemand: 45000, reserved: 35000, savingsPlan: 30000, spot: 15000 },
  { month: "Aug", onDemand: 48000, reserved: 38000, savingsPlan: 32000, spot: 14000 },
  { month: "Sep", onDemand: 46000, reserved: 36000, savingsPlan: 31000, spot: 15000 },
]

// Mock data for VM Normalized Hours by Platform
const platformData = [
  { month: "Jul", linux: 85000, windows: 30000, other: 10000 },
  { month: "Aug", linux: 90000, windows: 32000, other: 10000 },
  { month: "Sep", linux: 87000, windows: 31000, other: 10000 },
]

// Mock data for VM Compute Cost per Region
const regionData = [
  { region: "us-east-1", cost: 45230 },
  { region: "us-west-2", cost: 38450 },
  { region: "eu-central-1", cost: 32100 },
  { region: "ap-northeast-1", cost: 28900 },
  { region: "eu-west-1", cost: 25600 },
  { region: "ap-southeast-1", cost: 18700 },
]

// Mock data for Top 10 Accounts
const topAccountsData = [
  { account: "Account-A8X2", cost: 12450 },
  { account: "Account-B3Y9", cost: 10230 },
  { account: "Account-C7Z1", cost: 9870 },
  { account: "Account-D2M5", cost: 8650 },
  { account: "Account-E9P4", cost: 7890 },
  { account: "Account-F1K8", cost: 6540 },
  { account: "Account-G5L3", cost: 5890 },
  { account: "Account-H4N7", cost: 4320 },
  { account: "Account-I6R2", cost: 3780 },
  { account: "Account-J8T1", cost: 3210 },
]

// Mock data for Spot Savings
const spotSavingsData = [
  { month: "Jul", "us-east-1a": 68, "us-west-2b": 72, "eu-central-1a": 65, "ap-northeast-1a": 70 },
  { month: "Aug", "us-east-1a": 71, "us-west-2b": 69, "eu-central-1a": 67, "ap-northeast-1a": 73 },
  { month: "Sep", "us-east-1a": 69, "us-west-2b": 74, "eu-central-1a": 66, "ap-northeast-1a": 71 },
]

// Mock data for Instance Family Upgrade
const instanceFamilyData = [
  { family: "m5", cost: 19572.65, type: "Previous Gen" },
  { family: "c5", cost: 7440.93, type: "Previous Gen" },
  { family: "r5", cost: 3838.94, type: "Previous Gen" },
  { family: "t2", cost: 1984.26, type: "Previous Gen" },
  { family: "c4", cost: 700.5, type: "Previous Gen" },
]

// Mock data for Instance Usage
const instanceUsageData = [
  { account: "Account-A8X2", usage: 98, cost: 12450 },
  { account: "Account-B3Y9", usage: 85, cost: 10230 },
  { account: "Account-C7Z1", usage: 92, cost: 9870 },
  { account: "Account-D2M5", usage: 78, cost: 8650 },
  { account: "Account-E9P4", usage: 88, cost: 7890 },
]

// Mock data for Hourly Cost
const hourlyCostData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  cost: Math.random() * 500 + 200,
}))

// Mock data for Container Service
const containerCostData = [
  { month: "Jul", onDemand: 8500, spot: 2100 },
  { month: "Aug", onDemand: 9200, spot: 2400 },
  { month: "Sep", onDemand: 8900, spot: 2300 },
]

export function Compute() {
  const [usageUnit, setUsageUnit] = useState("hours")
  const [purchaseOption, setPurchaseOption] = useState("all")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Compute</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gain insights into VM, Container, and Serverless spend and trends.
        </p>
      </div>

      {/* AI-Powered Recommendations */}
      <AIRecommendations
        context={{
          pageType: "compute",
          metrics: {
            totalVMCost: 234567,
            containerCost: 28900,
            serverlessCost: 12450,
            savingsPlanCoverage: 68.5,
            spotSavingsAverage: 70,
            previousGenInstanceCost: 33537,
            unusedCapacityReservationCost: 2453,
          },
          trends: {
            vmCostChange: -8.2,
            containerCostChange: 3.5,
            coverageChange: 5.3,
          },
        }}
      />

      {/* Recommendations Section */}
      <div>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-500" />
          Quick Optimization Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-base">Savings Plans</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Increase coverage to 85% for an estimated <strong className="text-foreground">$18K/month</strong> in
                additional savings.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-orange-500" />
                  <CardTitle className="text-base">Spot Instances</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Leverage spot instances for non-critical workloads to save up to{" "}
                <strong className="text-foreground">70%</strong> on compute costs.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-purple-500" />
                  <CardTitle className="text-base">Instance Upgrades</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Migrate <strong className="text-foreground">$33.5K</strong> in previous-gen instances to current
                generation for better performance.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <CardTitle className="text-base">Right-Sizing</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Identify underutilized instances with <strong className="text-foreground">&lt;40% CPU</strong> usage for
                potential downsizing.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>VM Total Cost (30d)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$234,567</div>
            <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
              <TrendingDown className="h-4 w-4" />
              <span>8.2% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Container Total Cost (30d)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$28,900</div>
            <div className="flex items-center gap-1 text-sm text-red-600 mt-1">
              <TrendingUp className="h-4 w-4" />
              <span>3.5% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Serverless Total Cost (30d)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450</div>
            <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
              <TrendingDown className="h-4 w-4" />
              <span>2.1% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Savings Plan Coverage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.5%</div>
            <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
              <TrendingUp className="h-4 w-4" />
              <span>5.3% vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compute Summary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* VM Compute Unit Cost and Normalized Hours */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>VM Compute Unit Cost and Normalized Hours</CardTitle>
                <CardDescription>By Purchase Option</CardDescription>
              </div>
              <Select value={usageUnit} onValueChange={setUsageUnit}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hours">Hours</SelectItem>
                  <SelectItem value="vcpu">vCPU</SelectItem>
                  <SelectItem value="memory">Memory</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={computeUnitData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" label={{ value: "Unit Cost ($)", angle: -90, position: "insideLeft" }} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  label={{ value: "Hours", angle: 90, position: "insideRight" }}
                />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="onDemand" fill="#0972d3" name="On-Demand" />
                <Bar yAxisId="left" dataKey="reserved" fill="#16a34a" name="Reserved" />
                <Bar yAxisId="left" dataKey="savingsPlan" fill="#8b5cf6" name="Savings Plan" />
                <Bar yAxisId="left" dataKey="spot" fill="#ea580c" name="Spot" />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="hours"
                  stroke="#ec4899"
                  strokeWidth={2}
                  name="Normalized Hours"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* VM Coverage by Purchase Option */}
        <Card>
          <CardHeader>
            <CardTitle>VM Coverage by Purchase Option</CardTitle>
            <CardDescription>In Normalized Hours</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={coverageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="onDemand" stackId="a" fill="#0972d3" name="On-Demand" />
                <Bar dataKey="reserved" stackId="a" fill="#16a34a" name="Reserved" />
                <Bar dataKey="savingsPlan" stackId="a" fill="#8b5cf6" name="Savings Plan" />
                <Bar dataKey="spot" stackId="a" fill="#ea580c" name="Spot" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* VM Normalized Hours by Platform */}
        <Card>
          <CardHeader>
            <CardTitle>VM Normalized Hours by Platform</CardTitle>
            <CardDescription>Operating System Distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="linux" fill="#16a34a" name="Linux" />
                <Bar dataKey="windows" fill="#0972d3" name="Windows" />
                <Bar dataKey="other" fill="#8b5cf6" name="Other" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* VM Compute Cost per Region */}
        <Card>
          <CardHeader>
            <CardTitle>VM Compute Cost per Region</CardTitle>
            <CardDescription>Last 30 Days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="region" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="cost" fill="#0972d3">
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(${210 + index * 15}, 70%, ${50 + index * 5}%)`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Accounts and Spot Savings Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 10 Accounts */}
        <Card>
          <CardHeader>
            <CardTitle>Top 10 VM Running Hours Spending Accounts</CardTitle>
            <CardDescription>Previous Month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={topAccountsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="account" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="cost" fill="#0972d3" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Spot Instances Savings */}
        <Card>
          <CardHeader>
            <CardTitle>Spot Instances Savings</CardTitle>
            <CardDescription>% Savings over On-Demand by Region</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={spotSavingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis label={{ value: "% Savings", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="us-east-1a" stroke="#0972d3" strokeWidth={2} />
                <Line type="monotone" dataKey="us-west-2b" stroke="#16a34a" strokeWidth={2} />
                <Line type="monotone" dataKey="eu-central-1a" stroke="#ea580c" strokeWidth={2} />
                <Line type="monotone" dataKey="ap-northeast-1a" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Spot Savings Recommendation */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Spot Savings Insight:</strong> Your average spot instance savings is 70% compared to on-demand
          pricing. Consider increasing spot instance usage for fault-tolerant workloads to maximize cost efficiency.
        </AlertDescription>
      </Alert>

      {/* Instance Family Upgrade Section */}
      <Card>
        <CardHeader>
          <CardTitle>Previous Generation Instance Cost Breakdown</CardTitle>
          <CardDescription>Top 5 Previous-Generation Instance Families by On-Demand Cost</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={instanceFamilyData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="family" type="category" width={60} />
              <Tooltip />
              <Bar dataKey="cost" fill="#ea580c" />
            </BarChart>
          </ResponsiveContainer>
          <Alert className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Recommendation:</strong> Upgrade to the latest instance families for better price/performance
              ratio. Total potential savings: $33,537/month by migrating to current generation instances.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Elasticity and Usage Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Average Instance Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Average VM Instance Usage Time % and Cost</CardTitle>
            <CardDescription>By Account</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={instanceUsageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="account" />
                <YAxis yAxisId="left" label={{ value: "Usage %", angle: -90, position: "insideLeft" }} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  label={{ value: "Cost ($)", angle: 90, position: "insideRight" }}
                />
                <Tooltip />
                <Legend />
                <Bar yAxisId="right" dataKey="cost" fill="#0972d3" name="Cost" />
                <Line yAxisId="left" type="monotone" dataKey="usage" stroke="#16a34a" strokeWidth={2} name="Usage %" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Hourly Cost */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>VM Hourly Cost</CardTitle>
                <CardDescription>Last 24 Hours</CardDescription>
              </div>
              <Select value={purchaseOption} onValueChange={setPurchaseOption}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="ondemand">On-Demand</SelectItem>
                  <SelectItem value="spot">Spot</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={hourlyCostData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="cost" stroke="#0972d3" fill="#0972d3" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Capacity Reservations Section */}
      <Card>
        <CardHeader>
          <CardTitle>Unused On-Demand Capacity Reservation Cost</CardTitle>
          <CardDescription>Last 30 Days by Account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-sm font-medium border-b pb-2">
              <div>Account</div>
              <div>Unused Hours</div>
              <div>Wasted Cost</div>
            </div>
            {[
              { account: "Account-A8X2", hours: 1240, cost: 892.5 },
              { account: "Account-C7Z1", hours: 980, cost: 705.6 },
              { account: "Account-E9P4", hours: 756, cost: 544.32 },
              { account: "Account-B3Y9", hours: 432, cost: 311.04 },
            ].map((item) => (
              <div key={item.account} className="grid grid-cols-3 gap-4 text-sm py-2 border-b">
                <div className="text-muted-foreground">{item.account}</div>
                <div>{item.hours.toLocaleString()}</div>
                <div className="font-medium">${item.cost.toLocaleString()}</div>
              </div>
            ))}
          </div>
          <Alert className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Recommendation:</strong> Review unused On-Demand Capacity Reservations. Total wasted cost:
              $2,453/month. Cancel reservations if not required or adjust capacity to match actual usage.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Container Service Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Container Service Cost Summary</CardTitle>
          <CardDescription>On-Demand vs Spot Savings</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={containerCostData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="onDemand" fill="#0972d3" name="On-Demand" />
              <Bar dataKey="spot" fill="#16a34a" name="Spot" />
            </BarChart>
          </ResponsiveContainer>
          <Alert className="mt-4">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Container Optimization:</strong> Explore Spot instances for container workloads to achieve up to
              70% cost reduction. Review your container service cost optimization checklist for additional savings
              opportunities.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
