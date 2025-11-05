import { useState } from 'react';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CurrencyDollarIcon,
  UsersIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';

type TimeRange = 'daily' | 'weekly' | 'monthly';

interface SalesData {
  label: string;
  sales: number;
  orders: number;
}

interface TopProduct {
  id: string;
  name: string;
  unitsSold: number;
  revenue: number;
  trend: 'up' | 'down';
  trendValue: number;
}

export default function Analytics() {
  const [timeRange, setTimeRange] = useState<TimeRange>('weekly');

  // Mock data
  const dailySales: SalesData[] = [
    { label: '00:00', sales: 1200, orders: 3 },
    { label: '04:00', sales: 800, orders: 2 },
    { label: '08:00', sales: 3500, orders: 8 },
    { label: '12:00', sales: 5200, orders: 12 },
    { label: '16:00', sales: 4800, orders: 10 },
    { label: '20:00', sales: 3200, orders: 7 },
  ];

  const weeklySales: SalesData[] = [
    { label: 'Mon', sales: 3200, orders: 8 },
    { label: 'Tue', sales: 4100, orders: 11 },
    { label: 'Wed', sales: 3800, orders: 9 },
    { label: 'Thu', sales: 5200, orders: 14 },
    { label: 'Fri', sales: 4800, orders: 13 },
    { label: 'Sat', sales: 6100, orders: 17 },
    { label: 'Sun', sales: 5500, orders: 15 },
  ];

  const monthlySales: SalesData[] = [
    { label: 'Week 1', sales: 18500, orders: 45 },
    { label: 'Week 2', sales: 21200, orders: 52 },
    { label: 'Week 3', sales: 19800, orders: 48 },
    { label: 'Week 4', sales: 24300, orders: 61 },
  ];

  const topProducts: TopProduct[] = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      unitsSold: 145,
      revenue: 2175000,
      trend: 'up',
      trendValue: 12,
    },
    {
      id: '2',
      name: 'Smart Watch Series 5',
      unitsSold: 98,
      revenue: 2450000,
      trend: 'up',
      trendValue: 8,
    },
    {
      id: '3',
      name: 'Organic Cotton T-Shirt',
      unitsSold: 234,
      revenue: 819000,
      trend: 'down',
      trendValue: 3,
    },
    {
      id: '4',
      name: 'LED Desk Lamp',
      unitsSold: 67,
      revenue: 536000,
      trend: 'up',
      trendValue: 15,
    },
    {
      id: '5',
      name: 'Bluetooth Speaker',
      unitsSold: 89,
      revenue: 712000,
      trend: 'down',
      trendValue: 5,
    },
  ];

  const getSalesData = () => {
    switch (timeRange) {
      case 'daily':
        return dailySales;
      case 'weekly':
        return weeklySales;
      case 'monthly':
        return monthlySales;
      default:
        return weeklySales;
    }
  };

  const currentData = getSalesData();
  const maxSales = Math.max(...currentData.map((d) => d.sales));

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="mt-1 text-sm text-gray-600">
            Track your store's performance and insights
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex rounded-lg border border-gray-300 bg-white">
          <button
            onClick={() => setTimeRange('daily')}
            className={`px-6 py-2 text-sm font-medium ${
              timeRange === 'daily'
                ? 'bg-gradient-to-r from-[#3B5BDB] to-[#00C896] text-white'
                : 'text-gray-700 hover:bg-gray-50'
            } rounded-l-lg`}
          >
            Daily
          </button>
          <button
            onClick={() => setTimeRange('weekly')}
            className={`px-6 py-2 text-sm font-medium ${
              timeRange === 'weekly'
                ? 'bg-gradient-to-r from-[#3B5BDB] to-[#00C896] text-white'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeRange('monthly')}
            className={`px-6 py-2 text-sm font-medium ${
              timeRange === 'monthly'
                ? 'bg-gradient-to-r from-[#3B5BDB] to-[#00C896] text-white'
                : 'text-gray-700 hover:bg-gray-50'
            } rounded-r-lg`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">₦245,000</p>
              <div className="mt-2 flex items-center text-sm text-green-600">
                <ArrowTrendingUpIcon className="mr-1 h-4 w-4" />
                <span>12% increase</span>
              </div>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">3.2%</p>
              <div className="mt-2 flex items-center text-sm text-green-600">
                <ArrowTrendingUpIcon className="mr-1 h-4 w-4" />
                <span>0.5% increase</span>
              </div>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <ChartBarIcon className="h-8 w-8 text-[#3B5BDB]" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Returning Customers</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">342</p>
              <div className="mt-2 flex items-center text-sm text-red-600">
                <ArrowTrendingDownIcon className="mr-1 h-4 w-4" />
                <span>2% decrease</span>
              </div>
            </div>
            <div className="rounded-full bg-purple-100 p-3">
              <UsersIcon className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">₦8,750</p>
              <div className="mt-2 flex items-center text-sm text-green-600">
                <ArrowTrendingUpIcon className="mr-1 h-4 w-4" />
                <span>7% increase</span>
              </div>
            </div>
            <div className="rounded-full bg-yellow-100 p-3">
              <ShoppingBagIcon className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Sales Overview ({timeRange.charAt(0).toUpperCase() + timeRange.slice(1)})
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Track your sales performance over time
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {currentData.map((data, index) => (
            <div key={index} className="group">
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">{data.label}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-500">{data.orders} orders</span>
                  <span className="font-semibold text-gray-900">
                    ₦{data.sales.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="h-10 overflow-hidden rounded-lg bg-gray-100">
                <div
                  className="h-full bg-gradient-to-r from-[#3B5BDB] to-[#00C896] transition-all duration-500"
                  style={{ width: `${(data.sales / maxSales) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Top Selling Products</h3>
            <p className="mt-1 text-sm text-gray-600">
              Best performing products in your store
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-[#3B5BDB] to-[#00C896] text-lg font-bold text-white">
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.unitsSold} units sold</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  ₦{product.revenue.toLocaleString()}
                </p>
                <div
                  className={`mt-1 flex items-center justify-end text-sm ${
                    product.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {product.trend === 'up' ? (
                    <ArrowTrendingUpIcon className="mr-1 h-4 w-4" />
                  ) : (
                    <ArrowTrendingDownIcon className="mr-1 h-4 w-4" />
                  )}
                  <span>{product.trendValue}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
