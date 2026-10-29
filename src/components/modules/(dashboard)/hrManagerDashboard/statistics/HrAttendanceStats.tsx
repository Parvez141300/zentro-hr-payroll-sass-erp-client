"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { format } from "date-fns";
import {
  CheckCircle2,
  XCircle,
  TrendingUp,
  Users,
  Building2,
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
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Pie,
  PieChart,
  Sector,
  Label,
} from "recharts";
import type { PieSectorShapeProps } from "recharts/types/polar/Pie";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

import { getAttendanceStats } from "@/actions/stats.action";

// ============================================
// TYPES
// ============================================
interface MonthlyBreakdown {
  month: number;
  monthName: string;
  present: number;
  late: number;
  halfDay: number;
  total: number;
}

interface DepartmentWise {
  departmentName: string;
  total: number;
  present: number;
  absent?: number;
  late?: number;
  halfDay?: number;
  rate: number;
}

interface StatsData {
  startDate: string;
  endDate: string;
  totalEmployees: number;
  present: number;
  absent: number;
  late: number;
  halfDay: number;
  attendanceRate: number;
  departmentWise: DepartmentWise[];
  monthlyBreakdown: MonthlyBreakdown[];
}

// ============================================
// CHART CONFIG
// ============================================
const barChartConfig = {
  present: { label: "Present", color: "var(--chart-1)" },
  late: { label: "Late", color: "var(--chart-2)" },
  halfDay: { label: "Half Day", color: "var(--chart-3)" },
} satisfies ChartConfig;

const pieChartConfig = {
  present: { label: "Present", color: "var(--chart-1)" },
  absent: { label: "Absent", color: "var(--chart-5)" },
  late: { label: "Late", color: "var(--chart-2)" },
  halfDay: { label: "Half Day", color: "var(--chart-3)" },
} satisfies ChartConfig;

// ============================================
// MAIN COMPONENT
// ============================================
const HrAttendanceStats = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const today = new Date();
  const currentMonth = (today.getMonth() + 1).toString();
  const currentYear = today.getFullYear().toString();

  // ✅ Read from URL (default to current month/year)
  const selectedMonth = searchParams.has("month")
    ? searchParams.get("month") || ""
    : currentMonth;
  const selectedYear = searchParams.get("year") || currentYear;

  // Update URL on filter change
  const handleFilterChange = (key: "month" | "year", value: string) => {
    const p = new URLSearchParams(searchParams.toString());
    if (value) p.set(key, value);
    else p.delete(key);
    router.push(`${pathname}?${p.toString()}`);
  };

  // ✅ Build API Query
  const params = new URLSearchParams(searchParams.toString());
  if (selectedMonth) params.set("month", selectedMonth);
  if (selectedYear) params.set("year", selectedYear);
  const activeQuery = params.toString();

  const { data: statsResponse, isLoading } = useQuery({
    queryKey: ["hr-attendance-stats", activeQuery],
    queryFn: () => getAttendanceStats(activeQuery),
  });

  const stats = statsResponse?.data as StatsData | undefined;

  // Pie chart state
  const [activePieIndex, setActivePieIndex] = useState(0);

  // Prepare pie data
  const pieData = stats
    ? [
        { name: "present", value: stats.present, fill: "var(--color-present)" },
        { name: "absent", value: stats.absent, fill: "var(--color-absent)" },
        { name: "late", value: stats.late, fill: "var(--color-late)" },
        { name: "halfDay", value: stats.halfDay, fill: "var(--color-halfDay)" },
      ].filter((item) => item.value > 0)
    : [];

  // Render pie shape
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

  // Options
  const monthOptions = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const yearOptions = Array.from({ length: 5 }, (_, i) => {
    const y = (today.getFullYear() - 2 + i).toString();
    return { value: y, label: y };
  });

  if (!yearOptions.some((y) => y.value === selectedYear)) {
    yearOptions.push({ value: selectedYear, label: selectedYear });
  }

  // Safe date formatter
  const formatDate = (d: string | null | undefined) =>
    d ? format(new Date(d), "PPP") : "N/A";

  if (isLoading) return <StatsSkeleton />;
  if (!stats)
    return (
      <div className="text-muted-foreground p-8">
        No attendance data found for this period.
      </div>
    );

  const selectedMonthLabel = selectedMonth
    ? monthOptions.find((m) => m.value === selectedMonth)?.label || ""
    : "All Months";

  return (
    <div className="space-y-6">
      {/* HEADER & FILTERS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            HR Attendance Overview
          </h2>
          <p className="text-muted-foreground text-sm">
            Period: {formatDate(stats.startDate)} - {formatDate(stats.endDate)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Month Selector */}
          <Select
            value={selectedMonth}
            onValueChange={(val) => handleFilterChange("month", val || "")}
          >
            <SelectTrigger className="w-35">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Months</SelectItem>
              {monthOptions.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Year Selector */}
          <Select
            value={selectedYear}
            onValueChange={(val) =>
              handleFilterChange("year", val || currentYear)
            }
          >
            <SelectTrigger className="w-25">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {yearOptions.map((y) => (
                <SelectItem key={y.value} value={y.value}>
                  {y.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Employees"
          value={stats.totalEmployees}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          description="In your scope"
        />
        <StatCard
          title="Attendance Rate"
          value={`${(stats.attendanceRate ?? 0).toFixed(1)}%`}
          icon={<TrendingUp className="h-4 w-4 text-emerald-500" />}
          description={`For ${selectedMonthLabel} ${selectedYear}`}
          valueClassName="text-emerald-500"
        />
        <StatCard
          title="Present Days"
          value={stats.present}
          icon={<CheckCircle2 className="h-4 w-4 text-emerald-500" />}
          description={`In ${selectedMonthLabel} ${selectedYear}`}
        />
        <StatCard
          title="Absent Days"
          value={stats.absent}
          icon={<XCircle className="h-4 w-4 text-rose-500" />}
          description={`In ${selectedMonthLabel} ${selectedYear}`}
          valueClassName="text-rose-500"
        />
      </div>

      {/* CHARTS ROW */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* BAR CHART — Monthly attendance */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Monthly Attendance</CardTitle>
            <CardDescription>
              Attendance breakdown for {selectedYear}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={barChartConfig}
              className="aspect-auto h-75 w-full"
            >
              <BarChart
                data={stats.monthlyBreakdown || []}
                margin={{ left: 0, right: 0 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="monthName"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="present"
                  fill="var(--color-present)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="late"
                  fill="var(--color-late)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="halfDay"
                  fill="var(--color-halfDay)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* PIE CHART — Status breakdown */}
        <Card className="lg:col-span-3 flex flex-col" data-chart="pie-hr">
          <ChartStyle id="pie-hr" config={pieChartConfig} />
          <CardHeader className="items-center pb-0">
            <CardTitle>Attendance Status</CardTitle>
            <CardDescription>
              Distribution for {selectedMonthLabel}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 justify-center pb-0">
            {pieData.length > 0 ? (
              <ChartContainer
                id="pie-hr"
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
              <div className="flex h-75 items-center justify-center text-muted-foreground">
                No attendance data for this period.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* DEPARTMENT BREAKDOWN CARDS */}
      {stats.departmentWise && stats.departmentWise.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Department Breakdown</CardTitle>
            <CardDescription>
              Attendance rate per department in your scope
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {stats.departmentWise.map((dept) => (
                <div
                  key={dept.departmentName}
                  className="flex flex-col gap-2 rounded-lg border p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-sm">
                        {dept.departmentName}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-primary">
                      {dept.rate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {dept.present} present out of {dept.total} records
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${Math.min(dept.rate, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
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

const StatsSkeleton = () => (
  <div className="space-y-6">
    <div className="flex justify-between">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-10 w-64" />
    </div>
    <div className="grid gap-4 md:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
    <div className="grid gap-4 lg:grid-cols-7">
      <Skeleton className="h-87.5 lg:col-span-4" />
      <Skeleton className="h-87.5 lg:col-span-3" />
    </div>
  </div>
);

export default HrAttendanceStats;
