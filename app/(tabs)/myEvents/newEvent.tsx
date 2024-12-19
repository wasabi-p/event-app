import { FontAwesome } from "@expo/vector-icons";
import { Input } from "@rneui/themed";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, View } from "react-native";
import { fetchUserId } from "@/utils/utils";
import supabase from "@/lib/supabase";
import dayjs from "dayjs";
import DateTimePicker
from "@react-native-community/datetimepicker";

export default function newEvent() {
  const [eventName, setEventName] = useState("");
  const [venue, setVenue] = useState("");
  const [time, setTime] = useState(new Date())
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [organiser, setOrganiser] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    const getCurrentUserId = async () => {
      const currentUser = await fetchUserId();
      setOrganiser(currentUser);
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


  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (event: any, selectedTime: Date | undefined) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <Link href="/(tabs)/myEvents">
        <View style={styles.backIcon}>
          <FontAwesome size={25} name="backward" />
        </View>
      </Link>
      <View style={styles.formContainer}>
        <Input
          label="Event Name"
          value={eventName}
          onChangeText={setEventName}
        />
        <Input label="Venue" value={venue} onChangeText={setVenue} />
        <Input
          label="Description"
          value={description}
          onChangeText={setDescription}
        />
        <View style={styles.datePicker}>
         <View style={styles.datePicker}>
          <Button
            title={`Select Date: ${dayjs(date).format("YYYY-MM-DD")}`}
            onPress={() => setShowDatePicker(true)}
          />
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          <Button
            title={`Select Time: ${dayjs(time).format("HH:mm:ss")}`}
            onPress={() => setShowTimePicker(true)}
          />
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display="default"
              onChange={handleTimeChange}
            />
          )}
        </View>
        </View>
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
  mainContainer: {
    padding: 15,
  },
  formContainer: {
    padding: 15,
  },
  backIcon: {
    padding: 10,
    backgroundColor: "lightgrey",
  },
  datePicker: {
    marginTop: 5,
  },
  button: {
    marginTop: 10,
  },
});
