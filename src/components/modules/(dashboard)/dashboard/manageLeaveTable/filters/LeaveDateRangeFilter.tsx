"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function LeaveDateRangeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialStartDate = searchParams.get("startDate");
  const initialEndDate = searchParams.get("endDate");

  const getInitialDateRange = (): DateRange | undefined => {
    if (initialStartDate && initialEndDate) {
      return {
        from: new Date(initialStartDate),
        to: new Date(initialEndDate),
      };
    }
    return {
      from: addDays(new Date(), -30),
      to: new Date(),
    };
  };

  const [date, setDate] = React.useState<DateRange | undefined>(
    getInitialDateRange(),
  );

  const handleDateSelect = (newDate: DateRange | undefined) => {
    setDate(newDate);

    const params = new URLSearchParams(searchParams.toString());

    if (newDate?.from && newDate?.to) {
      params.set("startDate", format(newDate.from, "yyyy-MM-dd"));
      params.set("endDate", format(newDate.to, "yyyy-MM-dd"));
    } else {
      params.delete("startDate");
      params.delete("endDate");
    }

    const queryString = params.toString();
    const url = queryString ? `?${queryString}` : window.location.pathname;
    router.push(url);
  };

  return (
    <Field className="mx-auto w-60">
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              id="date-picker-range"
              className="justify-start px-2.5 font-normal"
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
                <span>Pick a date</span>
              )}
            </Button>
          }
        ></PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}

export default LeaveDateRangeFilter;
