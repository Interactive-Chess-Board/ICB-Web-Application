import { Image, StyleSheet, Platform, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Welcome from './Pages/Welcome';
import { Stack, Link, router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View>
        <Welcome />
    </View>
  );
}

const styles = StyleSheet.create({

});
