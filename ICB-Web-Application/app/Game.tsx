import { Button, Pressable, SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import Chessboard from "./Components/Chessboard";
import { getGames, getUserPhoto, getUsername } from "./config/firebase";
import { useState, useEffect, } from "react";
import { ChessGame } from "./config/ChessGame";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

const botImages = [
    require("../assets/images/Bots/RobotI.jpg"),
    require("../assets/images/Bots/RobotII.jpg"),
    require("../assets/images/Bots/RobotI.webp"),
];

const trainerImage = require("../assets/images/Game/HalfBodyQueen.png");

// Advantage Bar Component
function AdvantageBar({ advantage }: { advantage: number }) {
    // Convert advantage to percentage (0-100)
    const percentage = Math.min(Math.max(advantage, 0), 100);
    const isWhiteAdvantage = percentage > 50;
    
    return (
        <View style={styles.advantageContainer}>
            <View style={styles.advantageBar}>
                <View 
                    style={[
                        styles.advantageFill,
                        { 
                            height: `${percentage}%`,
                            backgroundColor: '#000000'
                        }
                    ]} 
                />
            </View>
        </View>
    );
}

export default function Game() {
    Entypo.loadFont();
    const [board, setBoard] = useState<string[]>(["p"]); // Current board state
    const [boards, setBoards] = useState<string[][]>([]); // All boards
    const [index, setIndex] = useState(0); // Current move index
    const [trainerMessages, setTrainerMessages] = useState<string[]>([]); // Trainer messages
    const [currentMessage, setCurrentMessage] = useState<string>(""); // Current trainer message
    const [userProfilePic, setUserProfilePic] = useState<string>("https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg");
    const [username, setUsername] = useState<string>("Player");
    const [elo, setElo] = useState<number>(0);
    const [opponentElo, setOpponentElo] = useState<number>(0);
    const [BlackAdvantages, setBlackAdvantages] = useState<number[]>([]);
    const [advantage, setAdvantage] = useState<number>(50); // 50 means equal position
    const [botImage] = useState(botImages[Math.floor(Math.random() * botImages.length)]);
    const [startMaterialAdvantage, setStartMaterialAdvantage] = useState<number>(0);
    const [WhiteMaterialAdvantage, setWhiteMaterialAdvantage] = useState<number>(0);
    const [BlackMaterialAdvantage, setBlackMaterialAdvantage] = useState<number>(0);
    const { GameNum } = useLocalSearchParams();
    console.log("GameNum:", GameNum);

    useEffect(() => {
        const fetchAndSetBoards = async () => {
            try {
                const fetchedData = await FetchGames(Number(GameNum));
                if (fetchedData.boards && fetchedData.boards.length > 0) {
                    setBoards(fetchedData.boards);
                    setBoard(fetchedData.boards[0]); // Initialize with the first board
                    setTrainerMessages(fetchedData.trainerMessages || []); // Set trainer messages
                    if (fetchedData.trainerMessages && fetchedData.trainerMessages.length > 0) {
                        console.log("trainerMessages: " + fetchedData.trainerMessages[1]);
                        setCurrentMessage(fetchedData.trainerMessages[0]); // Set initial message
                    }
                    // Set ELOs if available
                    if (fetchedData.playerElo) {
                        setElo(fetchedData.playerElo);
                    }
                    if (fetchedData.opponentElo) {
                        setOpponentElo(fetchedData.opponentElo);
                    }
                    if (fetchedData.BlackAdvantages) {
                        setBlackAdvantages(fetchedData.BlackAdvantages);
                    }
                    if(fetchedData.materialAdvantage){
                        if (startMaterialAdvantage - fetchedData.materialAdvantage as number > 0) {
                            setWhiteMaterialAdvantage(startMaterialAdvantage + 1);
                        }
                        else if (startMaterialAdvantage - fetchedData.materialAdvantage as number < 0) {
                            setBlackMaterialAdvantage(startMaterialAdvantage + 1);
                        }
                        setStartMaterialAdvantage(fetchedData.materialAdvantage as number);
                    }
                } else {
                    console.error("No boards fetched!");
                }
            } catch (error) {
                console.error("Error fetching boards:", error);
            }
        };

        const fetchUserData = async () => {
            try {
                const [photoUrl, name] = await Promise.all([
                    getUserPhoto(),
                    getUsername()
                ]);
                if (photoUrl) {
                    setUserProfilePic(photoUrl);
                }
                if (name) {
                    setUsername(name);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchAndSetBoards();
        fetchUserData();
    }, []);

    const handleNextMove = () => {
        if (index < boards.length - 1) {
            const nextIndex = index + 1;
            setIndex(nextIndex); // Update index
            setBoard(boards[nextIndex]); // Update board state
            // Update trainer message if available
                setCurrentMessage(trainerMessages[nextIndex]);
                setAdvantage(BlackAdvantages[nextIndex]);
        } else {
            console.log("Reached the end of the game!");
        }
    };

    const handlePrevMove = () => {
        if (index > 0) {
            const prevIndex = index - 1;
            setIndex(prevIndex); // Update index
            setBoard(boards[prevIndex]); // Update board state
            // Update trainer message if available
            if (trainerMessages && trainerMessages[prevIndex]) {
                setCurrentMessage(trainerMessages[prevIndex]);
            }
        } else {
            console.log("Reached the start of the game!");
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.TextContainer}>
                {/* Game Title */}
                <View style={styles.GameTitleSection}>
                    <Text style={styles.GameTitleText}>Game {GameNum}</Text>
                </View>

                {/* Player Section */}
                <View style={[styles.PlayerInfoSection, styles.PlayerAlign]}>
                    <Image 
                        source={{ uri: userProfilePic }} 
                        style={styles.ProfilePic} 
                    />
                    <View style={styles.TitleContainer}>
                        <Text style={styles.GameTitle}>{username}</Text>
                        <Text style={styles.EloText}>ELO: {elo}</Text>
                        <Text style={styles.AdvantageText}>+{WhiteMaterialAdvantage}</Text>
                    </View>
                </View>

                {/* Chessboard */}
                <View>
                    <Chessboard board={board} />
                    <AdvantageBar advantage={advantage} />
                </View>

                {/* Opponent Section */}
                <View style={[styles.PlayerInfoSection, styles.OpponentAlign]}>
                    <Image 
                        source={botImage}
                        style={styles.ProfilePic} 
                    />
                    <View style={styles.TitleContainer}>
                        <Text style={styles.GameTitle}>Cool Bot</Text>
                        <Text style={styles.EloText}>ELO: {opponentElo}</Text>
                        <Text style={styles.AdvantageText}>+{BlackMaterialAdvantage}</Text>
                    </View>
                </View>

                {/* Arrows */}
                <View style={styles.ArrowsContainer}>
                    <Pressable style={styles.ArrowContainer} onPress={handlePrevMove}>
                        <AntDesign style={{}} name="arrowleft" size={24} color="black" />
                    </Pressable>
                    <Pressable style={styles.ArrowContainer} onPress={handleNextMove}>
                        <AntDesign name="arrowright" size={24} color="black" />
                    </Pressable>
                </View>

                {/* Trainer Message Box */}
                <View style={styles.TrainerMessageContainer}>
                    <View style={styles.MessageBox}>
                        <Text style={styles.MessageText}>{currentMessage || "Nice Move"}</Text>
                    </View>
                    <Image 
                        source={trainerImage}
                        style={styles.TrainerImage}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

async function FetchGames(GameNumber: number): Promise<{ boards: string[][], trainerMessages: string[], playerElo?: number, opponentElo?: number, BlackAdvantages?: number[], materialAdvantage?: number }> {
    try {
        const Game = await getGames(); // Fetch game data
        let slicedGame = Game["Game" + GameNumber]; // Get the game data
        console.log("Sliced Game:", slicedGame);
        if (slicedGame) {
            const Moves = slicedGame.Moves;
            const TrainerMessages = slicedGame["Trainer Messages"] || []; // Get trainer messages from the specific game
            let isPlayerWhite = slicedGame["White_Player_ID"] === slicedGame["Current_Player_ID"];
            console.log("Moves:", Moves);
            console.log("ChessGame:", ChessGame(Moves));
            console.log("Trainer Messages:", TrainerMessages);
            let boards: string[][] = [];
            for(const board of ChessGame(Moves)){
                boards.push(board.split(""));
            }
            let BlackAdvantages: number[] = [];
            for(const BlackAdv of slicedGame["Victory Probabilities"]){
                if(isPlayerWhite){
                    BlackAdvantages.push(parseInt(BlackAdv.replace('%', '')));
                }
                else{
                    BlackAdvantages.push(100 - parseInt(BlackAdv.replace('%', '')));
                }
            }

            return {
                boards,
                trainerMessages: TrainerMessages,
                playerElo: slicedGame["White Elo"],
                opponentElo: slicedGame["Black Elo"],
                BlackAdvantages: BlackAdvantages,
                materialAdvantage: slicedGame["Material Advantages"]
            };
        } else {
            throw new Error("Game data or Moves is undefined.");
        }
    } catch (error) {
        console.error("Error in FetchGames:", error);
        return { boards: [], trainerMessages: [], BlackAdvantages: [], materialAdvantage: 0 };
    }
}

const styles = StyleSheet.create({
    TextContainer:{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        alignSelf: "center",
        marginTop: 40,
        width: "100%",
    },
    GameTitleSection: {
        width: "100%",
        alignItems: "center",
        paddingVertical: 20,
        marginBottom: 60,
        backgroundColor: "#e74c3c",
        shadowColor: "#000",
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    GameTitleText: {
        fontSize: 20,
        fontWeight: "800",
        color: "white",
        textTransform: "uppercase",
        letterSpacing: 2,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
    },
    PlayerInfoSection: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        width: "auto",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    PlayerAlign: {
        alignSelf: "flex-start",
        marginLeft: 20,
    },
    OpponentAlign: {
        alignSelf: "flex-end",
        marginRight: 20,
        marginBottom: 50,
    },
    ProfilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    TitleContainer: {
        flexDirection: "column",
    },
    GameTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 4,
    },
    EloText: {
        fontSize: 10,
        color: "#666",
        fontWeight: "500",
    },
    AdvantageText: {
        fontSize: 12,
        color: "grey",
        fontWeight: "200",
        marginTop: 2,
    },
    Feedback: {
        fontStyle: "italic",
        fontSize: 14,
        marginVertical: 10,
        color: "#444",
    },
    ArrowsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        paddingHorizontal: 10,
        alignSelf: "center",
        marginTop: 10,
    },
    ArrowContainer: {
        flex: 1,
        alignItems: "center",
        width: 50,
        height: 50,
        justifyContent: "center",
        borderColor: "black",
        borderWidth: 1,
        marginVertical: 10,
        marginHorizontal: 40,
    },
    TrainerMessageContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 50,
    },
    MessageBox: {
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderRadius: 15,
        width: '80%',
        maxHeight: 120,
        marginRight: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        borderBottomLeftRadius: 0,
    },
    MessageText: {
        fontSize: 12,
        color: 'grey',
        lineHeight: 12,
        fontWeight: '400',
        textAlign: "center",
        fontFamily: "Poppins-Regular",
        fontStyle: "italic",
    },
    TrainerImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginBottom: -10, // Slightly adjust the image position
    },
    advantageContainer: {
        position: 'absolute',
        right: -70,
        top: '50%',
        transform: [{ translateY: -100 }],
        alignItems: 'center',
        zIndex: 1,
    },
    advantageBar: {
        width: 20,
        height: 200,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    advantageFill: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        borderRadius: 10,
    },
});

