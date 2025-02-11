import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
import { Event } from "@/utils/types";
import { getEventsList } from "@/utils/utils";
import { Text } from "react-native";

export default function Homepage() {
  const [loading, setLoading] = useState(true);
  const [eventsList, setEventsList] = useState<Event[]>([]);
  const [sortAscending, setSortAscending] = useState<boolean>(true);

  const sortEvents = (events: Event[]) => {
    return [...events].sort((a, b) => {
      const dateA = new Date(a.event_date);
      const dateB = new Date(b.event_date);

      if (dateA.getTime() !== dateB.getTime()) {
        return sortAscending
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }

      const timeA = a.start_time
        ? new Date(`${a.event_date}T${a.start_time}`).getTime()
        : 0;
      const timeB = b.start_time
        ? new Date(`${b.event_date}T${b.start_time}`).getTime()
        : 0;

      return sortAscending ? timeA - timeB : timeB - timeA;
    });
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const events = await getEventsList();
      setEventsList(events);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="orange" />
        <Text>Loading events...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Events</Text>
      <View style={styles.sortButtonContainer}>
        <TouchableOpacity
          style={[styles.sortButton, sortAscending && styles.activeButton]}
          onPress={() => setSortAscending(true)}
        >
          <Text style={[styles.sortButtonText, sortAscending && styles.activeText]}>
            Oldest
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.sortButton, !sortAscending && styles.activeButton]}
          onPress={() => setSortAscending(false)}
        >
          <Text style={[styles.sortButtonText, !sortAscending && styles.activeText]}>
            Newest
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.eventListContainer}>
        <FlatList
          data={sortEvents(eventsList)}
          keyExtractor={(item) => item.event_id.toString()}
          renderItem={({ item }) => <EventCard event={item} />}
          ListEmptyComponent={
            <Text style={styles.emptyNotification}>
              Nobody wants to do anything
            </Text>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  headerText: {
    fontSize: 30,
    fontFamily: "Roboto",
    fontWeight: "900",
    color: "black",
    textAlign: "center",
    padding: 10,
    margin: 5,
    letterSpacing: 2,
  },
  sortButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  sortButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "lightgray",
  },
  activeButton: {
    backgroundColor: "purple",
  },
  sortButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  activeText: {
    color: "white",
  },
  eventListContainer: {
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
  },
  emptyNotification: {
    textAlign: "center",
    alignSelf: "center",
    marginTop: 20,
    color: "gray",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
