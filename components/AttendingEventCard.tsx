import { Text, View } from "react-native";
import {Event} from "@/utils/types"


interface myAttendingCardProps {
    event: Event;
  }

const MyAttendingEventCard: React.FC<myAttendingCardProps> = ({event}) => (
    <View>
      <Text>{event.event_name}</Text>
    </View>
  );

  export default MyAttendingEventCard;