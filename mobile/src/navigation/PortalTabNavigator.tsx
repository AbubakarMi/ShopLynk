import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PortalLayout from '../layouts/PortalLayout';
import DashboardScreen from '../screens/portal/DashboardScreen';
import ProductsScreen from '../screens/portal/ProductsScreen';
import OrdersScreen from '../screens/portal/OrdersScreen';
import PaymentsScreen from '../screens/portal/PaymentsScreen';
import SettingsScreen from '../screens/portal/SettingsScreen';
import WhatsAppScreen from '../screens/portal/WhatsAppScreen';
import InvoicesScreen from '../screens/portal/InvoicesScreen';
import AnalyticsScreen from '../screens/portal/AnalyticsScreen';
import CustomersScreen from '../screens/portal/CustomersScreen';
import HelpScreen from '../screens/portal/HelpScreen';

const Stack = createStackNavigator();

// Wrapper component to inject Portal Layout
function ScreenWrapper({ children, navigation, route }: any) {
  return (
    <PortalLayout navigation={navigation} currentScreen={route.name}>
      {children}
    </PortalLayout>
  );
}

export default function PortalTabNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Dashboard">
        {(props) => (
          <ScreenWrapper {...props}>
            <DashboardScreen {...props} />
          </ScreenWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen name="Products">
        {(props) => (
          <ScreenWrapper {...props}>
            <ProductsScreen {...props} />
          </ScreenWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen name="Orders">
        {(props) => (
          <ScreenWrapper {...props}>
            <OrdersScreen {...props} />
          </ScreenWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen name="Payments">
        {(props) => (
          <ScreenWrapper {...props}>
            <PaymentsScreen {...props} />
          </ScreenWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen name="WhatsApp">
        {(props) => (
          <ScreenWrapper {...props}>
            <WhatsAppScreen {...props} />
          </ScreenWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen name="Invoices">
        {(props) => (
          <ScreenWrapper {...props}>
            <InvoicesScreen {...props} />
          </ScreenWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen name="Analytics">
        {(props) => (
          <ScreenWrapper {...props}>
            <AnalyticsScreen {...props} />
          </ScreenWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen name="Customers">
        {(props) => (
          <ScreenWrapper {...props}>
            <CustomersScreen {...props} />
          </ScreenWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen name="Settings">
        {(props) => (
          <ScreenWrapper {...props}>
            <SettingsScreen {...props} />
          </ScreenWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen name="Help">
        {(props) => (
          <ScreenWrapper {...props}>
            <HelpScreen {...props} />
          </ScreenWrapper>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
