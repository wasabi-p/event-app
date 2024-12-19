import { FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import EventCard from "@/components/EventCard";
import { Event } from "@/utils/types";
import { getEventsList } from "@/utils/utils";

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
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  eventListContainer: {
    flex: 1,
    marginTop: 0,
  },
  eventCard: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  eventImage: {
    height: 180,
  },
});
