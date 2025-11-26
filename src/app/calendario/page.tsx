'use client';

import React, { useEffect, useState } from 'react';

// IMPORTS CORRETOS PARA SUA ESTRUTURA
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import CalendarComponent from '@/components/CalendarComponent';
import AgendaComponent from '@/components/AgendaComponent';

import { EventType } from '@/app/types/types';

export default function CalendarioPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const URL_API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  // -----------------------------
  // CARREGA EVENTOS DO BACK-END
  // -----------------------------
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${URL_API}/api/events/`);
        const data = await response.json();

        const formatted = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          date: item.date,
          hour: item.hour,
          emailId: item.emailId,
          start: new Date(item.date),
          end: new Date(item.date),
          tag: item.tag,
        }));

        setEvents(formatted);
      } catch (error) {
        console.error('Erro ao carregar eventos:', error);
      }
    };

    fetchEvents();
  }, []);

  // DATA ATUAL DO CALENDÁRIO
  const currentDate = new Date(year, month, 1);

  // FILTRA EVENTOS DO MÊS SELECIONADO
  const filteredEvents = events.filter((e) => {
    const d = new Date(e.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header searchTerm="" onSearchChange={() => {}} />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 p-6">
          
          <h1 className="text-2xl font-semibold mb-4">Calendário</h1>

          {/* FILTROS */}
          <div className="flex space-x-4 mb-5">
            <select
              className="border p-2 rounded-full bg-gray-50 border-gray-300 shadow-sm pr-2"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
            >
              {[
                'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
              ].map((m, i) => (
                <option key={i} value={i}>{m}</option>
              ))}
            </select>

            <select
              className="border p-2 rounded-full bg-gray-50 border-gray-300 shadow-sm  pr-2"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            >
              {Array.from({ length: 6 }, (_, i) => (
                new Date().getFullYear() - 2 + i
              )).map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* LAYOUT DO CALENDÁRIO + AGENDA */}
          <div className="grid grid-cols-3 gap-6">
            
            {/* CALENDÁRIO */}
            <div className="col-span-2">
              <CalendarComponent
                events={filteredEvents}
                currentDate={currentDate}
              />
            </div>

            {/* AGENDA */}
            <AgendaComponent events={filteredEvents} />

          </div>
        </div>
      </div>
    </div>
  );
}
