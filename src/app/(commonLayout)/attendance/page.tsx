import Attendance from "@/components/modules/common/attendance/Attendance";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Attendance Tracking",
  description:
    "Real-time attendance tracking with biometric integration, mobile check-in, and automated reports",
};

const AttendancePage = () => {
  return <Attendance />;
};

export default AttendancePage;
