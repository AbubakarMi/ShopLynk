import { useEffect, useState } from 'react';
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import { adminService } from '../../../../shared/services/adminMockData';
import type { ReportMetrics } from '../../../../shared/types/admin';

const AdminReports = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<ReportMetrics | null>(null);
  const [period, setPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    loadMetrics();
  }, [period]);

  const loadMetrics = async () => {
    try {
      setLoading(true);
      const data = await adminService.getReportMetrics(period);
      setMetrics(data);
    } catch (error) {
      console.error('Failed to load metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderMetricCard = (
    title: string,
    current: number,
    previous: number,
    change: number,
    icon: React.ReactNode,
    format: 'currency' | 'number' | 'decimal'
  ) => {
    const isPositive = change >= 0;
    const formattedCurrent =
      format === 'currency'
        ? `$${current.toLocaleString()}`
        : format === 'decimal'
        ? current.toFixed(2)
        : current.toLocaleString();

    return (
      <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary/30 transition-all">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
          <p className="text-sm font-semibold text-gray-600">{title}</p>
        </div>
        <p className="text-3xl font-bold text-gray-900 mb-2">{formattedCurrent}</p>
        <div className="flex items-center gap-1">
          {isPositive ? (
            <ArrowTrendingUpIcon className="h-4 w-4 text-green-600" />
          ) : (
            <ArrowTrendingDownIcon className="h-4 w-4 text-red-600" />
          )}
          <span className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {Math.abs(change).toFixed(1)}%
          </span>
          <span className="text-sm text-gray-500">vs previous period</span>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-bold text-gray-900">Failed to load metrics</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-2">Track your platform performance</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:border-primary/30 transition-all">
          <ArrowDownTrayIcon className="h-5 w-5 text-primary" />
          <span className="font-semibold text-primary">Export</span>
        </button>
      </div>

      {/* Period Selector */}
      <div className="flex gap-2">
        {(['weekly', 'monthly', 'yearly'] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              period === p
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-primary/30'
            }`}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {renderMetricCard(
          'Revenue',
          metrics.revenue.current,
          metrics.revenue.previous,
          metrics.revenue.change,
          <CurrencyDollarIcon className="h-6 w-6 text-primary" />,
          'currency'
        )}
        {renderMetricCard(
          'Orders',
          metrics.orders.current,
          metrics.orders.previous,
          metrics.orders.change,
          <ShoppingCartIcon className="h-6 w-6 text-accent" />,
          'number'
        )}
        {renderMetricCard(
          'Customers',
          metrics.customers.current,
          metrics.customers.previous,
          metrics.customers.change,
          <UserGroupIcon className="h-6 w-6 text-primary" />,
          'number'
        )}
        {renderMetricCard(
          'Avg Order Value',
          metrics.avgOrderValue.current,
          metrics.avgOrderValue.previous,
          metrics.avgOrderValue.change,
          <ChartBarIcon className="h-6 w-6 text-accent" />,
          'currency'
        )}
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Top Products</h2>
        <div className="space-y-3">
          {metrics.topProducts.map((product, index) => (
            <div
              key={product.name}
              className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:border-primary/30 transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-600">
                  {product.sales} sales • ${product.revenue.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Categories */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Top Categories</h2>
        <div className="space-y-4">
          {metrics.topCategories.map((category) => (
            <div key={category.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-gray-900">{category.name}</span>
                <span className="font-bold text-primary">{category.percentage}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${category.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
