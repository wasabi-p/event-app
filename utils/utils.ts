import supabase from "@/lib/supabase";
import { Event, UserIdResponse } from "@/utils/types";
import { Alert } from "react-native";

export const getEventsList = async () => {
  const { data, error } = await supabase.from("events").select();
  if (error) {
    console.error("Error fetching events", error);
  }
  return data as Event[];
};

export const getMyEventsList = async (userId: string) => {
  const { data, error } = await supabase
    .from("events")
    .select()
    .eq("event_organiser", userId);
  if (error) {
    console.error("Error fetching my events", error);
  }
  return data as Event[];
};

export const getEventDetails = async (event_id: number) => {
  const { data, error } = await supabase
    .from("events")
    .select()
    .eq("event_id", event_id)
    .single();
  if (error) {
    console.error("Error fetching event details", error);
  }
  return data as Event;
};

export const fetchUserId = async (): Promise<UserIdResponse> => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (!user?.id) {
    console.log("no user ID found");
    return null;
  }
  if (error) {
    console.error("Error fetching user:", error);
    return null;
  }
  return user.id;
};

export const getProfile = async (id: string) => {
  const { data, error, status } = await supabase
    .from("profiles")
    .select(`display_name, email`)
    .eq("user_id", id)
    .single();

  if (error) {
    if (status !== 406) {
      console.error("Error fetching profile", error);
    }
    Alert.alert("Error", error.message);
    return null;
  }

  return data || null;
};

export const updateEventDetails = async (
  event_id: number,
  updatedDetails: {
    event_name: string;
    venue: string;
    event_date: string;
    start_time: string;
    description: string;
  }
) => {
  const { error } = await supabase
    .from("events")
    .update(updatedDetails)
    .eq("event_id", event_id);

  if (error) {
    console.error("Error updating event details:", error);
    throw new Error(error.message);
  }
  return true;
};

export const selectMyAttendingList = async (userId: string) => {
  const { data, error } = await supabase
    .from("attending")
    .select("event_id")
    .eq("user_id", userId);
    
    if (error) {
      console.error("Error fetching events by IDs:", error);
      return [];
    }
  return data;
};

export const fetchEventsByIds = async (
  eventIds: string[]
): Promise<Event[]> => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .in("event_id", eventIds);

  if (error) {
    console.error("Error fetching events by IDs:", error);
    return [];
  }
  return data;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const suffix = ["th", "st", "nd", "rd"][(day % 10) > 3 || [11, 12, 13].includes(day) ? 0 : day % 10];

  const formattedDate = `${day}${suffix} ${date.toLocaleString("en-US", {
    month: "short",
  })} '${date.getFullYear().toString().slice(-2)}`;

  return formattedDate;
};