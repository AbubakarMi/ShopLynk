import { useEffect, useState } from 'react';
import {
  MagnifyingGlassIcon,
  BuildingStorefrontIcon,
  UserIcon,
  CubeIcon,
  ShoppingCartIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { adminService } from '../../../../shared/services/adminMockData';
import type { Store } from '../../../../shared/types/admin';

const AdminStores = () => {
  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState<Store[]>([]);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadStores();
  }, []);

  useEffect(() => {
    filterStores();
  }, [searchQuery, stores]);

  const loadStores = async () => {
    try {
      setLoading(true);
      const data = await adminService.getStores();
      setStores(data);
      setFilteredStores(data);
    } catch (error) {
      console.error('Failed to load stores:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterStores = () => {
    let filtered = [...stores];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (store: any) =>
          store.name.toLowerCase().includes(query) ||
          (store.owner && store.owner.toLowerCase().includes(query)) ||
          (store.category && store.category.toLowerCase().includes(query))
      );
    }

    setFilteredStores(filtered);
  };

  const handleStatusToggle = async (store: Store) => {
    const newStatus = store.status === 'active' ? 'suspended' : 'active';
    if (window.confirm(`Are you sure you want to ${newStatus === 'active' ? 'activate' : 'suspend'} ${store.name}?`)) {
      try {
        await adminService.updateStoreStatus(store.id, newStatus);
        await loadStores();
      } catch (error) {
        alert('Failed to update store');
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
        <h1 className="text-3xl font-bold text-gray-900">Stores Management</h1>
        <p className="text-gray-600 mt-2">{stores.length} total stores</p>
      </div>

      {/* Search */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search stores..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.map((store) => (
          <div
            key={store.id}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary/30 transition-all"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <BuildingStorefrontIcon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">{store.name}</h3>
                <p className="text-sm text-gray-600">{(store as any).owner}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  store.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {store.status}
              </span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-primary">{(store as any).category}</span>
              <div className="flex items-center gap-1">
                <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-semibold text-gray-900">{(store as any).rating?.toFixed(1)}</span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CubeIcon className="h-4 w-4" />
                <span>{(store as any).productsCount} products</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ShoppingCartIcon className="h-4 w-4" />
                <span>{(store as any).ordersCount} orders</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <p className="text-lg font-bold text-primary">
                ${(store as any).revenue?.toLocaleString()}
              </p>
              <button
                onClick={() => handleStatusToggle(store)}
                className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors"
              >
                {store.status === 'active' ? 'Suspend' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredStores.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg font-bold text-gray-900">No stores found</p>
        </div>
      )}
    </div>
  );
};

export default AdminStores;
