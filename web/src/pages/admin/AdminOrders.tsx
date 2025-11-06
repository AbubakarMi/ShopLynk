import { useEffect, useState } from 'react';
import {
  ShoppingCartIcon,
  UserIcon,
  BuildingStorefrontIcon,
} from '@heroicons/react/24/outline';
import { adminService } from '../../../../shared/services/adminMockData';
import type { AdminOrder } from '../../../../shared/types/admin';

const AdminOrders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await adminService.getOrders();
      setOrders(data);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter((order) => order.status === filterStatus);

  const totalRevenue = orders
    .filter((o) => o.status === 'completed')
    .reduce((sum, o) => sum + o.amount, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600 mt-2">{orders.length} total orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-sm font-semibold text-gray-600 mb-2">Total Revenue</p>
          <p className="text-3xl font-bold text-primary">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-sm font-semibold text-gray-600 mb-2">Completed Orders</p>
          <p className="text-3xl font-bold text-gray-900">
            {orders.filter((o) => o.status === 'completed').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto">
        {['all', 'pending', 'processing', 'shipped', 'completed', 'cancelled', 'refunded'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
              filterStatus === status
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-primary/30'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary/30 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShoppingCartIcon className="h-5 w-5 text-primary" />
                <span className="font-bold text-gray-900">{order.id}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <UserIcon className="h-4 w-4" />
                <span>{(order as any).customer}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <BuildingStorefrontIcon className="h-4 w-4" />
                <span>{(order as any).store}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div>
                <p className="text-xl font-bold text-primary">${order.amount.toFixed(2)}</p>
                <p className="text-sm text-gray-600">{order.items} items</p>
              </div>
              <p className="text-sm text-gray-600">
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg font-bold text-gray-900">No orders found</p>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
