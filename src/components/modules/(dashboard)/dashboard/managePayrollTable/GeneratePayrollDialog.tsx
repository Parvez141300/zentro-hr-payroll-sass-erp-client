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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { generateCompanyPayroll } from "@/actions/payroll.action";
import { IGeneratePayroll } from "@/types/payroll.type";

const GeneratePayrollDialog = () => {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const payload: IGeneratePayroll = {
        month: parseInt(month),
        year: parseInt(year),
      };
      return await generateCompanyPayroll(payload);
    },
    onSuccess: () => {
      toast.success("Payroll generated successfully");
      queryClient.invalidateQueries({ queryKey: ["companyPayrolls"] });
      setOpen(false);
      setMonth("");
      setYear("");
    },
    onError: (err) => {
      toast.error(
        (err instanceof Error && err?.message) || "Failed to generate payroll",
      );
    },
  });

  // Generate month options
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

  // Generate year options (10 years back and 1 year forward)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 12 }, (_, i) => ({
    value: (currentYear - 10 + i).toString(),
    label: (currentYear - 10 + i).toString(),
  }));

  const isFormValid = month && year;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Generate Payroll
          </Button>
        }
      ></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Payroll</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Month Selection */}
          <div className="space-y-1.5">
            <Label htmlFor="month">Month *</Label>
            <Select
              value={month}
              onValueChange={(value: string | null) => setMonth(value || "")}
            >
              <SelectTrigger id="month" className="w-full">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {monthOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year Selection */}
          <div className="space-y-1.5">
            <Label htmlFor="year">Year *</Label>
            <Select
              value={year}
              onValueChange={(value: string | null) => setYear(value || "")}
            >
              <SelectTrigger id="year" className="w-full">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {yearOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <DialogClose
            render={
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setMonth("");
                  setYear("");
                }}
              >
                Cancel
              </Button>
            }
          ></DialogClose>
          <Button onClick={() => mutate()} disabled={isPending || !isFormValid}>
            {isPending ? "Generating..." : "Generate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GeneratePayrollDialog;
