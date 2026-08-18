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
  UserIcon,
  BuildingIcon,
  BriefcaseIcon,
  MailIcon,
  PhoneIcon,
  FileTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
  CalendarDaysIcon,
  MessageSquareIcon,
  PaperclipIcon,
  UserCheckIcon,
  TimerIcon,
} from "lucide-react";
import { format } from "date-fns";
import { ILeave } from "@/types/leave.type";
import { useState } from "react";
import { LeaveStatus } from "@/types/enums.type";

interface IViewLeaveDialogProps {
  leaveData: ILeave | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ViewLeaveDialog = ({
  leaveData,
  open,
  onOpenChange,
}: IViewLeaveDialogProps) => {
  const [imageError, setImageError] = useState(false);

  if (!leaveData) return null;

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Format date
  const formatDate = (date: string | Date | null) => {
    if (!date) return "N/A";
    return format(new Date(date), "PPP");
  };

  // Format date time
  const formatDateTime = (date: string | Date | null) => {
    if (!date) return "N/A";
    return format(new Date(date), "PPP 'at' hh:mm a");
  };

  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    const variantMap: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      PENDING: "outline",
      APPROVED_BY_HEAD: "default",
      APPROVED_BY_HR: "default",
      REJECTED: "destructive",
      CANCELLED: "secondary",
    };
    return variantMap[status] || "secondary";
  };

  // Get status label
  const getStatusLabel = (status: string) => {
    return status
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "APPROVED_BY_HEAD":
        return <UserCheckIcon className="h-4 w-4 text-green-500" />;
      case "APPROVED_BY_HR":
        return <CheckCircleIcon className="h-4 w-4 text-blue-500" />;
      case "REJECTED":
        return <XCircleIcon className="h-4 w-4 text-red-500" />;
      case "PENDING":
        return <AlertCircleIcon className="h-4 w-4 text-yellow-500" />;
      case "CANCELLED":
        return <XCircleIcon className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  // Get status color for text
  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED_BY_HEAD":
        return "text-green-500";
      case "APPROVED_BY_HR":
        return "text-blue-500";
      case "REJECTED":
        return "text-red-500";
      case "PENDING":
        return "text-yellow-500";
      case "CANCELLED":
        return "text-gray-500";
      default:
        return "";
    }
  };

  // Get the image URL
  const getImageUrl = () => {
    if (imageError) return undefined;
    return (
      leaveData.employee?.photoUrl ||
      leaveData.employee?.user?.image ||
      undefined
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Leave Details</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {/* Profile Header */}
          <div className="flex items-start gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={getImageUrl()}
                alt={leaveData.employee?.name || "Employee"}
                onError={() => setImageError(true)}
              />
              <AvatarFallback className="text-lg">
                {getInitials(leaveData.employee?.name || "Employee")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">
                {leaveData.employee?.name || "N/A"}
              </h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                {leaveData.employee?.employeeCode && (
                  <Badge variant="outline" className="text-xs">
                    {leaveData.employee.employeeCode}
                  </Badge>
                )}
                <Badge
                  variant={getStatusBadgeVariant(leaveData.status)}
                  className="text-xs flex items-center gap-1"
                >
                  {getStatusIcon(leaveData.status)}
                  {getStatusLabel(leaveData.status)}
                </Badge>
              </div>
              {leaveData.employee?.user && (
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {leaveData.employee.user.role}
                  </Badge>
                  {leaveData.employee.user.emailVerified && (
                    <Badge variant="default" className="text-xs bg-green-500">
                      Verified
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Leave Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Leave Type */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileTextIcon className="h-4 w-4" />
                <span>Leave Type</span>
              </div>
              <p className="text-sm font-medium">
                {leaveData.leaveType?.name || "N/A"}
              </p>
            </div>

            {/* Total Days */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDaysIcon className="h-4 w-4" />
                <span>Total Days</span>
              </div>
              <p className="text-sm font-medium">
                {leaveData.totalDays || 0} day
                {leaveData.totalDays !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Start Date */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span>Start Date</span>
              </div>
              <p className="text-sm font-medium">
                {formatDate(leaveData.startDate)}
              </p>
            </div>

            {/* End Date */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDaysIcon className="h-4 w-4" />
                <span>End Date</span>
              </div>
              <p className="text-sm font-medium">
                {formatDate(leaveData.endDate)}
              </p>
            </div>

            {/* Status - Full width */}
            <div className="space-y-1 col-span-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertCircleIcon className="h-4 w-4" />
                <span>Status</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={getStatusBadgeVariant(leaveData.status)}
                  className="text-xs flex items-center gap-1 w-fit"
                >
                  {getStatusIcon(leaveData.status)}
                  {getStatusLabel(leaveData.status)}
                </Badge>
                <span
                  className={`text-xs font-medium ${getStatusColor(leaveData.status)}`}
                >
                  {leaveData.status === LeaveStatus.APPROVED_BY_HEAD &&
                    "✓ Approved by Head"}
                  {leaveData.status === LeaveStatus.APPROVED &&
                    "✓ Approved by HR"}
                  {leaveData.status === LeaveStatus.REJECTED && "✗ Rejected"}
                  {leaveData.status === LeaveStatus.PENDING &&
                    "⏳ Pending Approval"}
                  {leaveData.status === LeaveStatus.CANCELLED && "✗ Cancelled"}
                </span>
              </div>
            </div>

            {/* Reason - Full width */}
            <div className="space-y-1 col-span-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MessageSquareIcon className="h-4 w-4" />
                <span>Reason</span>
              </div>
              <p className="text-sm font-medium text-muted-foreground bg-muted/50 p-3 rounded-md">
                {leaveData.reason || "No reason provided"}
              </p>
            </div>

            {/* Attachment - Full width */}
            {leaveData.attachmentUrl && (
              <div className="space-y-1 col-span-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <PaperclipIcon className="h-4 w-4" />
                  <span>Attachment</span>
                </div>
                <a
                  href={leaveData.attachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-600 hover:underline break-all"
                >
                  View Attachment
                </a>
              </div>
            )}
          </div>

          {/* Review Details Section */}
          {(leaveData.reviewedById || leaveData.reviewNote) && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <UserCheckIcon className="h-4 w-4" />
                Review Details
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {leaveData.reviewedById && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <UserIcon className="h-4 w-4" />
                      <span>Reviewed By</span>
                    </div>
                    <p className="text-sm font-medium">
                      {leaveData.reviewedById || "N/A"}
                    </p>
                  </div>
                )}
                {leaveData.reviewNote && (
                  <div className="space-y-1 col-span-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MessageSquareIcon className="h-4 w-4" />
                      <span>Review Note</span>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground bg-muted/50 p-3 rounded-md">
                      {leaveData.reviewNote}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Approval/Rejection Details */}
          {(leaveData.approvedByHeadAt ||
            leaveData.approvedByHRAt ||
            leaveData.rejectedAt) && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <TimerIcon className="h-4 w-4" />
                Timeline
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {leaveData.approvedByHeadAt && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <UserCheckIcon className="h-4 w-4" />
                      <span>Approved by Head</span>
                    </div>
                    <p className="text-sm font-medium">
                      {formatDateTime(leaveData.approvedByHeadAt)}
                    </p>
                  </div>
                )}
                {leaveData.approvedByHRAt && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircleIcon className="h-4 w-4" />
                      <span>Approved by HR</span>
                    </div>
                    <p className="text-sm font-medium">
                      {formatDateTime(leaveData.approvedByHRAt)}
                    </p>
                  </div>
                )}
                {leaveData.rejectedAt && (
                  <div className="space-y-1 col-span-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <XCircleIcon className="h-4 w-4" />
                      <span>Rejected At</span>
                    </div>
                    <p className="text-sm font-medium">
                      {formatDateTime(leaveData.rejectedAt)}
                    </p>
                    {leaveData.rejectedReason && (
                      <p className="text-sm font-medium text-muted-foreground bg-destructive/10 p-3 rounded-md mt-2">
                        <span className="font-semibold">Reason:</span>{" "}
                        {leaveData.rejectedReason}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Employee Details Section */}
          {leaveData.employee && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                Employee Details
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {/* Employee Email */}
                {leaveData.employee.user && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MailIcon className="h-4 w-4" />
                      <span>Email</span>
                    </div>
                    <p className="text-sm font-medium break-all">
                      {leaveData.employee.user.email}
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
                    {leaveData.employee.phone || "N/A"}
                  </p>
                </div>

                {/* Department */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BuildingIcon className="h-4 w-4" />
                    <span>Department</span>
                  </div>
                  <p className="text-sm font-medium">
                    {leaveData.employee.department?.name || "Not Assigned"}
                  </p>
                </div>

                {/* Designation */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BriefcaseIcon className="h-4 w-4" />
                    <span>Designation</span>
                  </div>
                  <p className="text-sm font-medium">
                    {leaveData.employee.designation?.title || "Not Assigned"}
                  </p>
                </div>

                {/* Employment Type */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BriefcaseIcon className="h-4 w-4" />
                    <span>Employment Type</span>
                  </div>
                  <p className="text-sm font-medium">
                    {leaveData.employee.employmentType
                      ?.replace("_", " ")
                      .toLowerCase()
                      .replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"}
                  </p>
                </div>

                {/* Employee Status */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <AlertCircleIcon className="h-4 w-4" />
                    <span>Employee Status</span>
                  </div>
                  <Badge
                    variant={
                      leaveData.employee.status === "ACTIVE"
                        ? "default"
                        : "secondary"
                    }
                    className="text-xs w-fit"
                  >
                    {leaveData.employee.status
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
                  {formatDateTime(leaveData.createdAt)}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Updated At</span>
                </div>
                <p className="text-sm font-medium">
                  {formatDateTime(leaveData.updatedAt)}
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

export default ViewLeaveDialog;
