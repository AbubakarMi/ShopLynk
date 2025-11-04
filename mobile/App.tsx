import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import your navigation setup
// import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        {/* <RootNavigator /> */}
        {/* Placeholder: Replace with your navigation setup */}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
