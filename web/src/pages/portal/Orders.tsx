import { useState } from 'react';
import { MagnifyingGlassIcon, EyeIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

type OrderStatus = 'All' | 'Pending' | 'Completed' | 'Cancelled';

interface Order {
  id: string;
  customer: string;
  phone: string;
  items: number;
  amount: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
  date: string;
  time: string;
}

export default function Orders() {
  const [activeTab, setActiveTab] = useState<OrderStatus>('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const orders: Order[] = [
    {
      id: '#ORD-001',
      customer: 'John Doe',
      phone: '+234 801 234 5678',
      items: 3,
      amount: 12500,
      status: 'Pending',
      date: '2025-11-05',
      time: '10:30 AM',
    },
    {
      id: '#ORD-002',
      customer: 'Jane Smith',
      phone: '+234 802 345 6789',
      items: 1,
      amount: 8500,
      status: 'Completed',
      date: '2025-11-04',
      time: '03:15 PM',
    },
    {
      id: '#ORD-003',
      customer: 'Mike Johnson',
      phone: '+234 803 456 7890',
      items: 5,
      amount: 21000,
      status: 'Processing',
      date: '2025-11-04',
      time: '11:45 AM',
    },
    {
      id: '#ORD-004',
      customer: 'Sarah Williams',
      phone: '+234 804 567 8901',
      items: 2,
      amount: 6500,
      status: 'Cancelled',
      date: '2025-11-03',
      time: '09:20 AM',
    },
  ];

  const tabs: OrderStatus[] = ['All', 'Pending', 'Completed', 'Cancelled'];

  const filteredOrders =
    activeTab === 'All'
      ? orders
      : orders.filter((order) => order.status === activeTab || order.status === 'Processing');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="mt-1 text-sm text-gray-600">Track and manage all your customer orders</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'border-[#3B5BDB] text-[#3B5BDB]'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {tab}
              <span
                className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                  activeTab === tab ? 'bg-blue-100 text-[#3B5BDB]' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {tab === 'All'
                  ? orders.length
                  : orders.filter((o) => o.status === tab || o.status === 'Processing').length}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search orders by ID or customer..."
          className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-[#3B5BDB] focus:outline-none focus:ring-2 focus:ring-[#3B5BDB]"
        />
      </div>

      {/* Orders Table */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Items</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{order.items} items</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    ₦{order.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-gray-900">{order.date}</p>
                      <p className="text-xs text-gray-500">{order.time}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-[#3B5BDB]"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Order Details - {selectedOrder.id}
              </h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6 p-6">
              {/* Customer Info */}
              <div>
                <h3 className="mb-3 font-semibold text-gray-900">Customer Information</h3>
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Name:</span>{' '}
                    {selectedOrder.customer}
                  </p>
                  <p className="mt-2 text-sm">
                    <span className="font-medium text-gray-700">Phone:</span> {selectedOrder.phone}
                  </p>
                  <p className="mt-2 text-sm">
                    <span className="font-medium text-gray-700">Delivery Address:</span> 123 Main
                    Street, Lagos, Nigeria
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="mb-3 font-semibold text-gray-900">Order Items</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                    <div>
                      <p className="font-medium text-gray-900">Premium Wireless Headphones</p>
                      <p className="text-sm text-gray-500">Quantity: 1</p>
                    </div>
                    <p className="font-semibold text-gray-900">₦15,000</p>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div>
                <h3 className="mb-3 font-semibold text-gray-900">Payment Information</h3>
                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Subtotal:</span>
                    <span className="text-sm font-medium text-gray-900">
                      ₦{selectedOrder.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <span className="text-sm text-gray-700">Delivery:</span>
                    <span className="text-sm font-medium text-gray-900">₦0</span>
                  </div>
                  <hr className="my-3 border-gray-200" />
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total:</span>
                    <span className="font-semibold text-gray-900">
                      ₦{selectedOrder.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                        selectedOrder.status
                      )}`}
                    >
                      Payment: {selectedOrder.status === 'Completed' ? 'Paid' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 border-t border-gray-200 p-6">
              {selectedOrder.status === 'Pending' && (
                <>
                  <button className="flex items-center space-x-2 rounded-lg border border-red-300 px-6 py-2 font-medium text-red-600 hover:bg-red-50">
                    <XMarkIcon className="h-5 w-5" />
                    <span>Cancel Order</span>
                  </button>
                  <button className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-[#3B5BDB] to-[#00C896] px-6 py-2 font-medium text-white hover:opacity-90">
                    <CheckIcon className="h-5 w-5" />
                    <span>Mark as Delivered</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
