"use client";

import React, { useMemo, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Save } from "lucide-react";
import { type DateRange } from "react-day-picker";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";

import { getCompanyLeaveTypes } from "@/actions/leaveType.action";
import { updateForEmployeeLeave } from "@/actions/leave.action";
import { ILeaveType } from "@/types/leaveType.type";
import { ILeave } from "@/types/leave.type";
import { UpdateLeaveFormValues, updateLeaveSchema } from "@/zod/leave.validation";

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

interface EditForLeaveDialogProps {
  leaveData: ILeave | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditForLeaveDialog = ({
  leaveData,
  open,
  onOpenChange,
}: EditForLeaveDialogProps) => {
  const queryClient = useQueryClient();

  const { data: leaveTypesData, isLoading: isLeaveTypesLoading } = useQuery({
    queryKey: ["companyLeaveTypes"],
    queryFn: async () => await getCompanyLeaveTypes(),
  });

  const leaveTypes = useMemo(() => {
    return leaveTypesData?.data?.data || [];
  }, [leaveTypesData]);

  const leaveTypeOptions = useMemo(() => {
    return leaveTypes.map((type: ILeaveType) => ({
      value: type.id,
      label: type.name,
    }));
  }, [leaveTypes]);

  const form = useForm({
    defaultValues: {
      leaveTypeId: leaveData?.leaveTypeId || "",
      startDate: leaveData?.startDate
        ? new Date(leaveData.startDate)
        : undefined,
      endDate: leaveData?.endDate ? new Date(leaveData.endDate) : undefined,
      reason: leaveData?.reason || "",
    } as UpdateLeaveFormValues,
    validators: {
      onChange: updateLeaveSchema,
    },
    onSubmit: ({ value }) => {
      if (!leaveData) return;

      // ✅ Only include fields that were actually changed
      const payload: Record<string, unknown> = {};

      if (value.leaveTypeId && value.leaveTypeId !== leaveData.leaveTypeId) {
        payload.leaveTypeId = value.leaveTypeId;
      }

      if (
        value.startDate &&
        value.startDate.toISOString() !==
          new Date(leaveData.startDate).toISOString()
      ) {
        payload.startDate = value.startDate.toISOString();
      }

      if (
        value.endDate &&
        value.endDate.toISOString() !==
          new Date(leaveData.endDate).toISOString()
      ) {
        payload.endDate = value.endDate.toISOString();
      }

      if (value.reason && value.reason !== leaveData.reason) {
        payload.reason = value.reason;
      }

      // ✅ Prevent empty submissions
      if (Object.keys(payload).length === 0) {
        toast.info("No changes were made.");
        return;
      }

      mutate(payload);
    },
  });

  useEffect(() => {
    if (leaveData && open) {
      form.reset({
        leaveTypeId: leaveData.leaveTypeId,
        startDate: new Date(leaveData.startDate),
        endDate: new Date(leaveData.endDate),
        reason: leaveData.reason,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaveData, open]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      if (!leaveData) throw new Error("No leave selected");
      return await updateForEmployeeLeave(leaveData.id, payload);
    },
    onSuccess: () => {
      toast.success("Leave updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["companyEmployeeLeaves"] });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update leave");
    },
  });

  if (!leaveData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Leave</DialogTitle>
          <DialogDescription>
            Update only the fields you want to change.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4 py-2"
        >
          {/* 1. Leave Type (Optional) */}
          <form.Field name="leaveTypeId">
            {(field) => {
              const selectedLabel = leaveTypeOptions.find(
                (opt) => opt.value === field.state.value,
              )?.label;

              return (
                <div className="space-y-1.5">
                  <Label htmlFor="leaveTypeId">Leave Type</Label>
                  <Select
                    value={field.state.value}
                    onValueChange={(val) => field.handleChange(val || "")}
                    disabled={isLeaveTypesLoading}
                  >
                    <SelectTrigger className={"w-full"}>
                      <SelectValue
                        placeholder={
                          isLeaveTypesLoading
                            ? "Loading types..."
                            : "Select leave type"
                        }
                      >
                        {selectedLabel}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {leaveTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
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

          {/* 2. Date Range (Optional) */}
          <form.Field name="startDate">
            {(startField) => (
              <form.Field name="endDate">
                {(endField) => {
                  const dateRange: DateRange | undefined = {
                    from: startField.state.value || undefined,
                    to: endField.state.value || undefined,
                  };

                  const handleRangeSelect = (range: DateRange | undefined) => {
                    startField.handleChange(range?.from);
                    endField.handleChange(range?.to);
                  };

                  return (
                    <div className="space-y-1.5">
                      <Label>Leave Period (Start & End Date)</Label>
                      <Popover>
                        <PopoverTrigger
                          render={
                            <Button
                              type="button"
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {dateRange?.from ? (
                                dateRange.to ? (
                                  <>
                                    {format(dateRange.from, "LLL dd, y")} -{" "}
                                    {format(dateRange.to, "LLL dd, y")}
                                  </>
                                ) : (
                                  format(dateRange.from, "LLL dd, y")
                                )
                              ) : (
                                <span>Pick a date range</span>
                              )}
                            </Button>
                          }
                        />
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="range"
                            defaultMonth={dateRange?.from}
                            selected={dateRange}
                            onSelect={handleRangeSelect}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                      {startField.state.meta.errors.length > 0 && (
                        <p className="text-sm text-destructive">
                          {getErrorMessage(startField.state.meta.errors)}
                        </p>
                      )}
                      {endField.state.meta.errors.length > 0 && (
                        <p className="text-sm text-destructive">
                          {getErrorMessage(endField.state.meta.errors)}
                        </p>
                      )}
                    </div>
                  );
                }}
              </form.Field>
            )}
          </form.Field>

          {/* 3. Reason (Optional) */}
          <form.Field name="reason">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <div className="space-y-1.5">
                  <Label htmlFor="reason">Reason</Label>
                  <Textarea
                    id="reason"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Please provide a brief reason for your leave..."
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

          {/* 4. Existing Attachment */}
          {leaveData.attachmentUrl && (
            <div className="space-y-1.5">
              <Label>Current Attachment</Label>
              <a
                href={leaveData.attachmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary underline hover:no-underline break-all"
              >
                {leaveData.attachmentUrl.split("/").pop() || "View attachment"}
              </a>
            </div>
          )}

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
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
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

export default EditForLeaveDialog;
