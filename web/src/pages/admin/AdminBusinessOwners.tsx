import { useEffect, useState } from 'react';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  UserIcon,
  EnvelopeIcon,
  BuildingStorefrontIcon,
  GlobeAltIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { adminService } from '../../../../shared/services/adminMockData';
import type { BusinessOwner } from '../../../../shared/types/admin';

const AdminBusinessOwners = () => {
  const [loading, setLoading] = useState(true);
  const [owners, setOwners] = useState<BusinessOwner[]>([]);
  const [filteredOwners, setFilteredOwners] = useState<BusinessOwner[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'suspended'>('all');
  const [selectedOwner, setSelectedOwner] = useState<BusinessOwner | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    loadBusinessOwners();
  }, []);

  useEffect(() => {
    filterOwners();
  }, [searchQuery, filterStatus, owners]);

  const loadBusinessOwners = async () => {
    try {
      setLoading(true);
      const data = await adminService.getBusinessOwners();
      setOwners(data);
    } catch (error) {
      console.error('Failed to load business owners:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterOwners = () => {
    let filtered = [...owners];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (owner) =>
          owner.name.toLowerCase().includes(query) ||
          owner.email.toLowerCase().includes(query) ||
          owner.store.toLowerCase().includes(query) ||
          owner.country.toLowerCase().includes(query)
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter((owner) => owner.status === filterStatus);
    }

    setFilteredOwners(filtered);
  };

  const handleStatusToggle = async (owner: BusinessOwner) => {
    const newStatus = owner.status === 'active' ? 'suspended' : 'active';
    if (window.confirm(`Are you sure you want to ${newStatus === 'active' ? 'activate' : 'suspend'} ${owner.name}?`)) {
      try {
        await adminService.updateBusinessOwnerStatus(owner.id, newStatus);
        await loadBusinessOwners();
        setShowDetails(false);
      } catch (error) {
        alert('Failed to update owner status');
      }
    }
  };

  const handleDelete = async (owner: BusinessOwner) => {
    if (window.confirm(`Are you sure you want to delete ${owner.name}? This action cannot be undone.`)) {
      try {
        await adminService.deleteBusinessOwner(owner.id);
        await loadBusinessOwners();
        setShowDetails(false);
      } catch (error) {
        alert('Failed to delete owner');
      }
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
        <h1 className="text-3xl font-bold text-gray-900">Business Owners</h1>
        <p className="text-gray-600 mt-2">{owners.length} total owners</p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search owners, stores, countries..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              filterStatus === 'all'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-primary/30'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus('active')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              filterStatus === 'active'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-primary/30'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilterStatus('suspended')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              filterStatus === 'suspended'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-primary/30'
            }`}
          >
            Suspended
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-600">
          {filteredOwners.length} {filteredOwners.length === 1 ? 'result' : 'results'}
        </p>
        {filterStatus !== 'all' && (
          <button
            onClick={() => setFilterStatus('all')}
            className="text-sm font-semibold text-primary hover:text-primary-600"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* Owners Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOwners.map((owner) => (
          <div
            key={owner.id}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary/30 transition-all cursor-pointer"
            onClick={() => {
              setSelectedOwner(owner);
              setShowDetails(true);
            }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                {owner.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">{owner.name}</h3>
                <p className="text-sm text-gray-600">{owner.email}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  owner.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {owner.status}
              </span>
            </div>

            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <BuildingStorefrontIcon className="h-4 w-4" />
                <span>{owner.store}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <GlobeAltIcon className="h-4 w-4" />
                <span>{owner.country}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{owner.totalOrders}</p>
                <p className="text-xs text-gray-600">Orders</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-primary">
                  ${owner.totalRevenue.toLocaleString()}
                </p>
                <p className="text-xs text-gray-600">Revenue</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">
                  {new Date(owner.joined).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
                <p className="text-xs text-gray-600">Joined</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOwners.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg font-bold text-gray-900">No business owners found</p>
          <p className="text-gray-600 mt-2">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Details Modal */}
      {showDetails && selectedOwner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Owner Details</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Name</p>
                    <p className="text-base font-semibold text-gray-900">{selectedOwner.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Email</p>
                    <p className="text-base font-semibold text-gray-900">{selectedOwner.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <BuildingStorefrontIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Store</p>
                    <p className="text-base font-semibold text-gray-900">{selectedOwner.store}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <GlobeAltIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Country</p>
                    <p className="text-base font-semibold text-gray-900">{selectedOwner.country}</p>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-2xl font-bold text-gray-900">{selectedOwner.totalOrders}</p>
                    <p className="text-sm text-gray-600">Total Orders</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-2xl font-bold text-primary">
                      ${selectedOwner.totalRevenue.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl mt-4">
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="text-xl font-bold text-gray-900">
                    {new Date(selectedOwner.joined).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleStatusToggle(selectedOwner)}
                  className={`flex-1 py-3 rounded-xl font-bold text-white transition-all ${
                    selectedOwner.status === 'active'
                      ? 'bg-yellow-500 hover:bg-yellow-600'
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {selectedOwner.status === 'active' ? 'Suspend' : 'Activate'}
                </button>

                <button
                  onClick={() => handleDelete(selectedOwner)}
                  className="flex-1 py-3 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBusinessOwners;
