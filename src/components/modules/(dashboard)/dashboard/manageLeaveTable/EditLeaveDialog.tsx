"use client";

import React, { useMemo, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Loader2,
  Save,
  AlertCircle,
  CheckCircle2,
  XCircle,
  UserCheck,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { updateLeaveStatus } from "@/actions/leave.action";
import { ILeave } from "@/types/leave.type";
import { LeaveStatus } from "@/types/enums.type";
import {
  UpdateLeaveStatusFormValues,
  updateLeaveStatusSchema,
} from "@/zod/leave.validation";

// ✅ Helper to extract error messages
const getErrorMessage = (errors: unknown[]): string => {
  return errors
    .map((err) => {
      if (typeof err === "string") return err;
      if (err && typeof err === "object" && "message" in err) {
        return (err as { message: string }).message;
      }
      return "";
    })
    .filter(Boolean)
    .join(", ");
};

interface EditLeaveDialogProps {
  leaveData: ILeave | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditLeaveDialog = ({
  leaveData,
  open,
  onOpenChange,
}: EditLeaveDialogProps) => {
  const queryClient = useQueryClient();

  // ✅ Status options with icons
  const statusOptions = useMemo(
    () => [
      { value: LeaveStatus.PENDING, label: "Pending", icon: Clock },
      {
        value: LeaveStatus.APPROVED_BY_HEAD,
        label: "Approved by Head",
        icon: UserCheck,
      },
      {
        value: LeaveStatus.APPROVED,
        label: "Approved",
        icon: CheckCircle2,
      },
      { value: LeaveStatus.REJECTED, label: "Rejected", icon: XCircle },
      { value: LeaveStatus.CANCELLED, label: "Cancelled", icon: AlertCircle },
    ],
    [],
  );

  const form = useForm({
    defaultValues: {
      status: leaveData?.status || LeaveStatus.PENDING,
      reviewNote: leaveData?.reviewNote || "",
      rejectedReason: leaveData?.rejectedReason || "",
    } as UpdateLeaveStatusFormValues,
    validators: {
      onChange: updateLeaveStatusSchema,
    },
    onSubmit: ({ value }) => {
      if (!leaveData) return;
      mutate({
        status: value.status,
        reviewNote: value.reviewNote?.trim() || undefined,
        rejectedReason: value.rejectedReason?.trim() || undefined,
      });
    },
  });

  // Reset form when dialog opens with new data
  useEffect(() => {
    if (leaveData && open) {
      form.reset({
        status: leaveData.status || LeaveStatus.PENDING,
        reviewNote: leaveData.reviewNote || "",
        rejectedReason: leaveData.rejectedReason || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaveData, open]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: {
      status: LeaveStatus;
      reviewNote?: string;
      rejectedReason?: string;
    }) => {
      if (!leaveData) throw new Error("No leave selected");
      return await updateLeaveStatus(leaveData.id, payload);
    },
    onSuccess: () => {
      toast.success("Leave status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["companyEmployeeLeaves"] });
      queryClient.invalidateQueries({ queryKey: ["companyLeaves"] });
      queryClient.invalidateQueries({ queryKey: ["leave-stats"] });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update leave status");
    },
  });

  if (!leaveData) return null;

  // Safe date formatter
  const formatDate = (d: string | Date | null | undefined) =>
    d ? format(new Date(d), "PPP") : "N/A";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Leave Status</DialogTitle>
          <DialogDescription>
            Change the status of this leave request.
          </DialogDescription>
        </DialogHeader>

        {/* Read-only context */}
        <div className="rounded-md border p-3 text-sm space-y-2 bg-muted/40">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Employee</span>
            <span className="font-medium">
              {leaveData.employee?.name || "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Leave Type</span>
            <span className="font-medium">
              {leaveData.leaveType?.name || "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Period</span>
            <span className="font-medium">
              {formatDate(leaveData.startDate)} -{" "}
              {formatDate(leaveData.endDate)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Days</span>
            <span className="font-medium">{leaveData.totalDays} days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Current Status</span>
            <span className="font-medium capitalize">
              {leaveData.status.replace(/_/g, " ").toLowerCase()}
            </span>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4 py-2"
        >
          {/* 1. Status Select */}
          <form.Field name="status">
            {(field) => {
              const selectedOption = statusOptions.find(
                (opt) => opt.value === field.state.value,
              );

              return (
                <div className="space-y-1.5">
                  <Label htmlFor="status">New Status *</Label>
                  <Select
                    value={field.state.value}
                    onValueChange={(val) =>
                      field.handleChange(val as LeaveStatus)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status">
                        <div className="flex items-center gap-2">
                          {selectedOption?.icon && (
                            <selectedOption.icon className="h-4 w-4" />
                          )}
                          {selectedOption?.label || "Select status"}
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <option.icon className="h-4 w-4" />
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive">
                        {getErrorMessage(field.state.meta.errors)}
                      </p>
                    )}
                </div>
              );
            }}
          </form.Field>

          {/* 2. Rejection Reason (only when REJECTED) — REACTIVE via form.Subscribe */}
          <form.Subscribe selector={(state) => state.values.status}>
            {(status) => {
              if (status !== LeaveStatus.REJECTED) return null;

              return (
                <form.Field name="rejectedReason">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <div className="space-y-1.5">
                        <Label htmlFor="rejectedReason">
                          Rejection Reason *
                        </Label>
                        <Textarea
                          id="rejectedReason"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Explain why this leave is being rejected..."
                          rows={3}
                        />
                        {isInvalid && (
                          <p className="text-sm text-destructive">
                            {getErrorMessage(field.state.meta.errors)}
                          </p>
                        )}
                      </div>
                    );
                  }}
                </form.Field>
              );
            }}
          </form.Subscribe>

          {/* 3. Review Note (optional) */}
          <form.Field name="reviewNote">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <div className="space-y-1.5">
                  <Label htmlFor="reviewNote">Review Note (Optional)</Label>
                  <Textarea
                    id="reviewNote"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Add an internal note about this decision..."
                    rows={2}
                  />
                  {isInvalid && (
                    <p className="text-sm text-destructive">
                      {getErrorMessage(field.state.meta.errors)}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          <DialogFooter className="pt-4">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  disabled={isPending}
                  onClick={() => form.reset()}
                >
                  Cancel
                </Button>
              }
            ></DialogClose>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting || isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Update Status
                    </>
                  )}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditLeaveDialog;
