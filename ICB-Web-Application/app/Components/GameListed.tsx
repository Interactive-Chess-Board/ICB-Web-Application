import { SafeAreaView, StyleSheet, View, Text, Image, Pressable, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { contain } from "three/src/extras/TextureUtils";
import { getUserPhoto } from "../config/firebase";
import { router } from "expo-router";
import { GestureDetector, GestureHandlerRootView, Gesture } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from "react-native-reanimated";

interface GameListedProps {
    Title: string;
    Result: number;
    BlackElo: number;
    WhiteElo: number;
    GameNum: number;
    index: number;
    currentIndex: number;
    backSignal: boolean;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
    setBackSignal: React.Dispatch<React.SetStateAction<boolean>>;
}

//Get Dimonsions of the screen
const dimensions = Dimensions.get('window');
const Height = dimensions.height;
const Width = dimensions.width;


export const GameListed: React.FC<GameListedProps> = ({ Title, Result, BlackElo, WhiteElo,GameNum, index,currentIndex, backSignal , setCurrentIndex, setBackSignal }) => {
    const [userProfilePicUrl, setUserProfilePicUrl] = useState<string | null>("https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg");
    const [opponentProfilePicUrl, setOpponentProfilePicUrl] = useState<string | null>("https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg");
    const [userName, setUserName] = useState<string>("User 1");
    const [opponentName, setOpponentName] = useState<string>("User 2");
    let isBack = false;
    
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

    //Gesture Handler Code
    const translateX = useSharedValue(0);
    const pan = Gesture.Pan()
        .onUpdate((e) => {
            //Called after each update of the gesture
            console.log("Back Signal: ", backSignal);
            if(currentIndex === index && currentIndex !=1) translateX.value = e.translationX;
        })
        .onEnd((e) => {
            //Called when the gesture ends
            if(currentIndex === index && Math.abs(e.translationX) > 150 && currentIndex !=1) {
                translateX.value = e.translationX>0? withTiming(Width,{duration: 500}) : withTiming(-Width,{duration: 500});
                runOnJS(setCurrentIndex)(currentIndex-1);
            }
            else {
                translateX.value = withTiming(0,{duration: 500});
            }
        });
    const SlidingAnimation = useAnimatedStyle(()=> {
        //Handle Back Signal
        if (backSignal && currentIndex + 1 === index) {
            console.log("Back Signal: ", backSignal);
            console.log("I'm going back");
    
            return {
                transform: [{
                    translateX: withTiming(0, { duration: 500 }, () => {
                        // Executed after animation finishes to prevent a change of state during animation
                        runOnJS(setCurrentIndex)(currentIndex + 1); 
                        runOnJS(setBackSignal)(false); 
                        translateX.value = 0;
                    }),
                }],
            };
        }
            return {
                transform: 
                [
                    { translateX: translateX.value },
    
                ],
            };
        });

    return (
        //router.push({ pathname: "/Game", params: { GameNum }})
        
        <GestureHandlerRootView>

        <GestureDetector gesture={pan}>

        <Animated.View style={[styles.container, SlidingAnimation]}>
            <Text style = {styles.title}>{"Game " + Title.split("Game")[1]}</Text>

            {/* Profile Picture */}
            <View>
                <Image source={{ uri: userProfilePicUrl || "" }} style={{ width: 50, height: 50, borderRadius: 50 / 2, margin: 10, alignSelf: "center" }} />

                <View style={{ backgroundColor: "#FF4E4E", height: 95, width:"80%", borderRadius: 10, marginTop: 10, justifyContent: "center", borderWidth: 0.5, borderColor: "black"}}>
                    <Text style = {{textAlign: "center", fontSize: 15, fontWeight: "600", color: "white"}}>{resultText}</Text>
                </View>
            </View>
        </Animated.View>

        </GestureDetector>

        </GestureHandlerRootView>

    );

};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: Width*0.7,
        height: Height*0.5,
        alignSelf: "center",
        marginTop: Height*0.1,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#FF4E4E",
        position: "absolute"

    },
    title: {
        fontSize: 20,
        fontWeight: "800",
        textAlign: "center",
        marginTop: 10,
        color: "black",
    },

})