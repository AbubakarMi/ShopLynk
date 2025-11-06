import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import AdminBusinessOwnersScreen from '../screens/admin/AdminBusinessOwnersScreen';
import AdminStoresScreen from '../screens/admin/AdminStoresScreen';
import AdminOrdersScreen from '../screens/admin/AdminOrdersScreen';
import AdminPaymentsScreen from '../screens/admin/AdminPaymentsScreen';
import AdminIntegrationsScreen from '../screens/admin/AdminIntegrationsScreen';
import AdminReportsScreen from '../screens/admin/AdminReportsScreen';
import AdminSettingsScreen from '../screens/admin/AdminSettingsScreen';

const Stack = createStackNavigator();

// Wrapper component to inject Admin Layout
function ScreenWrapper({ children, navigation, route }: any) {
  return (
    <AdminLayout navigation={navigation} currentScreen={route.name}>
      {children}
    </AdminLayout>
  );
}

export default function AdminTabNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AdminDashboard">
        {(props) => (
          <ScreenWrapper {...props}>
            <AdminDashboardScreen {...props} />
          </ScreenWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen name="AdminBusinessOwners">
        {(props) => (
          <ScreenWrapper {...props}>
            <AdminBusinessOwnersScreen {...props} />
          </ScreenWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen name="AdminStores">
        {(props) => (
          <ScreenWrapper {...props}>
            <AdminStoresScreen {...props} />
          </ScreenWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen name="AdminOrders">
        {(props) => (
          <ScreenWrapper {...props}>
            <AdminOrdersScreen {...props} />
          </ScreenWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen name="AdminPayments">
        {(props) => (
          <ScreenWrapper {...props}>
            <AdminPaymentsScreen {...props} />
          </ScreenWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen name="AdminIntegrations">
        {(props) => (
          <ScreenWrapper {...props}>
            <AdminIntegrationsScreen {...props} />
          </ScreenWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen name="AdminReports">
        {(props) => (
          <ScreenWrapper {...props}>
            <AdminReportsScreen {...props} />
          </ScreenWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen name="AdminSettings">
        {(props) => (
          <ScreenWrapper {...props}>
            <AdminSettingsScreen {...props} />
          </ScreenWrapper>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
