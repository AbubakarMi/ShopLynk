import { useEffect, useState } from 'react';
import {
  CreditCardIcon,
  EnvelopeIcon,
  ChartBarIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import { adminService } from '../../../../shared/services/adminMockData';
import type { Integration } from '../../../../shared/types/admin';

const AdminIntegrations = () => {
  const [loading, setLoading] = useState(true);
  const [integrations, setIntegrations] = useState<Integration[]>([]);

  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    try {
      setLoading(true);
      const data = await adminService.getIntegrations();
      setIntegrations(data);
    } catch (error) {
      console.error('Failed to load integrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (integration: Integration) => {
    const newStatus = integration.status === 'active' ? 'inactive' : 'active';
    try {
      await adminService.toggleIntegration(integration.id, newStatus);
      await loadIntegrations();
    } catch (error) {
      alert('Failed to toggle integration');
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <CreditCardIcon className="h-6 w-6 text-primary" />;
      case 'email':
        return <EnvelopeIcon className="h-6 w-6 text-accent" />;
      case 'analytics':
        return <ChartBarIcon className="h-6 w-6 text-purple-600" />;
      case 'ecommerce':
        return <ShoppingBagIcon className="h-6 w-6 text-blue-600" />;
      default:
        return <ChartBarIcon className="h-6 w-6 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'payment':
        return 'bg-primary/10 text-primary';
      case 'email':
        return 'bg-accent/10 text-accent';
      case 'analytics':
        return 'bg-purple-100 text-purple-800';
      case 'ecommerce':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatLastSync = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - new Date(date).getTime()) / 60000);

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
  };

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
        <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
        <p className="text-gray-600 mt-2">Manage third-party integrations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-sm font-semibold text-gray-600 mb-2">Active Integrations</p>
          <p className="text-3xl font-bold text-green-600">
            {integrations.filter((i) => i.status === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-sm font-semibold text-gray-600 mb-2">Total Integrations</p>
          <p className="text-3xl font-bold text-gray-900">{integrations.length}</p>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary/30 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center">
                  {getTypeIcon(integration.type)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{integration.name}</h3>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(integration.type)}`}>
                    {integration.type}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    integration.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {integration.status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Stores Using</span>
                <span className="font-semibold text-gray-900">{(integration as any).stores}</span>
              </div>

              {integration.lastSync && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Sync</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {formatLastSync(integration.lastSync)}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => handleToggle(integration)}
              className={`w-full py-3 rounded-xl font-bold transition-all ${
                integration.status === 'active'
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : 'bg-primary text-white hover:bg-primary-600'
              }`}
            >
              {integration.status === 'active' ? 'Disable' : 'Enable'}
            </button>
          </div>
        ))}
      </div>

      {integrations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg font-bold text-gray-900">No integrations found</p>
        </div>
      )}
    </div>
  );
};

export default AdminIntegrations;
