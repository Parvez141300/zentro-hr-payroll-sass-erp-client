import Payroll from "@/components/modules/common/payroll/Payroll";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Payroll Process",
  description:
    "Automated payroll processing with tax calculations and direct deposit",
};

const PayrollPage = () => {
  return <Payroll />;
};

export default PayrollPage;
