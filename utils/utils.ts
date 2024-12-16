import supabase from "@/lib/supabase";
import { Event } from "@/utils/types";
import { Alert } from "react-native";

export const getEventsList = async () => {
  const { data, error } = await supabase.from("events").select();
  if (error) {
    console.error("Error fetching events", error);
  }
  return data as Event[];
};

export const getEventDetails = async (event_id: number) => {
  const { data, error } = await supabase
    .from("events")
    .select()
    .eq("event_id", event_id)
    .single()
  return data as Event;
};

export const fetchUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }
    return user;
};

export const getProfile = async(id: string) => {
  try {
    const { data, error, status } = await supabase
      .from("profiles")
      .select(`display_name, email`)
      .eq("user_id", id)
      .single();
    if (error && status !== 406) {
      throw error;
    }
  return data || null;
  } catch (error) {
    if (error instanceof Error) Alert.alert(error.message);
  } 
    return null;
}