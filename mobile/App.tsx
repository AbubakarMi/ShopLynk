import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import PortalTabNavigator from './src/navigation/PortalTabNavigator';
import WhatsAppScreen from './src/screens/portal/WhatsAppScreen';
import InvoicesScreen from './src/screens/portal/InvoicesScreen';
import AnalyticsScreen from './src/screens/portal/AnalyticsScreen';
import CustomersScreen from './src/screens/portal/CustomersScreen';
import HelpScreen from './src/screens/portal/HelpScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />

          {/* Portal Screens */}
          <Stack.Screen name="Portal" component={PortalTabNavigator} />
          <Stack.Screen name="WhatsApp" component={WhatsAppScreen} />
          <Stack.Screen name="Invoices" component={InvoicesScreen} />
          <Stack.Screen name="Analytics" component={AnalyticsScreen} />
          <Stack.Screen name="Customers" component={CustomersScreen} />
          <Stack.Screen name="Help" component={HelpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
