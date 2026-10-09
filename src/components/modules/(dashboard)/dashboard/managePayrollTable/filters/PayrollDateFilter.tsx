"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const PayrollDateFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial values from URL query params
  const initialStartDate = searchParams.get("startDate") || "";
  const initialEndDate = searchParams.get("endDate") || "";

  const [date, setDate] = useState<DateRange | undefined>(() => {
    if (initialStartDate && initialEndDate) {
      return {
        from: new Date(initialStartDate),
        to: new Date(initialEndDate),
      };
    }
    if (initialStartDate) {
      return { from: new Date(initialStartDate), to: undefined };
    }
    return undefined;
  });

  // Update URL when selection changes
  const handleDateChange = (range: DateRange | undefined) => {
    setDate(range);

    // Create new URLSearchParams from current params
    const params = new URLSearchParams(searchParams.toString());

    if (range?.from) {
      params.set("startDate", format(range.from, "yyyy-MM-dd"));
    } else {
      params.delete("startDate");
    }

    if (range?.to) {
      params.set("endDate", format(range.to, "yyyy-MM-dd"));
    } else {
      params.delete("endDate");
    }

    // Navigate to the new URL
    const queryString = params.toString();
    const url = queryString ? `?${queryString}` : window.location.pathname;
    router.push(url);
  };

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className="justify-start px-2.5 font-normal w-60"
          >
            <CalendarIcon data-icon="inline-start" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
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
          defaultMonth={date?.from}
          selected={date}
          onSelect={handleDateChange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
};

export default PayrollDateFilter;
