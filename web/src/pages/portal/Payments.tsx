import { useState } from 'react';
import {
  CreditCardIcon,
  BanknotesIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

type PaymentFilter = 'All' | 'Successful' | 'Pending' | 'Failed';

interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  status: 'Successful' | 'Pending' | 'Failed';
  method: string;
  date: string;
  reference: string;
}

export default function Payments() {
  const [filter, setFilter] = useState<PaymentFilter>('All');

  const transactions: Transaction[] = [
    {
      id: '1',
      orderId: '#ORD-001',
      amount: 12500,
      status: 'Successful',
      method: 'Card',
      date: '2025-11-05 10:30',
      reference: 'REF-123456',
    },
    {
      id: '2',
      orderId: '#ORD-002',
      amount: 8500,
      status: 'Pending',
      method: 'Transfer',
      date: '2025-11-04 15:20',
      reference: 'REF-123457',
    },
    {
      id: '3',
      orderId: '#ORD-003',
      amount: 21000,
      status: 'Successful',
      method: 'Card',
      date: '2025-11-04 11:45',
      reference: 'REF-123458',
    },
  ];

  const balance = 145000;
  const totalRevenue = 245000;
  const pendingAmount = 12500;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Successful':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case 'Pending':
        return <ClockIcon className="h-5 w-5 text-yellow-600" />;
      case 'Failed':
        return <XCircleIcon className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Successful':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
        <p className="mt-1 text-sm text-gray-600">
          View payment history and manage your earnings
        </p>
      </div>

      {/* Balance Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-[#3B5BDB] to-[#00C896] p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Available Balance</p>
              <p className="mt-2 text-3xl font-bold">₦{balance.toLocaleString()}</p>
            </div>
            <BanknotesIcon className="h-12 w-12 opacity-80" />
          </div>
          <button className="mt-4 flex w-full items-center justify-center space-x-2 rounded-lg bg-white bg-opacity-20 py-2 font-medium transition-colors hover:bg-opacity-30">
            <ArrowDownTrayIcon className="h-5 w-5" />
            <span>Withdraw Earnings</span>
          </button>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                ₦{totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <CreditCardIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Payments</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                ₦{pendingAmount.toLocaleString()}
              </p>
            </div>
            <div className="rounded-full bg-yellow-100 p-3">
              <ClockIcon className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Gateway Settings */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Payment Gateway Settings</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Paystack</p>
                <p className="text-sm text-gray-500">Not connected</p>
              </div>
              <button className="rounded-lg bg-[#3B5BDB] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                Connect
              </button>
            </div>
          </div>

          <div className="rounded-lg border-2 border-dashed border-gray-300 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Flutterwave</p>
                <p className="text-sm text-gray-500">Not connected</p>
              </div>
              <button className="rounded-lg bg-[#3B5BDB] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center space-x-2">
        <FunnelIcon className="h-5 w-5 text-gray-600" />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as PaymentFilter)}
          className="rounded-lg border border-gray-300 px-4 py-2 focus:border-[#3B5BDB] focus:outline-none focus:ring-2 focus:ring-[#3B5BDB]"
        >
          <option value="All">All Transactions</option>
          <option value="Successful">Successful</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* Transactions Table */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Reference
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-gray-900">{transaction.reference}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">{transaction.orderId}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    ₦{transaction.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{transaction.method}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{transaction.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(transaction.status)}
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {transaction.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
