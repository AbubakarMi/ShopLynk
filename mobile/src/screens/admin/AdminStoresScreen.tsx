import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
  MagnifyingGlassIcon,
  FilterIcon,
  BuildingStorefrontIcon,
  UserIcon,
  CubeIcon,
  ShoppingCartIcon,
  StarIcon,
} from '../../components/Icons';
import { adminService } from '../../shared/services/adminMockData';
import type { Store } from '../../shared/types/admin';

const COLORS = {
  primary: '#3B5BDB',
  primary600: '#3046C5',
  accent: '#00C896',
  surface: '#F9FAFB',
  textDark: '#1A1A1A',
  textLight: '#6B7280',
  border: '#E5E7EB',
  white: '#FFFFFF',
  green: '#10B981',
  red: '#EF4444',
  yellow: '#F59E0B',
};

const AdminStoresScreen = ({ navigation }: any) => {
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
      Alert.alert('Error', 'Failed to load stores');
    } finally {
      setLoading(false);
    }
  };

  const filterStores = () => {
    let filtered = [...stores];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (store) =>
          store.name.toLowerCase().includes(query) ||
          store.owner.toLowerCase().includes(query) ||
          store.category.toLowerCase().includes(query)
      );
    }

    setFilteredStores(filtered);
  };

  const handleStatusToggle = async (store: Store) => {
    const newStatus = store.status === 'active' ? 'suspended' : 'active';
    Alert.alert(
      `${newStatus === 'active' ? 'Activate' : 'Suspend'} Store`,
      `Are you sure you want to ${newStatus === 'active' ? 'activate' : 'suspend'} ${store.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              await adminService.updateStoreStatus(store.id, newStatus);
              await loadStores();
              Alert.alert('Success', 'Store updated successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to update store');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading stores...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Stores Management</Text>
        <Text style={styles.subtitle}>{stores.length} total stores</Text>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <MagnifyingGlassIcon size={20} color={COLORS.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search stores..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredStores.map((store, index) => (
          <Animated.View
            key={store.id}
            entering={FadeInDown.duration(400).delay(50 * index)}
          >
            <View style={styles.storeCard}>
              <View style={styles.storeHeader}>
                <View style={styles.storeIconContainer}>
                  <BuildingStorefrontIcon size={24} color={COLORS.primary} />
                </View>
                <View style={styles.storeInfo}>
                  <Text style={styles.storeName}>{store.name}</Text>
                  <Text style={styles.storeOwner}>{store.owner}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        store.status === 'active' ? `${COLORS.green}20` : `${COLORS.red}20`,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      { color: store.status === 'active' ? COLORS.green : COLORS.red },
                    ]}
                  >
                    {store.status}
                  </Text>
                </View>
              </View>

              <View style={styles.storeMeta}>
                <Text style={styles.storeCategory}>{store.category}</Text>
                <View style={styles.ratingContainer}>
                  <StarIcon size={16} color={COLORS.yellow} filled />
                  <Text style={styles.ratingText}>{store.rating.toFixed(1)}</Text>
                </View>
              </View>

              <View style={styles.storeStats}>
                <View style={styles.stat}>
                  <CubeIcon size={16} color={COLORS.textLight} />
                  <Text style={styles.statText}>{store.productsCount} products</Text>
                </View>
                <View style={styles.stat}>
                  <ShoppingCartIcon size={16} color={COLORS.textLight} />
                  <Text style={styles.statText}>{store.ordersCount} orders</Text>
                </View>
              </View>

              <View style={styles.storeFooter}>
                <Text style={styles.storeRevenue}>
                  ${store.revenue.toLocaleString()}
                </Text>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleStatusToggle(store)}
                >
                  <Text style={styles.actionButtonText}>
                    {store.status === 'active' ? 'Suspend' : 'Activate'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        ))}

        {filteredStores.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No stores found</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.textLight,
    fontFamily: 'Inter_400Regular',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textDark,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 12,
  },
  storeCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  storeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  storeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: `${COLORS.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeInfo: {
    flex: 1,
    marginLeft: 12,
  },
  storeName: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
    marginBottom: 2,
  },
  storeOwner: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    textTransform: 'capitalize',
  },
  storeMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  storeCategory: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textDark,
  },
  storeStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
  },
  storeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  storeRevenue: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: COLORS.primary,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.white,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
  },
});

export default AdminStoresScreen;
