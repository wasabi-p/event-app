import supabase from "@/lib/supabase";
import { Event } from "@/utils/types";

export const getEventsList = async () => {
  const { data, error } = await supabase.from("events").select();
  if (error) {
    console.error("Error fetching events", error);
  }
  return data as Event[];
};
