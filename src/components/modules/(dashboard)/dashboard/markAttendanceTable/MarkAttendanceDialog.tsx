"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import React, { useState } from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markEmployeeAttendance } from "@/actions/attendance.action";
import { AttendanceStatus } from "@/types/enums.type";
import AppField from "@/components/shared/form/AppField";
import { CalendarIcon, ClockIcon } from "lucide-react";
import {
  MarkAttendanceFormValues,
  markAttendanceSchema,
} from "@/zod/attendance.validation";

interface MarkAttendanceDialogProps {
  employeeId: string;
}

const MarkAttendanceDialog = ({ employeeId }: MarkAttendanceDialogProps) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: MarkAttendanceFormValues) => {
      const payload = {
        employeeId: data.employeeId,
        date: new Date(data.date),
        status: data.status as AttendanceStatus,
        checkIn: data.checkIn ? new Date(data.checkIn) : undefined,
        checkOut: data.checkOut ? new Date(data.checkOut) : undefined,
        note: data.note || undefined,
      };
      return await markEmployeeAttendance(payload);
    },
    onSuccess: () => {
      toast.success("Attendance marked successfully");
      queryClient.invalidateQueries({ queryKey: ["markEmployeesAttendance"] });
      queryClient.invalidateQueries({ queryKey: ["companyAttendances"] });
      setOpen(false);
      form.reset();
    },
    onError: (err) => {
      toast.error(
        (err instanceof Error && err?.message) || "Failed to mark attendance",
      );
    },
  });

  const form = useForm({
    defaultValues: {
      employeeId: employeeId,
      date: new Date().toISOString(),
      status: AttendanceStatus.PRESENT as AttendanceStatus,
      checkIn: "",
      checkOut: "",
      note: "",
    } as MarkAttendanceFormValues,
    validators: {
      onChange: markAttendanceSchema,
    },
    onSubmit: ({ value }) => {
      mutate(value);
    },
  });

  // Status options
  const statusOptions = [
    { value: AttendanceStatus.PRESENT, label: "Present" },
    { value: AttendanceStatus.ABSENT, label: "Absent" },
    { value: AttendanceStatus.LATE, label: "Late" },
    { value: AttendanceStatus.HALF_DAY, label: "Half Day" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm">
            Mark
          </Button>
        }
      ></DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Mark Attendance</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4 py-2"
        >
          {/* Date Field */}
          <form.Field
            name="date"
          >
            {(field) => (
              <AppField
                field={field}
                label="Date *"
                type="date"
                placeholder="Select date"
                prepend={<CalendarIcon className="h-4 w-4" />}
              />
            )}
          </form.Field>

          {/* Status Field */}
          <form.Field
            name="status"
          >
            {(field) => (
              <div className="space-y-1.5">
                <Label htmlFor="status">Status *</Label>
                <Select
                  value={field.state.value}
                  onValueChange={(value) =>
                    field.handleChange(value as AttendanceStatus)
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
                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Check In Field */}
          <form.Field
            name="checkIn"
          >
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

          {/* Check Out Field */}
          <form.Field
            name="checkOut"
          >
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

          {/* Note Field */}
          <form.Field
            name="note"
          >
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
                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
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
                  {isPending ? "Marking..." : "Mark Attendance"}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MarkAttendanceDialog;
