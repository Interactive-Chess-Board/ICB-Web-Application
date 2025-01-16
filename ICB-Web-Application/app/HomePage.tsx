import { View, Dimensions, Text, StyleSheet, Pressable, Image, Button } from "react-native";
import Svg, { Path } from "react-native-svg"
import TopShape from "../assets/images/HomePage/HomePageShape.svg";
import LISTSVG from "../assets/images/HomePage/listIcon.svg";
import HomepagePlayImage from "../assets/images/HomePage/HomepagePlayImage.png"
import { SafeAreaView, StatusBar } from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { getUserData, getUserPhoto } from "./config/firebase";
import ChessGame from "./config/ChessGame";


const dimensions = Dimensions.get('window');
const Height = dimensions.height;
const Width = dimensions.width;
const StatusBarHeight = 0;



export default function Homepage(){
    const [UserUsername, setUserUsername] = useState("");
    const [UserPhoto, setUserPhoto] = useState("");

    //Set Username
    useEffect(() => {
        getUserData().then((data) => {
            setUserUsername(data? data.Username : "User");
        });
    }, []);

    //Set User Photo
    useEffect(() => {
        getUserPhoto().then((data) => {
            setUserPhoto(data? data : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png");
        });
    }, []);

    //test the board
    return(
        <SafeAreaView style = {{backgroundColor: "#F1F1F1", height: "100%"}}>
        
        {/* Top Page */}
        <View style = {styles.RedBox} />
            <View>
                <View style = {styles.TopBarContainer}>
                    {/* Welcome message */}
                    <View>
                    <Text style = {styles.WelcomeText}>{"Hi " + UserUsername + "!"}</Text>
                    </View>

                    {/* Profile Picture */}
                    <View>
                        <Image style = {{width: 45, height: 45, borderRadius: 20}} source={{uri: UserPhoto}}></Image>
                    </View>
                </View>
        </View>


        {/* Play But */}
        <Pressable onPress={() => console.log("test")} style = {styles.PlayImageContainer}>
                    <Image style = {styles.PlayImage} source={require("../assets/images/HomePage/HomepagePlayImage.png")}></Image>

                    <View style={styles.PlayOverlayContainer}>
                    </View>

                    <View style = {styles.PlayTextContainer}>
                        <Text style = {styles.PlayText}>Play</Text>
                        <Text style = {styles.PlaySubText}>SubTitle</Text>
                    </View>

        </Pressable>


        {/* Want to Improve? */}
        <View style = {styles.ImproveContainer}>
            <Text style = {styles.ImproveText}>Want to improve?</Text>
            <Text style = {styles.ImproveSubText}>Check the analysis of your last game</Text>
        </View>

        {/* Last Game Stats */}
        <View style = {styles.LastGameContainer}>
            <Text style = {styles.GameNumberText}> Game Number 0</Text>

            <View style={styles.StatisticsContainer}>
                <View>
                    <Image style = {styles.IconsSmiley} source={require("../assets/images/HomePage/Smile.png")}></Image>
                    <Text style = {styles.StatisticNumbers}>8</Text>
                    <Text style={styles.StatisticsTexts}>Good Moves</Text>
                </View>

                <View>
                    <Image style = {styles.IconsSmiley} source={require("../assets/images/HomePage/Smile.png")}></Image>
                    <Text style = {styles.StatisticNumbers}>8</Text>
                    <Text style={styles.StatisticsTexts}>Good Moves</Text>
                </View>

                <View>
                    <Image style = {styles.IconsSmiley} source={require("../assets/images/HomePage/Smile.png")}></Image>
                    <Text style = {styles.StatisticNumbers}>8</Text>
                    <Text style={styles.StatisticsTexts}>Good Moves</Text>
                </View>

            </View>

            <Pressable onPress={() => router.push("/Game")} style = {styles.GameNumberButton}><Text style = {styles.GameNumberButtonText}>See more</Text></Pressable>
            
        </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    RedBox:{
        backgroundColor: "#FF4E4E",
        height: Height*0.2,
        width: "100%",
        position: "absolute",
        top: 0,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        },
    WelcomeText: {
        color: "white",
        fontWeight: "800",
        fontSize: 20,
    },
    
    svgListContainer:{
    },

    PlayOverlayContainer :{
        position: "absolute",
        width: Width*0.9,
        height: "100%",
        borderRadius: 10,
        opacity: 0.5,
        backgroundColor: "black",

    },

    PlayTextContainer: {
        position: "absolute",
        width: Width*0.9,
        height: "50%",

    },

    LastGameContainer: {
        marginTop: 20,
        height: Height*0.2,
        width: Width*0.9,
        borderRadius: 8,
        backgroundColor: "white",
        alignSelf: "center",
        elevation: 3
    },
    
    GameNumberText: {
        fontSize: 15,
        textAlign: "center",
        fontWeight: "800",
        marginTop:10,
    },
    PlayText: {
        fontSize: 30,
        fontWeight: "800",
        color: "white",
        marginLeft: 10
    },
    PlaySubText: {
        color: "white",
        marginLeft: 10,
        fontSize: 10

    },

    ImproveText: {
        fontSize: 20,
        fontWeight: "800"

    },
    ImproveSubText : {
        fontSize: 10

    },
    
    PlayImageContainer:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
        width: "100%",

    },

    ImproveContainer:{
        width: "100%",
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",

    },

    PlayImage: {
        width: Width*0.9,
        height: Width*0.6,
        borderRadius: 10,

    },

    TopBarContainer: {
        flexDirection: "row",
        top: StatusBarHeight,
        justifyContent: "space-between",
        paddingHorizontal: 18,
        alignItems: "center",
        borderRadius: 10,
        marginTop: Height*0.1
    },
    SvgContainer:{
        position: "absolute",
        top: -Height*0.35

    },
    ListSvg: {
    },
    GameNumberButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "black",
        marginHorizontal: "15%",
        borderRadius: 5,
        height:Height*0.04,
        elevation: 3,

    },
    GameNumberButtonText: {
        fontSize: 12,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',

    },
    IconsSmiley:{
        width: 30,
        height: 30,
        alignSelf: "center"
    },
    StatisticsContainer :{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "90%",
        alignSelf: "center",
        padding: 2
    },
    StatisticsTexts: {
        textAlign: "center"

    },
    StatisticNumbers: {
        textAlign: "center"

    }

})