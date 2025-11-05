import { useState } from 'react';
import {
  DocumentTextIcon,
  ArrowDownTrayIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue';

interface Invoice {
  id: string;
  orderId: string;
  customer: string;
  email: string;
  amount: number;
  date: string;
  dueDate: string;
  status: InvoiceStatus;
}

export default function Invoices() {
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock data
  const invoices: Invoice[] = [
    {
      id: 'INV-001',
      orderId: '#ORD-001',
      customer: 'John Doe',
      email: 'john@example.com',
      amount: 12500,
      date: '2025-11-05',
      dueDate: '2025-11-12',
      status: 'Paid',
    },
    {
      id: 'INV-002',
      orderId: '#ORD-002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      amount: 8500,
      date: '2025-11-04',
      dueDate: '2025-11-11',
      status: 'Pending',
    },
    {
      id: 'INV-003',
      orderId: '#ORD-003',
      customer: 'Mike Johnson',
      email: 'mike@example.com',
      amount: 21000,
      date: '2025-11-03',
      dueDate: '2025-11-10',
      status: 'Paid',
    },
    {
      id: 'INV-004',
      orderId: '#ORD-004',
      customer: 'Sarah Williams',
      email: 'sarah@example.com',
      amount: 6500,
      date: '2025-10-28',
      dueDate: '2025-11-04',
      status: 'Overdue',
    },
  ];

  const getStatusColor = (status: InvoiceStatus) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage and track all your invoices and receipts
          </p>
        </div>
        <button className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-[#3B5BDB] to-[#00C896] px-6 py-3 text-white shadow-lg transition-transform hover:scale-105">
          <PlusIcon className="h-5 w-5" />
          <span className="font-medium">Generate Invoice</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Total Invoices</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{invoices.length}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Paid</p>
          <p className="mt-2 text-3xl font-bold text-green-600">
            ₦{invoices.filter((inv) => inv.status === 'Paid').reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Pending</p>
          <p className="mt-2 text-3xl font-bold text-yellow-600">
            ₦{invoices.filter((inv) => inv.status === 'Pending').reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Overdue</p>
          <p className="mt-2 text-3xl font-bold text-red-600">
            ₦{invoices.filter((inv) => inv.status === 'Overdue').reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-4">
          {/* Search */}
          <div className="relative sm:col-span-2">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by invoice ID or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-[#3B5BDB] focus:outline-none focus:ring-2 focus:ring-[#3B5BDB]"
            />
          </div>

          {/* Date Range */}
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-[#3B5BDB] focus:outline-none focus:ring-2 focus:ring-[#3B5BDB]"
              placeholder="Start date"
            />
          </div>

          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-[#3B5BDB] focus:outline-none focus:ring-2 focus:ring-[#3B5BDB]"
              placeholder="End date"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="status"
              value="all"
              checked={statusFilter === 'all'}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-4 w-4 text-[#3B5BDB] focus:ring-[#3B5BDB]"
            />
            <span className="text-sm text-gray-700">All</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="status"
              value="Paid"
              checked={statusFilter === 'Paid'}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-4 w-4 text-[#3B5BDB] focus:ring-[#3B5BDB]"
            />
            <span className="text-sm text-gray-700">Paid</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="status"
              value="Pending"
              checked={statusFilter === 'Pending'}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-4 w-4 text-[#3B5BDB] focus:ring-[#3B5BDB]"
            />
            <span className="text-sm text-gray-700">Pending</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="status"
              value="Overdue"
              checked={statusFilter === 'Overdue'}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-4 w-4 text-[#3B5BDB] focus:ring-[#3B5BDB]"
            />
            <span className="text-sm text-gray-700">Overdue</span>
          </label>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Invoice ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Due Date
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
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <DocumentTextIcon className="h-5 w-5 text-[#3B5BDB]" />
                      <span className="font-semibold text-gray-900">{invoice.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{invoice.orderId}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{invoice.customer}</p>
                      <p className="text-sm text-gray-500">{invoice.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    ₦{invoice.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{invoice.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{invoice.dueDate}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                        invoice.status
                      )}`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-[#3B5BDB]">
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-[#00C896]">
                        <ArrowDownTrayIcon className="h-5 w-5" />
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
          <p className="text-sm text-gray-600">Showing 1 to {invoices.length} of {invoices.length} invoices</p>
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
    </div>
  );
}
