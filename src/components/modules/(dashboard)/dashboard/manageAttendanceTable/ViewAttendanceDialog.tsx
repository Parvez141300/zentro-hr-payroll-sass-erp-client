"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  BuildingIcon,
  BriefcaseIcon,
  MailIcon,
  PhoneIcon,
  FileTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
  TimerIcon,
  LucideClock,
} from "lucide-react";
import { IAttendance } from "@/types/attendance.type";
import { useState } from "react";
import DateConversion from "@/components/shared/dateConversion/DateConversion";
import { AttendanceStatus } from "@/types/enums.type";

interface IViewAttendanceDialogProps {
  attendanceData: IAttendance | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ViewAttendanceDialog = ({
  attendanceData,
  open,
  onOpenChange,
}: IViewAttendanceDialogProps) => {
  const [imageError, setImageError] = useState(false);

  if (!attendanceData) return null;

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    const variantMap: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      PRESENT: "default",
      ABSENT: "destructive",
      LATE: "outline",
      HALF_DAY: "secondary",
      HOLIDAY: "outline",
      WEEKEND: "secondary",
      LEAVE: "outline",
    };
    return variantMap[status] || "secondary";
  };

  // Get status label
  const getStatusLabel = (status: string) => {
    return status
      .replace("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case AttendanceStatus.PRESENT:
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      case AttendanceStatus.ABSENT:
        return <XCircleIcon className="h-4 w-4 text-red-500" />;
      case AttendanceStatus.LATE:
        return <AlertCircleIcon className="h-4 w-4 text-yellow-500" />;
      case AttendanceStatus.HALF_DAY:
        return <TimerIcon className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  // Get the image URL
  const getImageUrl = () => {
    if (imageError) return undefined;
    return (
      attendanceData.employee?.photoUrl ||
      attendanceData.employee?.user?.image ||
      undefined
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-138 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Attendance Details</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {/* Profile Header */}
          <div className="flex items-start gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={getImageUrl()}
                alt={attendanceData.employee?.name || "Employee"}
                onError={() => setImageError(true)}
              />
              <AvatarFallback className="text-lg">
                {getInitials(attendanceData.employee?.name || "Employee")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">
                {attendanceData.employee?.name || "N/A"}
              </h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                {attendanceData.employee?.employeeCode && (
                  <Badge variant="outline" className="text-xs">
                    {attendanceData.employee.employeeCode}
                  </Badge>
                )}
                <Badge
                  variant={getStatusBadgeVariant(attendanceData.status)}
                  className="text-xs flex items-center gap-1"
                >
                  {getStatusIcon(attendanceData.status)}
                  {getStatusLabel(attendanceData.status)}
                </Badge>
              </div>
              {attendanceData.employee?.user && (
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {attendanceData.employee.user.role}
                  </Badge>
                  {attendanceData.employee.user.emailVerified && (
                    <Badge variant="default" className="text-xs bg-green-500">
                      Verified
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Attendance Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Date */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span>Date</span>
              </div>
              <p className="text-sm font-medium">
                {DateConversion({ date: attendanceData.date })}
              </p>
            </div>

            {/* Status */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileTextIcon className="h-4 w-4" />
                <span>Status</span>
              </div>
              <Badge
                variant={getStatusBadgeVariant(attendanceData.status)}
                className="text-xs flex items-center gap-1 w-fit"
              >
                {getStatusIcon(attendanceData.status)}
                {getStatusLabel(attendanceData.status)}
              </Badge>
            </div>

            {/* Check In */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ClockIcon className="h-4 w-4" />
                <span>Check In</span>
              </div>
              <p className="text-sm font-medium">
                {DateConversion({
                  date: attendanceData.checkIn,
                  formatString: "hh:mm aa",
                })}
              </p>
            </div>

            {/* Check Out */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <LucideClock className="h-4 w-4" />
                <span>Check Out</span>
              </div>
              <p className="text-sm font-medium">
                {attendanceData.checkOut
                  ? DateConversion({
                      date: attendanceData.checkOut,
                      formatString: "hh:mm aa",
                    })
                  : "N/A"}
              </p>
            </div>

            {/* Late Minutes */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertCircleIcon className="h-4 w-4" />
                <span>Late Minutes</span>
              </div>
              <p className="text-sm font-medium">
                {attendanceData.lateMinutes !== undefined &&
                attendanceData.lateMinutes !== null
                  ? `${attendanceData.lateMinutes} min`
                  : "N/A"}
              </p>
            </div>

            {/* Early Exit Minutes */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <XCircleIcon className="h-4 w-4" />
                <span>Early Exit</span>
              </div>
              <p className="text-sm font-medium">
                {attendanceData.earlyExitMinutes !== undefined &&
                attendanceData.earlyExitMinutes !== null
                  ? `${attendanceData.earlyExitMinutes} min`
                  : "N/A"}
              </p>
            </div>

            {/* Overtime Hours */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TimerIcon className="h-4 w-4" />
                <span>Overtime Hours</span>
              </div>
              <p className="text-sm font-medium">
                {attendanceData.overtimeHours !== undefined &&
                attendanceData.overtimeHours !== null
                  ? `${attendanceData.overtimeHours} hrs`
                  : "N/A"}
              </p>
            </div>

            {/* Note - Full width */}
            {attendanceData.note && (
              <div className="space-y-1 col-span-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileTextIcon className="h-4 w-4" />
                  <span>Note</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  {attendanceData.note}
                </p>
              </div>
            )}

            {/* Approved By - Full width */}
            <div className="space-y-1 col-span-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <UserIcon className="h-4 w-4" />
                <span>Approved By</span>
              </div>
              <p className="text-sm font-medium">
                {attendanceData.approvedBy ? "Yes" : "Not Approved Yet"}
              </p>
            </div>

            {/* Approved At - Full width */}
            {attendanceData.approvedAt && (
              <div className="space-y-1 col-span-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Approved At</span>
                </div>
                <p className="text-sm font-medium">
                  {DateConversion({ date: attendanceData.approvedAt })}
                </p>
              </div>
            )}
          </div>

          {/* Employee Details Section */}
          {attendanceData.employee && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                Employee Details
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {/* Employee Email */}
                {attendanceData.employee.user && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MailIcon className="h-4 w-4" />
                      <span>Email</span>
                    </div>
                    <p className="text-sm font-medium break-all">
                      {attendanceData.employee.user.email}
                    </p>
                  </div>
                )}

                {/* Employee Phone */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <PhoneIcon className="h-4 w-4" />
                    <span>Phone</span>
                  </div>
                  <p className="text-sm font-medium">
                    {attendanceData.employee.phone || "N/A"}
                  </p>
                </div>

                {/* Department */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BuildingIcon className="h-4 w-4" />
                    <span>Department</span>
                  </div>
                  <p className="text-sm font-medium">
                    {attendanceData.employee.department?.name || "Not Assigned"}
                  </p>
                </div>

                {/* Designation */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BriefcaseIcon className="h-4 w-4" />
                    <span>Designation</span>
                  </div>
                  <p className="text-sm font-medium">
                    {attendanceData.employee.designation?.title ||
                      "Not Assigned"}
                  </p>
                </div>

                {/* Employment Type */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileTextIcon className="h-4 w-4" />
                    <span>Employment Type</span>
                  </div>
                  <p className="text-sm font-medium">
                    {attendanceData.employee.employmentType
                      ?.replace("_", " ")
                      .toLowerCase()
                      .replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"}
                  </p>
                </div>

                {/* Status */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <AlertCircleIcon className="h-4 w-4" />
                    <span>Employee Status</span>
                  </div>
                  <Badge
                    variant={
                      attendanceData.employee.status === "ACTIVE"
                        ? "default"
                        : "secondary"
                    }
                    className="text-xs w-fit"
                  >
                    {attendanceData.employee.status
                      ?.replace("_", " ")
                      .toLowerCase()
                      .replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"}
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {/* Created & Updated */}
          <div className="mt-4 pt-4 border-t">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Created At</span>
                </div>
                <p className="text-sm font-medium">
                  {DateConversion({ date: attendanceData.createdAt })}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Updated At</span>
                </div>
                <p className="text-sm font-medium">
                  {DateConversion({ date: attendanceData.updatedAt })}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose
            render={<Button variant="outline">Close</Button>}
          ></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewAttendanceDialog;
