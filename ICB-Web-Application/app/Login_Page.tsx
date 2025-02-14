import { router } from "expo-router";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Animated } from 'react-native';
import { HandleLogin } from "./config/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    router.push('/HomePage');
  };

  return (
    <ScrollView>
      <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        {/* Welcome Text */}
        <Text style={styles.header}>Welcome Back</Text>
      </Animated.View>

      <Animated.Image
        source={require('../assets/Others/LoginImage.png')} // Replace with your image
        style={[styles.image, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
      />
      <Text style={styles.inputTitle}>Username or Email</Text>
      <KeyboardAvoidingView style={styles.inputContainer}>
        {/* Username/Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Username or email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </KeyboardAvoidingView>
      <Text style={styles.inputTitle}>Password:</Text>

      <KeyboardAvoidingView style={styles.inputContainer}>
        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </KeyboardAvoidingView>

      {/* Login Button */}
      <TouchableOpacity onPress={() => HandleLogin(email, password)} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: "#FF4E4E",
    borderRadius: 10,
  },
  backButton: {
    marginTop: 20
  },
  backButtonText: {
    fontSize: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 30,
    marginTop: 60,
    color: 'white',
  },
  subHeader: {
    fontSize: 10,
    fontWeight: '400',
    marginBottom: 5,
  },
  image: {
    width: 400,
    height: 400,
    alignSelf: 'center',
  },
  inputContainer: {
    alignItems: "center"
  },
  input: {
    width: '90%',
    height: 50,
    padding: 10,
    borderWidth: 0.9,
    borderColor: 'black',
    borderRadius: 10,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputTitle: {
    marginLeft: 20,
    fontWeight: '800',
    fontSize: 16,
  },
});
