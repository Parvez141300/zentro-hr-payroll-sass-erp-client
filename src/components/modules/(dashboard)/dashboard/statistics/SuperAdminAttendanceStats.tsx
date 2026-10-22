"use client";

import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Users, CheckCircle2, XCircle, TrendingUp } from "lucide-react";
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
import { getAttendanceStats } from "@/actions/stats.action";
import { Skeleton } from "@/components/ui/skeleton";

// ============================================
// TYPES & CONFIG
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

// Bar Chart Config
const barChartConfig = {
  present: { label: "Present", color: "var(--chart-1)" },
  late: { label: "Late", color: "var(--chart-2)" },
  halfDay: { label: "Half Day", color: "var(--chart-3)" },
} satisfies ChartConfig;

// Department Selector Config
const deptChartConfig = {
  present: { label: "Present", color: "var(--chart-1)" },
  absent: { label: "Absent", color: "var(--chart-5)" },
  late: { label: "Late", color: "var(--chart-2)" },
  halfDay: { label: "Half Day", color: "var(--chart-3)" },
} satisfies ChartConfig;

// ============================================
// MAIN COMPONENT
// ============================================
const SuperAdminAttendanceStats = ({
  queryString,
}: {
  queryString: string;
}) => {
  const currentYear = new Date().getFullYear();
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>(
    currentYear.toString(),
  );

  // Department Pie Chart Active State
  const [activeDeptName, setActiveDeptName] = useState<string>("");

  const activeQuery = useMemo(() => {
    const params = new URLSearchParams(queryString);
    if (selectedMonth) params.set("month", selectedMonth);
    if (selectedYear) params.set("year", selectedYear);
    return params.toString();
  }, [queryString, selectedMonth, selectedYear]);

  const { data: statsResponse, isLoading } = useQuery({
    queryKey: ["super-admin-attendance-stats", activeQuery],
    queryFn: () => getAttendanceStats(activeQuery),
  });

  const stats = statsResponse?.data as StatsData | undefined;

  // ✅ FIX 1: Remove useEffect and use useMemo directly
  // If activeDeptName is empty, fallback to the first department in the list
  const currentDeptName = useMemo(() => {
    if (activeDeptName) return activeDeptName;
    if (stats && stats.departmentWise.length > 0) {
      return stats.departmentWise[0].departmentName;
    }
    return "";
  }, [activeDeptName, stats]);

  // Get the active department data for the Pie Chart
  const activeDeptData = useMemo(() => {
    if (!stats) return null;
    return (
      stats.departmentWise.find((d) => d.departmentName === currentDeptName) ||
      stats.departmentWise[0] ||
      null
    );
  }, [stats, currentDeptName]);

  // Pie Data for Department
  const deptPieData = useMemo(() => {
    if (!activeDeptData) return [];
    return [
      {
        name: "present",
        value: activeDeptData.present || 0,
        fill: "var(--color-present)",
      },
      {
        name: "absent",
        value: activeDeptData.absent || 0,
        fill: "var(--color-absent)",
      },
      {
        name: "late",
        value: activeDeptData.late || 0,
        fill: "var(--color-late)",
      },
      {
        name: "halfDay",
        value: activeDeptData.halfDay || 0,
        fill: "var(--color-halfDay)",
      },
    ].filter((item) => item.value > 0);
  }, [activeDeptData]);

  // Pie Shape Renderer
  const activeIndex = useMemo(() => {
    return deptPieData.findIndex((item) => item.name === "present");
  }, [deptPieData]);

  const renderPieShape = React.useCallback(
    ({ index, outerRadius = 0, ...props }: PieSectorShapeProps) => {
      if (index === activeIndex) {
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
    [activeIndex],
  );

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
    const y = (currentYear - 2 + i).toString();
    return { value: y, label: y };
  });

  if (isLoading) return <StatsSkeleton />;
  if (!stats)
    return (
      <div className="text-muted-foreground p-8">No attendance data found.</div>
    );

  return (
    <div className="space-y-6">
      {/* HEADER & FILTERS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Attendance Overview
          </h2>
          <p className="text-muted-foreground text-sm">
            Period: {format(new Date(stats.startDate), "PPP")} -{" "}
            {format(new Date(stats.endDate), "PPP")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* ✅ FIX 2: Handle null in onValueChange */}
          <Select
            value={selectedMonth}
            onValueChange={(val) => setSelectedMonth(val || "")}
          >
            <SelectTrigger className="w-35">
              <SelectValue placeholder="All Months" />
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

          <Select
            value={selectedYear}
            onValueChange={(val) =>
              setSelectedYear(val || currentYear.toString())
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
          description="Active workforce"
        />
        <StatCard
          title="Attendance Rate"
          value={`${stats.attendanceRate.toFixed(1)}%`}
          icon={<TrendingUp className="h-4 w-4 text-emerald-500" />}
          description="Overall presence"
          valueClassName="text-emerald-500"
        />
        <StatCard
          title="Present Days"
          value={stats.present}
          icon={<CheckCircle2 className="h-4 w-4 text-emerald-500" />}
          description="Total checked in"
        />
        <StatCard
          title="Absent Days"
          value={stats.absent}
          icon={<XCircle className="h-4 w-4 text-rose-500" />}
          description="Total missed"
          valueClassName="text-rose-500"
        />
      </div>

      {/* CHARTS ROW */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* BAR CHART (Jan - Dec) */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Monthly Attendance</CardTitle>
            <CardDescription>
              Breakdown of attendance from January to December
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

        {/* ✅ DEPARTMENT WISE PIE CHART */}
        <Card className="lg:col-span-3 flex flex-col" data-chart="pie-dept">
          <ChartStyle id="pie-dept" config={deptChartConfig} />
          <CardHeader className="flex-row items-start space-y-0 pb-0">
            <div className="grid gap-1">
              <CardTitle>Department Breakdown</CardTitle>
              <CardDescription>
                Attendance distribution by department
              </CardDescription>
            </div>
            <Select
              value={currentDeptName}
              onValueChange={(val) => setActiveDeptName(val || "")}
            >
              <SelectTrigger
                className="ml-auto h-7 w-32.5 rounded-lg pl-2.5"
                aria-label="Select a department"
              >
                <SelectValue placeholder="Select dept" />
              </SelectTrigger>
              <SelectContent align="end" className="rounded-xl">
                {stats.departmentWise.map((dept) => (
                  <SelectItem
                    key={dept.departmentName}
                    value={dept.departmentName}
                    className="rounded-lg"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <span className="flex h-3 w-3 shrink-0 rounded-xs bg-primary" />
                      {dept.departmentName}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="flex flex-1 justify-center pb-0">
            {deptPieData.length > 0 ? (
              <ChartContainer
                id="pie-dept"
                config={deptChartConfig}
                className="mx-auto aspect-square max-h-75"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={deptPieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    strokeWidth={5}
                    shape={renderPieShape}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          const activeItem =
                            deptPieData[activeIndex] || deptPieData[0];
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
                No attendance data for this department.
              </div>
            )}
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
    <div className="grid gap-4 md:grid-cols-7">
      <Skeleton className="h-87.5 md:col-span-4" />
      <Skeleton className="h-87.5 md:col-span-3" />
    </div>
  </div>
);

export default SuperAdminAttendanceStats;
