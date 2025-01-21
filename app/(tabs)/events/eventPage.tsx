import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getEventDetails } from "@/utils/utils";
import { Event } from "@/utils/types";
import { Button } from "react-native";
import supabase from "@/lib/supabase";
import BackButton from "@/components/BackButton";
import * as Calendar from "expo-calendar";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

const eventPage = () => {
  const { event_id } = useLocalSearchParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const [isAttending, setIsAttending] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    supabase.auth
      .getUser()
      .then(({ data: { user } }) => {
        setUser(user);

        return getEventDetails(+event_id).then((eventDetails) => {
          if (eventDetails) {
            setEvent(eventDetails);
          } else {
            console.error("Event not found");
            throw new Error("Event not found");
          }

          if (user) {
            return supabase
              .from("attending")
              .select("event_id, user_id")
              .eq("user_id", user.id)
              .eq("event_id", event_id)
              .single();
          }
        });
      })
      .then(
        (
          response:
            | PostgrestSingleResponse<{ event_id: any; user_id: any }>
            | undefined
        ) => {
          if (response?.data) {
            setIsAttending(true);
          } else {
            setIsAttending(false);
          }
        }
      )
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [event_id]);

  const toggleAttendance = () => {
    if (!user) {
      console.error("User not logged in");
      return Promise.resolve();
    }

    const toggle = (
      isAttending
        ? supabase
            .from("attending")
            .delete()
            .match({ user_id: user.id, event_id: event_id })
            .then((result) => {
              if (result.error) {
                throw new Error(result.error.message);
              }
              return result;
            })
        : supabase
            .from("attending")
            .upsert({ user_id: user.id, event_id: event_id })
    ).then((result) => {
      if (result.error) {
        throw new Error(result.error.message);
      }
      return result;
    });

    toggle.then(() => {
      setIsAttending(!isAttending);
    });
  };

  const saveToCalendar = () => {
    Calendar.requestCalendarPermissionsAsync()
      .then(({ status }) => {
        if (status !== "granted") {
          Alert.alert("Permission required", "Please allow calendar access.");
          throw new Error("Calendar permission not granted");
        }
        return Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      })
      .then((calendars) => {
        const defaultCalendar = calendars.find(
          (cal) => cal.allowsModifications
        );
        if (!defaultCalendar) {
          Alert.alert("Error", "No calendar found.");
          throw new Error("No writable calendar found");
        }

        if (!event) {
          Alert.alert("Error", "Event details are missing.");
          throw new Error("Event details are missing");
        }

        const eventStartDate = new Date(
          `${event.event_date}T${event.start_time}`
        );
        const eventEndDate = new Date(eventStartDate);
        eventEndDate.setHours(24, 0, 0, 0);

        return Calendar.createEventAsync(defaultCalendar.id, {
          title: event.event_name,
          location: event.venue,
          startDate: eventStartDate,
          endDate: eventEndDate,
          notes: event.description,
        });
      })
      .then((eventId) => {
        Alert.alert(
          "Success",
          "Event added to your calendar! Please allow a few minutes for it to appear"
        );
      })
      .catch((error) => {
        console.error("Error saving event to calendar:", error);
        Alert.alert("Error", "Unable to add event to calendar.");
      });
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="orange" />
        <Text>Loading our events...</Text>
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.error}>
        <Text>Hmmmm...I wonder where it could be?</Text>
      </View>
    );
  }

  return (
    <View style={styles.eventPageContainer}>
      <View style={styles.eventDetails}>
        <Text style={styles.title}>{event.event_name}</Text>
        <Image source={{ uri: event.img }} style={styles.eventImage} />
        <Text>Venue: {event.venue}</Text>
        <Text>Date: {event.event_date}</Text>
        <Text>Start Time: {event.start_time}</Text>
        <Text>Description: {event.description}</Text>
        {user && (
          <View style={styles.attendButton}>
            <Button
              title={isAttending ? "- Unattend" : "+ Attend"}
              color="orange"
              onPress={toggleAttendance}
            />
          </View>
        )}
        <View style={styles.attendButton}>
          <Button
            title="Save to Calendar"
            color="lightblue"
            onPress={saveToCalendar}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  eventPageContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  eventDetails: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  eventImage: {
    height: 200,
    width: "100%",
    marginVertical: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 5,
  },
  attendButton: {
    marginTop: 10,
    alignSelf: "stretch",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default eventPage;
