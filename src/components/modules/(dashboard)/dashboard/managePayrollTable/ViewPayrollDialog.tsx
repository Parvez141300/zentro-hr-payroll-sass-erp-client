"use client";

import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Loader2, Building2 } from "lucide-react";
import { format } from "date-fns";
import { IPayroll } from "@/types/payroll.type";
import { SalaryType, PayrollStatus } from "@/types/enums.type";
import { toast } from "sonner";

interface IPayrollInvoiceDialogProps {
  payrollData: IPayroll | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ViewPayrollDialog = ({
  payrollData,
  open,
  onOpenChange,
}: IPayrollInvoiceDialogProps) => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!payrollData) return null;

  const formatDate = (date: Date | string | null) => {
    if (!date) return "N/A";
    return format(new Date(date), "PPP");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusLabel = (status: PayrollStatus) => {
    return status
      .replace("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const handleDownloadPdf = async () => {
    if (!invoiceRef.current) return;

    setIsDownloading(true);
    try {
      // Lazy load html2pdf only when needed
      const html2pdf = (await import("html2pdf.js")).default;

      const element = invoiceRef.current;

      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number], // inches
        filename: `Payroll_${payrollData.employee?.name || "Employee"}_${payrollData.month || format(new Date(payrollData.periodStart), "MMM_yyyy")}.pdf`,
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "portrait" as "portrait" | "landscape" | undefined,
        },
      };

      await html2pdf().set(opt).from(element).save();
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF generation failed:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Payroll Invoice</DialogTitle>
        </DialogHeader>

        {/* Invoice Content Wrapper */}
        <div className="p-6 pt-0">
          <div
            ref={invoiceRef}
            className="bg-white text-black p-8 rounded-lg border shadow-sm"
            // Force white background for PDF generation
            style={{ color: "#000", backgroundColor: "#fff" }}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-8 border-b pb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="h-8 w-8 text-black" />
                  <h1 className="text-2xl font-bold uppercase tracking-wider">
                    {payrollData.company?.name || "Zentro HR"}
                  </h1>
                </div>
                <p className="text-sm text-gray-600">
                  {payrollData.company?.address || "123 Corporate Avenue"}
                  <br />
                  {payrollData.company?.phone || "+880 1234 567890"}
                </p>
              </div>
              <div className="text-right">
                <h2 className="text-3xl font-light text-gray-400">PAYSLIP</h2>
                <p className="font-mono text-sm mt-2">
                  #{payrollData.id.slice(-8).toUpperCase()}
                </p>
              </div>
            </div>

            {/* Employee & Period Info */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xs font-bold uppercase text-gray-500 mb-2">
                  Employee Details
                </h3>
                <p className="font-semibold text-lg">
                  {payrollData.employee?.name || "Unknown"}
                </p>
                <p className="text-sm text-gray-600">
                  {payrollData.employee?.employeeCode || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  {payrollData.employee?.designation?.title || "Employee"}
                </p>
              </div>
              <div className="text-right">
                <h3 className="text-xs font-bold uppercase text-gray-500 mb-2">
                  Payroll Period
                </h3>
                <p className="font-semibold">
                  {formatDate(payrollData.periodStart)} -{" "}
                  {formatDate(payrollData.periodEnd)}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Type: {payrollData.salaryType}
                </p>
                <p className="text-sm text-gray-600">
                  Status: {getStatusLabel(payrollData.status)}
                </p>
              </div>
            </div>

            {/* Work Summary (Conditional for Daily/Hourly) */}
            {(payrollData.salaryType === SalaryType.DAILY ||
              payrollData.salaryType === SalaryType.HOURLY) && (
              <div className="mb-8 bg-gray-50 p-4 rounded border border-gray-200">
                <h3 className="text-xs font-bold uppercase text-gray-500 mb-2">
                  Work Summary
                </h3>
                <div className="flex gap-8 text-sm">
                  <div>
                    <span className="text-gray-500">Total Days:</span>{" "}
                    <span className="font-semibold">
                      {payrollData.totalDays}
                    </span>
                  </div>
                  {payrollData.salaryType === SalaryType.HOURLY && (
                    <div>
                      <span className="text-gray-500">Total Hours:</span>{" "}
                      <span className="font-semibold">
                        {payrollData.totalHours}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Earnings & Deductions Table */}
            <div className="mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="text-left py-2 font-bold uppercase text-xs">
                      Description
                    </th>
                    <th className="text-right py-2 font-bold uppercase text-xs">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Earnings */}
                  <tr className="border-b border-gray-200">
                    <td className="py-2">Basic Salary</td>
                    <td className="text-right py-2">
                      {formatCurrency(payrollData.basicSalary)}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2">House Allowance</td>
                    <td className="text-right py-2">
                      {formatCurrency(payrollData.houseAllowance)}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2">Medical Allowance</td>
                    <td className="text-right py-2">
                      {formatCurrency(payrollData.medicalAllowance)}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2">Transport Allowance</td>
                    <td className="text-right py-2">
                      {formatCurrency(payrollData.transportAllowance)}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2">Overtime Pay</td>
                    <td className="text-right py-2">
                      {formatCurrency(payrollData.overtimePay)}
                    </td>
                  </tr>

                  {/* Gross Total */}
                  <tr className="border-b-2 border-black bg-gray-50">
                    <td className="py-2 font-bold">Gross Salary</td>
                    <td className="text-right py-2 font-bold">
                      {formatCurrency(payrollData.grossSalary)}
                    </td>
                  </tr>

                  {/* Deductions */}
                  <tr className="border-b border-gray-200">
                    <td className="py-2 text-red-600">Tax Deduction</td>
                    <td className="text-right py-2 text-red-600">
                      -{formatCurrency(payrollData.taxDeduction)}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 text-red-600">PF Deduction</td>
                    <td className="text-right py-2 text-red-600">
                      -{formatCurrency(payrollData.pfDeduction)}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 text-red-600">Other Deductions</td>
                    <td className="text-right py-2 text-red-600">
                      -{formatCurrency(payrollData.otherDeductions)}
                    </td>
                  </tr>
                  <tr className="border-b-2 border-black bg-gray-50">
                    <td className="py-2 font-bold text-red-600">
                      Total Deductions
                    </td>
                    <td className="text-right py-2 font-bold text-red-600">
                      -{formatCurrency(payrollData.totalDeductions)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Net Pay Highlight */}
            <div className="flex justify-between items-center border-2 border-black p-4 mb-8">
              <span className="text-lg font-bold uppercase">Net Payable</span>
              <span className="text-2xl font-bold">
                {formatCurrency(payrollData.netSalary)}
              </span>
            </div>

            {/* Footer */}
            <div className="text-xs text-gray-500 text-center mt-8 pt-4 border-t border-gray-200">
              <p>
                This is a computer-generated payslip. No signature is required.
              </p>
              <p className="mt-1">Generated on {formatDate(new Date())}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 pt-2 border-t flex sm:justify-between items-center">
          <DialogClose render={<Button variant="outline">Close</Button>} />
          <Button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="gap-2"
          >
            {isDownloading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {isDownloading ? "Downloading..." : "Download PDF"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewPayrollDialog;
