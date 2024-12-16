import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { getEventDetails } from "@/utils/utils";
import { Event } from "@/utils/types";

const eventPage = () => {
  const { event_id } = useLocalSearchParams();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const eventDetails = await getEventDetails(+event_id);
      setEvent(eventDetails);
    };
    fetchEvent();
  }, [event_id]);


  if (!event) {
    return (
      <View>
        <Text>Loading event details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.eventPageContainer}>
      <Text>{event.event_name}</Text>
      <Image source={{uri: event.img}} style={styles.eventImage}/>
      <Text>venue {event.venue}</Text>
      <Text>{event.event_date}</Text>
      <Text>{event.start_time}</Text>
      <Text>{event.finish_time}</Text>
      <Text>description for {event.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  eventPageContainer: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  eventImage: {
    height: 200,
  },
});
export default eventPage;
