// src/components/modules/(dashboard)/dashboard/attendance/EditAttendanceDialog.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "@tanstack/react-form";
import React from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AttendanceStatus } from "@/types/enums.type";
import AppField from "@/components/shared/form/AppField";
import { ClockIcon } from "lucide-react";
import { format, parse } from "date-fns";
import { IAttendance, IUpdateAttendance } from "@/types/attendance.type";
import { updateEmployeeAttendance } from "@/actions/attendance.action";
import {
  UpdateAttendanceFormValues,
  updateAttendanceSchema,
} from "@/zod/attendance.validation";

interface EditAttendanceDialogProps {
  attendanceData: IAttendance | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// ISO string -> "HH:mm" for <input type="time">
const toTimeInput = (iso?: Date | string | null) =>
  iso ? format(new Date(iso), "HH:mm") : "";

const EditAttendanceDialog = ({
  attendanceData,
  open,
  onOpenChange,
}: EditAttendanceDialogProps) => {
  // ✅ Early return if attendanceData is null
  if (!attendanceData) {
    return null;
  }

  return (
    <EditAttendanceForm
      attendanceData={attendanceData}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
};

// ✅ Separate form component that only receives non-null attendanceData
const EditAttendanceForm = ({
  attendanceData,
  open,
  onOpenChange,
}: {
  attendanceData: IAttendance;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: IUpdateAttendance) =>
      await updateEmployeeAttendance(attendanceData.id, payload),
    onSuccess: () => {
      toast.success("Attendance updated successfully");
      queryClient.invalidateQueries({ queryKey: ["companyAttendances"] });
      queryClient.invalidateQueries({ queryKey: ["markEmployeesAttendance"] });
      onOpenChange(false);
      form.reset();
    },
    onError: (err) => {
      toast.error(
        (err instanceof Error && err.message) || "Failed to update attendance",
      );
    },
  });

  const form = useForm({
    defaultValues: {
      status: attendanceData.status as AttendanceStatus,
      checkIn: toTimeInput(attendanceData.checkIn),
      checkOut: toTimeInput(attendanceData.checkOut),
      note: attendanceData.note ?? "",
    } as UpdateAttendanceFormValues,
    validators: {
      onChange: updateAttendanceSchema,
    },
    onSubmit: ({ value }) => {
      const dateStr = format(new Date(attendanceData.date), "yyyy-MM-dd");

      const checkIn = value.checkIn
        ? parse(`${dateStr} ${value.checkIn}`, "yyyy-MM-dd HH:mm", new Date())
        : undefined;

      const checkOut = value.checkOut
        ? parse(`${dateStr} ${value.checkOut}`, "yyyy-MM-dd HH:mm", new Date())
        : undefined;

      const isAbsent = value.status === AttendanceStatus.ABSENT;

      const payload: IUpdateAttendance = {
        status: value.status as AttendanceStatus,
        checkIn: isAbsent ? undefined : checkIn,
        checkOut: isAbsent ? undefined : checkOut,
        note: value.note?.trim() || undefined,
      };

      mutate(payload);
    },
  });

  const statusOptions = [
    { value: AttendanceStatus.PRESENT, label: "Present" },
    { value: AttendanceStatus.ABSENT, label: "Absent" },
    { value: AttendanceStatus.LATE, label: "Late" },
    { value: AttendanceStatus.HALF_DAY, label: "Half Day" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Attendance</DialogTitle>
        </DialogHeader>

        {/* Read-only context */}
        <div className="rounded-md border p-3 text-sm space-y-1 bg-muted/40">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Employee</span>
            <span className="font-medium">
              {attendanceData.employee?.name || "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date</span>
            <span className="font-medium">
              {format(new Date(attendanceData.date), "PPP")}
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
          {/* Status */}
          <form.Field name="status">
            {(field) => (
              <div className="space-y-1.5">
                <Label htmlFor="status">Status *</Label>
                <Select
                  value={field.state.value}
                  onValueChange={(v) =>
                    field.handleChange(v as AttendanceStatus)
                  }
                >
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </form.Field>

          {/* Check In */}
          <form.Field name="checkIn">
            {(field) => (
              <AppField
                field={field}
                label="Check In"
                type="time"
                placeholder="Select check in time"
                prepend={<ClockIcon className="h-4 w-4" />}
              />
            )}
          </form.Field>

          {/* Check Out */}
          <form.Field name="checkOut">
            {(field) => (
              <AppField
                field={field}
                label="Check Out"
                type="time"
                placeholder="Select check out time"
                prepend={<ClockIcon className="h-4 w-4" />}
              />
            )}
          </form.Field>

          {/* Note */}
          <form.Field name="note">
            {(field) => (
              <div className="space-y-1.5">
                <Label htmlFor="note">Note</Label>
                <Textarea
                  id="note"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Add any additional notes..."
                  rows={2}
                />
              </div>
            )}
          </form.Field>

          <DialogFooter>
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset();
                  }}
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
                  {isPending ? "Updating..." : "Update Attendance"}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAttendanceDialog;
