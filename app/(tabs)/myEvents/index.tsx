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
import supabase from "@/lib/supabase";

export default function myEventsPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [myEventsList, setMyEventsList] = useState<Event[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [myAttendingList, setMyAttendingList] = useState<any[]>([]);
  const [viewingMyEvents, setViewingMyEvents] = useState<boolean>(true);

  useEffect(() => {
    const fetchMyEventsPageInfo = async () => {
      setLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      setIsLoggedIn(true);

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

  if (!isLoggedIn) {
    return (
      <View style={styles.noUserPageContainer}>
        <Button
          color="orange"
          title="Please Login to Access This Page"
          onPress={() => router.replace("/(tabs)/account/signin")}
        />
      </View>
    );
  }
  const MyEventsList = () => (
    <FlatList
      data={myEventsList}
      keyExtractor={(item) => item.event_id.toString()}
      renderItem={({ item }) => <MyEventsCard event={item} />}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <Text style={styles.emptyNotification}>
          You haven't created any events yet.
        </Text>
      }
    />
  );

  const MyAttendingList = () => (
    <FlatList
      data={myAttendingList}
      keyExtractor={(item) => item.event_id.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <MyAttendingEventCard event={item} />}
      ListEmptyComponent={
        <Text style={styles.emptyNotification}>
          You're not attending any events yet.
        </Text>
      }
    />
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
        <Button
          title="My Events"
          onPress={() => setViewingMyEvents(true)}
          color={viewingMyEvents ? "purple" : "gray"}
        />
        <Button
          title="Attending"
          onPress={() => setViewingMyEvents(false)}
          color={!viewingMyEvents ? "purple" : "gray"}
        />
      </View>
      <View style={styles.listContainer}>
        {viewingMyEvents ? MyEventsList() : MyAttendingList()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  noUserPageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  eventPageContainer: {
    padding: 10,
    marginTop: 30,
    marginVertical: 8,
    marginHorizontal: 16,
    marginBottom: 130,
  },
  createContainer: {
    marginBottom: 10,
  },
  listContainer: {
    marginBottom: 10,
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
    marginBottom: 5,
  },
  emptyNotification: {
    textAlign: "center",
    alignSelf: "center",
    marginTop: 20,
    color: "gray",
  },
});
