import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
  ShoppingCartIcon,
  UserIcon,
  BuildingStorefrontIcon,
  CurrencyDollarIcon,
} from '../../components/Icons';
import { adminService } from '../../shared/services/adminMockData';
import type { AdminOrder } from '../../shared/types/admin';

const COLORS = {
  primary: '#3B5BDB',
  accent: '#00C896',
  surface: '#F9FAFB',
  textDark: '#1A1A1A',
  textLight: '#6B7280',
  border: '#E5E7EB',
  white: '#FFFFFF',
  green: '#10B981',
  blue: '#3B82F6',
  yellow: '#F59E0B',
  red: '#EF4444',
  purple: '#8B5CF6',
};

const AdminOrdersScreen = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<AdminOrder[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await adminService.getOrders();
      setOrders(data);
    } catch (error) {
      console.error('Failed to load orders:', error);
      Alert.alert('Error', 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return COLORS.green;
      case 'processing':
        return COLORS.blue;
      case 'shipped':
        return COLORS.purple;
      case 'pending':
        return COLORS.yellow;
      case 'cancelled':
        return COLORS.red;
      case 'refunded':
        return COLORS.red;
      default:
        return COLORS.textLight;
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading orders...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const totalRevenue = orders
    .filter((o) => o.status === 'completed')
    .reduce((sum, o) => sum + o.amount, 0);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Orders</Text>
        <Text style={styles.subtitle}>{orders.length} total orders</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total Revenue</Text>
          <Text style={styles.statValue}>${totalRevenue.toFixed(2)}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Completed</Text>
          <Text style={styles.statValue}>
            {orders.filter((o) => o.status === 'completed').length}
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {orders.map((order, index) => (
          <Animated.View
            key={order.id}
            entering={FadeInDown.duration(400).delay(50 * index)}
          >
            <View style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <View style={styles.orderIdContainer}>
                  <ShoppingCartIcon size={20} color={COLORS.primary} />
                  <Text style={styles.orderId}>{order.id}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: `${getStatusColor(order.status)}20` },
                  ]}
                >
                  <Text
                    style={[styles.statusText, { color: getStatusColor(order.status) }]}
                  >
                    {order.status}
                  </Text>
                </View>
              </View>

              <View style={styles.orderDetail}>
                <UserIcon size={16} color={COLORS.textLight} />
                <Text style={styles.orderDetailText}>{order.customer}</Text>
              </View>

              <View style={styles.orderDetail}>
                <BuildingStorefrontIcon size={16} color={COLORS.textLight} />
                <Text style={styles.orderDetailText}>{order.store}</Text>
              </View>

              <View style={styles.orderFooter}>
                <View>
                  <Text style={styles.orderAmount}>${order.amount.toFixed(2)}</Text>
                  <Text style={styles.orderItems}>{order.items} items</Text>
                </View>
                <Text style={styles.orderDate}>
                  {new Date(order.date).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </Animated.View>
        ))}
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
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.textDark,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
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
    marginBottom: 12,
  },
  orderIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  orderId: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
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
  orderDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  orderDetailText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  orderAmount: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: COLORS.primary,
    marginBottom: 2,
  },
  orderItems: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
  },
  orderDate: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
  },
});

export default AdminOrdersScreen;
