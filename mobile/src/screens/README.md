# Screens

Screen components for the mobile application.

## Structure

Each screen represents a full-page view in the app:

- `HomeScreen.tsx` - Home/landing screen
- `DashboardScreen.tsx` - Main dashboard
- `ProductsScreen.tsx` - Product listing and management
- `ProductDetailScreen.tsx` - Individual product details
- `OrdersScreen.tsx` - Order management
- `OrderDetailScreen.tsx` - Individual order details
- `CustomersScreen.tsx` - Customer management
- `SettingsScreen.tsx` - App settings
- `LoginScreen.tsx` - Authentication
- `RegisterScreen.tsx` - User registration

## Example

```tsx
// screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to ShopLynk</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
```
