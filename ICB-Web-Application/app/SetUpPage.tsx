import { SafeAreaView, Text, View, StyleSheet, Dimensions, Image, Pressable, Modal, TextInput, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import Svg, { Path } from "react-native-svg"
import { RotateOutDownLeft } from "react-native-reanimated";
import { Picker } from '@react-native-picker/picker';
import ProfileInfo from "./Components/ProfileInfo";
import { StartGame, endGame, getUserData, getUIDFromEmail, getUID, getUserPhoto } from "./config/firebase";
import AntDesign from '@expo/vector-icons/AntDesign';
import { set } from "firebase/database";

const dimensions = Dimensions.get('window');
const Height = dimensions.height;
const Width = dimensions.width;
const StatusBarHeight = 0;

export default function SetUpPage(){
    const [minutes, setMinutes] = useState<number>(5);
    const [seconds, setSeconds] = useState<number>(0);
    const [selectedMode, setSelectedMode] = useState<string>('Singleplayer');
    const [selectedAssistance, setSelectedAssistance] = useState<string>("Easy");
    const [userName, setUserName] = useState<string>("User1");
    const [oppName, setOppName] = useState<string>("NULL");
    const [modalVisible, setModalVisible] = useState(false);
    const [oppEmail, setOppEmail] = useState("");
    const [oppPassword, setOppPassword] = useState("");
    const [oppUID, setOppUID] = useState("NULL");
    const [oppPhoto, setOppPhoto] = useState("https://www.pngitem.com/pimgs/m/146-1462217_profile-icon-orange-png-transparent-png.png");
    const [UserPhoto, setUserPhoto] = useState("https://www.pngitem.com/pimgs/m/146-1462217_profile-icon-orange-png-transparent-png.png");

    useEffect(() => {
        // Get the username
        // setUserName(getUserName());
        getUserData().then((data) => {
            if (data) {
                setUserName(data.Username);
            }
        });

        //get photo
        getUserPhoto().then((data) => {
            if (data) {
                setUserPhoto(data);
            }
        });

        getUserPhoto(oppUID).then((data) => {
            if (data) {
                setOppPhoto(data);
            }
        });
    }
    ,[])
    console.log(userName);
    return(
        <SafeAreaView style = {{backgroundColor: "#F1F1F1", height: "100%"}}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {/* Top Page Title */}
                <View style= {styles.TitleContainer}>
                    <Text style = {styles.Title}>Set up</Text>
                </View>

                {/* Users that joined */}
                <View>
                    <Text style={styles.JoinedUsersText}>Users that joined:</Text>
                    <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                        <ProfileInfo UserName={userName} Uri={UserPhoto}/>
                        {oppName !== "NULL" && <ProfileInfo UserName={oppName}  Uri={oppPhoto}/>}
                        {oppName === "NULL" && 
                            <Pressable style={{alignItems: "center", justifyContent: "center"}} onPress={() => setModalVisible(true)}>
                                    <AntDesign name="pluscircle" size={70} color="black" />
                                    <Text style={{fontSize: 18, fontWeight: "bold"}}>Join Game</Text>
                            </Pressable>
                        }
                    </View>
                </View>
                <Modal visible={modalVisible} animationType="slide" transparent={true}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Enter Opponent Details</Text>
                            <TextInput 
                                style={styles.input} 
                                placeholder="Email" 
                                value={oppEmail} 
                                onChangeText={setOppEmail} 
                                keyboardType="email-address" 
                                autoCapitalize="none"
                            />
                            <TextInput 
                                style={styles.input} 
                                placeholder="Password" 
                                value={oppPassword} 
                                onChangeText={setOppPassword} 
                                secureTextEntry
                            />
                            <View style={styles.modalButtons}>
                                <Pressable onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </Pressable>
                                <Pressable onPress={() => {  
                                    setModalVisible(false);
                                    getUIDFromEmail(oppEmail,oppPassword).then((uid) => {
                                        if (uid) {
                                            getUserPhoto(uid).then((data) => {
                                                if (data) {
                                                    setOppPhoto(data);
                                                }
                                            });

                                            setOppUID(uid);
                                            
                                            getUserData(uid).then((data) => {
                                                if (data) {
                                                    setOppName(data.Username);
                                                }
                                            }
                                            );
                                        }
                                    });
                                    getUserData().then((data) => {
                                        if (data) {
                                            console.log("Opponent Name: " + data.Username);
                                        }
                                    });
                                }} style={styles.confirmButton}>
                                    <Text style={styles.buttonText}>Confirm</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* Mode Select */}
                <View style={styles.ModeSelectContainer}>
                    

                    <View>
                        <Text style={styles.ModeSelectText}>Select Mode:</Text>
                        <Picker
                            selectedValue={selectedMode}
                            style={styles.ModePicker}
                            onValueChange={(itemValue) => setSelectedMode(itemValue)}
                        >
                            <Picker.Item label="Singleplayer" value="Singleplayer" />
                            <Picker.Item label="Multiplayer" value="Multiplayer" />
                        </Picker>
                    </View>

                    <View>
                        <Text style={styles.ModeSelectText}>Select Assistance:</Text>
                        <Picker
                            selectedValue={selectedAssistance}
                            style={styles.ModePicker}
                            onValueChange={(itemValue) => setSelectedAssistance(itemValue)}
                        >
                            <Picker.Item label="Trainer Assisted" value="Trainer Assisted" />
                            <Picker.Item label="Easy" value="Easy" />
                            <Picker.Item label="Normal" value="Normal" />
                        </Picker>
                    </View>
                </View>

                {/* Timer */}
                <View style= {styles.TimersGlobalContainer}>

                    {/* Timer Display */}
                    {/* Minutes */}
                    <View>
                        {/* Arrow Up */}
                        <Pressable onPress={() => setMinutes(minutes+1)} style = {styles.ArrowUpContainer}>
                            <Image style={styles.ArrowUpImage}  source= {require("../assets/images/SetUpPage/arrowUp.png")} />
                        </Pressable>

                        {/* Timer Text */}
                        <View style ={styles.TimerContainer}>
                            <Text adjustsFontSizeToFit={true} numberOfLines={1} style = {styles.TimerText}>{minutes}</Text>
                        </View>

                        {/* Arrow Down */}
                        <Pressable onPress={() => setMinutes(minutes-1)} style = {[styles.ArrowUpContainer, styles.rotateDown]}>
                            <Image style={[styles.ArrowUpImage]}  source= {require("../assets/images/SetUpPage/arrowUp.png")} />
                        </Pressable>

                        </View>

                        {/* Seconds */}
                        <View>
                        {/* Arrow Up */}
                        <Pressable onPress={() => setSeconds(seconds+1)} style = {styles.ArrowUpContainer}>
                            <Image style={styles.ArrowUpImage}  source= {require("../assets/images/SetUpPage/arrowUp.png")} />
                        </Pressable>

                        {/* Timer Text */}
                        <View style ={styles.TimerContainer}>
                            <Text adjustsFontSizeToFit={true} numberOfLines={1} style = {styles.TimerText}>{seconds}</Text>
                        </View>

                        {/* Arrow Down */}
                        <Pressable onPress={() => setSeconds(seconds-1)} style = {[styles.ArrowUpContainer, styles.rotateDown]}>
                            <Image style={[styles.ArrowUpImage]}  source= {require("../assets/images/SetUpPage/arrowUp.png")} />
                        </Pressable>
                    </View>
                </View>

                {/* Button Start */}
                <Pressable onPress={async() => StartGame(selectedMode, minutes,seconds,selectedAssistance,oppUID)} style={styles.StartButton}>
                    <Text style={styles.StartText}>Start</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    )
}
function OnStart(){
    // Start the game

}

function LoginOppenent(){
    
}

const styles = StyleSheet.create({
    SvgContainer:{
        position: "absolute",
        top: -Height*0.35,
        backgroundColor: "#FF4E4E",
        height: Height*0.55,
        width: Width,

    },
    TitleContainer:{
        height: Height*0.25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FF4E4E",
        marginBottom: 30

    },
    Title : {
        fontSize: 30,
        color: "white",
        fontWeight: "bold"
    },
    TimerContainer:{
        backgroundColor: "white",
        width: Width*0.35,
        height: Height*0.10,
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
        marginBottom: 20,
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
    },
    ModeSelectContainer:{
        margin: 10,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10
    },
    ModeSelectText:{
        fontSize: 18,
        fontWeight: "bold",
        margin: 10,
    },
    ModePicker:{
        width: "100%",
        height: 60,
        backgroundColor: "#F1F1F1",
        borderRadius: 5
    },
    JoinedUsersText:{
        fontSize: 18,
        fontWeight: "bold",
        margin: 10
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center"
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
    },
    input: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 10
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    },
    cancelButton: {
        backgroundColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
        alignItems: "center"
    },
    confirmButton: {
        backgroundColor: "#FF4E4E",
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
        alignItems: "center"
    },
    buttonText: {
        color: "white",
        fontWeight: "bold"
    }
})