// App.js
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import LandingScreen from './src/screens/LandingScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import MainNavigator from './src/navigation/MainNavigator';

// Keep splash screen visible
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

// Custom splash screen component
const SplashComponent = () => (
  <View style={styles.splashContainer}>
    <Image 
      source={require('./assets/images/splash.png')}
      style={styles.splashImage}
    />
  </View>
);

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [splashVisible, setSplashVisible] = useState(true);
  
  useEffect(() => {
    // Simulate app loading
    setTimeout(() => {
      setAppReady(true);
    }, 3000);
  }, []);
  
  useEffect(() => {
    if (appReady) {
      setTimeout(() => {
        setSplashVisible(false);
        SplashScreen.hideAsync();
      }, 2000);
    }
  }, [appReady]);
  
  if (splashVisible) {
    return <SplashComponent />;
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Main" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF5722',
  },
  splashImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});