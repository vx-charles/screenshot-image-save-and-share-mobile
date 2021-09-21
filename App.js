import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CaptureShareScreen } from './src/CaptureShare';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CaptureShareScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
