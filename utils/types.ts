export type Event = {
  event_id: number;
  event_name: string;
  venue: string;
  img: string;
  event_date: string;
  start_time: string;
  finish_time: string;
  description: string;
  created_at: string;
  event_organiser: string;
};

export type Profile = {
  id: number;
  first_name: string;
  surname: string;
  email: string;
};

export type UserIdResponse = string | null

export type DatePickerParams = {
  date: Date | null;
};
