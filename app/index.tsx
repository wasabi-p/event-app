import { Redirect } from "expo-router";
import {Text} from 'react-native';

export default function Homepage(){
    return <Redirect href={"/(tabs)/home"}/>
}
