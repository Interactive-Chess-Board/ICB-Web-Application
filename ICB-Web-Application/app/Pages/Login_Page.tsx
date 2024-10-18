import React, {useState} from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';


export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {
        console.log('Email:', email);
        console.log('Password:', password);
      };
      

      return (
        <View >
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>

          <View style = {styles.container}>
          
    
          {/* Welcome Text */}
          <Text style = {styles.header}>Welcome Back</Text>
          <Text style = {styles.subHeader}>Ready to make your move?</Text>
        </View>

      <Image
      source={require('../../assets/Others/LoginImage.png')} // Replace with your image
      style={styles.image}
    />
    <Text style = {styles.inputTitle}>Username or Email</Text>
    <View style = {styles.inputContainer}>
    {/* Username/Email Input */}
    
    <TextInput
      style={styles.input}
      placeholder="Username or email"
      value={email}
      onChangeText={setEmail}
      keyboardType="email-address"
      autoCapitalize="none"
    />
    </View>
    <Text style = {styles.inputTitle}>Password:</Text>
    <View style = {styles.inputContainer}>
    
    
    {/* Password Input */}
    
    <TextInput
      style={styles.input}
      placeholder="Password"
      value={password}
      onChangeText={setPassword}
      secureTextEntry
    />
    </View>

    {/* Login Button */}
    <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
      <Text style={styles.loginButtonText}>Login</Text>
    </TouchableOpacity>

    </View>
      
      )
      }
    


          
    

const styles = StyleSheet.create({
    container: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
      },
      backButton: {
        marginTop : 20
      },
      backButtonText: {
        fontSize: 24,
      },
      header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      subHeader: {
        fontSize: 16,
        color: '#666',
        marginBottom: 0,
      },
      image: {
        width:"100%"
        
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
        width: '100%',
        alignItems: 'center',
      },
      loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      inputTitle:{
        marginLeft: 20,
        fontWeight: '800',
        fontSize: 16,
      },

      
    
}
)