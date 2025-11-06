// Shared TypeScript types for Admin Panel
// Used by both mobile and web implementations

export interface BusinessOwner {
  id: string;
  name: string;
  email: string;
  store: string;
  country: string;
  status: 'active' | 'suspended';
  joined: Date;
  totalOrders: number;
  totalRevenue: number;
  phone?: string;
  avatar?: string;
}

export interface Store {
  id: string;
  name: string;
  ownerId: string;
  ownerName: string;
  products: number;
  sales: number;
  visits: number;
  revenue: number;
  status: 'active' | 'suspended' | 'pending';
  createdAt: Date;
  category?: string;
  country?: string;
}

export interface AdminOrder {
  id: string;
  storeId: string;
  storeName: string;
  customerId: string;
  customerName: string;
  amount: number;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  date: Date;
  items: number;
  paymentMethod?: string;
}

export interface Payment {
  id: string;
  storeId: string;
  storeName: string;
  amount: number;
  commission: number;
  gateway: 'stripe' | 'paystack' | 'flutterwave';
  status: 'success' | 'failed' | 'pending';
  date: Date;
  transactionId?: string;
}

export interface Integration {
  id: string;
  name: string;
  type: 'payment' | 'messaging' | 'email' | 'sms';
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: Date;
  config?: Record<string, any>;
}

export interface DashboardStats {
  totalBusinessOwners: number;
  totalStores: number;
  totalOrders: {
    today: number;
    weekly: number;
    allTime: number;
  };
  totalRevenue: number;
  whatsappStatus: 'connected' | 'disconnected';
  recentTransactions: Payment[];
  monthlyGrowth: {
    month: string;
    revenue: number;
    signups: number;
  }[];
}

export interface ReportMetrics {
  mostActiveStores: Array<{
    storeId: string;
    storeName: string;
    orders: number;
    revenue: number;
  }>;
  salesByRegion: Array<{
    country: string;
    sales: number;
    revenue: number;
  }>;
  activeUsersPerDay: Array<{
    date: string;
    users: number;
  }>;
  failedTransactions: number;
}

export interface PlatformSettings {
  branding: {
    name: string;
    logo?: string;
    primaryColor: string;
    secondaryColor: string;
  };
  company: {
    supportEmail: string;
    supportPhone: string;
    address?: string;
  };
  apiKeys: {
    stripe?: string;
    paystack?: string;
    whatsapp?: string;
  };
  backup: {
    lastBackup?: Date;
    autoBackup: boolean;
    backupFrequency?: 'daily' | 'weekly' | 'monthly';
  };
}

export type AdminScreen =
  | 'Dashboard'
  | 'BusinessOwners'
  | 'Stores'
  | 'Orders'
  | 'Payments'
  | 'Integrations'
  | 'Reports'
  | 'Settings';
