import { router } from "expo-router";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MyEventsCard from "@/components/MyEventsCard";
import MyAttendingEventCard from "@/components/AttendingEventCard";
import { useEffect, useState } from "react";
import {
  fetchEventsByIds,
  fetchUserId,
  getMyEventsList,
  selectMyAttendingList,
} from "@/utils/utils";
import { Event } from "@/utils/types";

export default function myEventsPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [myEventsList, setMyEventsList] = useState<Event[]>([]);
  const [myAttendingList, setMyAttendingList] = useState<any[]>([]);

  useEffect(() => {
    const fetchMyEventsPageInfo = async () => {
      setLoading(true);

      fetchUserId()
        .then((loggedInUser) => {
          if (!loggedInUser) {
            console.error("No User logged in");
            setMyEventsList([]);
            setMyAttendingList([]);
            return;
          }
          return Promise.all([
            getMyEventsList(loggedInUser).catch((error) => {
              console.error(error, "Error fetching events");
              return [];
            }),
            selectMyAttendingList(loggedInUser).catch((error) => {
              console.error(error, "Error fetching attending list");
              return [];
            }),
          ]);
        })
        .then((results) => {
          if (!results) return;
          const [myEvents, myAttendingEventIds] = results;
          setMyEventsList(myEvents);

          if (myAttendingEventIds.length > 0) {
            const attendingEventIds = myAttendingEventIds.map(
              (item: { event_id: string }) => item.event_id
            );

            fetchEventsByIds(attendingEventIds)
              .then((attendingEvents) => {
                setMyAttendingList(attendingEvents);
              })
              .catch((error) => {
                console.error("Error fetching full event details:", error);
                setMyAttendingList([]);
              });
          } else {
            setMyAttendingList([]);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchMyEventsPageInfo();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="orange" />
        <Text>Loading your events...</Text>
      </View>
    );
  }

  const AttendingEventCard = ({ item }: { item: Event }) => (
    <View>
      <Text>{item.event_name}</Text>
    </View>
  );

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
        <View>
          <Text style={styles.header}>Attending</Text>
        </View>
        <FlatList
          data={myAttendingList}
          keyExtractor={(item) => item.event_id.toString()}
          renderItem={({ item }) => <MyAttendingEventCard event={item} />}
        />
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
  header: {
    fontWeight: "600",
  },
});
