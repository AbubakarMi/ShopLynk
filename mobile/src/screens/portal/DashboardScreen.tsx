import React, { useState, useEffect } from 'react';
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
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
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
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '../../components/Icons';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 375;
const isMediumScreen = width >= 375 && width < 414;
const isLargeScreen = width >= 414;

const COLORS = {
  primary: '#3B5BDB',
  accent: '#00C896',
  white: '#FFFFFF',
  surface: '#F9FAFB',
  textDark: '#1A1A1A',
  textLight: '#6B7280',
  border: '#E5E7EB',
  green: '#10B981',
  red: '#EF4444',
  yellow: '#F59E0B',
  blue: '#3B82F6',
  purple: '#9333EA',
};

const DashboardScreen = ({ navigation }: any) => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Simulate initial load
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  // Enhanced mock data
  const stats = {
    totalProducts: 45,
    productsChange: 12,
    ordersToday: 12,
    ordersChange: 8,
    salesThisWeek: 24500,
    salesChange: -3,
    pendingDeliveries: 8,
    deliveriesUrgent: 2,
  };

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', amount: 1250, status: 'Pending', time: '2 hours ago', items: 3 },
    { id: '#ORD-002', customer: 'Jane Smith', amount: 850, status: 'Completed', time: '5 hours ago', items: 2 },
    { id: '#ORD-003', customer: 'Mike Johnson', amount: 2100, status: 'Processing', time: '1 day ago', items: 5 },
    { id: '#ORD-004', customer: 'Sarah Williams', amount: 1650, status: 'Completed', time: '1 day ago', items: 4 },
  ];

  const salesData = [
    { day: 'Mon', sales: 3200, orders: 8 },
    { day: 'Tue', sales: 4100, orders: 12 },
    { day: 'Wed', sales: 3800, orders: 10 },
    { day: 'Thu', sales: 5200, orders: 15 },
    { day: 'Fri', sales: 4800, orders: 13 },
    { day: 'Sat', sales: 6100, orders: 18 },
    { day: 'Sun', sales: 5500, orders: 16 },
  ];

  const topProducts = [
    { name: 'Premium Headphones', sales: 1250, quantity: 45, trend: 12 },
    { name: 'Wireless Mouse', sales: 980, quantity: 78, trend: 8 },
    { name: 'USB-C Cable', sales: 750, quantity: 120, trend: -5 },
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
      case 'Cancelled':
        return { bg: '#FEE2E2', text: '#991B1B' };
      default:
        return { bg: '#F3F4F6', text: '#1F2937' };
    }
  };

  const getStatusIcon = (status: string) => {
    const iconSize = 16;
    switch (status) {
      case 'Completed':
        return <CheckCircleIcon size={iconSize} color={COLORS.green} />;
      case 'Processing':
        return <ClockIcon size={iconSize} color={COLORS.blue} />;
      case 'Pending':
        return <ClockIcon size={iconSize} color={COLORS.yellow} />;
      case 'Cancelled':
        return <XCircleIcon size={iconSize} color={COLORS.red} />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={[]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading your dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />
        }
      >
        {/* Page header */}
        <Animated.View entering={FadeInDown.duration(400)} style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Dashboard</Text>
          <Text style={styles.pageSubtitle}>
            Welcome back! Here's what's happening with your store today.
          </Text>
        </Animated.View>

        {/* Test Buttons */}
        <Animated.View entering={FadeInDown.duration(400).delay(100)} style={styles.testButtonsContainer}>
          <TouchableOpacity
            style={[styles.testButton, { backgroundColor: COLORS.primary }]}
            onPress={async () => {
              await AsyncStorage.removeItem('hasSeenOnboarding');
              navigation.navigate('Onboarding');
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.testButtonText}>🎯 Test Onboarding</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.testButton, { backgroundColor: COLORS.purple }]}
            onPress={() => {
              navigation.navigate('Admin');
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.testButtonText}>🔐 Admin Panel</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Store Status Banner */}
        <Animated.View entering={FadeInDown.duration(400).delay(200)}>
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
                <ChatBubbleLeftRightIcon size={14} color={COLORS.white} />
                <Text style={styles.statusBadgeText}>WhatsApp Connected</Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Quick Stats - Enhanced */}
        <View style={styles.statsGrid}>
          {/* Total Products */}
          <Animated.View entering={FadeInDown.duration(400).delay(300)}>
            <LinearGradient
              colors={['#FFFFFF', '#F8FAFF']}
              style={styles.statCard}
            >
              <View style={styles.statHeader}>
                <View style={[styles.statIconContainer, { backgroundColor: '#DBEAFE' }]}>
                  <CubeIcon size={isSmallScreen ? 20 : 24} color={COLORS.primary} />
                </View>
                <Text style={styles.statLabel}>Total Products</Text>
              </View>
              <Text style={styles.statValue}>{stats.totalProducts}</Text>
              <View style={styles.statFooter}>
                <View style={[styles.trendBadge, { backgroundColor: '#D1FAE5' }]}>
                  <ArrowUpIcon size={12} color={COLORS.green} />
                  <Text style={[styles.trendText, { color: COLORS.green }]}>
                    {stats.productsChange}%
                  </Text>
                </View>
                <Text style={styles.trendLabel}>vs last month</Text>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Orders Today */}
          <Animated.View entering={FadeInDown.duration(400).delay(350)}>
            <LinearGradient
              colors={['#FFFFFF', '#F0FDF9']}
              style={styles.statCard}
            >
              <View style={styles.statHeader}>
                <View style={[styles.statIconContainer, { backgroundColor: '#D1FAE5' }]}>
                  <ShoppingCartIcon size={isSmallScreen ? 20 : 24} color={COLORS.accent} />
                </View>
                <Text style={styles.statLabel}>Orders Today</Text>
              </View>
              <Text style={styles.statValue}>{stats.ordersToday}</Text>
              <View style={styles.statFooter}>
                <View style={[styles.trendBadge, { backgroundColor: '#D1FAE5' }]}>
                  <ArrowUpIcon size={12} color={COLORS.green} />
                  <Text style={[styles.trendText, { color: COLORS.green }]}>
                    {stats.ordersChange}%
                  </Text>
                </View>
                <Text style={styles.trendLabel}>vs yesterday</Text>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Sales This Week */}
          <Animated.View entering={FadeInDown.duration(400).delay(400)}>
            <LinearGradient
              colors={['#FFFFFF', '#FFFBF0']}
              style={styles.statCard}
            >
              <View style={styles.statHeader}>
                <View style={[styles.statIconContainer, { backgroundColor: '#FEF3C7' }]}>
                  <CurrencyDollarIcon size={isSmallScreen ? 20 : 24} color={COLORS.yellow} />
                </View>
                <Text style={styles.statLabel}>Sales This Week</Text>
              </View>
              <Text style={styles.statValue}>₦{stats.salesThisWeek.toLocaleString()}</Text>
              <View style={styles.statFooter}>
                <View style={[styles.trendBadge, { backgroundColor: '#FEE2E2' }]}>
                  <ArrowDownIcon size={12} color={COLORS.red} />
                  <Text style={[styles.trendText, { color: COLORS.red }]}>
                    {Math.abs(stats.salesChange)}%
                  </Text>
                </View>
                <Text style={styles.trendLabel}>vs last week</Text>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Pending Deliveries */}
          <Animated.View entering={FadeInDown.duration(400).delay(450)}>
            <LinearGradient
              colors={['#FFFFFF', '#FAF5FF']}
              style={styles.statCard}
            >
              <View style={styles.statHeader}>
                <View style={[styles.statIconContainer, { backgroundColor: '#E9D5FF' }]}>
                  <TruckIcon size={isSmallScreen ? 20 : 24} color={COLORS.purple} />
                </View>
                <Text style={styles.statLabel}>Pending Deliveries</Text>
              </View>
              <Text style={styles.statValue}>{stats.pendingDeliveries}</Text>
              <View style={styles.statFooter}>
                <View style={[styles.trendBadge, { backgroundColor: '#FFEDD5' }]}>
                  <Text style={[styles.trendText, { color: '#EA580C' }]}>
                    {stats.deliveriesUrgent} urgent
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>
        </View>

        {/* Quick Actions */}
        <Animated.View entering={FadeInDown.duration(400).delay(500)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <View style={styles.sectionDot} />
              <Text style={styles.sectionTitle}>Quick Actions</Text>
            </View>
          </View>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('Products')}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={['#DBEAFE', '#BFDBFE']}
                style={styles.actionIconContainer}
              >
                <PlusIcon size={20} color={COLORS.primary} />
              </LinearGradient>
              <Text style={styles.actionText}>Add Product</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard} activeOpacity={0.7}>
              <LinearGradient
                colors={['#D1FAE5', '#A7F3D0']}
                style={styles.actionIconContainer}
              >
                <ShareIcon size={20} color={COLORS.accent} />
              </LinearGradient>
              <Text style={styles.actionText}>Share Store</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('WhatsApp')}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={['#DBEAFE', '#BFDBFE']}
                style={styles.actionIconContainer}
              >
                <ChatBubbleLeftRightIcon size={20} color={COLORS.primary} />
              </LinearGradient>
              <Text style={styles.actionText}>WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('Analytics')}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={['#D1FAE5', '#A7F3D0']}
                style={styles.actionIconContainer}
              >
                <ChartBarIcon size={20} color={COLORS.accent} />
              </LinearGradient>
              <Text style={styles.actionText}>Analytics</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Sales Chart */}
        <Animated.View entering={FadeInDown.duration(400).delay(550)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <View style={styles.sectionDot} />
              <Text style={styles.sectionTitle}>Sales This Week</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Analytics')}>
              <Text style={styles.viewDetailsLink}>Details</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.chartCard}>
            <View style={styles.chartContent}>
              {salesData.map((data, index) => (
                <Animated.View
                  key={index}
                  entering={FadeInUp.duration(400).delay(600 + index * 50)}
                  style={styles.chartRow}
                >
                  <Text style={styles.chartDay}>{data.day}</Text>
                  <View style={styles.chartBarContainer}>
                    <View style={styles.chartBarBackground}>
                      <LinearGradient
                        colors={[COLORS.primary, COLORS.accent]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[
                          styles.chartBarFill,
                          { width: `${(data.sales / maxSales) * 100}%` },
                        ]}
                      >
                        <Text style={styles.chartBarText}>{data.orders}</Text>
                      </LinearGradient>
                    </View>
                  </View>
                  <Text style={styles.chartAmount}>₦{(data.sales / 1000).toFixed(1)}k</Text>
                </Animated.View>
              ))}
            </View>
            <View style={styles.chartFooter}>
              <View style={styles.chartSummary}>
                <Text style={styles.chartSummaryLabel}>Total</Text>
                <Text style={styles.chartSummaryValue}>
                  ₦{salesData.reduce((sum, d) => sum + d.sales, 0).toLocaleString()}
                </Text>
              </View>
              <View style={styles.chartSummary}>
                <Text style={styles.chartSummaryLabel}>Average</Text>
                <Text style={styles.chartSummaryValue}>
                  ₦{Math.round(salesData.reduce((sum, d) => sum + d.sales, 0) / salesData.length).toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Top Products */}
        <Animated.View entering={FadeInDown.duration(400).delay(600)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <View style={[styles.sectionDot, { backgroundColor: COLORS.accent }]} />
              <Text style={styles.sectionTitle}>Top Products</Text>
            </View>
          </View>
          <View style={styles.topProductsContainer}>
            {topProducts.map((product, index) => (
              <Animated.View
                key={index}
                entering={FadeInDown.duration(400).delay(650 + index * 100)}
                style={styles.productCard}
              >
                <View style={styles.productRank}>
                  <LinearGradient
                    colors={[COLORS.primary, COLORS.accent]}
                    style={styles.productRankCircle}
                  >
                    <Text style={styles.productRankText}>{index + 1}</Text>
                  </LinearGradient>
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productQuantity}>{product.quantity} sold</Text>
                </View>
                <View style={styles.productStats}>
                  <Text style={styles.productSales}>₦{product.sales.toLocaleString()}</Text>
                  <View
                    style={[
                      styles.productTrendBadge,
                      { backgroundColor: product.trend >= 0 ? '#D1FAE5' : '#FEE2E2' },
                    ]}
                  >
                    {product.trend >= 0 ? (
                      <ArrowUpIcon size={10} color={COLORS.green} />
                    ) : (
                      <ArrowDownIcon size={10} color={COLORS.red} />
                    )}
                    <Text
                      style={[
                        styles.productTrendText,
                        { color: product.trend >= 0 ? COLORS.green : COLORS.red },
                      ]}
                    >
                      {Math.abs(product.trend)}%
                    </Text>
                  </View>
                </View>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Recent Orders */}
        <Animated.View entering={FadeInDown.duration(400).delay(700)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <View style={styles.sectionDot} />
              <Text style={styles.sectionTitle}>Recent Orders</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
              <Text style={styles.viewAllLink}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ordersContainer}>
            {recentOrders.map((order, index) => (
              <Animated.View
                key={index}
                entering={FadeInDown.duration(400).delay(750 + index * 100)}
                style={styles.orderCard}
              >
                <View style={styles.orderHeader}>
                  <View style={styles.orderHeaderLeft}>
                    <Text style={styles.orderId}>{order.id}</Text>
                    <View style={styles.orderStatusIcon}>{getStatusIcon(order.status)}</View>
                  </View>
                  <Text style={styles.orderAmount}>₦{order.amount.toLocaleString()}</Text>
                </View>
                <Text style={styles.orderCustomer}>{order.customer}</Text>
                <View style={styles.orderFooter}>
                  <View style={styles.orderTimeContainer}>
                    <ClockIcon size={12} color={COLORS.textLight} />
                    <Text style={styles.orderTime}>{order.time}</Text>
                  </View>
                  <View
                    style={[
                      styles.orderStatusBadge,
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
                <Text style={styles.orderItems}>
                  {order.items} {order.items === 1 ? 'item' : 'items'}
                </Text>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        <View style={{ height: 32 }} />
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
    backgroundColor: COLORS.surface,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
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
    fontSize: isSmallScreen ? 26 : isMediumScreen ? 28 : 32,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: isSmallScreen ? 12 : 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
    lineHeight: 20,
  },
  testButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  testButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: { elevation: 4 },
    }),
  },
  testButtonText: {
    fontSize: isSmallScreen ? 13 : 15,
    fontFamily: 'Inter_700Bold',
    color: COLORS.white,
  },
  statusBanner: {
    padding: isSmallScreen ? 16 : 20,
    borderRadius: 16,
    marginBottom: isSmallScreen ? 20 : 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: { elevation: 4 },
    }),
  },
  statusContent: {
    marginBottom: 12,
  },
  statusTitle: {
    fontSize: isSmallScreen ? 17 : 19,
    fontFamily: 'Inter_700Bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  statusSubtitle: {
    fontSize: isSmallScreen ? 12 : 13,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255, 255, 255, 0.95)',
  },
  statusBadgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ADE80',
  },
  statusBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.white,
  },
  statsGrid: {
    gap: isSmallScreen ? 12 : 16,
    marginBottom: isSmallScreen ? 20 : 24,
  },
  statCard: {
    borderRadius: 16,
    padding: isSmallScreen ? 16 : 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: { elevation: 3 },
    }),
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  statIconContainer: {
    width: isSmallScreen ? 36 : 40,
    height: isSmallScreen ? 36 : 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: isSmallScreen ? 12 : 13,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
    flex: 1,
  },
  statValue: {
    fontSize: isSmallScreen ? 28 : isMediumScreen ? 32 : 36,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  statFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  trendText: {
    fontSize: isSmallScreen ? 11 : 12,
    fontFamily: 'Inter_700Bold',
  },
  trendLabel: {
    fontSize: isSmallScreen ? 11 : 12,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
  },
  section: {
    marginBottom: isSmallScreen ? 20 : 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
  },
  sectionTitle: {
    fontSize: isSmallScreen ? 17 : 19,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
  },
  viewDetailsLink: {
    fontSize: isSmallScreen ? 12 : 13,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.primary,
  },
  viewAllLink: {
    fontSize: isSmallScreen ? 12 : 13,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.primary,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: (width - (isSmallScreen ? 36 : 44)) / 2,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: isSmallScreen ? 16 : 20,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.border,
    alignItems: 'center',
    gap: 10,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: isSmallScreen ? 13 : 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textDark,
    textAlign: 'center',
  },
  chartCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: isSmallScreen ? 16 : 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: { elevation: 3 },
    }),
  },
  chartContent: {
    gap: isSmallScreen ? 10 : 12,
    marginBottom: 16,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chartDay: {
    width: isSmallScreen ? 32 : 36,
    fontSize: isSmallScreen ? 11 : 12,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
  },
  chartBarContainer: {
    flex: 1,
  },
  chartBarBackground: {
    height: isSmallScreen ? 28 : 32,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    overflow: 'hidden',
  },
  chartBarFill: {
    height: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    paddingLeft: 8,
  },
  chartBarText: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.white,
  },
  chartAmount: {
    width: isSmallScreen ? 45 : 50,
    fontSize: isSmallScreen ? 11 : 12,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
    textAlign: 'right',
  },
  chartFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  chartSummary: {
    alignItems: 'center',
  },
  chartSummaryLabel: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
    marginBottom: 4,
  },
  chartSummaryValue: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
  },
  topProductsContainer: {
    gap: 10,
  },
  productCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: isSmallScreen ? 14 : 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  productRank: {},
  productRankCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productRankText: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: COLORS.white,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: isSmallScreen ? 13 : 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textDark,
    marginBottom: 2,
  },
  productQuantity: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
  },
  productStats: {
    alignItems: 'flex-end',
    gap: 6,
  },
  productSales: {
    fontSize: isSmallScreen ? 13 : 14,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
  },
  productTrendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 3,
  },
  productTrendText: {
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
  },
  ordersContainer: {
    gap: 12,
  },
  orderCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: isSmallScreen ? 14 : 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  orderId: {
    fontSize: isSmallScreen ? 14 : 15,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
  },
  orderStatusIcon: {},
  orderAmount: {
    fontSize: isSmallScreen ? 14 : 15,
    fontFamily: 'Inter_700Bold',
    color: COLORS.primary,
  },
  orderCustomer: {
    fontSize: isSmallScreen ? 12 : 13,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
    marginBottom: 8,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  orderTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  orderTime: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
  },
  orderStatusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  orderStatusText: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
  },
  orderItems: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
  },
});

export default DashboardScreen;
