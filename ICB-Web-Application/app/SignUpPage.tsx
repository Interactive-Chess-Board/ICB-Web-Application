import { Dimensions, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform, ScrollView, Animated, Easing } from "react-native";
import { HandleSignUp } from "./config/firebase";
import { useState, useEffect, useRef } from "react";

// Init Device Variables
const dimensions = Dimensions.get('window');
const Height = dimensions.height;
const Width = dimensions.width;
const StatusBarHeight = 0;

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [levelOfSecurity, setLevelOfSecurity] = useState(0);

    const slideAnim = useRef(new Animated.Value(Height)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 1000,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true,
        }).start();

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [slideAnim, fadeAnim]);

    return (
        <ScrollView style={{ backgroundColor: "#F1F1F1", height: "100%" }}>
            {/* Top Title View */}
            <Animated.View style={[styles.TitleContainer, { transform: [{ translateY: slideAnim }] }]}>
                <Text style={styles.TitleText}>Sign up</Text>
            </Animated.View>

            {/* Text Fields */}
            <Animated.View style={[styles.FieldContainers, { opacity: fadeAnim }]}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 0 }}>
                    <Text style={styles.FieldTitles}>Username: </Text>
                    <TextInput value={username} onChangeText={setUsername} style={styles.FieldPlaceHolders}></TextInput>
                </KeyboardAvoidingView>
            </Animated.View>

            <Animated.View style={[styles.FieldContainers, { opacity: fadeAnim }]}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 0 }}>
                    <Text style={styles.FieldTitles}>Email: </Text>
                    <TextInput value={email} onChangeText={setEmail} style={styles.FieldPlaceHolders}></TextInput>
                </KeyboardAvoidingView>
            </Animated.View>

            <Animated.View style={[styles.FieldContainers, { opacity: fadeAnim }]}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 0 }}>
                    <Text style={styles.FieldTitles}>Password: </Text>
                    <TextInput value={password} onChangeText={setPassword} style={styles.FieldPlaceHolders}></TextInput>
                </KeyboardAvoidingView>
            </Animated.View>

            {/* Security for password */}
            <Animated.View style={[styles.SecurityGlobalContainer, { opacity: fadeAnim }]}>
                <View style={styles.SecurityTextContainer}>
                    <Text style={styles.SecutityTitle}>Security : </Text>
                    <Text style={styles.SecuritySubTitle}>Your password must contain characters, symbols and numbers</Text>
                </View>

                <View style={styles.SecurityColorViewsContainer}>
                    <View style={PasswordSecurity(password) >= 1 ? styles.SecurityColorViewsGreen : styles.SecurityColorViewsRed} />
                    <View style={PasswordSecurity(password) >= 2 ? styles.SecurityColorViewsGreen : styles.SecurityColorViewsRed} />
                    <View style={PasswordSecurity(password) >= 3 ? styles.SecurityColorViewsGreen : styles.SecurityColorViewsRed} />
                </View>
            </Animated.View>

            <Animated.View style={[styles.FieldContainers, { opacity: fadeAnim }]}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 0 }}>
                    <Text style={styles.FieldTitles}>Re-Type Password: </Text>
                    <TextInput style={styles.FieldPlaceHolders}></TextInput>
                </KeyboardAvoidingView>
            </Animated.View>

            {/* Sign Up button */}
            <Animated.View style={[styles.SignUpButtonContainer, { opacity: fadeAnim }]}>
                <Pressable onPress={() => HandleSignUp(email, password, username)} style={styles.SignUpButton}>
                    <Text style={styles.SignUpButtonText}>Sign up</Text>
                </Pressable>
            </Animated.View>
        </ScrollView>
    );
}

// Handle security for password
function PasswordSecurity(password: string) {
    let levelOfSecurity = 0;
    let hasNumber = false;
    let hasSymbol = false;
    let hasUpperCaseCharacter = false;

    let symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '-', '=', '{', '}', '[', ']', ':', ';', '"', "'", '<', '>', '?', ',', '.', '/', '|', '`', '~'];
    let upperCaseCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    for (let i = 0; i < password.length; i++) {
        if (symbols.includes(password[i]) && !hasSymbol) {
            hasSymbol = true;
            levelOfSecurity++;
        }
        if (upperCaseCharacters.includes(password[i]) && !hasUpperCaseCharacter) {
            hasUpperCaseCharacter = true;
            levelOfSecurity++;
        }
        if (numbers.includes(password[i]) && !hasNumber) {
            hasNumber = true;
            levelOfSecurity++;
        }
    }

    return levelOfSecurity;
}

const styles = StyleSheet.create({
    TitleContainer: {
        height: Height * 0.32,
        backgroundColor: "#FF5757",
        borderRadius: 30,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    TitleText: {
        fontSize: 35,
        color: "white",
        fontWeight: "800",
        textAlign: "center",
        marginTop: Height * 0.2
    },

    FieldContainers: {
        width: "90%",
        alignSelf: "center",
        marginTop: Height * 0.03

    },
    FieldTitles: {
        fontWeight: "800"

    },
    FieldPlaceHolders: {
        marginTop: 5,
        height: Height * 0.05,
        borderWidth: 0.8,
        borderRadius: 5
    },

    SignUpButtonContainer: {
        marginTop: Height * 0.04,
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
    SignUpButtonText: {
        fontWeight: "bold",
        color: "white",


    },

    SecurityGlobalContainer: {
        width: "90%",
        alignSelf: "center"

    },
    SecurityTextContainer: {

    },
    SecutityTitle: {
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
    SecurityColorViewsRed: {
        width: "33%",
        height: 10,
        backgroundColor: "red",
        borderRadius: 5
    },
    SecurityColorViewsGreen: {
        width: "33%",
        height: 10,
        backgroundColor: "green",
        borderRadius: 5
    },


});
