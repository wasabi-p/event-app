import { FontAwesome } from "@expo/vector-icons";
import { Input } from "@rneui/themed";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, View } from "react-native";
import { fetchUser } from "@/utils/utils";
import supabase from "@/lib/supabase";
import dayjs from "dayjs";
import DateTimePicker from "react-native-ui-datepicker";

export default function newEvent() {
  const [eventName, setEventName] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [organiser, setOrganiser] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getCurrentUserId = async () => {
      const currentUser = await fetchUser();
      setOrganiser(currentUser?.user_metadata.sub);
    };
    getCurrentUserId();
  }, []);

  const insertEvent = async () => {
    setIsSubmitting(true);
    const eventDate = dayjs(date).format("YYYY-MM-DD");
    const startTime = dayjs(date).format("HH:mm:ss");

    const { error } = await supabase.from("events").insert({
      event_name: eventName,
      venue: venue,
      event_date: eventDate,
      start_time: startTime,
      description: description,
      event_organiser: organiser,
      img: "https://placehold.co/600x400/png",
    });

    if (error) {
      Alert.alert("Error", error.message);
      setIsSubmitting(false);
    } else {
      Alert.alert("Success", "Event submitted successfully!");
      router.push("/(tabs)/myEvents");
    }
  };

  const isFormValid = () => {
    return eventName && venue && description && organiser && !isSubmitting;
  };

  return (
    <View style={styles.formContainer}>
      <Link href="/(tabs)/myEvents">
        <View style={styles.backIcon}>
          <FontAwesome size={25} name="arrow-left" />
        </View>
      </Link>
      <Input label="Event Name" value={eventName} onChangeText={setEventName} />
      <Input label="Venue" value={venue} onChangeText={setVenue} />
      <Input
        label="Description"
        value={description}
        onChangeText={setDescription}
      />
      <View style={styles.datePicker}>
        <DateTimePicker
          mode="single"
          date={date}
          timePicker={true}
          onChange={(params: any) => {
            if(params.date){
              setDate(params.date)};
          }}
        />
      </View>
      <View style={styles.button}>
        <Button
          color="orange"
          title={isSubmitting ? "Submitting..." : "+ Submit New Event"}
          onPress={() => insertEvent()}
          disabled={!isFormValid()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 20,
    padding: 15,
  },
  backIcon: {
    padding: 10,
    paddingBottom: 20,
  },
  datePicker: {
    marginTop: 15,
  },
  button: {
    marginTop: 10,
  },
});
