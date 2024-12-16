import { FontAwesome } from "@expo/vector-icons";
import { Input } from "@rneui/themed";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native";
import { fetchUser } from "@/utils/utils";
import supabase from "@/lib/supabase";

export default function newEvent() {
  const [eventName, setEventName] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setSetStartTime] = useState("");
  const [finishTime, setFinishTime] = useState("");
  const [description, setDescription] = useState("");
  const [organiser, setOrganiser] = useState<string | null>("");

  useEffect(() => {
    const getCurrentUserId = async () => {
      const currentUser = await fetchUser();
      setOrganiser(currentUser?.id);
    };
    getCurrentUserId();
  }, []);

  const insertEvent = async () => {
    const { error } = await supabase.from("events").insert({
      event_name: eventName,
      venue: venue,
      event_date: date,
      start_time: startTime,
      finish_time: finishTime,
      description: description,
      event_organiser: organiser,
      img: "https://placehold.co/600x400/png",
    });
    if (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.formContainer}>
      <ScrollView>
        <Link href="/(tabs)/myEvents">
          <View style={styles.backIcon}>
            <FontAwesome size={25} name="arrow-left" />
          </View>
        </Link>
        <Input
          label="Event Name"
          value={eventName}
          onChangeText={setEventName}
        />
        <Input label="Venue" value={venue} onChangeText={setVenue} />
        <Input label="Date" value={date} onChangeText={setDate} />
        <Input
          label="Start Time"
          value={startTime}
          onChangeText={setSetStartTime}
        />
        <Input label="Finish" value={finishTime} onChangeText={setFinishTime} />
        <Input
          label="Description"
          value={description}
          onChangeText={setDescription}
        />
        <Button
          color="orange"
          title="+ Submit New Event"
          onPress={() => insertEvent()}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 30,
    padding: 20,
  },
  backIcon: {
    padding: 10,
    paddingBottom: 30,
  },
});
