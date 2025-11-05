// Portal Types and Interfaces for Mobile

export interface StoreStatus {
  isActive: boolean;
  isWhatsAppConnected: boolean;
  storeName: string;
}

export interface QuickStats {
  totalProducts: number;
  ordersToday: number;
  salesThisWeek: number;
  pendingDeliveries: number;
}

export interface SalesData {
  date: string;
  amount: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  images: string[];
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  deliveryAddress?: string;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
}

export enum PaymentStatus {
  SUCCESSFUL = 'SUCCESSFUL',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  status: PaymentStatus;
  method: string;
  createdAt: string;
  reference: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  lastPurchase?: string;
  totalSpent: number;
  orderCount: number;
}

export interface WhatsAppConfig {
  isConnected: boolean;
  phoneNumber?: string;
  welcomeMessage: string;
  outOfStockMessage: string;
  orderConfirmationMessage: string;
}

export interface AnalyticsData {
  dailySales: SalesData[];
  topProducts: {
    productId: string;
    productName: string;
    unitsSold: number;
    revenue: number;
  }[];
  conversionRate: number;
  returningCustomers: number;
  averageOrderValue: number;
}

export interface BusinessInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  description?: string;
}

export interface StorePreferences {
  currency: string;
  deliveryOptions: string[];
  taxRate?: number;
}
