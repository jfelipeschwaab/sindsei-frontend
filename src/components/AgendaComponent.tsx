'use client';

import React from "react";
import { EventType } from "@/app/types/types";

export default function AgendaComponent({ events }: { events: EventType[] }) {
  return (
    <div className="p-4 border rounded-lg bg-white h-[650px] overflow-y-auto shadow-sm">
      <h2 className="text-xl font-semibold mb-3">Agenda</h2>

      {events.length === 0 && (
        <p className="text-gray-500">Nenhum evento neste mês.</p>
      )}

      {events.map((event) => (
        <div
          key={event.id}
          className="border rounded-md p-3 mb-3 shadow-sm bg-gray-50"
        >
          <h3 className="font-semibold">{event.title}</h3>

          <p className="text-sm text-gray-600 mt-1">
            <strong>Data:</strong> {event.date}
          </p>

          <p className="text-sm text-gray-600">
            <strong>Horário:</strong> {event.hour}
          </p>

          <a
            href={`/emails/${event.emailId}`}
            className="text-blue-600 underline text-sm mt-2 inline-block"
          >
            Ver e-mail completo
          </a>
        </div>
      ))}
    </div>
  );
}
