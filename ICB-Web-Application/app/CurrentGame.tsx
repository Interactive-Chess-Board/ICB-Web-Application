import { Button, Pressable, View, StyleSheet, Text, Image, SafeAreaView } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Draw, Resign, getGames, getUserPhoto, getUsername, timerPressBlack, timerPressWhite, getCurrentGame, getUserData } from "./config/firebase";
import { useState, useEffect } from "react";
import { ChessGame } from "./config/ChessGame";
import Chessboard from "./Components/Chessboard";
import { useLocalSearchParams } from 'expo-router';

const botImages = [
    require("../assets/images/Bots/RobotI.jpg"),
    require("../assets/images/Bots/RobotII.jpg"),
    require("../assets/images/Bots/RobotI.webp"),
];

// Timer Component
function Timer({ minutes, seconds, active, color }: { minutes: number, seconds: number, active: boolean, color: string}) {
    const [timeLeft, setTimeLeft] = useState(minutes * 60 + seconds);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (active && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [active, timeLeft]);

    const displayMinutes = Math.floor(timeLeft / 60);
    const displaySeconds = timeLeft % 60;
    const formattedTime = `${displayMinutes.toString().padStart(2, '0')}:${displaySeconds.toString().padStart(2, '0')}`;

    return (
        <View style={[styles.timerContainer, { backgroundColor: color }]}>
            <Text style={[styles.timerText, {color: color=="white" ? "black" : "white"}]}>{formattedTime}</Text>
        </View>
    );
}

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
            {/* <Text style={styles.advantageText}>
                {isWhiteAdvantage ? `White +${Math.round((percentage - 50) * 2)}%` : `Black +${Math.round((50 - percentage) * 2)}%`}
            </Text> */}
        </View>
    );
}

export default function CurrentGame() {
    const params = useLocalSearchParams();
    const selectedMinutes = Number(params.selectedMinutes) || 0;
    const selectedSeconds = Number(params.selectedSeconds) || 0;

    const [board, setBoard] = useState<string[]>(["p"]); // Current board state
    const [boards, setBoards] = useState<string[]>([]); // All boards
    const [index, setIndex] = useState(0); // Current move index
    const [userProfilePic, setUserProfilePic] = useState<string>("https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg");
    const [username, setUsername] = useState<string>("Player");
    const [elo, setElo] = useState<number>(0);
    const [opponentElo, setOpponentElo] = useState<number>(0);
    const [advantage, setAdvantage] = useState<number>(50); // 50 means equal position
    const [botImage] = useState(botImages[Math.floor(Math.random() * botImages.length)]);
    const [startMaterialAdvantage, setStartMaterialAdvantage] = useState<number>(0);
    const [WhiteMaterialAdvantage, setWhiteMaterialAdvantage] = useState<number>(0);
    const [BlackMaterialAdvantage, setBlackMaterialAdvantage] = useState<number>(0);

    //White Player Photo URL and Username
    const [whitePlayerPhoto, setWhitePlayerPhoto] = useState<string>("");
    const [whitePlayerUsername, setWhitePlayerUsername] = useState<string>("");

    //Black Player Photo URL and Username
    const [blackPlayerPhoto, setBlackPlayerPhoto] = useState<string>("");
    const [blackPlayerUsername, setBlackPlayerUsername] = useState<string>("");
    
    const [blackTimerActive, setBlackTimerActive] = useState(false);
    const [whiteTimerActive, setWhiteTimerActive] = useState(true);
    const [blackMinutes, setBlackMinutes] = useState(selectedMinutes);
    const [blackSeconds, setBlackSeconds] = useState(selectedSeconds);
    const [whiteMinutes, setWhiteMinutes] = useState(selectedMinutes);
    const [whiteSeconds, setWhiteSeconds] = useState(selectedSeconds);

    useEffect(() => {
        const fetchAndSetBoards = async () => {
            try {
                const fetchedData = await FetchGames();
                if (fetchedData.boards && fetchedData.boards.length > 0) {
                    setBoards(fetchedData.boards);
                    setBoard(fetchedData.boards); // Initialize with the first board
                    if (fetchedData.playerElo) {
                        setElo(fetchedData.playerElo);
                    }
                    if (fetchedData.opponentElo) {
                        setOpponentElo(fetchedData.opponentElo);
                    }
                    if(fetchedData.White_Player_ID){
                        getUserPhoto(fetchedData.White_Player_ID).then(photo => {
                            console.log("White Player Photo:", photo);
                            if (photo) { 
                                setWhitePlayerPhoto(photo);
                            }
                        });

                        getUsername(fetchedData.White_Player_ID).then(name => {
                            if (name) {
                                setWhitePlayerUsername(name);
                            }
                        });
                    }
                    if(fetchedData.Black_Player_ID){
                        getUserPhoto(fetchedData.Black_Player_ID).then(photo => {
                            if (photo) {
                                setBlackPlayerPhoto(photo);
                            }
                        });
                        getUsername(fetchedData.Black_Player_ID).then(name => {
                            if (name) {
                                setBlackPlayerUsername(name);
                            }
                        });
                    }
                    if(fetchedData.BlackAdvantage){
                        setAdvantage(fetchedData.BlackAdvantage);
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
        const intervalId = setInterval(fetchAndSetBoards, 5000); // Poll every 5 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);
    console.log("Selected Minutes:", selectedMinutes);
    console.log("Selected Seconds:", selectedSeconds);

    return (
        <SafeAreaView>
            <View style={styles.TextContainer}>
                {/* Top Container */}
                <View style={styles.TopBarContainer}>
                    <Text style={styles.Title}>Game</Text>
                </View>

                {/* Player Section with Timer */}
                <View style={styles.playerSectionWithTimer}>
                    <View style={styles.timerWrapper}>
                        <Timer 
                            minutes={blackMinutes} 
                            seconds={blackSeconds} 
                            active={blackTimerActive} 
                            color="black"
                        />
                    </View>
                    <View style={[styles.PlayerInfoSection, styles.PlayerAlign]}>
                        <Image 
                            source={blackPlayerPhoto ? { uri: blackPlayerPhoto } : botImage} 
                            style={styles.ProfilePic} 
                        />
                        <View style={styles.TitleContainer}>
                            <Text style={styles.GameTitle}>{blackPlayerUsername || "Black Player"}</Text>
                            <Text style={styles.EloText}>ELO: {opponentElo}</Text>
                            <Text style={styles.AdvantageText}>+{BlackMaterialAdvantage}</Text>
                        </View>
                    </View>
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

                {/* Black Timer Button */}
                <View style={styles.TimerButtonContainer}>
                    <Pressable 
                        onPress={async () => {
                            await timerPressBlack();
                            setWhiteTimerActive(true);
                            setBlackTimerActive(false);
                        }} 
                        style={[styles.TimerButton, { backgroundColor: "red" }]}
                    >
                        <MaterialCommunityIcons name="timer" size={24} color="white" />
                    </Pressable>
                </View>

                <View>
                    <Chessboard board={board} />
                    <AdvantageBar advantage={advantage} />
                </View>

                {/* White Timer Button */}
                <View style={styles.TimerButtonContainer}>
                    <Pressable onPress={async () => {
                        await timerPressWhite();
                        setWhiteTimerActive(false);
                        setBlackTimerActive(true);
                    }} 
                    style={[styles.TimerButton, { backgroundColor: "red" }]}>
                        <MaterialCommunityIcons name="timer" size={24} color="white" />
                    </Pressable>
                </View>

                {/* Black Buttons */}
                <View style={styles.BlackButtons}>
                    <Pressable onPress={async () => Resign("Black")} style={[styles.ButtonsContainer, { backgroundColor: "black" }]}>
                        <AntDesign name="flag" size={24} color="white" />
                    </Pressable>

                    <Pressable onPress={async () => Draw("Black")} style={[styles.ButtonsContainer, { backgroundColor: "black" }]}>
                        <MaterialCommunityIcons name="hexagon-slice-3" size={24} color="white" />
                    </Pressable>
                </View>

                {/* Opponent Section with Timer */}
                <View style={styles.playerSectionWithTimer}>
                    <View style={[styles.PlayerInfoSection, styles.OpponentAlign]}>
                        <Image 
                            source={whitePlayerPhoto ? { uri: whitePlayerPhoto } : botImage}
                            style={styles.ProfilePic} 
                        />
                        <View style={styles.TitleContainer}>
                            <Text style={styles.GameTitle}>{whitePlayerUsername || "White Player"}</Text>
                            <Text style={styles.EloText}>ELO: {elo}</Text>
                            <Text style={styles.AdvantageText}>+{WhiteMaterialAdvantage}</Text>
                        </View>
                    </View>
                    <View style={styles.timerWrapper}>
                        <Timer 
                            minutes={whiteMinutes} 
                            seconds={whiteSeconds} 
                            active={whiteTimerActive} 
                            color="white"
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

async function FetchGames(): Promise<{ boards: string[], playerElo?: number, opponentElo?: number, White_Player_ID?: string, Black_Player_ID?: string, BlackAdvantage?: number, materialAdvantage?: number}> {
    try {
        const Game = await getGames(); // Fetch game data
        const CurrentGame = await getCurrentGame(); //Get the current game
        console.log("Current Game:", CurrentGame);
        const userData = await getUserData();
        let numberOfGames: number = userData["Games Played"];
        console.log("Number of Games:", numberOfGames);

        // Get the current game data
        const currentGameKey = `Game${numberOfGames}`;
        const slicedGame = Game[currentGameKey];
        
        console.log("Current Game Data:", slicedGame);
        
        if (slicedGame) {
            const Moves = slicedGame.Moves;
            console.log("Moves:", Moves);
            const Boards: string[] = ChessGame(Moves)[ChessGame(Moves).length - 1].split(""); // Generate boards
            const isPlayerWhite = slicedGame["White_Player_ID"] === CurrentGame["White_Player_ID"];

            const PlayerAdvantage: string = slicedGame["Victory Probabilities"][slicedGame["Victory Probabilities"].length - 1].replace('%', '');
            const BlackAdvantage = isPlayerWhite ? 100 - parseInt(PlayerAdvantage) : parseInt(PlayerAdvantage);
            console.log("Black Advantage:", BlackAdvantage);

            return {
                boards: Boards,
                playerElo: slicedGame["White Elo"],
                opponentElo: slicedGame["Black Elo"],
                White_Player_ID: CurrentGame["White_Player_ID"],
                Black_Player_ID: CurrentGame["Black_Player_ID"],
                BlackAdvantage: BlackAdvantage,
                materialAdvantage: slicedGame["Material Advantages"],
            };
        } else {
            throw new Error("Game data or Moves is undefined.");
        }
    } catch (error) {
        console.error("Error in FetchGames:", error);
        return { boards: [] };
    }
}

const styles = StyleSheet.create({
    TextContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        width: "100%",
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
    ButtonsContainer: {
        width: 100,
        height: 40,
        borderColor: "black",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginRight: 20,
        marginLeft: 20,
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
        marginTop: 10,
    },
    TopBarContainer: {
        backgroundColor: "red",
        alignItems: "center",
        height: 100,
        borderRadius: 10,
        justifyContent: "center",
        width: "100%",
        marginBottom: 20,
    },
    Title: {
        fontSize: 25,
        fontWeight: "bold",
        color: "white",
    },
    TimerButtonContainer: {
        width: "100%",
        alignItems: "center",
        marginVertical: 10,
    },
    TimerButton: {
        width: "70%",
        height: 40,
        borderColor: "black",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
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
    advantageText: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        textAlign: 'center',
    },
    timerContainer: {
        padding: 10,
        borderRadius: 10,
        minWidth: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        width: 100,
        height: 50,
    },
    timerText: {
        fontSize: 20,
        fontWeight: '400',
        color: '#fff',
    },
    playerSectionWithTimer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
    },
    timerWrapper: {
        marginHorizontal: 10,
    },
});
