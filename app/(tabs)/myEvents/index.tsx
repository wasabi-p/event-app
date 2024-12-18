import { router } from "expo-router";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import MyEventsCard from "@/components/MyEventsCard"
import { useEffect, useState } from "react";
import { fetchUser, getMyEventsList } from "@/utils/utils";

export default function myEventsPage () {
  const [myEventsList, setMyEventsList] = useState<Event[]>([]);

  useEffect(() => {
    const fetchMyEvents = async () => {
      const currentUser = await fetchUser();
      const events = await getMyEventsList(currentUser?.id)
      setMyEventsList(events);
    };
    fetchMyEvents();
  }, []);
  
  return (

    <View style={styles.eventPageContainer}>
        <View>
      <Button color="orange" title="+ Create New Event" onPress={()=>router.replace("/(tabs)/myEvents/newEvent")}/>
      </View>
      <View style={styles.mt20}>
        <Text>My Events</Text>
        <FlatList
          data={myEventsList}
          keyExtractor={(item) => item.event_id.toString()}
          renderItem={({ item }) => <MyEventsCard event={item} />}
        />
      </View>
      <View>
        <Text>Attending</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  eventPageContainer: {
    padding: 10,
    marginTop: 50,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  mt20: {
    marginTop: 30,
  },
});
