"use client";

import React from "react";
import { RangeCalendar } from "@heroui/react";
import { today, getLocalTimeZone } from "@internationalized/date";

export const CalendarioRange  = () => {
  const defaultDate = today(getLocalTimeZone());
  const [focusedDate, setFocusedDate] = React.useState(defaultDate);

  return (
    <RangeCalendar
      aria-label="Rango de fechas"
      focusedValue={focusedDate}
      onFocusChange={setFocusedDate}
    />
  );
};
