"use client";

import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CalendarDays,
  CheckCircle2,
  XCircle,
  Clock,
  Inbox,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartStyle,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Pie,
  PieChart,
  Sector,
  Label,
  LabelList,
} from "recharts";
import type { PieSectorShapeProps } from "recharts/types/polar/Pie";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getLeaveStats } from "@/actions/stats.action";
import { Skeleton } from "@/components/ui/skeleton";

// ============================================
// TYPES
// ============================================
interface LeaveReport {
  leaveTypeId: string;
  leaveTypeName: string;
  totalRequested: number;
  approved: number;
  rejected: number;
  pending: number;
  totalDays: number;
  usedDays: number;
  remainingDays: number;
}

interface LeaveSummary {
  totalLeaveTypes: number;
  totalRequests: number;
  totalApproved: number;
  totalRejected: number;
  totalPending: number;
}

interface LeaveStatsData {
  data: LeaveReport[];
  summary: LeaveSummary;
}

// ============================================
// CHART CONFIGS
// ============================================
const barChartConfig = {
  approved: { label: "Approved", color: "var(--chart-1)" },
  pending: { label: "Pending", color: "var(--chart-2)" },
  rejected: { label: "Rejected", color: "var(--chart-5)" },
} satisfies ChartConfig;

const pieChartConfig = {
  approved: { label: "Approved", color: "var(--chart-1)" },
  pending: { label: "Pending", color: "var(--chart-2)" },
  rejected: { label: "Rejected", color: "var(--chart-5)" },
} satisfies ChartConfig;

const labelChartConfig = {
  value: { label: "Requests" },
  approved: { label: "Approved", color: "var(--chart-1)" },
  pending: { label: "Pending", color: "var(--chart-2)" },
  rejected: { label: "Rejected", color: "var(--chart-5)" },
} satisfies ChartConfig;

// ============================================
// MAIN COMPONENT
// ============================================
const SuperAdminLeaveStats = () => {
  const [activeLeaveType, setActiveLeaveType] = useState<string>("");

  const { data: statsResponse, isLoading } = useQuery({
    queryKey: ["super-admin-leave-stats", "leave-stats"],
    queryFn: async () => getLeaveStats(),
  });

  const leaveStats = statsResponse?.data as LeaveStatsData | undefined;

  // Bar Chart Data
  const barChartData = useMemo(() => {
    if (!leaveStats?.data) return [];
    return leaveStats.data
      .filter((item) => item.totalRequested > 0)
      .map((item) => ({
        name: item.leaveTypeName.replace(" Leave", ""),
        approved: item.approved,
        pending: item.pending,
        rejected: item.rejected,
      }));
  }, [leaveStats]);

  // Current Leave Type Selection
  const currentLeaveType = useMemo(() => {
    if (activeLeaveType) return activeLeaveType;
    if (leaveStats && leaveStats.data.length > 0) {
      return leaveStats.data[0].leaveTypeName;
    }
    return "";
  }, [activeLeaveType, leaveStats]);

  // Active Leave Data
  const activeLeaveData = useMemo(() => {
    if (!leaveStats?.data) return null;
    return (
      leaveStats.data.find((d) => d.leaveTypeName === currentLeaveType) ||
      leaveStats.data[0] ||
      null
    );
  }, [leaveStats, currentLeaveType]);

  // Donut Chart Data
  const pieData = useMemo(() => {
    if (!activeLeaveData) return [];
    return [
      {
        name: "Approved",
        value: activeLeaveData.approved,
        fill: "var(--color-approved)",
      },
      {
        name: "Pending",
        value: activeLeaveData.pending,
        fill: "var(--color-pending)",
      },
      {
        name: "Rejected",
        value: activeLeaveData.rejected,
        fill: "var(--color-rejected)",
      },
    ].filter((item) => item.value > 0);
  }, [activeLeaveData]);

  // Label List Pie Chart Data
  const labelChartData = useMemo(() => {
    if (!leaveStats?.summary) return [];
    return [
      {
        status: "approved",
        value: leaveStats.summary.totalApproved,
        fill: "var(--color-approved)",
      },
      {
        status: "pending",
        value: leaveStats.summary.totalPending,
        fill: "var(--color-pending)",
      },
      {
        status: "rejected",
        value: leaveStats.summary.totalRejected,
        fill: "var(--color-rejected)",
      },
    ].filter((item) => item.value > 0);
  }, [leaveStats]);

  const [activePieIndex, setActivePieIndex] = useState(0);

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

  if (isLoading) return <LeaveStatsSkeleton />;
  if (!leaveStats)
    return (
      <div className="text-muted-foreground p-8">No leave data found.</div>
    );

  const { summary } = leaveStats;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Leave Overview</h2>
          <p className="text-muted-foreground text-sm">
            Overview of all leave requests and balances across the company.
          </p>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Requests"
          value={summary.totalRequests}
          icon={<CalendarDays className="h-4 w-4 text-muted-foreground" />}
          description="All leave applications"
        />
        <StatCard
          title="Approved"
          value={summary.totalApproved}
          icon={<CheckCircle2 className="h-4 w-4 text-emerald-500" />}
          description="Approved requests"
          valueClassName="text-emerald-500"
        />
        <StatCard
          title="Pending"
          value={summary.totalPending}
          icon={<Clock className="h-4 w-4 text-amber-500" />}
          description="Awaiting approval"
          valueClassName="text-amber-500"
        />
        <StatCard
          title="Rejected"
          value={summary.totalRejected}
          icon={<XCircle className="h-4 w-4 text-rose-500" />}
          description="Declined requests"
          valueClassName="text-rose-500"
        />
      </div>

      {/* CHARTS ROW - 3 Columns */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* 1. BAR CHART */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Requests by Type</CardTitle>
            <CardDescription>Status breakdown per type</CardDescription>
          </CardHeader>
          <CardContent>
            {barChartData.length > 0 ? (
              <ChartContainer
                config={barChartConfig}
                className="aspect-auto h-75 w-full"
              >
                <BarChart data={barChartData} margin={{ left: 0, right: 0 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 4)}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="approved"
                    fill="var(--color-approved)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="pending"
                    fill="var(--color-pending)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="rejected"
                    fill="var(--color-rejected)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="flex h-75 flex-col items-center justify-center text-muted-foreground">
                <Inbox className="h-10 w-10 mb-2 opacity-50" />
                <p className="text-sm">No requests yet.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 2. DONUT CHART */}
        <Card className="lg:col-span-1 flex flex-col" data-chart="pie-leave">
          <ChartStyle id="pie-leave" config={pieChartConfig} />
          <CardHeader className="flex-row items-start space-y-0 pb-0">
            <div className="grid gap-1">
              <CardTitle>Type Breakdown</CardTitle>
              <CardDescription>Selected type status</CardDescription>
            </div>

            <Select
              value={currentLeaveType}
              onValueChange={(val) => setActiveLeaveType(val || "")}
            >
              <SelectTrigger
                className="ml-auto h-7 w-32.5 rounded-lg pl-2.5"
                aria-label="Select leave type"
              >
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent align="end" className="rounded-xl">
                {leaveStats.data.map((type) => (
                  <SelectItem
                    key={type.leaveTypeId}
                    value={type.leaveTypeName}
                    className="rounded-lg"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <span className="flex h-3 w-3 shrink-0 rounded-xs bg-primary" />
                      {type.leaveTypeName}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="flex flex-1 justify-center pb-0">
            {pieData.length > 0 ? (
              <ChartContainer
                id="pie-leave"
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
                No requests for this type.
              </div>
            )}
          </CardContent>
        </Card>

        {/* 3. LABEL LIST PIE CHART */}
        <Card className="lg:col-span-1 flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Overall Distribution</CardTitle>
            <CardDescription>All requests by status</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            {labelChartData.length > 0 ? (
              <ChartContainer
                config={labelChartConfig}
                className="mx-auto aspect-square max-h-75 [&_.recharts-text]:fill-background"
              >
                <PieChart>
                  <ChartTooltip
                    content={<ChartTooltipContent nameKey="status" hideLabel />}
                  />
                  <Pie data={labelChartData} dataKey="value">
                    <LabelList
                      dataKey="status"
                      className="fill-background"
                      stroke="none"
                      fontSize={12}
                      formatter={(value) => {
                        // ✅ Cast value safely to string to fix TypeScript error
                        const key = String(
                          value,
                        ) as keyof typeof labelChartConfig;
                        return labelChartConfig[key]?.label || key;
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            ) : (
              <div className="flex h-75 items-center justify-center text-muted-foreground text-sm">
                No data to display.
              </div>
            )}
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm pt-4">
            <div className="flex items-center gap-2 leading-none font-medium">
              Total: {summary.totalRequests} Requests{" "}
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing distribution by status
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* LEAVE TYPE DETAILS TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Balances</CardTitle>
          <CardDescription>
            Remaining balances and usage per leave type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {leaveStats.data.map((type) => {
              const totalAllowed = type.usedDays + type.remainingDays;
              const usagePercent =
                totalAllowed > 0 ? (type.usedDays / totalAllowed) * 100 : 0;

              return (
                <div
                  key={type.leaveTypeId}
                  className="flex flex-col gap-2 rounded-lg border p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">
                      {type.leaveTypeName}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      {type.usedDays} / {totalAllowed} used
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Remaining:{" "}
                    <span className="font-bold text-foreground">
                      {type.remainingDays} days
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${Math.min(usagePercent, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
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

const LeaveStatsSkeleton = () => (
  <div className="space-y-6">
    <div className="flex justify-between">
      <Skeleton className="h-8 w-48" />
    </div>
    <div className="grid gap-4 md:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
    <div className="grid gap-4 md:grid-cols-3">
      <Skeleton className="h-87.5 w-full" />
      <Skeleton className="h-87.5 w-full" />
      <Skeleton className="h-87.5 w-full" />
    </div>
  </div>
);

export default SuperAdminLeaveStats;
