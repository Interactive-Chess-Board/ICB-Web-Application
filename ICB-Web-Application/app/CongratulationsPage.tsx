import React from 'react';
import { Dimensions, Pressable, SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const dimensions = Dimensions.get('window');
const Height = dimensions.height;
const Width = dimensions.width;

export default function CongratulationsPage() {
    return (
        <SafeAreaView style={styles.container}>
            {/* Profile Icon */}
            <View style={styles.profileIconContainer}>
                <Ionicons name="person-circle-outline" size={50} color="#FF5757" />
            </View>

            {/* Star Icon and Crowned Chess Piece */}
            <View style={styles.contentContainer}>
                <Ionicons name="star" size={50} color="#FFD700" style={styles.starIcon} />
                <Image 
                    source={{ uri: 'https://path_to_your_crowned_chess_piece_image' }} 
                    style={styles.chessPieceImage}
                />
            </View>

            {/* Congratulations Message */}
            <Text style={styles.congratulationsText}>CONGRATULATIONS!!!</Text>
            <Text style={styles.subText}>You just won 10 more extra points.</Text>

            {/* Continue Button */}
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>CONTINUE TO PLAY A GAME</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    profileIconContainer: {
        position: "absolute",
        top: 20,
        right: 20,
    },
    contentContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: Height * 0.05,
    },
    starIcon: {
        position: 'absolute',
        top: -50,
    },
    chessPieceImage: {
        width: 100,
        height: 150,
        resizeMode: "contain",
    },
    congratulationsText: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10,
    },
    subText: {
        fontSize: 14,
        textAlign: "center",
        marginBottom: Height * 0.05,
    },
    buttonContainer: {
        width: "90%",
    },
    button: {
        backgroundColor: "#FF5757",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
    },
    buttonText: {
        fontWeight: "bold",
        color: "white",
    },
});
