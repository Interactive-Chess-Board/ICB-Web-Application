import { View, Dimensions, Text, StyleSheet, Pressable, Image, Button } from "react-native";
import Svg, { Path } from "react-native-svg"
import TopShape from "../../assets/images/HomePage/HomePageShape.svg";
import LISTSVG from "../../assets/images/HomePage/listIcon.svg";
import HomepagePlayImage from "../../assets/images/HomePage/HomepagePlayImage.png"
import { SafeAreaView, StatusBar } from "react-native";


const dimensions = Dimensions.get('window');
const Height = dimensions.height + StatusBar.currentHeight;
const Width = dimensions.width;
const StatusBarHeight = StatusBar.currentHeight;

export default function Homepage(){
    
    return(
        <SafeAreaView style = {{backgroundColor: "#F1F1F1", height: "100%"}}>
        
        {/* Top Page */}
            <View style = {styles.SvgContainer}>
            <Svg
                width="100%"

            >
                <TopShape />
            </Svg>
            </View>

            <View>
                <View style = {styles.TopBarContainer}>

                {/* Welcome message */}
                <View>
                <Text style = {styles.WelcomeText}>Welcome !</Text>
                </View>
                
                
                {/* List Icon and profile Icon */}
                <View>

                    {/* ListIcon */}
                    
                    <Pressable onPress={() => console.log("Pressed")}>
                    <View style= {styles.svgListContainer}>
                        <Svg style = {styles.ListSvg}>
                            <LISTSVG />
                            
                        </Svg>
                    </View>
                    </Pressable>
                    

                </View>

                </View>
        </View>


        {/* Play But */}
        <Pressable onPress={() => console.log("test")} style = {styles.PlayImageContainer}>
                    <Image style = {styles.PlayImage} source={require("../../assets/images/HomePage/HomepagePlayImage.png")}></Image>

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
            <Pressable style = {styles.GameNumberButton}><Text style = {styles.GameNumberButtonText}>See more</Text></Pressable>
            
        </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    WelcomeText: {
        color: "white",
        fontWeight: "800",
        fontSize: 25,
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
        marginTop: Height*0.16,
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
        paddingHorizontal: 15,
        marginTop: Height*0.03,
        maxHeight: Height*0.1,
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

    }

})