# Services

API service layer for communicating with the backend.

## Structure

- `api.ts` - Base API configuration
- `auth.service.ts` - Authentication API calls
- `products.service.ts` - Product CRUD operations
- `orders.service.ts` - Order management
- `storage.service.ts` - AsyncStorage wrapper

## Example

```tsx
// services/api.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const api = axios.create({
  baseURL: Constants.expoConfig?.extra?.apiUrl || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// services/storage.service.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageService = {
  set: async (key: string, value: any) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  get: async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  remove: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
  clear: async () => {
    await AsyncStorage.clear();
  },
};
```
