"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { format } from "date-fns";
import {
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  CalendarDays,
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
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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

interface StatsData {
  startDate: string;
  endDate: string;
  totalEmployees: number;
  present: number;
  absent: number;
  late: number;
  halfDay: number;
  attendanceRate: number;
  departmentWise: {
    departmentName: string;
    total: number;
    present: number;
    rate: number;
  }[];
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

// ============================================
// MAIN COMPONENT
// ============================================
const EmployeeAttendanceStats = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ✅ Current month/year (for defaults)
  const today = new Date();
  const currentMonth = (today.getMonth() + 1).toString(); // "1" - "12"
  const currentYear = today.getFullYear().toString();

  // ✅ Read from URL, default to CURRENT MONTH + YEAR
  const selectedMonth = searchParams.get("month") || currentMonth;
  const selectedYear = searchParams.get("year") || currentYear;

  // Update URL on filter change
  const handleFilterChange = (key: "month" | "year", value: string) => {
    const p = new URLSearchParams(searchParams.toString());
    if (value) p.set(key, value);
    else p.delete(key);
    router.push(`${pathname}?${p.toString()}`);
  };

  // ✅ Build API Query (no useMemo — React Compiler handles optimization)
  const params = new URLSearchParams(searchParams.toString());
  if (selectedMonth) params.set("month", selectedMonth);
  if (selectedYear) params.set("year", selectedYear);
  const activeQuery = params.toString();

  const { data: statsResponse, isLoading } = useQuery({
    queryKey: ["employee-attendance-stats", activeQuery],
    queryFn: () => getAttendanceStats(activeQuery),
  });

  const stats = statsResponse?.data as StatsData | undefined;

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

  // ✅ Get the label for the selected month
  const selectedMonthLabel =
    monthOptions.find((m) => m.value === selectedMonth)?.label || "";

  return (
    <div className="space-y-6">
      {/* HEADER & FILTERS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            My Attendance Overview
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
          title="Attendance Rate"
          value={`${(stats.attendanceRate ?? 0).toFixed(1)}%`}
          icon={<TrendingUp className="h-4 w-4 text-emerald-500" />}
          description={`For ${selectedMonthLabel || "this period"}`}
          valueClassName="text-emerald-500"
        />
        <StatCard
          title="Present Days"
          value={stats.present}
          icon={<CheckCircle2 className="h-4 w-4 text-emerald-500" />}
          description={`In ${selectedMonthLabel || "this period"}`}
        />
        <StatCard
          title="Absent Days"
          value={stats.absent}
          icon={<XCircle className="h-4 w-4 text-rose-500" />}
          description={`In ${selectedMonthLabel || "this period"}`}
          valueClassName="text-rose-500"
        />
        <StatCard
          title="Late Arrivals"
          value={stats.late}
          icon={<Clock className="h-4 w-4 text-amber-500" />}
          description={`In ${selectedMonthLabel || "this period"}`}
          valueClassName="text-amber-500"
        />
      </div>

      {/* CHARTS ROW */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* BAR CHART */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Attendance</CardTitle>
            <CardDescription>
              Your attendance breakdown from January to December {selectedYear}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={barChartConfig}
              className="aspect-auto h-75 w-full"
            >
              <BarChart
                data={stats.monthlyBreakdown}
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

        {/* SUMMARY CARD */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Attendance Summary</CardTitle>
            <CardDescription>
              {selectedMonthLabel || "All"} {selectedYear} overview
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Total Records
                </span>
              </div>
              <span className="text-sm font-bold">
                {stats.present + stats.absent + stats.late + stats.halfDay}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/10">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="text-sm text-muted-foreground">Present</span>
              </div>
              <span className="text-sm font-bold text-emerald-500">
                {stats.present}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-rose-500/10">
              <div className="flex items-center gap-3">
                <XCircle className="h-4 w-4 text-rose-500" />
                <span className="text-sm text-muted-foreground">Absent</span>
              </div>
              <span className="text-sm font-bold text-rose-500">
                {stats.absent}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-amber-500" />
                <span className="text-sm text-muted-foreground">Late</span>
              </div>
              <span className="text-sm font-bold text-amber-500">
                {stats.late}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-muted-foreground">Half Day</span>
              </div>
              <span className="text-sm font-bold text-blue-500">
                {stats.halfDay}
              </span>
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
    <div className="grid gap-4 lg:grid-cols-3">
      <Skeleton className="h-87.5 lg:col-span-2" />
      <Skeleton className="h-87.5" />
    </div>
  </div>
);

export default EmployeeAttendanceStats;
