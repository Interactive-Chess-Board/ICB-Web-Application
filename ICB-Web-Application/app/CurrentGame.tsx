import { Button, Pressable, View, StyleSheet, Text } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Draw, Resign, getGames } from "./config/firebase";
import { useState, useEffect } from "react";
import { ChessGame } from "./config/ChessGame";
import Chessboard from "./Components/Chessboard";

export default function CurrentGame() {
    const [board, setBoard] = useState<string[]>(["p"]); // Current board state
    const [boards, setBoards] = useState<string[]>([]); // All boards
    const [index, setIndex] = useState(0); // Current move index

    useEffect(() => {
        const fetchAndSetBoards = async () => {
            try {
                const fetchedBoards = await FetchGames();
                if (fetchedBoards && fetchedBoards.length > 0) {
                    setBoards(fetchedBoards);
                    setBoard(fetchedBoards); // Initialize with the first board
                } else {
                    console.error("No boards fetched!");
                }
            } catch (error) {
                console.error("Error fetching boards:", error);
            }
        };

        fetchAndSetBoards();
        const intervalId = setInterval(fetchAndSetBoards, 5000); // Poll every 5 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    return (
        <View>
            {/* Top Container */}
            <View style = {styles.TopBarContainer}>
                <Text style={styles.Title}> Game </Text>
            </View>

            {/* White Buttons */}
            <View style={styles.WhiteButtons}>
                <Pressable onPress={async () => Resign("White")} style={styles.ButtonsContainer}>
                    <AntDesign name="flag" size={24} color="black" />
                </Pressable>

                <Pressable onPress={async () => Draw("White")} style={styles.ButtonsContainer}>
                    <MaterialCommunityIcons name="hexagon-slice-3" size={24} color="black" />
                </Pressable>
            </View>

            <View>
                <Chessboard board={board} />
            </View>

            <View style = {styles.BlackButtons}>
                <Pressable onPress={async () => Resign("Black")} style={[styles.ButtonsContainer, { backgroundColor: "black" }]}>
                    <AntDesign name="flag" size={24} color="white" />
                </Pressable>

                <Pressable onPress={async () => Draw("Black")} style={[styles.ButtonsContainer, { backgroundColor: "black" }]}>
                    <MaterialCommunityIcons name="hexagon-slice-3" size={24} color="white" />
                </Pressable>
            </View>
        </View>
    );
}

async function FetchGames(): Promise<string[]> {
    try {
        const Game = await getGames(); // Fetch game data
        let slicedGame;
        for (const key in Game) {
            console.log("Game Data:", key, Game[key]);
            slicedGame = Game[key];
        }
        console.log("Sliced Game:", slicedGame);
        if (slicedGame) {
            const Moves = slicedGame.Moves;
            console.log("Moves:", Moves);
            const Boards: string[] = ChessGame(Moves)[ChessGame(Moves).length - 1].split(""); // Generate boards

            return Boards;
        } else {
            throw new Error("Game data or Moves is undefined.");
        }
    } catch (error) {
        console.error("Error in FetchGames:", error);
        return [];
    }
}

const styles = StyleSheet.create({
    ButtonsContainer: {
        width: 100,
        height: 40,
        borderColor: "black",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },

    WhiteButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 10,
    },

    BlackButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 10,
        marginTop: 100,
    },
    TopBarContainer:{
        backgroundColor: "red",
        alignItems: "center",
        height: 150,
        borderRadius: 10,
        justifyContent: "center",
    },
    Title:{
        fontSize: 25,
        fontWeight: "bold",
        color: "white",
    },

});
