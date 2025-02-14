import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet, Image, Easing, TouchableWithoutFeedback, View } from "react-native";
import ChessParticule from "../../assets/images/HomePage/ChessParticule.png";
import { contain } from "three/src/extras/TextureUtils";

function ChessPieceParticule() {

    return (
        <View style={styles.containerParticule}>
            <Animated.Image
                source={ChessParticule}
                style={styles.ChessParticule}
                resizeMode={"repeat"}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    ChessParticule: {
        width: "100%",
        height: "100%",
        opacity: 1,
        zIndex: 0,
    },
    containerParticule: {
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 0,

    },
});

export default ChessPieceParticule;
