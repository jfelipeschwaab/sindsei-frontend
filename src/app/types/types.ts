// src/app/types/types.ts

// Tipagem dos emails retornados por GET /api/emails/get-emails/
export type Email = {
  date: string;
  meetings: string;
  sender: string;
  subject: string;
  summary: string;
  tag: string;
};

// Tipagem dos eventos usados no calendário e na agenda
export type EventType = {
  id: number | string;
  title: string;
  date: string;        // usamos a string ISO de start
  hour: string;        // ex: "14:30"
  emailId?: string | null;
  start: Date;
  end: Date;
  tag?: string | null;
};

// Tipagem das reuniões pendentes retornadas por GET /api/emails/get-pending-meetings/
export type PendingMeetingType = {
  doc_id: string;
  titulo: string;
  data_inicio: string;   // ISO vindo do Firestore
  data_fim: string;      // ISO vindo do Firestore
  status: string;
  tem_conflito: boolean;
};
