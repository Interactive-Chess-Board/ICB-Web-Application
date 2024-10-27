import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView, View } from "react-native";
import { Text, Image, StyleSheet, Button, Pressable } from "react-native";
import { SvgUri } from "react-native-svg";
import Svg, { Path } from "react-native-svg"
import LOGOSVG from "../../assets/images/Welcome/FallingPiece.svg";
import FallingPiece from "../../assets/images/Welcome/FallingPiece.png";
import { Dimensions, StatusBar } from "react-native";

const dimensions = Dimensions.get('window');
const imageHeight = dimensions.height ;
const imageWidth = dimensions.width;
export default function Welcome(){
    
    return(
        <SafeAreaView style={styles.safeArea}>

            {/* Images and svg's div */}
            <View style={styles.svgContainer}>
            <Svg
                width="100%"
                height="100%"
                style = {styles.svg}

            >
                <LOGOSVG />

            </Svg>
            </View>

            
            {/* Text div */}
            <View style={styles.otherContainer}>
                <Text style={styles.Title}>Interactive Chess</Text>
                <Text style={styles.SubTitle}>An immersive, interactive chess board bringing classic game to life with real-time strategy and dynamic features for all skill levels.</Text>

                <View style={styles.ButtonsContainer}>
                <Pressable onPress={() => console.log("hello")} style = {styles.LoginButton} ><Text style={styles.LoginText}>Login</Text></Pressable>
                <Pressable style = {styles.RegisterButton} ><Text style={styles.RegisterText}>Register</Text></Pressable>
                <Pressable style = {styles.GuestButton} ><Text style={styles.GuestText}>Play as guest</Text></Pressable>

                </View>
            </View>

            
        </SafeAreaView>
    );

   
}
const styles = StyleSheet.create({

    // Containers Styles
    safeArea: {
        flex: 0,
        justifyContent:"center",
        width: imageWidth,
        height: "auto"
    },
    svgContainer: {
        flex: 0,
        width: "auto",
        backgroundColor: "black",
        height: 600
    },
    otherContainer:{
        position: "absolute",
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        top: 470,
        width: "100%",
        height: 500


    },
    ButtonsContainer : {
        marginHorizontal: 30,
        marginTop: 20

    },

    // Text Styles
    Title: {
        fontSize: 25,
        fontWeight: "800",
        color: "#000000",
        textAlign: "center",
        marginTop: 20
    },
    SubTitle: {
        fontWeight: "100",
        textAlign: "center",
        marginHorizontal: "10%",
        marginTop: 5
    },

    LoginText:{
        color: 'white',
        fontWeight: "bold",
        textAlign: "center"

    },
    RegisterText:{
        textAlign: "center",
        fontWeight: "bold",

    },
    GuestText:{
        textAlign: "center",
        fontWeight: "bold",
        color: 'white',

    },

    //Button Styles
    LoginButton: {
        display: "flex",
        justifyContent: "center",
        marginVertical: 5,
        backgroundColor: 'black',
        width: "100%",
        height: 50,
        borderRadius: 10
    },
    RegisterButton: {
        display: "flex",
        justifyContent: "center",
        marginVertical: 5,
        backgroundColor: 'white',
        width: "100%",
        height: 50,
        borderRadius: 10,
        borderWidth: 1,

    },
    GuestButton: {
        display: "flex",
        justifyContent: "center",
        marginVertical: 5,
        backgroundColor: '#FF4E4E',
        width: "100%",
        height: 50,
        borderRadius: 10

    },

    //image style
    svg: {
        width: "100%",
        height: "100%"
    }

    
})