import { Dimensions, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native"

//Init Device Variables
    const dimensions = Dimensions.get('window');
    const Height = dimensions.height ;
    const Width = dimensions.width;
    const StatusBarHeight = 0;

export default function SignUpPage(){
    
    return(
        <SafeAreaView style = {{backgroundColor: "#F1F1F1", height: "100%"}}>
            {/* Top Title View */}
            <View style= {styles.TitleContainer}>
                <Text style={styles.TitleText}>Sign up</Text>
            </View>

            {/* Text Fields */}
            <View style ={styles.FieldContainers}>
                <Text style={styles.FieldTitles}>Username: </Text>
                <TextInput style ={styles.FieldPlaceHolders}></TextInput>
            </View>

            <View style ={styles.FieldContainers}>
                <Text style={styles.FieldTitles}>Email: </Text>
                <TextInput style ={styles.FieldPlaceHolders}></TextInput>
            </View>

            <View style ={styles.FieldContainers}>
                <Text style={styles.FieldTitles}>Password: </Text>
                <TextInput style ={styles.FieldPlaceHolders}></TextInput>
            </View>

            {/* Security for password */}
            <View style={styles.SecurityGlobalContainer}>
                <View style = {styles.SecurityTextContainer}>
                    <Text style={styles.SecutityTitle}>Security : </Text>
                    <Text style = {styles.SecuritySubTitle}>Your password must contain characters, symbols and numbers</Text>
                </View>

                <View style = {styles.SecurityColorViewsContainer}>
                    <View style= {styles.SecurityColorViews}/>
                    <View  style= {styles.SecurityColorViews}/>
                    <View  style= {styles.SecurityColorViews}/>
                </View>
            </View>

            <View style ={styles.FieldContainers}>
                <Text style={styles.FieldTitles}>Re-Type Password: </Text>
                <TextInput style ={styles.FieldPlaceHolders}></TextInput>
            </View>

            {/* Sign Up button */}
            <View style = {styles.SignUpButtonContainer}>
                <Pressable style = {styles.SignUpButton}>
                    <Text style = {styles.SignUpButtonText}>Sign up</Text>
                </Pressable>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    TitleContainer: {
        height: Height*0.32,
        backgroundColor: "#FF5757"
    },
    TitleText : {
        fontSize: 35,
        color: "white",
        fontWeight: "800",
        textAlign: "center",
        marginTop: Height*0.2
    },

    FieldContainers:{
        width: "90%",
        alignSelf: "center",
        marginTop: Height*0.03

    },
    FieldTitles:{
        fontWeight: "800"

    },
    FieldPlaceHolders: {
        marginTop: 5,
        height: Height*0.05,
        borderWidth: 0.8,
        borderRadius: 5
    },

    SignUpButtonContainer : {
        marginTop: Height*0.04,
        height: 50,
        justifyContent: "center",
        alignItems: "center"

    },
    SignUpButton: {
        backgroundColor: "#FF5757",
        height: "100%",
        width: "90%",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10

    },
    SignUpButtonText : {
        fontWeight: "bold",
        color: "white",


    },

    SecurityGlobalContainer: {
        width: "90%",
        alignSelf: "center"

    },
    SecurityTextContainer: {

    },
    SecutityTitle:{
        fontWeight: "bold"

    },
    SecuritySubTitle: {
        fontSize: 10,
        textAlign: "center"

    },
    SecurityColorViewsContainer: {
        flexDirection: "row",
        justifyContent: "space-around"

    },
    SecurityColorViews: {
        width: "33%",
        height: 10,
        backgroundColor: "black",
        borderRadius: 5
    }

});

