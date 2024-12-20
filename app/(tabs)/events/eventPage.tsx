import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { getEventDetails } from "@/utils/utils";
import { Event } from "@/utils/types";
import { Button } from "react-native";

const eventPage = () => {
  const { event_id } = useLocalSearchParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      const eventDetails = await getEventDetails(+event_id);
      if (eventDetails) {
        setEvent(eventDetails);
      } else {
        console.error("");
      }
      setLoading(false);
    };
    fetchEvent();
  }, [event_id]);

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
        <View style={styles.attendButton}>
          <Button title="+ Attend" color="orange" />
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
