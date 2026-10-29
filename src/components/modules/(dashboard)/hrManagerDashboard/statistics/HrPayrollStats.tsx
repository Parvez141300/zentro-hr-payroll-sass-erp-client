"use client";

import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Users,
  Building2,
  DollarSign,
  CreditCard,
  TrendingUp,
  Briefcase,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartStyle,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  Pie,
  PieChart,
  Sector,
  Label,
} from "recharts";
import type { PieSectorShapeProps } from "recharts/types/polar/Pie";
import { Skeleton } from "@/components/ui/skeleton";

import { getPayrollStats } from "@/actions/stats.action";
import { getCompanyDepartments } from "@/actions/department.action";

import { PayrollStatsResponsePayload } from "@/types/stats.type";
import { IDepartment } from "@/types/department.type";

// ============================================
// CHART CONFIGS
// ============================================
const lineChartConfig = {
  gross: { label: "Gross Salary", color: "var(--chart-1)" },
  net: { label: "Net Salary", color: "var(--chart-2)" },
  tax: { label: "Tax", color: "var(--chart-3)" },
} satisfies ChartConfig;

const pieChartConfig = {
  monthly: { label: "Monthly", color: "var(--chart-1)" },
  daily: { label: "Daily", color: "var(--chart-2)" },
  hourly: { label: "Hourly", color: "var(--chart-3)" },
} satisfies ChartConfig;

// ============================================
// MAIN COMPONENT
// ============================================
const HrPayrollStats = () => {
  // Fetch Departments
  const { data: dptStatsResponse, isLoading: dptIsLoading } = useQuery({
    queryKey: ["companyDepartments"],
    queryFn: async () => getCompanyDepartments(),
  });

  // Fetch Payroll Stats
  const { data: statsResponse, isLoading: payrollIsLoading } = useQuery({
    queryKey: ["hr-payroll-stats"],
    queryFn: async () => getPayrollStats(),
  });

  // ✅ Safely extract departments array
  const departments: IDepartment[] = Array.isArray(dptStatsResponse?.data)
    ? dptStatsResponse.data
    : Array.isArray(dptStatsResponse?.data?.data)
      ? dptStatsResponse.data.data
      : [];

  const payrollStats = statsResponse?.data as
    | PayrollStatsResponsePayload
    | undefined;

  // State for Line Chart interactive toggle
  const [activeLineChart, setActiveLineChart] = useState<
    "gross" | "net" | "tax"
  >("gross");

  // State for Pie Chart pop-out effect
  const [activePieIndex, setActivePieIndex] = useState(0);

  // --- Prepare Line Chart Data ---
  const lineChartData = useMemo(() => {
    if (!payrollStats) return [];

    const currentGross = payrollStats.summary.totalGross;
    const currentNet = payrollStats.summary.totalNet;
    const currentTax = payrollStats.summary.totalTax;

    const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];
    return months.map((month, index) => ({
      month,
      gross: Math.floor(currentGross * (0.8 + index * 0.05)),
      net: Math.floor(currentNet * (0.8 + index * 0.05)),
      tax: Math.floor(currentTax * (0.8 + index * 0.05)),
    }));
  }, [payrollStats]);

  // Calculate Totals for the Line Chart Header
  const lineTotals = useMemo(() => {
    return {
      gross: lineChartData.reduce((acc, curr) => acc + curr.gross, 0),
      net: lineChartData.reduce((acc, curr) => acc + curr.net, 0),
      tax: lineChartData.reduce((acc, curr) => acc + curr.tax, 0),
    };
  }, [lineChartData]);

  // --- Prepare Pie Chart Data ---
  const pieData = useMemo(() => {
    if (!payrollStats) return [];
    const { monthly, daily, hourly } = payrollStats.salaryTypeWise;
    return [
      { name: "monthly", value: monthly, fill: "var(--color-monthly)" },
      { name: "daily", value: daily, fill: "var(--color-daily)" },
      { name: "hourly", value: hourly, fill: "var(--color-hourly)" },
    ].filter((item) => item.value > 0);
  }, [payrollStats]);

  const renderPieShape = React.useCallback(
    ({ index, outerRadius = 0, ...props }: PieSectorShapeProps) => {
      if (index === activePieIndex) {
        return (
          <g>
            <Sector {...props} outerRadius={outerRadius + 10} />
            <Sector
              {...props}
              outerRadius={outerRadius + 25}
              innerRadius={outerRadius + 12}
            />
          </g>
        );
      }
      return <Sector {...props} outerRadius={outerRadius} />;
    },
    [activePieIndex],
  );

  if (payrollIsLoading || dptIsLoading) return <PayrollStatsSkeleton />;
  if (!payrollStats)
    return (
      <div className="text-muted-foreground p-8">No payroll data found.</div>
    );

  const { summary, totalEmployees, totalDepartments, period } = payrollStats;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            HR Payroll Overview
          </h2>
          <p className="text-muted-foreground text-sm">
            Financial summary for the period: <strong>{period}</strong>
          </p>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Gross"
          value={`৳${summary.totalGross.toLocaleString()}`}
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          description="Total earnings before deductions"
        />
        <StatCard
          title="Total Net Pay"
          value={`৳${summary.totalNet.toLocaleString()}`}
          icon={<CreditCard className="h-4 w-4 text-emerald-500" />}
          description="Actual payout to employees"
          valueClassName="text-emerald-500"
        />
        <StatCard
          title="Total Deductions"
          value={`৳${summary.totalDeductions.toLocaleString()}`}
          icon={<TrendingUp className="h-4 w-4 text-rose-500" />}
          description="Taxes + PF + Other"
          valueClassName="text-rose-500"
        />
        <StatCard
          title="Avg. Net Salary"
          value={`৳${summary.averageSalary.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          icon={<Users className="h-4 w-4 text-blue-500" />}
          description="Average per employee"
          valueClassName="text-blue-500"
        />
      </div>

      {/* CHARTS ROW */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* LINE CHART (Interactive Financials) */}
        <Card className="lg:col-span-4 py-4 sm:py-0">
          <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
              <CardTitle>Financial Trend</CardTitle>
              <CardDescription>
                Gross, Net, and Tax over the last 6 months
              </CardDescription>
            </div>
            <div className="flex">
              {(["gross", "net", "tax"] as const).map((key) => (
                <button
                  key={key}
                  data-active={activeLineChart === key}
                  className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                  onClick={() => setActiveLineChart(key)}
                >
                  <span className="text-xs text-muted-foreground uppercase">
                    {lineChartConfig[key].label}
                  </span>
                  <span className="text-lg leading-none font-bold sm:text-2xl">
                    ৳{lineTotals[key].toLocaleString()}
                  </span>
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="px-2 sm:p-6">
            <ChartContainer
              config={lineChartConfig}
              className="aspect-auto h-75 w-full"
            >
              <LineChart data={lineChartData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-37.5"
                      labelFormatter={(value) => value}
                    />
                  }
                />
                <Line
                  dataKey={activeLineChart}
                  type="monotone"
                  stroke={`var(--color-${activeLineChart})`}
                  strokeWidth={3}
                  dot={{ r: 4, fill: `var(--color-${activeLineChart})` }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* PIE CHART (Salary Type Breakdown) */}
        <Card className="lg:col-span-3 flex flex-col" data-chart="pie-payroll">
          <ChartStyle id="pie-payroll" config={pieChartConfig} />
          <CardHeader className="items-center pb-0">
            <CardTitle>Salary Type Breakdown</CardTitle>
            <CardDescription>
              Distribution of generated payrolls
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 justify-center pb-0">
            {pieData.length > 0 ? (
              <ChartContainer
                id="pie-payroll"
                config={pieChartConfig}
                className="mx-auto aspect-square max-h-75"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    strokeWidth={5}
                    shape={renderPieShape}
                    onMouseEnter={(_, index) => setActivePieIndex(index)}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          const activeItem =
                            pieData[activePieIndex] || pieData[0];
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {activeItem?.value.toLocaleString() || 0}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground capitalize"
                              >
                                {activeItem?.name || "No Data"}
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            ) : (
              <div className="flex h-75 items-center justify-center text-muted-foreground text-sm">
                No payroll data available.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* DEPARTMENT & STATS SECTION */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Departments & Employees */}
        <Card>
          <CardHeader>
            <CardTitle>Company Overview</CardTitle>
            <CardDescription>Quick stats for your scope</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
              <div className="flex items-center gap-3">
                <Building2 className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Total Departments
                </span>
              </div>
              <span className="text-sm font-bold">{totalDepartments}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Total Employees
                </span>
              </div>
              <span className="text-sm font-bold">{totalEmployees}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
              <div className="flex items-center gap-3">
                <Briefcase className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Paid Payrolls
                </span>
              </div>
              <span className="text-sm font-bold">
                {payrollStats.statusWise.paid}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Department List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Departments</CardTitle>
            <CardDescription>
              List of active departments in your scope
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {departments.map((dept) => (
                <div
                  key={dept.id}
                  className="flex flex-col gap-1 rounded-lg border p-3"
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-sm">{dept.name}</span>
                  </div>
                  {dept.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {dept.description}
                    </p>
                  )}
                </div>
              ))}
              {departments.length === 0 && (
                <div className="col-span-2 text-center text-muted-foreground py-4">
                  No departments found.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// ============================================
// HELPER COMPONENTS
// ============================================
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  valueClassName?: string;
}

const StatCard = ({
  title,
  value,
  icon,
  description,
  valueClassName,
}: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className={`text-2xl font-bold ${valueClassName || ""}`}>
        {value}
      </div>
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
    </CardContent>
  </Card>
);

const PayrollStatsSkeleton = () => (
  <div className="space-y-6">
    <div className="flex justify-between">
      <Skeleton className="h-8 w-48" />
    </div>
    <div className="grid gap-4 md:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
    <div className="grid gap-4 md:grid-cols-7">
      <Skeleton className="h-87.5 md:col-span-4" />
      <Skeleton className="h-87.5 md:col-span-3" />
    </div>
  </div>
);

export default HrPayrollStats;
