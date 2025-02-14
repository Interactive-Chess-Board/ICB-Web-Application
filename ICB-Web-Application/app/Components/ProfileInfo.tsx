import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { getUserPhoto } from "../config/firebase";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image"; // Using expo-image for better compatibility



export default function ProfileInfo({UserName, Uri}: {UserName: string, Uri: string}) {
    const [imageUri, setImageUri] = useState<string | null>("https://www.pngitem.com/pimgs/m/146-1462217_profile-icon-orange-png-transparent-png.png");

    return (
        <View style={styles.container}>
            <Image 
                source={{ uri: Uri }}
                style={styles.ProfilePic}
                contentFit="cover" // Better scaling for images
            />
            <Text style={styles.ProfileUserName}>{UserName}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    ProfilePic: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#ddd", // Placeholder if image fails to load
    },
    ProfileUserName: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
    },
});
