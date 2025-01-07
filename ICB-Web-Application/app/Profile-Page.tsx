import React, {useState} from "react";
// import { ProgressCircle} from 'react-native-svg-charts';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#F44336',
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  
  buckButton: {
    position:'absolute',
    left: 20,
    top: 20,

  },

  buckButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  image: {
    width: "100%",
  },

  userName: {
    fontSize: 18,
    color:'#fff',
    fontWeight:"bold",
  },

  pointsSection: {
    alignItems: 'center',
    marginVertical: 20,
  },

  pointsTitle : {
    fontSize : 18,
    fontWeight : 'bold',
  },

  pointsText : {
    fontSize: 14,
    color: '#777',
    marginVertical: 10,
  },

  progressCircle: {
    height: 120,
    width: 120,
  },

  progressText: {
    position: 'absolute',
    top: '45%',
    fontSize: 18,
    fontWeight:'bold',
  },

  opponentsSection: {
    padding: 20,

  },

  opponentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  opponentsText: {
    fontSize: 14,
    color: '#777',
    marginVertical: 10,
  },
  
  opponentsImages: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },

  opponentImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  viewAllButton: {
    alignSelf: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },

  viewAllText: {
    color: '#fff',
    fontWeight: 'bold',
  },
}
)



export default function ProfilePage(){
    

      return (
      
        <SafeAreaView style= { styles.container }>
         {/* header*/}
           <View style = {styles.header}>
             <TouchableOpacity style = {styles.buckButton}>
                <Text style = {styles.buckButtonText}> &lt;</Text>

             </TouchableOpacity>
             <Image 
                 source = {require('../assets/Others/DefaultIcon.png')} // Replace with your image
                 style={styles.image}>

             </Image>
             <Text style = {styles.userName}>User Name</Text>
           </View>

           {/* Points Section */}
           <View style = {styles.pointsSection}>
            <Text style = {styles.pointsTitle}>Your points</Text>
            <Text style = {styles.pointsText}>+20 points from your previous games</Text>
            <ProgressCircle
                style = {styles.progressCircle}
                progress = {0.65}
                progressColor={"#4CAF50"}>

            </ProgressCircle>
            <Text style = {styles.progressText}> 65% </Text>

           </View>

           {/* Opponents Section */}
           <View style = {styles.opponentsSection}>
            <Text style = {styles.opponentsTitle}>Opponents</Text>
            <Text style = {styles.opponentsText}>
              You have already played against these users
            </Text>
           </View>
           <View style = {styles.opponentsImages}>
            <Image 
               source = {require('../assets/Others/Profile_pic2.png')}
               style = {styles.opponentImage}>

            </Image>
            <Image 
               source = {require('../assets/Others/Profile_pic1.png')}
               style = {styles.opponentImage}>

            </Image>
            <Image 
               source = {require('../assets/Others/Profile_pic3.png')}
               style = {styles.opponentImage}>

            </Image>
           </View>
           <TouchableOpacity style = {styles.viewAllButton}>
             <Text style ={styles.viewAllText}> View All</Text>
           </TouchableOpacity>
        </SafeAreaView>
      

    );

      
}
