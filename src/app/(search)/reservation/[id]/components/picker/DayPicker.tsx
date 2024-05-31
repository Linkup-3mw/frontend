import {
  parseISO,
  isSameDay,
  format,
  differenceInDays,
  addDays,
} from 'date-fns';
import { DayPicker, DateRange } from 'react-day-picker';
import React, { useState } from 'react';
interface RangePickerProps {
  startDate?: string;
  endDate?: string;
  onChange: (dateRange: { from?: string; to?: string; nights: number }) => void;
}
export default function Day({
  startDate,
  endDate,
  onChange,
}: RangePickerProps) {
  const handleDayClick = (dateRange: DateRange | undefined) => {
    if (dateRange == null) {
      return;
    }

    const { from, to } = dateRange;

    // 1. 중복된 날짜
    if (from && to && isSameDay(from, to)) {
      return;
    }

    onChange({
      from: from != null ? format(from, 'yyyy-MM-dd') : undefined,
      to: to != null ? format(to, 'yyyy-MM-dd') : undefined,
      nights: from && to ? differenceInDays(to, from) : 0,
    });
  };

  const selected = {
    from: startDate != null ? parseISO(startDate) : undefined,
    to: endDate != null ? parseISO(endDate) : undefined,
  };

  return (
    <DayPicker mode="range" onSelect={handleDayClick} selected={selected} />
  );
}
