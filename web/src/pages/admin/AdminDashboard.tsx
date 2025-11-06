import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  BuildingStorefrontIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline';
import { adminService } from '../../../../shared/services/adminMockData';
import type { DashboardStats } from '../../../../shared/types/admin';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await adminService.getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Failed to load dashboard data</p>
      </div>
    );
  }

  const statCards = [
    {
      name: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: stats.revenueChange,
      icon: CurrencyDollarIcon,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      name: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      change: stats.ordersChange,
      icon: ShoppingCartIcon,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      name: 'Active Stores',
      value: stats.totalStores.toString(),
      change: stats.storesChange,
      icon: BuildingStorefrontIcon,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      name: 'Business Owners',
      value: stats.activeBusinessOwners.toString(),
      change: stats.ownersChange,
      icon: UsersIcon,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Platform Overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const isPositive = stat.change >= 0;
          return (
            <div
              key={stat.name}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary/30 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.name}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div
                  className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}
                >
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <div className="flex items-center gap-1">
                {isPositive ? (
                  <ArrowTrendingUpIcon className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowTrendingDownIcon className="h-4 w-4 text-red-600" />
                )}
                <span
                  className={`text-sm font-semibold ${
                    isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {Math.abs(stat.change).toFixed(1)}%
                </span>
                <span className="text-sm text-gray-500">vs last period</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/admin/owners"
          className="bg-gradient-to-br from-primary to-primary-600 p-6 rounded-xl text-white hover:shadow-lg transition-all"
        >
          <UsersIcon className="h-8 w-8 mb-3" />
          <p className="font-bold text-lg">Manage Owners</p>
        </Link>
        <Link
          to="/admin/stores"
          className="bg-gradient-to-br from-accent to-green-600 p-6 rounded-xl text-white hover:shadow-lg transition-all"
        >
          <BuildingStorefrontIcon className="h-8 w-8 mb-3" />
          <p className="font-bold text-lg">Manage Stores</p>
        </Link>
        <Link
          to="/admin/orders"
          className="bg-gradient-to-br from-purple-500 to-purple-700 p-6 rounded-xl text-white hover:shadow-lg transition-all"
        >
          <ShoppingCartIcon className="h-8 w-8 mb-3" />
          <p className="font-bold text-lg">View Orders</p>
        </Link>
        <Link
          to="/admin/reports"
          className="bg-gradient-to-br from-yellow-500 to-orange-600 p-6 rounded-xl text-white hover:shadow-lg transition-all"
        >
          <CurrencyDollarIcon className="h-8 w-8 mb-3" />
          <p className="font-bold text-lg">View Reports</p>
        </Link>
      </div>

      {/* Recent Orders & Top Stores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            <Link
              to="/admin/orders"
              className="text-sm font-semibold text-primary hover:text-primary-600"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {stats.recentOrders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-primary/30 transition-all"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-gray-900">{order.id}</p>
                    <p className="font-bold text-primary">
                      ${order.amount.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">{order.store}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm text-gray-600">{order.customer}</p>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Stores */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Top Stores</h2>
            <Link
              to="/admin/stores"
              className="text-sm font-semibold text-primary hover:text-primary-600"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {stats.topStores.map((store, index) => (
              <div
                key={store.id}
                className="flex items-center gap-3 p-4 border border-gray-100 rounded-lg hover:border-primary/30 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{store.name}</p>
                  <p className="text-sm text-gray-600">{store.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">
                    ${store.revenue.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    {store.ordersCount} orders
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
