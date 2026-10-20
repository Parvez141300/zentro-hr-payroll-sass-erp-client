"use client";

import React, { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { Field, FieldLabel } from "@/components/ui/field";

// ✅ Import your reusable component
import AppSelectField from "@/components/shared/form/AppSelectField";

import { updateEmployeePayroll } from "@/actions/payroll.action";
import { updatePayrollSchema } from "@/zod/payroll.validation";
import { IPayroll, IUpdateEmployeePayroll } from "@/types/payroll.type";
import { PayrollStatus } from "@/types/enums.type";

interface EditPayrollDialogProps {
  payrollData: IPayroll | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditPayrollDialog = ({
  payrollData,
  open,
  onOpenChange,
}: EditPayrollDialogProps) => {
  const queryClient = useQueryClient();

  // TanStack Form setup
  const form = useForm({
    defaultValues: {
      month: payrollData?.month?.toString() || null,
      year: payrollData?.year?.toString() || null,
      periodStart: payrollData?.periodStart
        ? new Date(payrollData.periodStart)
        : new Date(),
      periodEnd: payrollData?.periodEnd
        ? new Date(payrollData.periodEnd)
        : new Date(),
      status: payrollData?.status || PayrollStatus.DRAFT,
      paidAt: payrollData?.paidAt ? new Date(payrollData.paidAt) : null,
    },
    validators: {
      onChange: updatePayrollSchema,
    },
    onSubmit: ({ value }) => {
      if (!payrollData) return;
      mutate(value);
    },
  });

  // Reset form when data changes (dialog opens)
  useEffect(() => {
    if (payrollData && open) {
      form.reset({
        month: payrollData.month?.toString() || null,
        year: payrollData.year?.toString() || null,
        periodStart: new Date(payrollData.periodStart),
        periodEnd: new Date(payrollData.periodEnd),
        status: payrollData.status,
        paidAt: payrollData.paidAt ? new Date(payrollData.paidAt) : null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payrollData, open]);

  // Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: IUpdateEmployeePayroll) => {
      if (!payrollData) throw new Error("No payroll selected");
      if (!data.periodStart || !data.periodEnd) {
        throw new Error("Payroll period dates are required");
      }

      const payload = {
        month: data.month || undefined,
        year: data.year || undefined,
        periodStart: new Date(data.periodStart).toISOString(),
        periodEnd: new Date(data.periodEnd).toISOString(),
        status: data.status,
        paidAt: data.paidAt,
      };

      return await updateEmployeePayroll(payrollData.id, payload);
    },
    onSuccess: () => {
      toast.success("Payroll updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["companyPayrolls"] });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update payroll");
    },
  });

  if (!payrollData) return null;

  // Options
  const statusOptions = [
    { value: PayrollStatus.DRAFT, label: "Draft" },
    { value: PayrollStatus.APPROVED, label: "Approved" },
    { value: PayrollStatus.PAID, label: "Paid" },
    { value: PayrollStatus.CANCELLED, label: "Cancelled" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Payroll</DialogTitle>
          <DialogDescription>
            Update the payroll period, status, and payment details.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4 py-4"
        >
          {/* 1. Status Field (Using AppSelectField) */}
          <form.Field name="status">
            {(field) => (
              <AppSelectField
                field={field}
                label="Status *"
                placeholder="Select status"
                options={statusOptions}
              />
            )}
          </form.Field>

          {/* 2. Period Date Range */}
          <form.Field name="periodStart">
            {(startField) => (
              <form.Field name="periodEnd">
                {(endField) => {
                  const dateRange: DateRange | undefined = {
                    from: startField.state.value,
                    to: endField.state.value,
                  };

                  const handleRangeSelect = (range: DateRange | undefined) => {
                    startField.handleChange(range?.from || new Date());
                    endField.handleChange(range?.to || new Date());
                  };

                  return (
                    <Field className="w-full">
                      <FieldLabel htmlFor="date-picker-range">
                        Payroll Period (Date Range) *
                      </FieldLabel>
                      <Popover>
                        <PopoverTrigger
                          render={
                            <Button
                              variant="outline"
                              id="date-picker-range"
                              className="w-full justify-start px-2.5 font-normal"
                            >
                              <CalendarIcon data-icon="inline-start" />
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
                    </Field>
                  );
                }}
              </form.Field>
            )}
          </form.Field>

          {/* 3. Month & Year (Legacy/Backward compatibility) */}
          <div className="grid grid-cols-2 gap-4">
            <form.Field name="month">
              {(field) => (
                <div className="space-y-2">
                  <Label>Month</Label>
                  <Select
                    value={field.state.value || undefined}
                    onValueChange={(val) => field.handleChange(val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => {
                        const val = (i + 1).toString();
                        const label = new Date(0, i).toLocaleString("en-US", {
                          month: "long",
                        });
                        return (
                          <SelectItem key={val} value={val}>
                            {label}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </form.Field>

            <form.Field name="year">
              {(field) => (
                <div className="space-y-2">
                  <Label>Year</Label>
                  <Select
                    value={field.state.value || undefined}
                    onValueChange={(val) => field.handleChange(val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 5 }, (_, i) => {
                        const val = (
                          new Date().getFullYear() -
                          2 +
                          i
                        ).toString();
                        return (
                          <SelectItem key={val} value={val}>
                            {val}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </form.Field>
          </div>

          {/* 4. Paid At Date (Only if Status is PAID) */}
          {form.state.values.status === PayrollStatus.PAID && (
            <form.Field name="paidAt">
              {(field) => (
                <Field className="w-full">
                  <FieldLabel htmlFor="paid-at">Payment Date *</FieldLabel>
                  <Popover>
                    <PopoverTrigger
                      render={
                        <Button
                          variant="outline"
                          id="paid-at"
                          className="w-full justify-start px-2.5 font-normal"
                        >
                          <CalendarIcon data-icon="inline-start" />
                          {field.state.value ? (
                            format(field.state.value, "LLL dd, y")
                          ) : (
                            <span>Select payment date</span>
                          )}
                        </Button>
                      }
                    />
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.state.value || undefined}
                        onSelect={(date) => field.handleChange(date || null)}
                      />
                    </PopoverContent>
                  </Popover>
                </Field>
              )}
            </form.Field>
          )}

          <DialogFooter className="pt-4 border-t">
            <DialogClose
              render={
                <Button type="button" variant="outline" disabled={isPending}>
                  Cancel
                </Button>
              }
            />
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

export default EditPayrollDialog;
