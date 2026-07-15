import Leave from "@/components/modules/common/leave/Leave";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Leave Management",
  description: "Automated leave requests, approvals, and calendar integration",
};

const LeavePage = () => {
  return <Leave />;
};

export default LeavePage;
