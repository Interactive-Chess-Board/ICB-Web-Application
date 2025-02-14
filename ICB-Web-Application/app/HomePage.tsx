import { View, Dimensions, Text, StyleSheet, Pressable, Image, SafeAreaView, Animated } from "react-native";
import { useEffect, useState, useRef } from "react";
import { router } from "expo-router";
import { getUserData, getUserPhoto } from "./config/firebase";

const dimensions = Dimensions.get('window');
const Height = dimensions.height;
const Width = dimensions.width;

export default function Homepage() {
    const [UserUsername, setUserUsername] = useState("");
    const [UserPhoto, setUserPhoto] = useState("");
    const borderOpacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        getUserData().then((data) => {
            setUserUsername(data ? data.Username : "User");
        });
    }, []);

    useEffect(() => {
        getUserPhoto().then((data) => {
            setUserPhoto(data ? data : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png");
        });
    }, []);

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(borderOpacity, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: false,
                }),
                Animated.timing(borderOpacity, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: false,
                }),
            ])
        ).start();
    }, []);

    return (
        <SafeAreaView style={{ backgroundColor: "white", height: "100%" }}>
            <View style={styles.RedBox}>
                <Image style={styles.ICBLogo} source={require("../assets/images/main/ICB_Logo.png")} />
            </View>

            <View style={styles.TopBarContainer}>
                <View>
                    <Text style={styles.WelcomeText}>Hi,</Text>
                    <Text style={styles.UserNameText}>{UserUsername}</Text>
                </View>
                <Image style={styles.UserPhoto} source={{ uri: UserPhoto }} />
            </View>

            <View style={styles.MainContainer}>
                <Animated.View style={[styles.PlayBorder, { opacity: borderOpacity }]} />
                <Pressable onPress={() => router.push("/SetUpPage")} style={styles.PlayImageContainer}>
                    <View style={styles.PlayContainer}>
                        <View style={styles.PlayTextContainer}>
                            <Text style={styles.PlayText}>Play</Text>
                            <Text style={styles.PlaySubText}>SubTitle</Text>
                        </View>
                        <View style={styles.PlayImageWrapper}>
                            <Image style={styles.PlayImage} source={require("../assets/images/HomePage/PlayChess.png")} />
                        </View>
                    </View>
                </Pressable>

                <View style={styles.ImproveContainer}>
                    <Text style={styles.ImproveText}>Want to improve?</Text>
                    <Text style={styles.ImproveSubText}>Check the analysis of your last game</Text>
                </View>

                <Pressable onPress={() => router.push("/GamesList")} style={styles.PlayImageContainer}>
                    <View style={styles.PastGamesContainer}>
                    
                        <View style={styles.PlayImageWrapper}>
                                <Image style={styles.PlayImage} source={require("../assets/images/HomePage/PastGames.png")} />
                        </View>
                        <View style={styles.PastGamesTextContainer}>
                            <Text style={styles.PastGameTextTitle}>See Past Games</Text>
                        </View>
                    </View>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    ICBLogo: {
        width: "50%",
        height: "50%",
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 50,
    },
    RedBox: {
        backgroundColor: "#FF4E4E",
        height: Height * 0.2,
        width: "100%",
        alignSelf: "center",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.5)",
        zIndex: 1,
    },
    WelcomeText: {
        color: "black",
        fontWeight: "800",
        fontSize: 20,
    },
    UserNameText: {
        fontSize: 25,
        fontWeight: "300",
        color: "black",
        marginLeft: 10,
    },
    UserPhoto: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    TopBarContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 18,
        alignItems: "center",
        borderRadius: 10,
        height: Height * 0.1,
        backgroundColor: "white",
    },
    MainContainer: {
        backgroundColor: "#ededed",
        height: "100%",
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        borderWidth: 0.5,
        borderColor: "black",
    },
    PlayBorder: {
        position: "absolute",
        borderWidth: 3,
        borderColor: "#FF4E4E",
        borderRadius: 12,
        alignSelf: "center",
        width: "91%",
        marginTop: 49,
        height: Height * 0.18,
    },
    PlayImageContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
        width: "100%",
    },
    PlayContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        backgroundColor: "white",
        borderRadius: 10,
    },
    PlayTextContainer: {
        backgroundColor: "#FF4E4E",
        width: "40%",
        borderRadius: 10,
        justifyContent: "center",
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
    },
    PlayText: {
        fontSize: 30,
        fontWeight: "800",
        color: "white",
        marginLeft: 10,
    },
    PlaySubText: {
        color: "white",
        marginLeft: 10,
        fontSize: 10,
    },
    PlayImageWrapper: {
        width: "60%",
        alignItems: "center",
    },
    PlayImage: {
        width: 100,
        height: 150,
        resizeMode: "contain",
    },
    ImproveContainer: {
        width: "100%",
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    ImproveText: {
        fontSize: 20,
        fontWeight: "800",
    },
    ImproveSubText: {
        fontSize: 10,
    },
    PastGamesContainer:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        backgroundColor: "white",
        borderRadius: 10,

    },
    PastGamesTextContainer:{
        backgroundColor: "#FF4E4E",
        width: "40%",
        borderRadius: 10,
        justifyContent: "center",
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
    },
    PastGameTextTitle:{
        fontSize: 20,
        fontWeight: "800",
        color: "white",
        marginLeft: 10,
        alignSelf: "center",
        textAlign: "center",
    }
});
