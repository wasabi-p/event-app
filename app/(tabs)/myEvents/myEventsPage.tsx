import { router } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MyEventsCard from "@/components/MyEventsCard";
import { useEffect, useState } from "react";
import { fetchUserId, getMyEventsList } from "@/utils/utils";
import { Event } from "@/utils/types";

export default function myEventsPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [myEventsList, setMyEventsList] = useState<Event[]>([]);

  useEffect(() => {
    const fetchMyEvents = async () => {
      setLoading(true);
      try {
        const loggedInUser: string | null = await fetchUserId();

        if (!loggedInUser) {
          Alert.alert("Error", "No User logged in");
          setMyEventsList([]);
          return;
        }
        const myEvents: Event[] = await getMyEventsList(loggedInUser);
        setMyEventsList(myEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        Alert.alert("Could not load your events. Please try again later.");
        setMyEventsList([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMyEvents();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="orange" />
        <Text>Loading your events...</Text>
      </View>
    );
  }

  return (
    <View style={styles.eventPageContainer}>
      <View>
        <Button
          color="orange"
          title="+ Create New Event"
          onPress={() => router.replace("/(tabs)/myEvents/newEventPage")}
        />
      </View>
      <View style={styles.myEventsContainer}>
        <Text style={styles.header}>My Events</Text>
        <FlatList
          data={myEventsList}
          keyExtractor={(item) => item.event_id.toString()}
          renderItem={({ item }) => <MyEventsCard event={item} />}
        />
      </View>
      <View>
        <Text style={styles.header}>Attending</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  eventPageContainer: {
    padding: 10,
    marginTop: 50,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  myEventsContainer: {
    marginTop: 30,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header:{
    fontWeight:"600"
  }
});
