import { Link } from "expo-router";
import { View, Text } from "react-native";
import Welcome from "./Welcome";
import Homepage from "./HomePage";
import Bluetooth from "./Bluetooth";
import SignUpPage from "./SignUpPage";
import SignUpPage2 from "./SignUpPage2";

export default function HomeScreen() {
    return (
        <View style = {[{flex: 1, margin: 0, padding: 0}]}>
            <Link href={'/Welcome'}><Welcome /></Link>
        </View>
    )
}