import { FlatList, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
import { Event } from "@/utils/types";
import { getEventsList } from "@/utils/utils";
import { Text } from "react-native";

export default function Homepage() {
  const [eventsList, setEventsList] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getEventsList();
      setEventsList(events);
    };
    fetchEvents();
  }, []);

  return (
    <View>
      <Text style={styles.headerText}>Upcoming Events</Text>
      <View style={styles.eventListContainer}>
        <FlatList
          data={eventsList}
          keyExtractor={(item) => item.event_id.toString()}
          renderItem={({ item }) => <EventCard event={item} />}
          ListEmptyComponent={
            <Text style={styles.emptyNotification}>
              Nobody wants to do anything
            </Text>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  eventListContainer: {
    backgroundColor: "#F9FAFB",
    paddingTop: 10,
    paddingHorizontal: 16,
    marginBottom: 130,
  },
  headerText: {
    fontSize: 26,
    fontFamily: "Roboto",
    fontWeight: "800",
    color: "white",
    textAlign: "center",
    backgroundColor: "purple",
    width: "90%",
    alignSelf: "center",
    padding: 10,
    margin: 5,
  },
  emptyNotification: {
    textAlign: "center",
    alignSelf: "center",
    marginTop: 20,
    color: "gray",
  },
});
