import { View, Dimensions, Text, SafeAreaView, Image, StyleSheet } from "react-native";

//Init Device Variables
const dimensions = Dimensions.get('window');
const Height = dimensions.height ;
const Width = dimensions.width;
const StatusBarHeight = 0;

export default function Bluetooth(){
    return(
        <SafeAreaView>
            {/* All the middle content */}
            <View style = {styles.MiddleContainer}>
                <Text style={styles.Title}>Connecting...</Text>
                <Text style ={styles.SubTitle}>We're connecting you to the board, make sure that your bluetooth is enabled</Text>

                {/* Bluetooth Icon */}
                <View style = {styles.ImageContainer}>
                    <Image style={styles.Image} source= {require("../assets/images/Bluetooth/BluetoothIcon.png")} />
                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    MiddleContainer: {
        width: "110%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",

    },
    Title : {
        fontSize: 30,
        fontWeight: "bold"
    },
    SubTitle : {
        textAlign: "center",
        fontSize: 10,
        color: "grey"

    },
    ImageContainer : {

    },
    Image : {
        width: 250,
        height: 250
    }
})

