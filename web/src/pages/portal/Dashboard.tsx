import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  CubeIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
  TruckIcon,
  PlusIcon,
  ShareIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
  EllipsisVerticalIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import {
  CheckCircleIcon as CheckCircleSolid,
  ClockIcon as ClockSolid,
  XCircleIcon as XCircleSolid,
} from '@heroicons/react/24/solid';

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  // Mock data - replace with actual API calls
  const stats = {
    totalProducts: 45,
    productsChange: 12,
    ordersToday: 12,
    ordersChange: 8,
    salesThisWeek: 24500,
    salesChange: -3,
    pendingDeliveries: 8,
    deliveriesUrgent: 2,
  };

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', amount: 1250, status: 'Pending', time: '2 hours ago', items: 3 },
    { id: '#ORD-002', customer: 'Jane Smith', amount: 850, status: 'Completed', time: '5 hours ago', items: 2 },
    { id: '#ORD-003', customer: 'Mike Johnson', amount: 2100, status: 'Processing', time: '1 day ago', items: 5 },
    { id: '#ORD-004', customer: 'Sarah Williams', amount: 1650, status: 'Completed', time: '1 day ago', items: 4 },
    { id: '#ORD-005', customer: 'Robert Brown', amount: 920, status: 'Cancelled', time: '2 days ago', items: 1 },
  ];

  const salesData = [
    { day: 'Mon', sales: 3200, orders: 8, label: 'Monday' },
    { day: 'Tue', sales: 4100, orders: 12, label: 'Tuesday' },
    { day: 'Wed', sales: 3800, orders: 10, label: 'Wednesday' },
    { day: 'Thu', sales: 5200, orders: 15, label: 'Thursday' },
    { day: 'Fri', sales: 4800, orders: 13, label: 'Friday' },
    { day: 'Sat', sales: 6100, orders: 18, label: 'Saturday' },
    { day: 'Sun', sales: 5500, orders: 16, label: 'Sunday' },
  ];

  const topProducts = [
    { name: 'Premium Headphones', sales: 1250, quantity: 45, trend: 12 },
    { name: 'Wireless Mouse', sales: 980, quantity: 78, trend: 8 },
    { name: 'USB-C Cable', sales: 750, quantity: 120, trend: -5 },
    { name: 'Phone Case', sales: 650, quantity: 65, trend: 15 },
  ];

  const maxSales = Math.max(...salesData.map(d => d.sales));

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircleSolid className="h-5 w-5 text-green-500" />;
      case 'Processing':
        return <ClockSolid className="h-5 w-5 text-blue-500" />;
      case 'Pending':
        return <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" />;
      case 'Cancelled':
        return <XCircleSolid className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 pb-6">
      {/* Page header with actions */}
      <div className="px-4 sm:px-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Welcome back! Here's what's happening with your store today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-primary transition-all">
              <CalendarIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Test Buttons */}
      <div className="px-4 sm:px-0 flex flex-wrap gap-3">
        <button
          onClick={() => {
            localStorage.removeItem('shoplynk_hasSeenOnboarding');
            navigate('/onboarding');
          }}
          className="px-6 py-3 bg-gradient-to-r from-primary to-primary-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all transform hover:scale-105"
        >
          🎯 Test Onboarding
        </button>
        <button
          onClick={() => {
            navigate('/admin/dashboard');
          }}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all transform hover:scale-105"
        >
          🔐 Admin Panel
        </button>
      </div>

      {/* Store Status Banner */}
      <div className="mx-4 sm:mx-0 rounded-lg bg-gradient-to-r from-[#3B5BDB] to-[#00C896] p-4 sm:p-6 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold">My Awesome Store</h2>
            <p className="mt-1 text-xs sm:text-sm opacity-90">Your store is active and ready to receive orders</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <div className="rounded-lg bg-white bg-opacity-20 px-3 sm:px-4 py-1.5 sm:py-2">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-400" />
                <span className="text-xs sm:text-sm font-medium">Store Active</span>
              </div>
            </div>
            <div className="rounded-lg bg-white bg-opacity-20 px-3 sm:px-4 py-1.5 sm:py-2">
              <div className="flex items-center space-x-2">
                <ChatBubbleLeftRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm font-medium">WhatsApp Connected</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats - Enhanced */}
      <div className="mx-4 sm:mx-0 grid gap-3 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Products */}
        <div className="group rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="rounded-lg bg-blue-50 p-2 group-hover:bg-blue-100 transition-colors">
                  <CubeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-600">Total Products</p>
              </div>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {stats.totalProducts}
              </p>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-green-50">
                  <ArrowTrendingUpIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                  <span className="text-xs sm:text-sm font-semibold text-green-600">
                    {stats.productsChange}%
                  </span>
                </div>
                <span className="text-xs text-gray-500">vs last month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Today */}
        <div className="group rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm hover:shadow-xl hover:border-accent/50 transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="rounded-lg bg-green-50 p-2 group-hover:bg-green-100 transition-colors">
                  <ShoppingCartIcon className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-600">Orders Today</p>
              </div>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {stats.ordersToday}
              </p>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-green-50">
                  <ArrowTrendingUpIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                  <span className="text-xs sm:text-sm font-semibold text-green-600">
                    {stats.ordersChange}%
                  </span>
                </div>
                <span className="text-xs text-gray-500">vs yesterday</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sales This Week */}
        <div className="group rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm hover:shadow-xl hover:border-yellow-500/50 transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="rounded-lg bg-yellow-50 p-2 group-hover:bg-yellow-100 transition-colors">
                  <CurrencyDollarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-600">Sales This Week</p>
              </div>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                ₦{stats.salesThisWeek.toLocaleString()}
              </p>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-red-50">
                  <ArrowTrendingDownIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-600" />
                  <span className="text-xs sm:text-sm font-semibold text-red-600">
                    {Math.abs(stats.salesChange)}%
                  </span>
                </div>
                <span className="text-xs text-gray-500">vs last week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Deliveries */}
        <div className="group rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm hover:shadow-xl hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="rounded-lg bg-purple-50 p-2 group-hover:bg-purple-100 transition-colors">
                  <TruckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-600">Pending Deliveries</p>
              </div>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {stats.pendingDeliveries}
              </p>
              <div className="flex items-center gap-1.5">
                <div className="px-2 py-1 rounded-md bg-orange-50">
                  <span className="text-xs sm:text-sm font-semibold text-orange-600">
                    {stats.deliveriesUrgent} urgent
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions - Enhanced */}
      <div className="mx-4 sm:mx-0 rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
        <h3 className="mb-4 sm:mb-5 text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
          Quick Actions
        </h3>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/portal/products"
            className="group flex items-center justify-center space-x-2 rounded-xl border-2 border-dashed border-gray-300 p-4 sm:p-5 text-center transition-all hover:border-primary hover:bg-blue-50 hover:shadow-md transform hover:scale-105"
          >
            <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-primary group-hover:scale-110 transition-all">
              <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:text-white transition-colors" />
            </div>
            <span className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-primary transition-colors">Add Product</span>
          </Link>

          <button className="group flex items-center justify-center space-x-2 rounded-xl border-2 border-dashed border-gray-300 p-4 sm:p-5 text-center transition-all hover:border-accent hover:bg-green-50 hover:shadow-md transform hover:scale-105">
            <div className="p-2 rounded-lg bg-green-50 group-hover:bg-accent group-hover:scale-110 transition-all">
              <ShareIcon className="h-4 w-4 sm:h-5 sm:w-5 text-accent group-hover:text-white transition-colors" />
            </div>
            <span className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-accent transition-colors">Share Store</span>
          </button>

          <Link
            to="/portal/whatsapp"
            className="group flex items-center justify-center space-x-2 rounded-xl border-2 border-dashed border-gray-300 p-4 sm:p-5 text-center transition-all hover:border-primary hover:bg-blue-50 hover:shadow-md transform hover:scale-105"
          >
            <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-primary group-hover:scale-110 transition-all">
              <ChatBubbleLeftRightIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:text-white transition-colors" />
            </div>
            <span className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-primary transition-colors">WhatsApp</span>
          </Link>

          <Link
            to="/portal/analytics"
            className="group flex items-center justify-center space-x-2 rounded-xl border-2 border-dashed border-gray-300 p-4 sm:p-5 text-center transition-all hover:border-accent hover:bg-green-50 hover:shadow-md transform hover:scale-105"
          >
            <div className="p-2 rounded-lg bg-green-50 group-hover:bg-accent group-hover:scale-110 transition-all">
              <ChartBarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-accent group-hover:text-white transition-colors" />
            </div>
            <span className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-accent transition-colors">Analytics</span>
          </Link>
        </div>
      </div>

      {/* Sales Chart, Recent Orders & Top Products */}
      <div className="mx-4 sm:mx-0 grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Sales Chart - Enhanced */}
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm hover:shadow-lg transition-shadow">
          <div className="mb-4 sm:mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                Sales This Week
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Daily sales performance</p>
            </div>
            <Link
              to="/portal/analytics"
              className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-primary bg-blue-50 rounded-lg hover:bg-primary hover:text-white transition-all"
            >
              View Details
            </Link>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {salesData.map((data, index) => (
              <div key={index} className="group flex items-center space-x-2 sm:space-x-3">
                <span className="w-10 sm:w-14 text-xs sm:text-sm font-bold text-gray-700">{data.day}</span>
                <div className="flex-1 relative">
                  <div className="h-8 sm:h-10 overflow-hidden rounded-lg bg-gray-100 relative">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-700 ease-out group-hover:opacity-90 relative overflow-hidden"
                      style={{ width: `${(data.sales / maxSales) * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
                    </div>
                  </div>
                  <div className="absolute inset-y-0 left-2 flex items-center">
                    <span className="text-xs font-semibold text-white drop-shadow-lg">
                      {data.orders} orders
                    </span>
                  </div>
                </div>
                <span className="w-20 sm:w-24 text-right text-xs sm:text-sm font-bold text-gray-900">
                  ₦{data.sales.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">Total: </span>
              ₦{salesData.reduce((sum, d) => sum + d.sales, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">Avg: </span>
              ₦{Math.round(salesData.reduce((sum, d) => sum + d.sales, 0) / salesData.length).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Top Products - New Section */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm hover:shadow-lg transition-shadow">
          <div className="mb-4 sm:mb-5">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
              Top Products
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Best performers</p>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="group p-3 rounded-lg border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="flex items-center justify-center h-6 w-6 rounded-full bg-gradient-to-br from-primary to-accent text-white text-xs font-bold">
                        {index + 1}
                      </span>
                      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors">
                        {product.name}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-600">{product.quantity} sold</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-900">
                    ₦{product.sales.toLocaleString()}
                  </span>
                  <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md ${product.trend >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                    {product.trend >= 0 ? (
                      <ArrowTrendingUpIcon className="h-3 w-3 text-green-600" />
                    ) : (
                      <ArrowTrendingDownIcon className="h-3 w-3 text-red-600" />
                    )}
                    <span className={`text-xs font-semibold ${product.trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {Math.abs(product.trend)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders - Enhanced Full Width */}
      <div className="mx-4 sm:mx-0 rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm hover:shadow-lg transition-shadow">
        <div className="mb-4 sm:mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              Recent Orders
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Latest transactions</p>
          </div>
          <Link
            to="/portal/orders"
            className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-primary bg-blue-50 rounded-lg hover:bg-primary hover:text-white transition-all"
          >
            View All
          </Link>
        </div>
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recentOrders.map((order, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-gray-200 p-4 hover:border-primary/50 hover:shadow-md transition-all"
            >
              <div className="absolute top-0 right-0 p-2">
                {getStatusIcon(order.status)}
              </div>
              <div className="pr-8">
                <p className="text-sm sm:text-base font-bold text-gray-900 mb-1">{order.id}</p>
                <p className="text-xs sm:text-sm text-gray-600 mb-2">{order.customer}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <ClockIcon className="h-3.5 w-3.5" />
                  <span>{order.time}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-sm sm:text-base font-bold text-primary">
                    ₦{order.amount.toLocaleString()}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      order.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : order.status === 'Processing'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {order.items} {order.items === 1 ? 'item' : 'items'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
