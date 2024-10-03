import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView, View } from "react-native";
import { Text } from "react-native";

export default function Welcome(){
    return(
        <SafeAreaView>
            <ThemedText type="title">Hello</ThemedText>
        </SafeAreaView>
    );
}