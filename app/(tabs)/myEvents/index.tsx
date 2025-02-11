import { router } from "expo-router";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import MyEventsCard from "@/components/MyEventsCard";
import MyAttendingEventCard from "@/components/AttendingEventCard";
import {
  fetchEventsByIds,
  fetchUserId,
  getMyEventsList,
  selectMyAttendingList,
} from "@/utils/utils";
import { Event } from "@/utils/types";

export default function MyEventsPage() {
  const { user, loading: authLoading } = useAuth(); 
  const [loading, setLoading] = useState<boolean>(false);
  const [myEventsList, setMyEventsList] = useState<Event[]>([]);
  const [myAttendingList, setMyAttendingList] = useState<any[]>([]);
  const [viewingMyEvents, setViewingMyEvents] = useState<boolean>(true);

  useEffect(() => {
    const fetchMyEventsPageInfo = async () => {
      if (!user) return;

      setLoading(true);
      try {
        const loggedInUser = await fetchUserId();
        if (!loggedInUser) {
          console.error("No User logged in");
          setMyEventsList([]);
          setMyAttendingList([]);
          return;
        }

        const [myEvents, myAttendingEventIds] = await Promise.all([
          getMyEventsList(loggedInUser).catch((error) => {
            console.error(error, "Error fetching events");
            return [];
          }),
          selectMyAttendingList(loggedInUser).catch((error) => {
            console.error(error, "Error fetching attending list");
            return [];
          }),
        ]);

        setMyEventsList(myEvents);

        if (myAttendingEventIds.length > 0) {
          const attendingEventIds = myAttendingEventIds.map(
            (item: { event_id: string }) => item.event_id
          );

          const attendingEvents = await fetchEventsByIds(attendingEventIds);
          setMyAttendingList(attendingEvents);
        } else {
          setMyAttendingList([]);
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) fetchMyEventsPageInfo();
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="orange" />
        <Text>Loading your events...</Text>
      </View>
    );
  }

  if (!user) {
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
          onPress={() => router.push("/(tabs)/myEvents/newEventPage")}
        />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, viewingMyEvents && styles.activeTab]}
          onPress={() => setViewingMyEvents(true)}
        >
          <Text style={[styles.tabText, viewingMyEvents && styles.activeTabText]}>
            My Events
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, !viewingMyEvents && styles.activeTab]}
          onPress={() => setViewingMyEvents(false)}
        >
          <Text style={[styles.tabText, !viewingMyEvents && styles.activeTabText]}>
            Attending
          </Text>
        </TouchableOpacity>
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
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: "purple",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
  activeTabText: {
    color: "white",
  },
  listContainer: {
    marginBottom: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyNotification: {
    textAlign: "center",
    alignSelf: "center",
    marginTop: 20,
    color: "gray",
  },
});
