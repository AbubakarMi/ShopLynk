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
  CreditCardIcon,
  CurrencyDollarIcon,
  BuildingStorefrontIcon,
} from '../../components/Icons';
import { adminService } from '../../shared/services/adminMockData';
import type { Payment } from '../../shared/types/admin';

const COLORS = {
  primary: '#3B5BDB',
  accent: '#00C896',
  surface: '#F9FAFB',
  textDark: '#1A1A1A',
  textLight: '#6B7280',
  border: '#E5E7EB',
  white: '#FFFFFF',
  green: '#10B981',
  yellow: '#F59E0B',
  red: '#EF4444',
};

const AdminPaymentsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      setLoading(true);
      const data = await adminService.getPayments();
      setPayments(data);
    } catch (error) {
      console.error('Failed to load payments:', error);
      Alert.alert('Error', 'Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return COLORS.green;
      case 'pending':
        return COLORS.yellow;
      case 'refunded':
      case 'failed':
        return COLORS.red;
      default:
        return COLORS.textLight;
    }
  };

  const getMethodLabel = (method: string) => {
    switch (method) {
      case 'credit_card':
        return 'Credit Card';
      case 'paypal':
        return 'PayPal';
      case 'bank_transfer':
        return 'Bank Transfer';
      default:
        return method;
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading payments...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const completedPayments = payments.filter((p) => p.status === 'completed').length;
  const totalAmount = payments
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Payments</Text>
        <Text style={styles.subtitle}>{payments.length} total transactions</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Completed</Text>
          <Text style={styles.statValue}>{completedPayments}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total Amount</Text>
          <Text style={styles.statValue}>${totalAmount.toFixed(2)}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {payments.map((payment, index) => (
          <Animated.View
            key={payment.id}
            entering={FadeInDown.duration(400).delay(50 * index)}
          >
            <View style={styles.paymentCard}>
              <View style={styles.paymentHeader}>
                <View style={styles.paymentIdContainer}>
                  <CreditCardIcon size={20} color={COLORS.primary} />
                  <Text style={styles.paymentId}>{payment.id}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: `${getStatusColor(payment.status)}20` },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      { color: getStatusColor(payment.status) },
                    ]}
                  >
                    {payment.status}
                  </Text>
                </View>
              </View>

              <View style={styles.paymentDetail}>
                <Text style={styles.detailLabel}>Order:</Text>
                <Text style={styles.detailValue}>{payment.order}</Text>
              </View>

              <View style={styles.paymentDetail}>
                <BuildingStorefrontIcon size={16} color={COLORS.textLight} />
                <Text style={styles.detailText}>{payment.store}</Text>
              </View>

              <View style={styles.paymentDetail}>
                <Text style={styles.detailLabel}>Method:</Text>
                <Text style={styles.detailValue}>{getMethodLabel(payment.method)}</Text>
              </View>

              <View style={styles.paymentDetail}>
                <Text style={styles.detailLabel}>Transaction ID:</Text>
                <Text style={styles.detailValueSmall}>{payment.transactionId}</Text>
              </View>

              <View style={styles.paymentFooter}>
                <Text style={styles.paymentAmount}>${payment.amount.toFixed(2)}</Text>
                <Text style={styles.paymentDate}>
                  {new Date(payment.date).toLocaleDateString()}
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
  paymentCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  paymentId: {
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
  paymentDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textDark,
  },
  detailValueSmall: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textDark,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
  },
  paymentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  paymentAmount: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: COLORS.primary,
  },
  paymentDate: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
  },
});

export default AdminPaymentsScreen;
