import HrAttendanceStats from "@/components/modules/(dashboard)/hrManagerDashboard/statistics/HrAttendanceStats";
import HrLeaveStats from "@/components/modules/(dashboard)/hrManagerDashboard/statistics/HrLeaveStats";
import HrPayrollStats from "@/components/modules/(dashboard)/hrManagerDashboard/statistics/HrPayrollStats";
import React from "react";

const HrManagerDashboard = () => {
  return (
    <div className="space-y-10">
      <HrAttendanceStats />
      <HrLeaveStats />
      <HrPayrollStats />
    </div>
  );
};

export default HrManagerDashboard;
