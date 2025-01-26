import { SafeAreaView, StyleSheet, View, Text } from "react-native";

interface GameListedProps {
    Title: string;
    Result: number;
    BlackElo: number;
    WhiteElo: number;
}

export const GameListed: React.FC<GameListedProps> = ({ Title, Result, BlackElo, WhiteElo }) => {

    return (

        <View style={styles.container}>
            {/* Text Info */}
            <View style={styles.TextContainer}>
                <Text>{"Game " + Title.split("Game")[1]}</Text>
            </View>
        </View>

    );

};

const styles = StyleSheet.create({
    container:{
        width: "90%",
        height: 150,
        borderColor: "black",
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
    },
    TextTitle:{
        fontSize: 20,
    }
})