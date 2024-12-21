import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { getEventDetails } from "@/utils/utils";
import { Event } from "@/utils/types";
import { Button } from "react-native";
import supabase from "@/lib/supabase";
import BackButton from "@/components/BackButton"

const eventPage = () => {
  const { event_id } = useLocalSearchParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const [isAttending, setIsAttending] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      const eventDetails = await getEventDetails(+event_id);
      if (eventDetails) {
        setEvent(eventDetails);
      } else {
        console.error("Event not found");
      }

      if (user) {
        const { data} = await supabase
          .from("attending")
          .select("event_id, user_id")
          .eq("user_id", user.id)
          .eq("event_id", event_id)
          .single();

        setIsAttending(!!data);
      }

      setLoading(false);
    };

    fetchData();
  }, [event_id]);

  const toggleAttendance = async () => {
    if (!user) {
      console.error("User not logged in");
      return;
    }

    if (isAttending) {
      const { error } = await supabase
        .from("attending")
        .delete()
        .match({ user_id: user.id, event_id: event_id });

      if (error) {
        console.error("Error removing attendance:", error.message);
      } else {
        setIsAttending(false);
      }
    } else {
      const { error } = await supabase.from("attending").upsert({
        user_id: user.id,
        event_id: event_id,
      });

      if (error) {
        console.error("Error updating attendance:", error.message);
      } else {
        setIsAttending(true);
      }
    }
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
      </View>
      <BackButton/>
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
