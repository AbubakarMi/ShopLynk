import { Link, useNavigate } from 'react-router-dom';
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
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const navigate = useNavigate();

  // Mock data - replace with actual API calls
  const stats = {
    totalProducts: 45,
    ordersToday: 12,
    salesThisWeek: 24500,
    pendingDeliveries: 8,
  };

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', amount: 1250, status: 'Pending', time: '2 hours ago' },
    { id: '#ORD-002', customer: 'Jane Smith', amount: 850, status: 'Completed', time: '5 hours ago' },
    { id: '#ORD-003', customer: 'Mike Johnson', amount: 2100, status: 'Processing', time: '1 day ago' },
  ];

  const salesData = [
    { day: 'Mon', sales: 3200 },
    { day: 'Tue', sales: 4100 },
    { day: 'Wed', sales: 3800 },
    { day: 'Thu', sales: 5200 },
    { day: 'Fri', sales: 4800 },
    { day: 'Sat', sales: 6100 },
    { day: 'Sun', sales: 5500 },
  ];

  const maxSales = Math.max(...salesData.map(d => d.sales));

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page header */}
      <div className="px-4 sm:px-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* Test Buttons */}
      <div className="px-4 sm:px-0 flex gap-3">
        <button
          onClick={() => {
            localStorage.removeItem('shoplynk_hasSeenOnboarding');
            navigate('/onboarding');
          }}
          className="px-6 py-3 bg-gradient-to-r from-primary to-primary-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all"
        >
          🎯 Test Onboarding
        </button>
        <button
          onClick={() => {
            navigate('/admin/dashboard');
          }}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
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

      {/* Quick Stats */}
      <div className="mx-4 sm:mx-0 grid gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Products</p>
              <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
              <div className="mt-1 sm:mt-2 flex items-center text-xs sm:text-sm text-green-600">
                <ArrowUpIcon className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                <span>12% from last month</span>
              </div>
            </div>
            <div className="rounded-full bg-blue-100 p-2 sm:p-3">
              <CubeIcon className="h-6 w-6 sm:h-8 sm:w-8 text-[#3B5BDB]" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Orders Today</p>
              <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold text-gray-900">{stats.ordersToday}</p>
              <div className="mt-1 sm:mt-2 flex items-center text-xs sm:text-sm text-green-600">
                <ArrowUpIcon className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                <span>8% from yesterday</span>
              </div>
            </div>
            <div className="rounded-full bg-green-100 p-2 sm:p-3">
              <ShoppingCartIcon className="h-6 w-6 sm:h-8 sm:w-8 text-[#00C896]" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Sales This Week</p>
              <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold text-gray-900">
                ₦{stats.salesThisWeek.toLocaleString()}
              </p>
              <div className="mt-1 sm:mt-2 flex items-center text-xs sm:text-sm text-red-600">
                <ArrowDownIcon className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                <span>3% from last week</span>
              </div>
            </div>
            <div className="rounded-full bg-yellow-100 p-2 sm:p-3">
              <CurrencyDollarIcon className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Pending Deliveries</p>
              <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold text-gray-900">{stats.pendingDeliveries}</p>
              <div className="mt-1 sm:mt-2 flex items-center text-xs sm:text-sm text-gray-600">
                <span>2 urgent</span>
              </div>
            </div>
            <div className="rounded-full bg-purple-100 p-2 sm:p-3">
              <TruckIcon className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mx-4 sm:mx-0 rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
        <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold text-gray-900">Quick Actions</h3>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/portal/products"
            className="flex items-center justify-center space-x-2 rounded-lg border-2 border-dashed border-gray-300 p-3 sm:p-4 text-center transition-colors hover:border-[#3B5BDB] hover:bg-blue-50"
          >
            <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#3B5BDB]" />
            <span className="text-sm sm:text-base font-medium text-gray-900">Add Product</span>
          </Link>

          <button className="flex items-center justify-center space-x-2 rounded-lg border-2 border-dashed border-gray-300 p-3 sm:p-4 text-center transition-colors hover:border-[#00C896] hover:bg-green-50">
            <ShareIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#00C896]" />
            <span className="text-sm sm:text-base font-medium text-gray-900">Share Store Link</span>
          </button>

          <Link
            to="/portal/whatsapp"
            className="flex items-center justify-center space-x-2 rounded-lg border-2 border-dashed border-gray-300 p-3 sm:p-4 text-center transition-colors hover:border-[#3B5BDB] hover:bg-blue-50"
          >
            <ChatBubbleLeftRightIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#3B5BDB]" />
            <span className="text-sm sm:text-base font-medium text-gray-900">Configure WhatsApp</span>
          </Link>

          <Link
            to="/portal/analytics"
            className="flex items-center justify-center space-x-2 rounded-lg border-2 border-dashed border-gray-300 p-3 sm:p-4 text-center transition-colors hover:border-[#00C896] hover:bg-green-50"
          >
            <ChartBarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#00C896]" />
            <span className="text-sm sm:text-base font-medium text-gray-900">View Analytics</span>
          </Link>
        </div>
      </div>

      {/* Sales Chart and Recent Orders */}
      <div className="mx-4 sm:mx-0 grid gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Sales Chart */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
          <div className="mb-4 sm:mb-6 flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Sales This Week</h3>
            <Link
              to="/portal/analytics"
              className="text-xs sm:text-sm font-medium text-[#3B5BDB] hover:text-[#00C896]"
            >
              View Details
            </Link>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {salesData.map((data, index) => (
              <div key={index} className="flex items-center space-x-2 sm:space-x-3">
                <span className="w-8 sm:w-12 text-xs sm:text-sm font-medium text-gray-600">{data.day}</span>
                <div className="flex-1">
                  <div className="h-6 sm:h-8 overflow-hidden rounded-lg bg-gray-100">
                    <div
                      className="h-full bg-gradient-to-r from-[#3B5BDB] to-[#00C896] transition-all duration-500"
                      style={{ width: `${(data.sales / maxSales) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="w-16 sm:w-20 text-right text-xs sm:text-sm font-semibold text-gray-900">
                  ₦{data.sales.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
          <div className="mb-4 sm:mb-6 flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Recent Orders</h3>
            <Link
              to="/portal/orders"
              className="text-xs sm:text-sm font-medium text-[#3B5BDB] hover:text-[#00C896]"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {recentOrders.map((order, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-3 sm:p-4"
              >
                <div>
                  <p className="text-sm sm:text-base font-semibold text-gray-900">{order.id}</p>
                  <p className="text-xs sm:text-sm text-gray-600">{order.customer}</p>
                  <p className="text-xs text-gray-500">{order.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm sm:text-base font-semibold text-gray-900">₦{order.amount.toLocaleString()}</p>
                  <span
                    className={`inline-block rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium ${
                      order.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
