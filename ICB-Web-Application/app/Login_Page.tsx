import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Dimensions, StatusBar, ActivityIndicator } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, Easing } from "react-native-reanimated";
import { router } from "expo-router";
import { HandleLogin } from "./config/firebase";
import { BlurView } from "expo-blur";

// Get Width and Height of the screen
const dimensions = Dimensions.get('window');
const Height = dimensions.height + StatusBar.currentHeight;
const Width = dimensions.width;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);




  // Handle Login
  const handleLogin = async () => {
    setIsLoaded(true);
    console.log('Email:', email);
    console.log('Password:', password);
    await HandleLogin(email, password);
    setIsLoaded(false);
  };

  // Blur Effect Animation using Reanimated
  const blurEffect = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isLoaded ? 1 :1, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      }),
      // filter: withTiming(isLoaded ? 'blur(5px)' : 'blur(0px)', {
      //   duration: 500,
      //   easing: Easing.inOut(Easing.ease),
      // }),
    };
  });

  const LoadingContainerAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(isLoaded ? Height/2 - 75 : Height+500, {
            duration: 500,
            easing: Easing.inOut(Easing.ease),
          }),
        },
      ],
    };
  }
  );


  return (
    <View style={[styles.page]}>
      <ScrollView style={{filter: isLoaded?'blur(5px)':'blur(0px)'}}>
        {/* Welcome Text */}
        <Animated.View style={[styles.container]}>
          <Text style={styles.header}>Welcome Back</Text>
        </Animated.View>

        {/* Login Image */}
        <Animated.Image
          source={require('../assets/Others/LoginImage.png')}
          style={[styles.image]}
        />

        {/* Username or Email Input */}
        <Text style={styles.inputTitle}>Username or Email</Text>
        <KeyboardAvoidingView style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username or email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </KeyboardAvoidingView>

        {/* Password Input */}
        <Text style={styles.inputTitle}>Password:</Text>
        <KeyboardAvoidingView style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </KeyboardAvoidingView>

        {/* Login Button */}
        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Blur Effect Layer */}
      <Animated.View style={[styles.LoadingContainer, LoadingContainerAnimation]}>
        <ActivityIndicator size={"large"} color={"black"} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#FF4E4E',
  },
  header: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 30,
    marginTop: 60,
    color: 'white',
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    alignItems: "center"
  },
  input: {
    width: '90%',
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    marginBottom: 20,
  },
  inputTitle: {
    marginLeft: 20,
    fontWeight: '800',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  LoadingContainer: {
    width:300,
    height:150,
    backgroundColor: "white",
    position: "absolute",
    borderWidth: 1,
    borderRadius: 10,
    alignSelf:"center",
    justifyContent: "center",
    filter: 'blur(0px)',
  }
});
