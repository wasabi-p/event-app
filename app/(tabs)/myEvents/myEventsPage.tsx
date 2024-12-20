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

  const renderMyEvents = ({ item }: { item: Event }) => (
    <MyEventsCard event={item} />
  );

  const renderAttending = ({ item }: { item: Event }) => (
    <MyAttendingEventCard event={item} />
  );

  return (
    <View style={styles.eventPageContainer}>
      <View style={styles.createContainer}>
        <Button
          color="orange"
          title="+ Create New Event"
          onPress={() => router.replace("/(tabs)/myEvents/newEventPage")}
        />
      </View>
      <View style={styles.listContainer}>
       <FlatList
        data={[{ key: "myEvents", title: "My Events", data: myEventsList }, { key: "attending", title: "My Attending", data: myAttendingList }]}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.sectionContainer}>
            <Text style={styles.header}>{item.title}</Text>
            <FlatList
              data={item.data}
              keyExtractor={(event) => event.event_id.toString()}
              renderItem={item.key === "myEvents" ? renderMyEvents : renderAttending}
            />
          </View>
        )}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  eventPageContainer: {
    padding: 10,
    marginTop: 30,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  createContainer:{
    marginBottom:10
  },
  listContainer:{
    marginBottom: 20
  },
  sectionContainer: {
    marginBottom: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontWeight: "800",
    fontSize: 15,
    marginBottom: 5
  },
});
