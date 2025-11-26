'use client';

import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventType } from '@/app/types/types';

const locales = { 'pt-BR': ptBR };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

type Props = {
  events: EventType[];
  currentDate: Date;
};

export default function CalendarComponent({ events, currentDate }: Props) {
  return (
    <div className="border border-gray-300 rounded-lg p-2 bg-white">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={currentDate}
        onNavigate={() => {}}
        style={{ height: 650 }}
        views={['month']}
        toolbar={false}
        popup
      />
    </div>
  );
}
