import { Image, StyleSheet, Platform, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Welcome from './Pages/Welcome';
import Homepage from './Pages/HomePage';
import SignUpPage from './Pages/SignUpPage';
import Bluetooth from './Pages/Bluetooth';
import SetUpPage from './Pages/SetUpPage';
import { Stack, Link, router } from 'expo-router';
import LoginPage from './Pages/Login_Page';

export default function HomeScreen() {
  return (
    <View>
        <SetUpPage />
    </View>
  );
}

const styles = StyleSheet.create({

});
