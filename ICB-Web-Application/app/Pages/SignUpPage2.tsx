import React from 'react';
import { Dimensions, Pressable, SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import { AntDesign } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons for the back arrow

// Initialize Device Variables
const dimensions = Dimensions.get('window');
const Height = dimensions.height;
const Width = dimensions.width;

export default function SignUpPage2() {
    return (
        <SafeAreaView style={{ backgroundColor: "#FFFFFF", height: "100%", alignItems: "center" }}>
            {/* Back Button */}
            <Pressable style={styles.BackButton}>
                <AntDesign name="arrowleft" size={24} color="black" />
            </Pressable>

            {/* Title */}
            <Text style={styles.TitleText}>Add Profile Icon</Text>

            {/* Profile Icon */}
            <View style={styles.ProfileIconContainer}>
                <View style={styles.ProfileIcon}>
                    {/* Placeholder for profile image */}
                    <Image 
                        source={{ uri: 'https://via.placeholder.com/150' }} 
                        style={styles.ProfileImage}
                    />
                </View>
                <Text style={styles.SubtitleText}>Add flavour to your account</Text>
            </View>

            {/* Buttons */}
            <Pressable style={styles.BrowseButton}>
                <Text style={styles.BrowseButtonText}>Browse</Text>
            </Pressable>
            <Pressable style={styles.SkipButton}>
                <Text style={styles.SkipButtonText}>Skip</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    BackButton: {
        position: 'absolute',
        top: Height * 0.05,
        left: Width * 0.05,
    },
    TitleText: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: Height * 0.15,
    },
    ProfileIconContainer: {
        alignItems: "center",
        marginTop: Height * 0.05,
    },
    ProfileIcon: {
        width: Width * 0.4,
        height: Width * 0.4,
        borderRadius: Width * 0.2,
        backgroundColor: "#FF5757",
        justifyContent: "center",
        alignItems: "center",
    },
    ProfileImage: {
        width: "80%",
        height: "80%",
        borderRadius: Width * 0.2,
    },
    SubtitleText: {
        marginTop: Height * 0.02,
        fontSize: 12,
        color: "gray",
    },
    BrowseButton: {
        backgroundColor: "#FF5757",
        width: "80%",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: Height * 0.05,
    },
    BrowseButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    SkipButton: {
        borderWidth: 1,
        borderColor: "gray",
        width: "80%",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: Height * 0.02,
    },
    SkipButtonText: {
        color: "gray",
        fontWeight: "bold",
        fontSize: 16,
    },
});
