import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import { useState } from "react";

interface GameListedProps {
    Title: string;
    Result: number;
    BlackElo: number;
    WhiteElo: number;
}

export const GameListed: React.FC<GameListedProps> = ({ Title, Result, BlackElo, WhiteElo }) => {
    const [userProfilePicUrl, setUserProfilePicUrl] = useState<string | null>("https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg");
    const [opponentProfilePicUrl, setOpponentProfilePicUrl] = useState<string | null>("https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg");
    const [userName, setUserName] = useState<string>("User 1");
    const [opponentName, setOpponentName] = useState<string>("User 2");
    return (

        <View style={styles.container}>
            {/* Text Info */}
            <View style={styles.TextContainer}>
                <Text style={styles.TextTitle}>{"Game " + Title.split("Game")[1]}</Text>
            </View>

            {/* VS information */}
            <View style={styles.VSContainer}>

                {/* Left Oppenent */}
                <View style={[styles.OpponentContainer]}>
                    <Image source={{uri: userProfilePicUrl || ''}} style={styles.ProfilePic} />
                    <Text style={styles.ProfileUserName}>{userName}</Text>
                </View>

                {/* Right Oppenent */}
                <View style={[styles.OpponentContainer, {backgroundColor: "#e33b54"}]}>
                    <Image source={{uri: opponentProfilePicUrl || ''}} style={styles.ProfilePic} />
                    <Text style={styles.ProfileUserName}>{opponentName}</Text>
                </View>
            </View>
        </View>

    );

};

const styles = StyleSheet.create({
    container:{
        width: "90%",
        height: 150,
        borderColor: "#f5425d",
        borderRadius: 10,
        borderWidth: 1,
        alignSelf: "center",
        marginTop: 50,
    },
    TextContainer:{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        backgroundColor: "#f5425d",
        borderRadius: 10,
        borderBottomEndRadius:0,
        borderBottomStartRadius:0,
    },
    TextTitle:{
        fontSize: 20,
        fontWeight: "bold",
        color:"white",
        marginTop: 10,
        marginBottom: 10,
        
    },
    VSContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        height: 100,
    },
    OpponentContainer:{
        width: "50%",
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        borderTopEndRadius:0,
        borderTopStartRadius:0,
    },
    ProfilePic:{
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 20,
    },
    ProfileUserName:{
        fontSize: 12,
        fontWeight: "bold",
        color: "black",
    }

})