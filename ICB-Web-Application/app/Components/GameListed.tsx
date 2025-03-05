import { SafeAreaView, StyleSheet, View, Text, Image, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { contain } from "three/src/extras/TextureUtils";
import { getUserPhoto } from "../config/firebase";
import { router } from "expo-router";

interface GameListedProps {
    Title: string;
    Result: number;
    BlackElo: number;
    WhiteElo: number;
    GameNum: number;
}

export const GameListed: React.FC<GameListedProps> = ({ Title, Result, BlackElo, WhiteElo,GameNum }) => {
    const [userProfilePicUrl, setUserProfilePicUrl] = useState<string | null>("https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg");
    const [opponentProfilePicUrl, setOpponentProfilePicUrl] = useState<string | null>("https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg");
    const [userName, setUserName] = useState<string>("User 1");
    const [opponentName, setOpponentName] = useState<string>("User 2");
    
    let resultText = "";

    if (Result === 0) {
        resultText = "White Wins";
    } else if (Result === 1) {
        resultText = "Black Wins";
    } else {
        resultText = "Draw";
    }

    useEffect(() => {
        getUserPhoto().then((data) => {
            setUserProfilePicUrl(data ? data : "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg");
        });
    }, []);

    return (

        <Pressable onPressIn={() => router.push({ pathname: "/Game", params: { GameNum }})} style={styles.container}>
            <Text style = {styles.title}>{"Game " + Title.split("Game")[1]}</Text>

            {/* Profile Picture */}
            <View>
                <Image source={{ uri: userProfilePicUrl || "" }} style={{ width: 50, height: 50, borderRadius: 50 / 2, margin: 10, alignSelf: "center" }} />

                <View style={{ backgroundColor: "#FF4E4E", height: 95, width:"80%", borderRadius: 10, marginTop: 10, justifyContent: "center", borderWidth: 0.5, borderColor: "black"}}>
                    <Text style = {{textAlign: "center", fontSize: 15, fontWeight: "600", color: "white"}}>{resultText}</Text>
                </View>
            </View>
        </Pressable>

    );

};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: 200,
        width: 300,
        alignSelf: "center",
        margin: 10,
        borderRadius: 10,
        borderWidth: 0.5,

    },
    title: {
        fontSize: 20,
        fontWeight: "800",
        textAlign: "center",
        marginTop: 10,
        color: "black",
    },

})