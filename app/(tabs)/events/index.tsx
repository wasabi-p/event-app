import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
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
    <View>
      <Text style={styles.headerText}>Events</Text>
      <View style={styles.sortButtonContainer}>
        <Text style={styles.sortLabel}>Sort By:</Text>
        <Button
          title={sortAscending ? "Oldest" : "Newest"}
          onPress={() => setSortAscending(!sortAscending)}
          color="purple"
        />
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
    paddingBottom: 20,
    marginBottom: 200
  },
  headerText: {
    fontSize: 30,
    fontFamily: "Roboto",
    fontWeight: "900",
    color: "black",
    textAlign: "center",
    width: "90%",
    alignSelf: "center",
    padding: 10,
    margin: 5,
    letterSpacing: 2,
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
  sortButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  sortLabel: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: "bold",
  },
});
