import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { getUserPhoto } from "../config/firebase";
import { router } from "expo-router";

const botImages = [
    require("../../assets/images/Bots/RobotI.jpg"),
    require("../../assets/images/Bots/RobotII.jpg"),
    require("../../assets/images/Bots/RobotI.webp"),
];

interface GameListedProps {
    Title: string;
    Result: number;
    BlackElo: number;
    WhiteElo: number;
    GameNum: number;
}

export const GameListed: React.FC<GameListedProps> = ({ Title, Result, BlackElo, WhiteElo, GameNum }) => {
    const [userProfilePicUrl, setUserProfilePicUrl] = useState<string>("https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg");
    const [botImage] = useState(botImages[Math.floor(Math.random() * botImages.length)]);

    const resultText = Result === 0 ? "White Wins" : Result === 1 ? "Black Wins" : "Draw";
    const resultColor = Result === 0 ? "#4CAF50" : Result === 1 ? "red" : "red";

    useEffect(() => {
        getUserPhoto().then((data) => {
            if (data) setUserProfilePicUrl(data);
        });
    }, []);

    return (
        <Pressable 
            onPress={() => router.push({ pathname: "/Game", params: { GameNum }})} 
            style={styles.container}
        >
            <View style={styles.content}>
                <Text style={styles.title}>Game {Title.split("Game")[1]}</Text>
                
                <View style={styles.gameInfo}>
                    <View style={styles.playerSection}>
                        <Image 
                            source={{ uri: userProfilePicUrl }} 
                            style={styles.profilePic} 
                        />
                        <View style={styles.playerInfo}>
                            <Text style={styles.playerName}>Player</Text>
                            <Text style={styles.eloText}>ELO: {WhiteElo}</Text>
                        </View>
                    </View>
                    
                    <View style={[styles.resultBadge, { backgroundColor: resultColor }]}>
                        <Text style={styles.resultText}>{resultText}</Text>
                    </View>

                    <View style={styles.playerSection}>
                        <Image 
                            source={botImage}
                            style={styles.profilePic} 
                        />
                        <View style={styles.playerInfo}>
                            <Text style={styles.playerName}>Cool Bot</Text>
                            <Text style={styles.eloText}>ELO: {BlackElo}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 12,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 0.2,
        borderColor: "black",
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#333",
        marginBottom: 12,
    },
    gameInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    playerSection: {
        flexDirection: "row",
        alignItems: "center",
    },
    playerInfo: {
        marginLeft: 8,
    },
    playerName: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    resultBadge: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        minWidth: 100,
    },
    resultText: {
        color: "white",
        fontSize: 14,
        fontWeight: "600",
        textAlign: "center",
    },
    eloText: {
        fontSize: 12,
        color: "#666",
        fontWeight: "500",
    },
});
