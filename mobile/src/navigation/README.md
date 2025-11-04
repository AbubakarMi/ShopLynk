# Navigation

React Navigation setup and navigation configuration.

## Structure

- `RootNavigator.tsx` - Root navigation container
- `AppNavigator.tsx` - Main app stack navigator
- `AuthNavigator.tsx` - Authentication flow navigator
- `TabNavigator.tsx` - Bottom tab navigation
- `types.ts` - Navigation type definitions

## Example

```tsx
// navigation/RootNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '@/hooks/useAuth';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const Stack = createStackNavigator();

export default function RootNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="App" component={AppNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}

// navigation/types.ts
export type RootStackParamList = {
  Home: undefined;
  ProductDetail: { productId: string };
  OrderDetail: { orderId: string };
};
```
