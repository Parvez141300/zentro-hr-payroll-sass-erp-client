"use client";

import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Play } from "lucide-react";
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
import { Field, FieldLabel } from "@/components/ui/field"; // ✅ Imported Shadcn Field components

import { generateEmployeePayroll } from "@/actions/payroll.action";
import {
  GeneratePayrollFormValues,
  generatePayrollSchema,
} from "@/zod/payroll.validation";
import { IGenerateEmployeePayroll } from "@/types/payroll.type";
import { SalaryType } from "@/types/enums.type";

interface GenerateEmployeePayrollDialogProps {
  employeeId: string;
  salaryType: SalaryType;
}

const GenerateEmployeePayrollDialog = ({
  employeeId,
  salaryType,
}: GenerateEmployeePayrollDialogProps) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const currentDate = new Date();

  // TanStack Form setup
  const form = useForm({
    defaultValues: {
      employeeId: employeeId,
      salaryType: salaryType,
      month: (currentDate.getMonth() + 1).toString(),
      year: currentDate.getFullYear().toString(),
      periodStart: undefined,
      periodEnd: undefined,
    } as GeneratePayrollFormValues, // ✅ Tell TS "Trust my Zod schema"
    validators: {
      onChange: generatePayrollSchema,
    },
    onSubmit: ({ value }) => {
      if (salaryType !== "MONTHLY") {
        if (!value.periodStart || !value.periodEnd) {
          toast.error("Please select a full date range.");
          return;
        }
      }
      mutate(value);
    },
  });

  // Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: IGenerateEmployeePayroll) => {
      if (salaryType === SalaryType.MONTHLY) {
        return await generateEmployeePayroll({
          employeeId: data.employeeId,
          month: String(data.month),
          year: String(data.year),
        });
      } else {
        if (!data.periodStart || !data.periodEnd) {
          throw new Error("Please select a full date range.");
        }

        return await generateEmployeePayroll({
          employeeId: data.employeeId,
          periodStart: new Date(data.periodStart).toISOString(),
          periodEnd: new Date(data.periodEnd).toISOString(),
        });
      }
    },
    onSuccess: () => {
      toast.success("Payroll generated successfully!");
      queryClient.invalidateQueries({ queryKey: ["companyPayrolls"] });
      setOpen(false);
      form.reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to generate payroll");
    },
  });

  // Options
  const monthOptions = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 5 }, (_, i) => {
    const y = (currentYear - 2 + i).toString();
    return { value: y, label: y };
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm" className="gap-2">
            <Play className="h-4 w-4" />
            Generate
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Generate Payroll</DialogTitle>
          <DialogDescription>
            Generate payroll for this employee based on their salary type:{" "}
            <strong className="text-foreground">{salaryType}</strong>.
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
          {/* ========================================= */}
          {/* MONTHLY INPUTS */}
          {/* ========================================= */}
          {salaryType === "MONTHLY" && (
            <div className="grid grid-cols-2 gap-4">
              <form.Field name="month">
                {(field) => (
                  <div className="space-y-2">
                    <Label>Month *</Label>
                    <Select
                      value={field.state.value}
                      onValueChange={(val) => field.handleChange(val as string)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        {monthOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </form.Field>

              <form.Field name="year">
                {(field) => (
                  <div className="space-y-2">
                    <Label>Year *</Label>
                    <Select
                      value={field.state.value}
                      onValueChange={(val) => field.handleChange(val as string)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {yearOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </form.Field>
            </div>
          )}

          {/* ========================================= */}
          {/* DAILY / HOURLY INPUTS (Shadcn Date Picker) */}
          {/* ========================================= */}
          {(salaryType === "DAILY" || salaryType === "HOURLY") && (
            <form.Field name="periodStart">
              {(startField) => (
                <form.Field name="periodEnd">
                  {(endField) => {
                    const dateRange: DateRange | undefined =
                      startField.state.value || endField.state.value
                        ? {
                            from: startField.state.value,
                            to: endField.state.value,
                          }
                        : undefined;

                    const handleRangeSelect = (
                      range: DateRange | undefined,
                    ) => {
                      startField.handleChange(range?.from);
                      endField.handleChange(range?.to);
                    };

                    // ✅ Using Shadcn Field component exactly as requested
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
                              disabled={(date) => date > new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                        <p className="text-xs text-muted-foreground mt-1.5">
                          The payroll will be calculated based on attendance
                          records within this range.
                        </p>
                      </Field>
                    );
                  }}
                </form.Field>
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
                      Generating...
                    </>
                  ) : (
                    "Generate Payroll"
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

export default GenerateEmployeePayrollDialog;
