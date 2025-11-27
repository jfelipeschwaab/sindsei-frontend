'use client';

import React, { useEffect, useState } from 'react';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import CalendarComponent from '@/components/CalendarComponent';
import AgendaComponent from '@/components/AgendaComponent';

import { EventType, PendingMeetingType } from '@/app/types/types';

export default function CalendarioPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [pendingMeetings, setPendingMeetings] = useState<PendingMeetingType[]>([]);
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const URL_API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

  // -----------------------------
  // CARREGA EVENTOS DO BACK-END
  // -----------------------------
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${URL_API}/api/events/`);

        if (!response.ok) {
          console.error('Erro ao carregar eventos. Status:', response.status);
          return;
        }

        const data = await response.json();
        console.log('Eventos carregados:', data);

        const formatted: EventType[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          date: item.start,
          hour: new Date(item.start).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          emailId: item.email_doc_id,
          start: new Date(item.start),
          end: new Date(item.end),
          tag: item.tag,
        }));

        setEvents(formatted);
      } catch (error) {
        console.error('Erro ao carregar eventos:', error);
      }
    };

    fetchEvents();
  }, [URL_API]);

  // -----------------------------
  // CARREGA REUNIÕES PENDENTES
  // -----------------------------
  useEffect(() => {
    const fetchPendingMeetings = async () => {
      try {
        const response = await fetch(
          `${URL_API}/api/emails/get-pending-meetings/`
        );

        if (!response.ok) {
          console.error(
            'Erro ao carregar reuniões pendentes. Status:',
            response.status
          );
          return;
        }

        const data: PendingMeetingType[] = await response.json();
        console.log('Reuniões pendentes carregadas:', data);
        setPendingMeetings(data);
      } catch (error) {
        console.error('Erro em fetchPendingMeetings:', error);
      }
    };

    fetchPendingMeetings();
  }, [URL_API]);

  // -----------------------------
  // APROVAR REUNIÃO → CRIA EVENTO
  // -----------------------------
  const handleApproveMeeting = async (meeting: PendingMeetingType) => {
    try {
      const response = await fetch(`${URL_API}/api/emails/approve-meeting/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doc_id: meeting.doc_id }),
      });

      if (!response.ok) {
        console.error('Erro ao aprovar reunião. Status:', response.status);
        return;
      }

      const createdEvent = await response.json();
      console.log('Evento criado a partir da reunião:', createdEvent);

      const newEvent: EventType = {
        id: createdEvent.id,
        title: createdEvent.title,
        date: createdEvent.start,
        hour: new Date(createdEvent.start).toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        emailId: createdEvent.email_doc_id,
        start: new Date(createdEvent.start),
        end: new Date(createdEvent.end),
        tag: createdEvent.tag,
      };

      setEvents((prev) => [...prev, newEvent]);

      setPendingMeetings((prev) =>
        prev.filter((m) => m.doc_id !== meeting.doc_id)
      );
    } catch (error) {
      console.error('Erro em handleApproveMeeting:', error);
    }
  };

  // DATA ATUAL DO CALENDÁRIO
  const currentDate = new Date(year, month, 1);

  // FILTRA EVENTOS DO MÊS SELECIONADO
  const filteredEvents = events.filter((e) => {
    const d = new Date(e.start);
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
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro',
              ].map((m, i) => (
                <option key={i} value={i}>
                  {m}
                </option>
              ))}
            </select>

            <select
              className="border p-2 rounded-full bg-gray-50 border-gray-300 shadow-sm pr-2"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            >
              {Array.from({ length: 6 }, (_, i) => (
                new Date().getFullYear() - 2 + i
              )).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* LAYOUT DO CALENDÁRIO + LADO DIREITO */}
          <div className="grid grid-cols-3 gap-6">
            {/* CALENDÁRIO (2/3) */}
            <div className="col-span-2">
              <CalendarComponent
                events={filteredEvents}
                currentDate={currentDate}
              />
            </div>

            {/* COLUNA DIREITA (AGENDA + REUNIÕES PENDENTES) */}
            <div className="flex flex-col gap-4">
              {/* AGENDA - CAIXA DE CIMA */}
              <AgendaComponent events={filteredEvents} />

              {/* REUNIÕES PENDENTES - CAIXA DE BAIXO */}
              <div className="p-4 border rounded-lg bg-white h-[315px] shadow-sm flex flex-col">
                <h2 className="text-xl font-semibold mb-1">
                  Reuniões Pendentes
                </h2>

                {/* Conteúdo rolável */}
                <div className="mt-2 overflow-y-auto flex-1 pr-1">
                  {pendingMeetings.length === 0 && (
                    <p className="text-gray-500 text-sm">
                      Nenhuma reunião pendente.
                    </p>
                  )}

                  {pendingMeetings.map((meeting) => (
                    <div
                      key={meeting.doc_id}
                      className="border rounded-md p-3 mb-3 shadow-sm bg-gray-50"
                    >
                      <h3 className="font-semibold text-sm mb-1">
                        {meeting.titulo}
                      </h3>

                      <p className="text-xs text-gray-600">
                        <strong>Início:</strong>{' '}
                        {new Date(meeting.data_inicio).toLocaleString('pt-BR')}
                      </p>
                      <p className="text-xs text-gray-600 mb-1">
                        <strong>Fim:</strong>{' '}
                        {new Date(meeting.data_fim).toLocaleString('pt-BR')}
                      </p>

                      {meeting.tem_conflito && (
                        <p className="text-xs text-red-500 mb-1">
                          ⚠ Esta reunião tem conflito de horário.
                        </p>
                      )}

                      <button
                        onClick={() => handleApproveMeeting(meeting)}
                        className="mt-2 text-xs px-3 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Agendar no calendário
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* fim grid */}
        </div>
      </div>
    </div>
  );
}
