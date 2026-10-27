"use client";

import React, { useMemo, useState, useEffect } from "react";
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

import { FileUpload } from "@/components/shared/uploadFile/FileUpload";
import { FileWithPreview } from "@/hooks/use-file-upload";

import { getCompanyLeaveTypes } from "@/actions/leaveType.action";
import { updateForEmployeeLeave } from "@/actions/leave.action";
import { ILeaveType } from "@/types/leaveType.type";
import { ILeave } from "@/types/leave.type";
import {
  updateLeaveSchema,
  UpdateLeaveFormValues,
} from "@/zod/leave.validation";

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
      leaveTypeId: leaveData?.leaveTypeId || "",
      startDate: leaveData?.startDate ? new Date(leaveData.startDate) : null,
      endDate: leaveData?.endDate ? new Date(leaveData.endDate) : null,
      reason: leaveData?.reason || "",
    } as UpdateLeaveFormValues,
    validators: {
      onChange: updateLeaveSchema,
    },
    onSubmit: ({ value }) => {
      if (!leaveData) return;

      const formData = new FormData();
      const info: Record<string, unknown> = {};

      if (value.leaveTypeId && value.leaveTypeId !== leaveData.leaveTypeId) {
        info.leaveTypeId = value.leaveTypeId;
      }

      if (
        value.startDate &&
        value.startDate.toISOString() !==
          new Date(leaveData.startDate).toISOString()
      ) {
        info.startDate = value.startDate.toISOString();
      }

      if (
        value.endDate &&
        value.endDate.toISOString() !==
          new Date(leaveData.endDate).toISOString()
      ) {
        info.endDate = value.endDate.toISOString();
      }

      if (value.reason && value.reason !== leaveData.reason) {
        info.reason = value.reason;
      }

      if (Object.keys(info).length === 0 && attachmentFiles.length === 0) {
        toast.info("No changes were made.");
        return;
      }

      formData.append("data", JSON.stringify({ info }));

      if (
        attachmentFiles.length > 0 &&
        attachmentFiles[0].file instanceof File
      ) {
        formData.append("file", attachmentFiles[0].file);
      }

      mutate(formData);
    },
  });

  // ✅ Only reset form on data change — no setState inside effect
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
    mutationFn: async (formData: FormData) => {
      if (!leaveData) throw new Error("No leave selected");
      return await updateForEmployeeLeave(leaveData.id, formData);
    },
    onSuccess: () => {
      toast.success("Leave updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["companyEmployeeLeaves"] });
      setAttachmentFiles([]);
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update leave");
    },
  });

  // ✅ Reset file state when dialog closes
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setAttachmentFiles([]);
    }
    onOpenChange(isOpen);
  };

  if (!leaveData) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
          {/* 1. Leave Type */}
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
                    startField.handleChange(range?.from || null);
                    endField.handleChange(range?.to || null);
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

          {/* 3. Reason */}
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

          {/* 4. File Upload */}
          <div className="space-y-1.5">
            <Label>Attachment (Optional)</Label>
            {leaveData.attachmentUrl && (
              <p className="text-xs text-muted-foreground">
                Current:{" "}
                <a
                  href={leaveData.attachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  {leaveData.attachmentUrl.split("/").pop()}
                </a>
              </p>
            )}
            <div className="border rounded-lg p-4 bg-muted/20">
              <FileUpload
                maxFiles={1}
                maxSize={5 * 1024 * 1024}
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
