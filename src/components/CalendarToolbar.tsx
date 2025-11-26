'use client';

import React from 'react';

type ToolbarProps = {
  month: number;
  year: number;
  onMonthChange: (value: number) => void;
  onYearChange: (value: number) => void;
};

export default function CalendarToolbar({ month, year, onMonthChange, onYearChange }: ToolbarProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      
      <div className="flex gap-3">
        <select
          value={month}
          onChange={(e) => onMonthChange(Number(e.target.value))}
          className="border rounded p-2"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i} value={i}>
              {new Date(2024, i).toLocaleString('pt-BR', { month: 'long' })}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => onYearChange(Number(e.target.value))}
          className="border rounded p-2"
        >
          {Array.from({ length: 5 }).map((_, i) => {
            const y = 2023 + i;
            return <option key={y} value={y}>{y}</option>;
          })}
        </select>
      </div>

    </div>
  );
}
