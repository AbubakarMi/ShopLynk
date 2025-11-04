# Services

API service layer for communicating with the backend.

## Structure

- `api.ts` - Base API configuration
- `auth.service.ts` - Authentication API calls
- `products.service.ts` - Product CRUD operations
- `orders.service.ts` - Order management
- `customers.service.ts` - Customer management
- `whatsapp.service.ts` - WhatsApp integration

## Example

```tsx
// services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// services/products.service.ts
import api from './api';

export const productService = {
  getAll: () => api.get('/products'),
  getById: (id: string) => api.get(`/products/${id}`),
  create: (data: any) => api.post('/products', data),
  update: (id: string, data: any) => api.put(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
};
```
