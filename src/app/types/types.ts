export type Email = {
  date: string;
  meetings: string;
  sender: string;
  subject: string;
  summary: string;
  tag: string;
};

export type EventType = {
  id: number;
  title: string;
  date: string;
  hour: string;
  emailId: number;
  tag: string;
  start: Date;
  end: Date;
};

