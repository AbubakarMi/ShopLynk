import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import {
  CubeIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
  TruckIcon,
  PlusIcon,
  ShareIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '../../components/Icons';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 375; // iPhone SE and smaller
const isMediumScreen = width >= 375 && width < 414; // iPhone 13/14 Pro
const isLargeScreen = width >= 414; // iPhone 13/14 Pro Max and larger

const COLORS = {
  primary: '#3B5BDB',
  accent: '#00C896',
  white: '#FFFFFF',
  surface: '#F9FAFB',
  textDark: '#1A1A1A',
  textLight: '#6B7280',
  border: '#E5E7EB',
  gray900: '#111827',
};

const DashboardScreen = ({ navigation }: any) => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.surface }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  // Mock data - EXACT match from web version
  const stats = {
    totalProducts: 45,
    ordersToday: 12,
    salesThisWeek: 24500,
    pendingDeliveries: 8,
  };

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', amount: 1250, status: 'Pending', time: '2 hours ago' },
    { id: '#ORD-002', customer: 'Jane Smith', amount: 850, status: 'Completed', time: '5 hours ago' },
    { id: '#ORD-003', customer: 'Mike Johnson', amount: 2100, status: 'Processing', time: '1 day ago' },
  ];

  const salesData = [
    { day: 'Mon', sales: 3200 },
    { day: 'Tue', sales: 4100 },
    { day: 'Wed', sales: 3800 },
    { day: 'Thu', sales: 5200 },
    { day: 'Fri', sales: 4800 },
    { day: 'Sat', sales: 6100 },
    { day: 'Sun', sales: 5500 },
  ];

  const maxSales = Math.max(...salesData.map(d => d.sales));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return { bg: '#D1FAE5', text: '#065F46' };
      case 'Pending':
        return { bg: '#FEF3C7', text: '#92400E' };
      case 'Processing':
        return { bg: '#DBEAFE', text: '#1E40AF' };
      default:
        return { bg: '#F3F4F6', text: '#1F2937' };
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Page header */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Dashboard</Text>
          <Text style={styles.pageSubtitle}>
            Welcome back! Here's what's happening with your store today.
          </Text>
        </View>

        {/* Store Status Banner */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.statusBanner}
        >
          <View style={styles.statusContent}>
            <Text style={styles.statusTitle}>My Awesome Store</Text>
            <Text style={styles.statusSubtitle}>Your store is active and ready to receive orders</Text>
          </View>
          <View style={styles.statusBadgesContainer}>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusBadgeText}>Store Active</Text>
            </View>
            <View style={styles.statusBadge}>
              <ChatBubbleLeftRightIcon size={16} color={COLORS.white} />
              <Text style={styles.statusBadgeText}>WhatsApp Connected</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Stats */}
        <View style={styles.statsGrid}>
          {/* Total Products */}
          <View style={styles.statCard}>
            <View style={styles.statContent}>
              <View style={styles.statLeft}>
                <Text style={styles.statLabel}>Total Products</Text>
                <Text style={styles.statValue}>{stats.totalProducts}</Text>
                <View style={styles.statTrend}>
                  <ArrowUpIcon size={16} color="#10B981" />
                  <Text style={styles.statTrendText}>12% from last month</Text>
                </View>
              </View>
              <View style={[styles.statIcon, { backgroundColor: '#DBEAFE' }]}>
                <CubeIcon size={32} color={COLORS.primary} />
              </View>
            </View>
          </View>

          {/* Orders Today */}
          <View style={styles.statCard}>
            <View style={styles.statContent}>
              <View style={styles.statLeft}>
                <Text style={styles.statLabel}>Orders Today</Text>
                <Text style={styles.statValue}>{stats.ordersToday}</Text>
                <View style={styles.statTrend}>
                  <ArrowUpIcon size={16} color="#10B981" />
                  <Text style={styles.statTrendText}>8% from yesterday</Text>
                </View>
              </View>
              <View style={[styles.statIcon, { backgroundColor: '#D1FAE5' }]}>
                <ShoppingCartIcon size={32} color={COLORS.accent} />
              </View>
            </View>
          </View>

          {/* Sales This Week */}
          <View style={styles.statCard}>
            <View style={styles.statContent}>
              <View style={styles.statLeft}>
                <Text style={styles.statLabel}>Sales This Week</Text>
                <Text style={styles.statValue}>₦{stats.salesThisWeek.toLocaleString()}</Text>
                <View style={styles.statTrend}>
                  <ArrowDownIcon size={16} color="#EF4444" />
                  <Text style={[styles.statTrendText, { color: '#DC2626' }]}>3% from last week</Text>
                </View>
              </View>
              <View style={[styles.statIcon, { backgroundColor: '#FEF3C7' }]}>
                <CurrencyDollarIcon size={32} color="#D97706" />
              </View>
            </View>
          </View>

          {/* Pending Deliveries */}
          <View style={styles.statCard}>
            <View style={styles.statContent}>
              <View style={styles.statLeft}>
                <Text style={styles.statLabel}>Pending Deliveries</Text>
                <Text style={styles.statValue}>{stats.pendingDeliveries}</Text>
                <View style={styles.statTrend}>
                  <Text style={styles.statTrendGray}>2 urgent</Text>
                </View>
              </View>
              <View style={[styles.statIcon, { backgroundColor: '#E9D5FF' }]}>
                <TruckIcon size={32} color="#9333EA" />
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsCard}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Products')}
              activeOpacity={0.7}
            >
              <PlusIcon size={20} color={COLORS.primary} />
              <Text style={styles.actionButtonText}>Add Product</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
              <ShareIcon size={20} color={COLORS.accent} />
              <Text style={styles.actionButtonText}>Share Store Link</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('WhatsApp')}
              activeOpacity={0.7}
            >
              <ChatBubbleLeftRightIcon size={20} color={COLORS.primary} />
              <Text style={styles.actionButtonText}>Configure WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Analytics')}
              activeOpacity={0.7}
            >
              <ChartBarIcon size={20} color={COLORS.accent} />
              <Text style={styles.actionButtonText}>View Analytics</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sales Chart and Recent Orders */}
        <View style={styles.chartsContainer}>
          {/* Sales Chart */}
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Sales This Week</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Analytics')}>
                <Text style={styles.viewDetailsLink}>View Details</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.chartContent}>
              {salesData.map((data, index) => (
                <View key={index} style={styles.chartRow}>
                  <Text style={styles.chartDay}>{data.day}</Text>
                  <View style={styles.chartBarBackground}>
                    <LinearGradient
                      colors={[COLORS.primary, COLORS.accent]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={[
                        styles.chartBarFill,
                        { width: `${(data.sales / maxSales) * 100}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.chartAmount}>₦{data.sales.toLocaleString()}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Recent Orders */}
          <View style={styles.ordersCard}>
            <View style={styles.ordersHeader}>
              <Text style={styles.ordersTitle}>Recent Orders</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                <Text style={styles.viewAllLink}>View All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ordersContent}>
              {recentOrders.map((order, index) => (
                <View key={index} style={styles.orderItem}>
                  <View style={styles.orderLeft}>
                    <Text style={styles.orderId}>{order.id}</Text>
                    <Text style={styles.orderCustomer}>{order.customer}</Text>
                    <Text style={styles.orderTime}>{order.time}</Text>
                  </View>
                  <View style={styles.orderRight}>
                    <Text style={styles.orderAmount}>₦{order.amount.toLocaleString()}</Text>
                    <View
                      style={[
                        styles.orderStatus,
                        { backgroundColor: getStatusColor(order.status).bg },
                      ]}
                    >
                      <Text
                        style={[
                          styles.orderStatusText,
                          { color: getStatusColor(order.status).text },
                        ]}
                      >
                        {order.status}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={{ height: 24 }} />
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
    paddingHorizontal: isSmallScreen ? 12 : 16,
  },
  pageHeader: {
    marginTop: isSmallScreen ? 12 : 16,
    marginBottom: isSmallScreen ? 16 : 20,
  },
  pageTitle: {
    fontSize: isSmallScreen ? 24 : isMediumScreen ? 26 : 28,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
  },
  pageSubtitle: {
    fontSize: isSmallScreen ? 12 : 13,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
    marginTop: 4,
  },
  statusBanner: {
    padding: isSmallScreen ? 16 : 20,
    borderRadius: isSmallScreen ? 10 : 12,
    marginBottom: isSmallScreen ? 16 : 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: { elevation: 3 },
    }),
  },
  statusContent: {
    marginBottom: isSmallScreen ? 10 : 12,
  },
  statusTitle: {
    fontSize: isSmallScreen ? 16 : 18,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.white,
  },
  statusSubtitle: {
    fontSize: isSmallScreen ? 12 : 13,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  statusBadgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ADE80',
    marginRight: 6,
  },
  statusBadgeText: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.white,
    marginLeft: 6,
  },
  statsGrid: {
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: COLORS.white,
    padding: isSmallScreen ? 16 : 20,
    borderRadius: isSmallScreen ? 10 : 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: isSmallScreen ? 10 : 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: { elevation: 2 },
    }),
  },
  statContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLeft: {
    flex: 1,
  },
  statLabel: {
    fontSize: isSmallScreen ? 12 : 13,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
  },
  statValue: {
    fontSize: isSmallScreen ? 24 : isMediumScreen ? 26 : 28,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
    marginTop: isSmallScreen ? 4 : 6,
  },
  statTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: isSmallScreen ? 4 : 6,
  },
  statTrendText: {
    fontSize: isSmallScreen ? 11 : 13,
    fontFamily: 'Inter_400Regular',
    color: '#10B981',
    marginLeft: 4,
  },
  statTrendGray: {
    fontSize: isSmallScreen ? 11 : 13,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
  },
  statIcon: {
    width: isSmallScreen ? 48 : 56,
    height: isSmallScreen ? 48 : 56,
    borderRadius: isSmallScreen ? 24 : 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textDark,
    marginBottom: 12,
  },
  actionsCard: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: { elevation: 2 },
    }),
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textDark,
    marginLeft: 8,
  },
  chartsContainer: {
    marginBottom: 20,
  },
  chartCard: {
    backgroundColor: COLORS.white,
    padding: isSmallScreen ? 14 : 20,
    borderRadius: isSmallScreen ? 10 : 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: isSmallScreen ? 12 : 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: { elevation: 2 },
    }),
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: isSmallScreen ? 14 : 20,
  },
  chartTitle: {
    fontSize: isSmallScreen ? 15 : 17,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textDark,
  },
  viewDetailsLink: {
    fontSize: isSmallScreen ? 12 : 13,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.primary,
  },
  chartContent: {
    gap: isSmallScreen ? 8 : 12,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: isSmallScreen ? 6 : 8,
  },
  chartDay: {
    width: isSmallScreen ? 30 : 36,
    fontSize: isSmallScreen ? 11 : 13,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
  },
  chartBarBackground: {
    flex: 1,
    height: isSmallScreen ? 24 : 32,
    backgroundColor: '#F3F4F6',
    borderRadius: isSmallScreen ? 6 : 8,
    overflow: 'hidden',
  },
  chartBarFill: {
    height: '100%',
    borderRadius: isSmallScreen ? 6 : 8,
  },
  chartAmount: {
    width: isSmallScreen ? 65 : 80,
    fontSize: isSmallScreen ? 11 : 13,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textDark,
    textAlign: 'right',
  },
  ordersCard: {
    backgroundColor: COLORS.white,
    padding: isSmallScreen ? 14 : 20,
    borderRadius: isSmallScreen ? 10 : 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: { elevation: 2 },
    }),
  },
  ordersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: isSmallScreen ? 12 : 16,
  },
  ordersTitle: {
    fontSize: isSmallScreen ? 15 : 17,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textDark,
  },
  viewAllLink: {
    fontSize: isSmallScreen ? 12 : 13,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.primary,
  },
  ordersContent: {
    gap: isSmallScreen ? 8 : 12,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: isSmallScreen ? 8 : 10,
    padding: isSmallScreen ? 12 : 14,
  },
  orderLeft: {
    flex: 1,
  },
  orderId: {
    fontSize: isSmallScreen ? 13 : 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textDark,
  },
  orderCustomer: {
    fontSize: isSmallScreen ? 12 : 13,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
    marginTop: 2,
  },
  orderTime: {
    fontSize: isSmallScreen ? 11 : 12,
    fontFamily: 'Inter_400Regular',
    color: '#9CA3AF',
    marginTop: 2,
  },
  orderRight: {
    alignItems: 'flex-end',
  },
  orderAmount: {
    fontSize: isSmallScreen ? 13 : 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textDark,
    marginBottom: isSmallScreen ? 4 : 6,
  },
  orderStatus: {
    paddingHorizontal: isSmallScreen ? 8 : 10,
    paddingVertical: isSmallScreen ? 3 : 4,
    borderRadius: isSmallScreen ? 8 : 10,
  },
  orderStatusText: {
    fontSize: isSmallScreen ? 10 : 11,
    fontFamily: 'Inter_600SemiBold',
  },
});

export default DashboardScreen;
