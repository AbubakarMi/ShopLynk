import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  BuildingStorefrontIcon,
  UserGroupIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ChartBarIcon,
} from '../../components/Icons';
import { adminService } from '../../shared/services/adminMockData';
import type { DashboardStats } from '../../shared/types/admin';

const { width } = Dimensions.get('window');

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
};

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, index }) => {
  const isPositive = change >= 0;

  return (
    <Animated.View
      entering={FadeInDown.duration(600).delay(100 * index)}
      style={styles.statCard}
    >
      <View style={styles.statCardContent}>
        <View style={styles.statCardHeader}>
          <View style={styles.iconContainer}>{icon}</View>
          <Text style={styles.statTitle}>{title}</Text>
        </View>
        <Text style={styles.statValue}>{value}</Text>
        <View style={styles.statChangeRow}>
          {isPositive ? (
            <ArrowUpIcon size={16} color={COLORS.green} />
          ) : (
            <ArrowDownIcon size={16} color={COLORS.red} />
          )}
          <Text
            style={[
              styles.statChange,
              { color: isPositive ? COLORS.green : COLORS.red },
            ]}
          >
            {Math.abs(change).toFixed(1)}%
          </Text>
          <Text style={styles.statChangeLabel}>vs last period</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const AdminDashboardScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      const data = await adminService.getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!stats) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load dashboard</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadDashboardStats}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Admin Dashboard</Text>
          <Text style={styles.subtitle}>Platform Overview</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            change={stats.revenueChange}
            icon={<CurrencyDollarIcon size={24} color={COLORS.primary} />}
            index={0}
          />
          <StatCard
            title="Total Orders"
            value={stats.totalOrders.toLocaleString()}
            change={stats.ordersChange}
            icon={<ShoppingCartIcon size={24} color={COLORS.accent} />}
            index={1}
          />
          <StatCard
            title="Active Stores"
            value={stats.totalStores.toString()}
            change={stats.storesChange}
            icon={<BuildingStorefrontIcon size={24} color={COLORS.primary} />}
            index={2}
          />
          <StatCard
            title="Business Owners"
            value={stats.activeBusinessOwners.toString()}
            change={stats.ownersChange}
            icon={<UserGroupIcon size={24} color={COLORS.accent} />}
            index={3}
          />
        </View>

        {/* Quick Actions */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(400)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('AdminBusinessOwners')}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.primary600]}
                style={styles.quickActionGradient}
              >
                <UserGroupIcon size={24} color={COLORS.white} />
                <Text style={styles.quickActionText}>Manage Owners</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('AdminStores')}
            >
              <LinearGradient
                colors={[COLORS.accent, '#00B386']}
                style={styles.quickActionGradient}
              >
                <BuildingStorefrontIcon size={24} color={COLORS.white} />
                <Text style={styles.quickActionText}>Manage Stores</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('AdminOrders')}
            >
              <LinearGradient
                colors={['#8B5CF6', '#7C3AED']}
                style={styles.quickActionGradient}
              >
                <ShoppingCartIcon size={24} color={COLORS.white} />
                <Text style={styles.quickActionText}>View Orders</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('AdminReports')}
            >
              <LinearGradient
                colors={['#F59E0B', '#D97706']}
                style={styles.quickActionGradient}
              >
                <ChartBarIcon size={24} color={COLORS.white} />
                <Text style={styles.quickActionText}>View Reports</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Recent Orders */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(500)}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AdminOrders')}>
              <Text style={styles.sectionLink}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ordersContainer}>
            {stats.recentOrders.slice(0, 5).map((order, index) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <Text style={styles.orderId}>{order.id}</Text>
                  <Text style={styles.orderAmount}>
                    ${order.amount.toFixed(2)}
                  </Text>
                </View>
                <Text style={styles.orderStore}>{order.store}</Text>
                <View style={styles.orderFooter}>
                  <Text style={styles.orderCustomer}>{order.customer}</Text>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          order.status === 'completed'
                            ? '#10B98110'
                            : order.status === 'processing'
                            ? '#3B5BDB10'
                            : '#F59E0B10',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color:
                            order.status === 'completed'
                              ? '#10B981'
                              : order.status === 'processing'
                              ? '#3B5BDB'
                              : '#F59E0B',
                        },
                      ]}
                    >
                      {order.status}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Top Stores */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(600)}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Stores</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AdminStores')}>
              <Text style={styles.sectionLink}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.storesContainer}>
            {stats.topStores.map((store, index) => (
              <View key={store.id} style={styles.storeCard}>
                <View style={styles.storeRank}>
                  <Text style={styles.storeRankText}>{index + 1}</Text>
                </View>
                <View style={styles.storeInfo}>
                  <Text style={styles.storeName}>{store.name}</Text>
                  <Text style={styles.storeCategory}>{store.category}</Text>
                </View>
                <View style={styles.storeStats}>
                  <Text style={styles.storeRevenue}>
                    ${store.revenue.toLocaleString()}
                  </Text>
                  <Text style={styles.storeOrders}>{store.ordersCount} orders</Text>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.red,
    marginBottom: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  header: {
    marginBottom: 24,
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
  statsGrid: {
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statCardContent: {
    gap: 8,
  },
  statCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: `${COLORS.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
    flex: 1,
  },
  statValue: {
    fontSize: 32,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.textDark,
  },
  statChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statChange: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  statChangeLabel: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
  },
  sectionLink: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.primary,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionButton: {
    width: (width - 52) / 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  quickActionGradient: {
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: COLORS.white,
  },
  ordersContainer: {
    gap: 12,
  },
  orderCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
  },
  orderAmount: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: COLORS.primary,
  },
  orderStore: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
    marginBottom: 8,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderCustomer: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textDark,
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
  storesContainer: {
    gap: 12,
  },
  storeCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  storeRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeRankText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: COLORS.white,
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
    marginBottom: 2,
  },
  storeCategory: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
  },
  storeStats: {
    alignItems: 'flex-end',
  },
  storeRevenue: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: COLORS.primary,
    marginBottom: 2,
  },
  storeOrders: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
  },
});

export default AdminDashboardScreen;
