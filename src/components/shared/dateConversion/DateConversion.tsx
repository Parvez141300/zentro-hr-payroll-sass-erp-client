import React from "react";
import { format } from "date-fns";

interface DateProps {
  date: string | Date;
  formatString?: string;
}

const DateConversion = ({ date, formatString }: DateProps) => {
  if (!date) {
    return <span className="text-sm text-muted-foreground">-</span>;
  }

  const formatDate = format(new Date(date), formatString || "dd MMM yyyy");
  return <span className="text-sm text-muted-foreground">{formatDate}</span>;
};

export default DateConversion;
