import { useEffect, useState } from 'react';
import {
  CreditCardIcon,
  BuildingStorefrontIcon,
} from '@heroicons/react/24/outline';
import { adminService } from '../../../../shared/services/adminMockData';
import type { Payment } from '../../../../shared/types/admin';

const AdminPayments = () => {
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      setLoading(true);
      const data = await adminService.getPayments();
      setPayments(data);
    } catch (error) {
      console.error('Failed to load payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodLabel = (method: string) => {
    switch (method) {
      case 'credit_card':
        return 'Credit Card';
      case 'paypal':
        return 'PayPal';
      case 'bank_transfer':
        return 'Bank Transfer';
      default:
        return method;
    }
  };

  const totalAmount = payments
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

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
        <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-600 mt-2">{payments.length} total payments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-sm font-semibold text-gray-600 mb-2">Total Amount</p>
          <p className="text-3xl font-bold text-primary">${totalAmount.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-sm font-semibold text-gray-600 mb-2">Completed</p>
          <p className="text-3xl font-bold text-green-600">
            {payments.filter((p) => p.status === 'completed').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-sm font-semibold text-gray-600 mb-2">Failed</p>
          <p className="text-3xl font-bold text-red-600">
            {payments.filter((p) => p.status === 'failed').length}
          </p>
        </div>
      </div>

      {/* Payments List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Payment ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Store</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Method</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Transaction ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <CreditCardIcon className="h-5 w-5 text-primary" />
                      <span className="font-semibold text-gray-900">{payment.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{(payment as any).order}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <BuildingStorefrontIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{(payment as any).store}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-primary">${payment.amount.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      {getMethodLabel((payment as any).method)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                    {(payment as any).transactionId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {payments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg font-bold text-gray-900">No payments found</p>
        </div>
      )}
    </div>
  );
};

export default AdminPayments;
