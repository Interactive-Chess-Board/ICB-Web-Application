import { SafeAreaView, View, ScrollView, StyleSheet, Dimensions, Text, PanResponder } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView, Pressable } from "react-native-gesture-handler";
import { GameListed } from "./Components/GameListed";
import { useEffect, useState, useRef } from "react";
import { getGames } from "./config/firebase";
import Animated, { useAnimatedStyle, withTiming, Easing, useSharedValue } from "react-native-reanimated";

interface Game {
    BlackElo: number;
    Moves: string;
    Result: number;
    White: boolean;
    White_Elo: number;
    index: number;
    currentIndex: number;
}

interface Games {
    [key: string]: Game;
}

//get the height and width of the screen
const dimensions = Dimensions.get('window');
const Height = dimensions.height;
const Width = dimensions.width;


export default function GamesList() {
    const [games, setGames] = useState<Games | null>(null);
    const [counter, setCounter] = useState(0);
    const [gameLastKey, setGameLastKey] = useState<number | null>(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const[backSignal, setBackSignal] = useState(false);

    useEffect(() => {
        const fetchAndSetGames = async () => {
            try {
                const fetchedGames = await getGames();
                if (fetchedGames) {
                    setGames((prevGames) => ({ ...prevGames, ...fetchedGames })); // Merge old + new games
                    setCurrentIndex(Object.keys(fetchedGames).length - 1);
                } else {
                    console.error("No games fetched!");
                }
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        };
        fetchAndSetGames();
    }, []);

    
    //Gesture Handler
    const translateX = useSharedValue(0);
    const pan = Gesture.Pan()
    .onUpdate((e) => {
        translateX.value = e.translationX;
    })

    const SlidingAnimation = useAnimatedStyle(() => {
        return {
            transform: 
            [
                { translateX: translateX.value },

            ],
        };
    });

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView>
                <View style={styles.TopBar}>
                    <Text style={styles.Title}>Past Games</Text>
                </View>
    
                <View>
                    <View style={[styles.CardContainerOne, { transform: [{ rotate: "-10deg" }], backgroundColor: "#dbdbdb" }]} />
                    <View style={[styles.CardContainerOne, { transform: [{ rotate: "-5deg" }], backgroundColor: "#ededed" }]} />
                    {games && Object.keys(games).map((gameKey, index) => (
                                <GameListed
                                    Title={gameKey}
                                    GameNum={index + 1}
                                    Result={games[gameKey].Result}
                                    WhiteElo={games[gameKey].White_Elo}
                                    BlackElo={games[gameKey].BlackElo}
                                    index={index}
                                    backSignal={backSignal}
                                    currentIndex={currentIndex}
                                    setCurrentIndex={setCurrentIndex}
                                    setBackSignal={setBackSignal}
                                />
                    ))}
                </View>
            </SafeAreaView>

            <Pressable onPress={() => {setBackSignal(true);}}>
                <Text>Back</Text>
            </Pressable>
        </GestureHandlerRootView>
    );
    
}

const styles = StyleSheet.create({
    TopBar: {
        height: Height * 0.25,
        width: Width,
        borderWidth: 1,
        borderColor: "#FF4E4E",
        borderRadius: 10,
        backgroundColor: "white"
    },
    Title: {
        fontSize: 24,
        fontWeight: '900',
        marginTop: "30%",
        alignSelf: 'center',
    },
    CardContainerOne: {
        transform: [{ rotate: '0deg' }],
        borderWidth: 1,
        width: Width * 0.7,
        height: Height * 0.5,
        marginTop: Height * 0.1,
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: "white",
        borderColor: "#FF4E4E",
        position: 'absolute',
    }
});