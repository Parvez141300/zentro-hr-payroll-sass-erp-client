"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  FileTextIcon,
  DollarSignIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  UserIcon,
} from "lucide-react";
import { ILeaveType } from "@/types/leaveType.type";
import DateConversion from "@/components/shared/dateConversion/DateConversion";

interface IViewLeaveTypeDialogProps {
  leaveTypeData: ILeaveType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ViewLeaveTypeDialog = ({
  leaveTypeData,
  open,
  onOpenChange,
}: IViewLeaveTypeDialogProps) => {
  if (!leaveTypeData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Leave Type Details</DialogTitle>
        </DialogHeader>

        <div className="py-4 max-h-60 overflow-y-auto">
          {/* Header */}
          <div className="mb-6">
            <h3 className="text-2xl font-semibold">{leaveTypeData.name}</h3>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Badge
                variant={leaveTypeData.isActive ? "default" : "secondary"}
                className="text-xs flex items-center gap-1"
              >
                {leaveTypeData.isActive ? (
                  <CheckCircleIcon className="h-3 w-3" />
                ) : (
                  <XCircleIcon className="h-3 w-3" />
                )}
                {leaveTypeData.isActive ? "Active" : "Inactive"}
              </Badge>
              <Badge
                variant={leaveTypeData.isPaid ? "default" : "outline"}
                className="text-xs flex items-center gap-1"
              >
                <DollarSignIcon className="h-3 w-3" />
                {leaveTypeData.isPaid ? "Paid" : "Unpaid"}
              </Badge>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileTextIcon className="h-4 w-4" />
                <span>Name</span>
              </div>
              <p className="text-sm font-medium">{leaveTypeData.name}</p>
            </div>

            {/* Days Allowed */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span>Days Allowed</span>
              </div>
              <p className="text-sm font-medium">
                {leaveTypeData.daysAllowed} day
                {leaveTypeData.daysAllowed !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Is Paid - Full width */}
            <div className="space-y-1 col-span-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <DollarSignIcon className="h-4 w-4" />
                <span>Payment Status</span>
              </div>
              <Badge
                variant={leaveTypeData.isPaid ? "default" : "outline"}
                className="text-xs flex items-center gap-1 w-fit"
              >
                {leaveTypeData.isPaid ? (
                  <CheckCircleIcon className="h-3 w-3" />
                ) : (
                  <XCircleIcon className="h-3 w-3" />
                )}
                {leaveTypeData.isPaid ? "Paid Leave" : "Unpaid Leave"}
              </Badge>
            </div>

            {/* Is Active - Full width */}
            <div className="space-y-1 col-span-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ClockIcon className="h-4 w-4" />
                <span>Status</span>
              </div>
              <Badge
                variant={leaveTypeData.isActive ? "default" : "secondary"}
                className="text-xs flex items-center gap-1 w-fit"
              >
                {leaveTypeData.isActive ? (
                  <CheckCircleIcon className="h-3 w-3" />
                ) : (
                  <XCircleIcon className="h-3 w-3" />
                )}
                {leaveTypeData.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>

            {/* Description - Full width */}
            {leaveTypeData.description && (
              <div className="space-y-1 col-span-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileTextIcon className="h-4 w-4" />
                  <span>Description</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground bg-muted/50 p-3 rounded-md">
                  {leaveTypeData.description}
                </p>
              </div>
            )}
          </div>

          {/* Company ID - optional */}
          {leaveTypeData.companyId && (
            <div className="mt-4 pt-4 border-t">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <UserIcon className="h-4 w-4" />
                  <span>Company ID</span>
                </div>
                <p className="text-sm font-medium">{leaveTypeData.companyId}</p>
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
                  {DateConversion({ date: leaveTypeData.createdAt })}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Updated At</span>
                </div>
                <p className="text-sm font-medium">
                  {DateConversion({ date: leaveTypeData.updatedAt })}
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

export default ViewLeaveTypeDialog;
