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
  try {
    const { data, error, status } = await supabase
      .from("profiles")
      .select(`display_name, email`)
      .eq("user_id", id)
      .single();
    if (error && status !== 406) {
      console.error("Error fetching profile", error);
      throw error;
    }
    return data || null;
  } catch (error) {
    if (error instanceof Error) Alert.alert(error.message);
  }
  return null;
};
