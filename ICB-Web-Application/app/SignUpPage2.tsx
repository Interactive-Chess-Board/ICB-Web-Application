import React from 'react';
import { Dimensions, Pressable, SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { updateProfilePic, getUserPhoto } from './config/firebase';
import { router } from 'expo-router';

// Initialize Device Variables
const dimensions = Dimensions.get('window');
const Height = dimensions.height;
const Width = dimensions.width;

export default function SignUpPage2() {
    const [profilePic, setProfilePic] = React.useState("");
    React.useEffect(() => {
        TryDisplayPhoto().then(photo => {
            setProfilePic(photo);
        });
    }, []);

    const getBlobFromUri = async (uri: string): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.error("Blob conversion failed:", e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });
    };
    // Browse handler moved inside the component
    const HandleBrowse = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
    
        if (!result.canceled && result.assets?.length > 0) {
            const newUri = result.assets[0].uri;
            console.log("Selected Image URI:", newUri);
    
            const blob = await getBlobFromUri(newUri);
            if (blob) {
                setProfilePic(newUri); // Update UI
                await updateProfilePic(blob); // Upload to Firebase
            } else {
                console.error("Failed to get blob from URI");
            }
        } else {
            console.log("User cancelled or no valid image selected");
        }
    };
    
    return (
        <SafeAreaView style={{ backgroundColor: "#FFFFFF", height: "100%", width: "100%", alignItems: "center" }}>
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
                        source={{uri: profilePic}} 
                        style={styles.ProfileImage}
                    />
                </View>
                <Text style={styles.SubtitleText}>Add flavour to your account</Text>
            </View>

            {/* Buttons */}
            <Pressable 
            onPress={() => {
                HandleBrowse();
                TryDisplayPhoto().then(photo => {
                    setProfilePic(photo);
                });
            }} 
            style={styles.BrowseButton}>
                <Text style={styles.BrowseButtonText}>Browse</Text>
            </Pressable>
            <Pressable onPress={() =>router.push("/HomePage")} style={styles.SkipButton}>
                <Text style={styles.SkipButtonText}>Confirm</Text>
            </Pressable>
        </SafeAreaView>
    );
}

async function TryDisplayPhoto(): Promise<string> {
    const photo = await getUserPhoto();
    if (photo) {
        return photo;
    } else {
        return "https://via.placeholder.com/150";
    }
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
