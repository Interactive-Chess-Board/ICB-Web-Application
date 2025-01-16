import { SafeAreaView, Text, View, StyleSheet, Dimensions, Image, Pressable, } from "react-native";
import { useState } from "react";
import Svg, { Path } from "react-native-svg"
import TopShape from "../assets/images/HomePage/HomePageShape.svg";
import { RotateOutDownLeft } from "react-native-reanimated";

const dimensions = Dimensions.get('window');
const Height = dimensions.height;
const Width = dimensions.width;
const StatusBarHeight = 0;

export default function SetUpPage(){
    return(
        <SafeAreaView style = {{backgroundColor: "#F1F1F1", height: "100%"}}>

             {/* Top Shape */}
             <View style = {styles.SvgContainer}>
            <Svg width="100%">
                <TopShape />
            </Svg>
            </View>
            
            {/* Top Page Title */}
            <View style= {styles.TitleContainer}>
                <Text style = {styles.Title}>Set up</Text>
            </View>

            {/* Users that joined */}
            <View>
                <Text style={styles.JoinedUsersText}>Users that joined:</Text>
            </View>

            {/* Timer */}
            <View style= {styles.TimersGlobalContainer}>

                {/* Timer Display */}
                {/* Minutes */}
                <View>
                    {/* Arrow Up */}
                    <View style = {styles.ArrowUpContainer}>
                        <Image style={styles.ArrowUpImage}  source= {require("../assets/images/SetUpPage/arrowUp.png")} />
                    </View>

                    {/* Timer Text */}
                    <View style ={styles.TimerContainer}>
                        <Text adjustsFontSizeToFit={true} numberOfLines={1} style = {styles.TimerText}>06</Text>
                    </View>

                    {/* Arrow Down */}
                    <View style = {[styles.ArrowUpContainer, styles.rotateDown]}>
                        <Image style={[styles.ArrowUpImage]}  source= {require("../assets/images/SetUpPage/arrowUp.png")} />
                    </View>

                    </View>

                    {/* Seconds */}
                    <View>
                    {/* Arrow Up */}
                    <View style = {styles.ArrowUpContainer}>
                        <Image style={styles.ArrowUpImage}  source= {require("../assets/images/SetUpPage/arrowUp.png")} />
                    </View>

                    {/* Timer Text */}
                    <View style ={styles.TimerContainer}>
                        <Text adjustsFontSizeToFit={true} numberOfLines={1} style = {styles.TimerText}>00</Text>
                    </View>

                    {/* Arrow Down */}
                    <View style = {[styles.ArrowUpContainer, styles.rotateDown]}>
                        <Image style={[styles.ArrowUpImage]}  source= {require("../assets/images/SetUpPage/arrowUp.png")} />
                    </View>
                </View>
            </View>

            {/* Button Start */}
            <Pressable style = {styles.StartButton}>
                <Text style = {styles.StartText}>Start</Text>
            </Pressable>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    SvgContainer:{
        position: "absolute",
        top: -Height*0.35,

    },
    TitleContainer:{
        height: Height*0.3,
        justifyContent: "center",
        alignItems: "center"

    },
    Title : {
        fontSize: 30,
        color: "white",
        fontWeight: "bold"
    },
    TimerContainer:{
        backgroundColor: "white",
        width: Width*0.35,
        height: Height*0.22,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        borderRadius: 5
    },
    TimerText:{
        fontSize: 60,
    },
    TimersGlobalContainer: {
        flexDirection: "row",
        justifyContent: "space-around"

    },
    ArrowUpContainer: {
        width: Width*0.35,
        height: Height*0.05,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0.5,
        borderRadius: 5,
        borderEndStartRadius: 0
    },
    ArrowUpImage: {
        width: 30,
        height: 30,

    },
    rotateDown:{
        transform: [{rotate: '180deg'}]
    },
    StartButton: {
        backgroundColor: "#FF4E4E",
        width: "90%",
        height: 50,
        borderRadius: 5,
        alignSelf: "center",
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center"

    },
    StartText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
    },
    JoinedUsersText:{
        fontSize: 18,
        fontWeight: "bold",
        margin: 10
    }
})