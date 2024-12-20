import { FlatList, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
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
    <SafeAreaProvider>
      <SafeAreaView style={styles.eventListContainer}>
        <FlatList
          data={eventsList}
          keyExtractor={(item) => item.event_id.toString()}
          renderItem={({ item }) => <EventCard event={item} />}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListHeaderComponent={() => (
            <Text style={styles.headerText}>Upcoming Events</Text>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  eventListContainer: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 26,
    fontFamily:"sans-serif",
    fontWeight: "800",
    color: "purple",
    marginBottom: 10,
    textAlign: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "purple",
    marginVertical: 2,
  },
});