import type {
  BusinessOwner,
  Store,
  AdminOrder,
  Payment,
  Integration,
  DashboardStats,
  ReportMetrics,
  PlatformSettings,
} from '../types/admin';

// Mock Business Owners
export const mockBusinessOwners: BusinessOwner[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    store: 'Tech Haven',
    country: 'USA',
    status: 'active',
    joined: new Date('2024-01-15'),
    totalOrders: 145,
    totalRevenue: 45230.50,
  },
  {
    id: '2',
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    store: 'Fashion Forward',
    country: 'UK',
    status: 'active',
    joined: new Date('2024-02-20'),
    totalOrders: 98,
    totalRevenue: 32150.75,
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael@example.com',
    store: 'Global Goods',
    country: 'Singapore',
    status: 'suspended',
    joined: new Date('2024-03-10'),
    totalOrders: 12,
    totalRevenue: 5420.00,
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    store: 'Home Essentials',
    country: 'Canada',
    status: 'active',
    joined: new Date('2024-01-05'),
    totalOrders: 203,
    totalRevenue: 67890.25,
  },
  {
    id: '5',
    name: 'Carlos Rodriguez',
    email: 'carlos@example.com',
    store: 'Sports Pro',
    country: 'Spain',
    status: 'active',
    joined: new Date('2024-02-28'),
    totalOrders: 76,
    totalRevenue: 28340.60,
  },
];

// Mock Stores
export const mockStores: Store[] = [
  {
    id: '1',
    name: 'Tech Haven',
    owner: 'John Doe',
    category: 'Electronics',
    status: 'active',
    productsCount: 234,
    ordersCount: 145,
    revenue: 45230.50,
    rating: 4.8,
    created: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Fashion Forward',
    owner: 'Sarah Smith',
    category: 'Fashion',
    status: 'active',
    productsCount: 567,
    ordersCount: 98,
    revenue: 32150.75,
    rating: 4.6,
    created: new Date('2024-02-20'),
  },
  {
    id: '3',
    name: 'Global Goods',
    owner: 'Michael Chen',
    category: 'General',
    status: 'suspended',
    productsCount: 45,
    ordersCount: 12,
    revenue: 5420.00,
    rating: 3.2,
    created: new Date('2024-03-10'),
  },
  {
    id: '4',
    name: 'Home Essentials',
    owner: 'Emma Wilson',
    category: 'Home & Garden',
    status: 'active',
    productsCount: 432,
    ordersCount: 203,
    revenue: 67890.25,
    rating: 4.9,
    created: new Date('2024-01-05'),
  },
  {
    id: '5',
    name: 'Sports Pro',
    owner: 'Carlos Rodriguez',
    category: 'Sports',
    status: 'active',
    productsCount: 189,
    ordersCount: 76,
    revenue: 28340.60,
    rating: 4.7,
    created: new Date('2024-02-28'),
  },
];

// Mock Orders
export const mockOrders: AdminOrder[] = [
  {
    id: 'ORD-1001',
    customer: 'Alice Johnson',
    store: 'Tech Haven',
    amount: 899.99,
    status: 'completed',
    date: new Date('2025-11-04'),
    items: 3,
  },
  {
    id: 'ORD-1002',
    customer: 'Bob Williams',
    store: 'Fashion Forward',
    amount: 245.50,
    status: 'processing',
    date: new Date('2025-11-04'),
    items: 2,
  },
  {
    id: 'ORD-1003',
    customer: 'Charlie Brown',
    store: 'Home Essentials',
    amount: 1250.00,
    status: 'shipped',
    date: new Date('2025-11-03'),
    items: 5,
  },
  {
    id: 'ORD-1004',
    customer: 'Diana Prince',
    store: 'Sports Pro',
    amount: 450.75,
    status: 'pending',
    date: new Date('2025-11-03'),
    items: 1,
  },
  {
    id: 'ORD-1005',
    customer: 'Ethan Hunt',
    store: 'Tech Haven',
    amount: 2100.00,
    status: 'completed',
    date: new Date('2025-11-02'),
    items: 4,
  },
  {
    id: 'ORD-1006',
    customer: 'Fiona Green',
    store: 'Fashion Forward',
    amount: 680.25,
    status: 'cancelled',
    date: new Date('2025-11-02'),
    items: 3,
  },
  {
    id: 'ORD-1007',
    customer: 'George Miller',
    store: 'Home Essentials',
    amount: 320.00,
    status: 'refunded',
    date: new Date('2025-11-01'),
    items: 2,
  },
];

// Mock Payments
export const mockPayments: Payment[] = [
  {
    id: 'PAY-5001',
    order: 'ORD-1001',
    store: 'Tech Haven',
    amount: 899.99,
    method: 'credit_card',
    status: 'completed',
    date: new Date('2025-11-04'),
    transactionId: 'TXN-ABC123',
  },
  {
    id: 'PAY-5002',
    order: 'ORD-1002',
    store: 'Fashion Forward',
    amount: 245.50,
    method: 'paypal',
    status: 'pending',
    date: new Date('2025-11-04'),
    transactionId: 'TXN-DEF456',
  },
  {
    id: 'PAY-5003',
    order: 'ORD-1003',
    store: 'Home Essentials',
    amount: 1250.00,
    method: 'bank_transfer',
    status: 'completed',
    date: new Date('2025-11-03'),
    transactionId: 'TXN-GHI789',
  },
  {
    id: 'PAY-5004',
    order: 'ORD-1005',
    store: 'Tech Haven',
    amount: 2100.00,
    method: 'credit_card',
    status: 'completed',
    date: new Date('2025-11-02'),
    transactionId: 'TXN-JKL012',
  },
  {
    id: 'PAY-5005',
    order: 'ORD-1006',
    store: 'Fashion Forward',
    amount: 680.25,
    method: 'paypal',
    status: 'refunded',
    date: new Date('2025-11-02'),
    transactionId: 'TXN-MNO345',
  },
  {
    id: 'PAY-5006',
    order: 'ORD-1007',
    store: 'Home Essentials',
    amount: 320.00,
    method: 'credit_card',
    status: 'failed',
    date: new Date('2025-11-01'),
    transactionId: 'TXN-PQR678',
  },
];

// Mock Integrations
export const mockIntegrations: Integration[] = [
  {
    id: '1',
    name: 'Stripe',
    type: 'payment',
    status: 'active',
    stores: 5,
    lastSync: new Date('2025-11-05T08:30:00'),
  },
  {
    id: '2',
    name: 'PayPal',
    type: 'payment',
    status: 'active',
    stores: 3,
    lastSync: new Date('2025-11-05T07:15:00'),
  },
  {
    id: '3',
    name: 'Mailchimp',
    type: 'email',
    status: 'active',
    stores: 4,
    lastSync: new Date('2025-11-05T06:00:00'),
  },
  {
    id: '4',
    name: 'Shopify',
    type: 'ecommerce',
    status: 'inactive',
    stores: 0,
    lastSync: new Date('2025-10-28T14:20:00'),
  },
  {
    id: '5',
    name: 'Google Analytics',
    type: 'analytics',
    status: 'active',
    stores: 5,
    lastSync: new Date('2025-11-05T09:00:00'),
  },
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalRevenue: 179032.10,
  totalOrders: 534,
  totalStores: 5,
  activeBusinessOwners: 4,
  revenueChange: 12.5,
  ordersChange: 8.3,
  storesChange: 25.0,
  ownersChange: -5.2,
  recentOrders: mockOrders.slice(0, 5),
  topStores: mockStores.slice(0, 3),
  monthlyRevenue: [
    { month: 'Jan', amount: 28000 },
    { month: 'Feb', amount: 32000 },
    { month: 'Mar', amount: 29000 },
    { month: 'Apr', amount: 35000 },
    { month: 'May', amount: 38000 },
    { month: 'Jun', amount: 42000 },
  ],
};

// Mock Report Metrics
export const mockReportMetrics: ReportMetrics = {
  period: 'monthly',
  revenue: {
    current: 42000,
    previous: 38000,
    change: 10.5,
  },
  orders: {
    current: 156,
    previous: 142,
    change: 9.9,
  },
  customers: {
    current: 89,
    previous: 76,
    change: 17.1,
  },
  avgOrderValue: {
    current: 269.23,
    previous: 267.61,
    change: 0.6,
  },
  topProducts: [
    { name: 'Wireless Headphones', sales: 45, revenue: 6750 },
    { name: 'Smart Watch', sales: 32, revenue: 9600 },
    { name: 'Laptop Stand', sales: 28, revenue: 1400 },
    { name: 'USB-C Cable', sales: 67, revenue: 1340 },
    { name: 'Phone Case', sales: 54, revenue: 1620 },
  ],
  topCategories: [
    { name: 'Electronics', percentage: 45 },
    { name: 'Fashion', percentage: 28 },
    { name: 'Home & Garden', percentage: 15 },
    { name: 'Sports', percentage: 12 },
  ],
};

// Mock Platform Settings
export const mockPlatformSettings: PlatformSettings = {
  general: {
    platformName: 'ShopLynk',
    supportEmail: 'support@shoplynk.com',
    currency: 'USD',
    timezone: 'America/New_York',
  },
  payments: {
    stripeEnabled: true,
    paypalEnabled: true,
    commissionRate: 5.0,
    minimumPayout: 50.0,
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  },
  security: {
    twoFactorRequired: false,
    sessionTimeout: 30,
    passwordMinLength: 8,
  },
};

// Service functions
export const adminService = {
  // Dashboard
  getDashboardStats: async (): Promise<DashboardStats> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockDashboardStats;
  },

  // Business Owners
  getBusinessOwners: async (): Promise<BusinessOwner[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockBusinessOwners;
  },

  updateBusinessOwnerStatus: async (
    id: string,
    status: 'active' | 'suspended'
  ): Promise<BusinessOwner> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const owner = mockBusinessOwners.find((o) => o.id === id);
    if (owner) {
      owner.status = status;
    }
    return owner!;
  },

  deleteBusinessOwner: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = mockBusinessOwners.findIndex((o) => o.id === id);
    if (index !== -1) {
      mockBusinessOwners.splice(index, 1);
    }
  },

  // Stores
  getStores: async (): Promise<Store[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockStores;
  },

  updateStoreStatus: async (
    id: string,
    status: 'active' | 'suspended'
  ): Promise<Store> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const store = mockStores.find((s) => s.id === id);
    if (store) {
      store.status = status;
    }
    return store!;
  },

  deleteStore: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = mockStores.findIndex((s) => s.id === id);
    if (index !== -1) {
      mockStores.splice(index, 1);
    }
  },

  // Orders
  getOrders: async (): Promise<AdminOrder[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockOrders;
  },

  updateOrderStatus: async (
    id: string,
    status: AdminOrder['status']
  ): Promise<AdminOrder> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const order = mockOrders.find((o) => o.id === id);
    if (order) {
      order.status = status;
    }
    return order!;
  },

  // Payments
  getPayments: async (): Promise<Payment[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockPayments;
  },

  refundPayment: async (id: string): Promise<Payment> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const payment = mockPayments.find((p) => p.id === id);
    if (payment) {
      payment.status = 'refunded';
    }
    return payment!;
  },

  // Integrations
  getIntegrations: async (): Promise<Integration[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockIntegrations;
  },

  toggleIntegration: async (
    id: string,
    status: 'active' | 'inactive'
  ): Promise<Integration> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const integration = mockIntegrations.find((i) => i.id === id);
    if (integration) {
      integration.status = status;
    }
    return integration!;
  },

  // Reports
  getReportMetrics: async (period: string): Promise<ReportMetrics> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { ...mockReportMetrics, period };
  },

  // Settings
  getPlatformSettings: async (): Promise<PlatformSettings> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockPlatformSettings;
  },

  updatePlatformSettings: async (
    settings: Partial<PlatformSettings>
  ): Promise<PlatformSettings> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    Object.assign(mockPlatformSettings, settings);
    return mockPlatformSettings;
  },
};
