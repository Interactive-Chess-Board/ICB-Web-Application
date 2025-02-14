import { Button, Pressable, SafeAreaView, StyleSheet, View, Text } from "react-native";
import Chessboard from "./Components/Chessboard";
import { getGames } from "./config/firebase";
import { useState, useEffect, } from "react";
import { ChessGame } from "./config/ChessGame";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

export default function Game() {
    Entypo.loadFont();
    const [board, setBoard] = useState<string[]>(["p"]); // Current board state
    const [boards, setBoards] = useState<string[][]>([]); // All boards
    const [index, setIndex] = useState(0); // Current move index
    const { GameNum } = useLocalSearchParams();
    console.log("GameNum:", GameNum);

        useEffect(() => {
            const fetchAndSetBoards = async () => {
                try {
                    const fetchedBoards = await FetchGames(Number(GameNum));
                    if (fetchedBoards && fetchedBoards.length > 0) {
                        setBoards(fetchedBoards);
                        setBoard(fetchedBoards[0]); // Initialize with the first board
                    } else {
                        console.error("No boards fetched!");
                    }
                } catch (error) {
                    console.error("Error fetching boards:", error);
                }
            };
    
            fetchAndSetBoards();
        }, []);

    const handleNextMove = () => {
        if (index < boards.length - 1) {
            const nextIndex = index + 1;
            setIndex(nextIndex); // Update index
            setBoard(boards[nextIndex]); // Update board state
        } else {
            console.log("Reached the end of the game!");
        }
    };

    const handlePrevMove = () => {
        if (index > 0) {
            const prevIndex = index - 1;
            setIndex(prevIndex); // Update index
            setBoard(boards[prevIndex]); // Update board state
        } else {
            console.log("Reached the start of the game!");
        }
    };
    return (
        <SafeAreaView>

            {/* Text and Yapping */}
            <View style={styles.TextContainer}>
                <Text style={styles.GameTitle}>{"Game: "+ GameNum}</Text>
                <Text style={styles.Feedback}>Nice Move</Text>
            <Chessboard board={board} />
            </View>
            {/* Arrows */}
            <View style={styles.ArrowsContainer}>
                <Pressable style = {styles.ArrowContainer} onPress={handlePrevMove}>
                    <AntDesign style={{}} name="arrowleft" size={24} color="black" />
                </Pressable>
                <Pressable style = {styles.ArrowContainer} onPress={handleNextMove}>
                    <AntDesign name="arrowright" size={24} color="black" />
                </Pressable>
            </View>
            
        </SafeAreaView>
    );
}

async function FetchGames(GameNumber:number): Promise<string[][]> {
    try {
        const Game = await getGames(); // Fetch game data
        let slicedGame = Game["Game" + GameNumber]; // Get the game data
        console.log("Sliced Game:", slicedGame);
        if (slicedGame) {
            const Moves = slicedGame.Moves;
            console.log("Moves:", Moves);
            console.log("ChessGame:", ChessGame(Moves));
            let boards: string[][] = [];
            for(const board of ChessGame(Moves)){
                boards.push(board.split(""));
            }

            return boards;
        } else {
            throw new Error("Game data or Moves is undefined.");
        }
    } catch (error) {
        console.error("Error in FetchGames:", error);
        return [];
    }
}

const styles = StyleSheet.create({
    ArrowContainer: {
        flex: 1,
        alignItems: "center",
        width: 50,
        height: 50,
        justifyContent: "center",
        borderColor: "black",
        borderWidth: 1,
        marginVertical: 30,
        marginHorizontal: 40,
    },
    ArrowsContainer:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width:300,
        paddingHorizontal: 10,
        alignSelf: "center",
    },
    TextContainer:{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        alignSelf: "center",
        marginTop: 100,

    },
    GameTitle:{
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 0,
    },
    Feedback:{
        fontStyle:"italic",
        fontSize: 10,
    }
});
