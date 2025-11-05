import { useState } from 'react';
import {
  UsersIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  PhoneIcon,
  EyeIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastPurchase: string;
  totalSpent: number;
  ordersCount: number;
  status: 'Active' | 'Inactive';
  joinedDate: string;
}

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Mock data
  const customers: Customer[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+234 801 234 5678',
      lastPurchase: '2025-11-05',
      totalSpent: 125000,
      ordersCount: 12,
      status: 'Active',
      joinedDate: '2025-06-15',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+234 802 345 6789',
      lastPurchase: '2025-11-04',
      totalSpent: 85000,
      ordersCount: 8,
      status: 'Active',
      joinedDate: '2025-07-20',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+234 803 456 7890',
      lastPurchase: '2025-11-03',
      totalSpent: 210000,
      ordersCount: 18,
      status: 'Active',
      joinedDate: '2025-05-10',
    },
    {
      id: '4',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      phone: '+234 804 567 8901',
      lastPurchase: '2025-09-15',
      totalSpent: 45000,
      ordersCount: 4,
      status: 'Inactive',
      joinedDate: '2025-08-05',
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david@example.com',
      phone: '+234 805 678 9012',
      lastPurchase: '2025-11-02',
      totalSpent: 156000,
      ordersCount: 15,
      status: 'Active',
      joinedDate: '2025-04-22',
    },
  ];

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === 'Active').length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgOrderValue = totalRevenue / customers.reduce((sum, c) => sum + c.ordersCount, 0);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your customer relationships and track their activity
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{totalCustomers}</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <UsersIcon className="h-8 w-8 text-[#3B5BDB]" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Customers</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{activeCustomers}</p>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <UsersIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                ₦{totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="rounded-full bg-purple-100 p-3">
              <ChatBubbleLeftRightIcon className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                ₦{Math.round(avgOrderValue).toLocaleString()}
              </p>
            </div>
            <div className="rounded-full bg-yellow-100 p-3">
              <ChatBubbleLeftRightIcon className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search customers by name, email or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-[#3B5BDB] focus:outline-none focus:ring-2 focus:ring-[#3B5BDB]"
        />
      </div>

      {/* Customers Table */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Last Purchase
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Orders
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
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{customer.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <EnvelopeIcon className="h-4 w-4" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <PhoneIcon className="h-4 w-4" />
                        <span>{customer.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{customer.lastPurchase}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    ₦{customer.totalSpent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                      {customer.ordersCount} orders
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        customer.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-[#3B5BDB]"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button className="flex items-center space-x-1 rounded-lg bg-gradient-to-r from-[#3B5BDB] to-[#00C896] px-3 py-2 text-sm font-medium text-white hover:opacity-90">
                        <ChatBubbleLeftRightIcon className="h-4 w-4" />
                        <span>Message</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
          <p className="text-sm text-gray-600">
            Showing 1 to {customers.length} of {customers.length} customers
          </p>
          <div className="flex space-x-2">
            <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="rounded-lg bg-[#3B5BDB] px-4 py-2 text-sm font-medium text-white">
              1
            </button>
            <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900">Customer Details</h2>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6 p-6">
              {/* Customer Info */}
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="mb-3 font-semibold text-gray-900">Personal Information</h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Name:</span>{' '}
                    {selectedCustomer.name}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Email:</span>{' '}
                    {selectedCustomer.email}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Phone:</span>{' '}
                    {selectedCustomer.phone}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Member Since:</span>{' '}
                    {selectedCustomer.joinedDate}
                  </p>
                </div>
              </div>

              {/* Purchase Stats */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-gray-200 p-4">
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    {selectedCustomer.ordersCount}
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 p-4">
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    ₦{selectedCustomer.totalSpent.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 p-4">
                  <p className="text-sm text-gray-600">Last Purchase</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {selectedCustomer.lastPurchase}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 border-t border-gray-200 p-6">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-[#3B5BDB] to-[#00C896] px-6 py-2 font-medium text-white hover:opacity-90">
                <ChatBubbleLeftRightIcon className="h-5 w-5" />
                <span>Message on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
