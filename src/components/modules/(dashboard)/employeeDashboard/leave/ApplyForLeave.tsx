"use client";

import React, { useMemo, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Send, Plus } from "lucide-react";
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
  DialogTrigger,
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

import { FileUpload } from "@/components/shared/uploadFile/FileUpload";
import { FileWithPreview } from "@/hooks/use-file-upload";

import { getCompanyLeaveTypes } from "@/actions/leaveType.action";
import { ILeaveType } from "@/types/leaveType.type";
import { applyLeaveSchema } from "@/zod/leave.validation";
import { applyForEmployeeLeave } from "@/actions/leave.action";

// ✅ Helper to extract error messages correctly
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

const ApplyForLeaveDialog = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [attachmentFiles, setAttachmentFiles] = useState<FileWithPreview[]>([]);

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
      leaveTypeId: "",
      startDate: new Date(),
      endDate: new Date(),
      reason: "",
    },
    validators: {
      onChange: applyLeaveSchema,
    },
    onSubmit: ({ value }) => {
      const formData = new FormData();

      // ✅ Wrap the payload inside `info` to match backend middleware
      formData.append(
        "data",
        JSON.stringify({
          info: {
            leaveTypeId: value.leaveTypeId,
            startDate: value.startDate.toISOString(),
            endDate: value.endDate.toISOString(),
            reason: value.reason,
          },
        }),
      );

      // Attach the file if uploaded
      if (
        attachmentFiles.length > 0 &&
        attachmentFiles[0].file instanceof File
      ) {
        formData.append("file", attachmentFiles[0].file);
      }

      mutate(formData);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      return await applyForEmployeeLeave(formData);
    },
    onSuccess: () => {
      toast.success("Leave application submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["companyEmployeeLeaves"] });
      setOpen(false);
      form.reset();
      setAttachmentFiles([]);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to submit leave application");
    },
  });

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      form.reset();
      setAttachmentFiles([]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Apply For Leave
          </Button>
        }
      ></DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply for Leave</DialogTitle>
          <DialogDescription>
            Submit a new leave request. Your manager will review it shortly.
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
          {/* 1. Leave Type */}
          <form.Field name="leaveTypeId">
            {(field) => {
              const selectedLabel = leaveTypeOptions.find(
                (opt) => opt.value === field.state.value,
              )?.label;

              return (
                <div className="space-y-1.5">
                  <Label htmlFor="leaveTypeId">Leave Type *</Label>
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
                      {leaveTypeOptions.length === 0 &&
                        !isLeaveTypesLoading && (
                          <div className="px-2 py-1.5 text-sm text-muted-foreground">
                            No leave types found
                          </div>
                        )}
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

          {/* 2. Date Range */}
          <form.Field name="startDate">
            {(startField) => (
              <form.Field name="endDate">
                {(endField) => {
                  const dateRange: DateRange | undefined = {
                    from: startField.state.value || undefined,
                    to: endField.state.value || undefined,
                  };

                  const handleRangeSelect = (range: DateRange | undefined) => {
                    startField.handleChange(range?.from || new Date());
                    endField.handleChange(range?.to || new Date());
                  };

                  return (
                    <div className="space-y-1.5">
                      <Label>Leave Period (Start & End Date) *</Label>
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
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
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

          {/* 3. Reason */}
          <form.Field name="reason">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <div className="space-y-1.5">
                  <Label htmlFor="reason">Reason *</Label>
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

          {/* 4. File Upload (Max 1) */}
          <div className="space-y-1.5">
            <Label>Attachment (Optional)</Label>
            <div className="border rounded-lg p-4 bg-muted/20">
              <FileUpload
                maxFiles={1}
                maxSize={5 * 1024 * 1024} // 5MB
                onFilesChange={(files) => setAttachmentFiles(files)}
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  disabled={isPending}
                  onClick={() => {
                    form.reset();
                    setAttachmentFiles([]);
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
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Application
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

export default ApplyForLeaveDialog;
