import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

// Icon Components
const BanknotesIcon = () => (
  <Text style={styles.iconTextLarge}>💵</Text>
);

const CreditCardIcon = () => (
  <Text style={styles.iconTextMedium}>💳</Text>
);

const ClockIcon = () => (
  <Text style={styles.iconTextMedium}>⏰</Text>
);

const CheckCircleIcon = ({ color }: { color: string }) => (
  <Text style={[styles.statusIconText, { color }]}>✓</Text>
);

const ClockCircleIcon = ({ color }: { color: string }) => (
  <Text style={[styles.statusIconText, { color }]}>⏱</Text>
);

const XCircleIcon = ({ color }: { color: string }) => (
  <Text style={[styles.statusIconText, { color }]}>✕</Text>
);

const ArrowDownIcon = () => (
  <Text style={styles.arrowIconText}>↓</Text>
);

const FilterIcon = () => (
  <Text style={styles.iconTextSmall}>⚙️</Text>
);

type PaymentFilter = 'All' | 'Successful' | 'Pending' | 'Failed';

interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  status: 'Successful' | 'Pending' | 'Failed';
  method: string;
  date: string;
  reference: string;
}

export default function PaymentsScreen() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [filter, setFilter] = useState<PaymentFilter>('All');

  const transactions: Transaction[] = [
    {
      id: '1',
      orderId: '#ORD-001',
      amount: 12500,
      status: 'Successful',
      method: 'Card',
      date: '2025-11-05 10:30',
      reference: 'REF-123456',
    },
    {
      id: '2',
      orderId: '#ORD-002',
      amount: 8500,
      status: 'Pending',
      method: 'Transfer',
      date: '2025-11-04 15:20',
      reference: 'REF-123457',
    },
    {
      id: '3',
      orderId: '#ORD-003',
      amount: 21000,
      status: 'Successful',
      method: 'Card',
      date: '2025-11-04 11:45',
      reference: 'REF-123458',
    },
  ];

  const balance = 145000;
  const totalRevenue = 245000;
  const pendingAmount = 12500;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Successful':
        return <CheckCircleIcon color="#059669" />;
      case 'Pending':
        return <ClockCircleIcon color="#D97706" />;
      case 'Failed':
        return <XCircleIcon color="#DC2626" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Successful':
        return { bg: '#D1FAE5', text: '#065F46' };
      case 'Pending':
        return { bg: '#FEF3C7', text: '#92400E' };
      case 'Failed':
        return { bg: '#FEE2E2', text: '#991B1B' };
      default:
        return { bg: '#E5E7EB', text: '#1A1A1A' };
    }
  };

  const renderTransaction = ({ item }: { item: Transaction }) => {
    const statusColors = getStatusColor(item.status);
    return (
      <View style={styles.transactionCard}>
        <View style={styles.transactionHeader}>
          <View>
            <Text style={styles.transactionReference}>{item.reference}</Text>
            <Text style={styles.transactionOrderId}>{item.orderId}</Text>
          </View>
          <Text style={styles.transactionAmount}>₦{item.amount.toLocaleString()}</Text>
        </View>

        <View style={styles.transactionDetails}>
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>Method</Text>
            <Text style={styles.transactionValue}>{item.method}</Text>
          </View>
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>Date & Time</Text>
            <Text style={styles.transactionValue}>{item.date}</Text>
          </View>
        </View>

        <View style={styles.transactionFooter}>
          {getStatusIcon(item.status)}
          <View style={[styles.statusBadge, { backgroundColor: statusColors.bg }]}>
            <Text style={[styles.statusText, { color: statusColors.text }]}>
              {item.status}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Page header */}
        <View style={styles.header}>
          <Text style={styles.title}>Payments</Text>
          <Text style={styles.subtitle}>
            View payment history and manage your earnings
          </Text>
        </View>

        {/* Balance Cards */}
        <View style={styles.balanceCards}>
          {/* Available Balance Card */}
          <LinearGradient
            colors={['#3B5BDB', '#00C896']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.balanceCardGradient}
          >
            <View style={styles.balanceCardContent}>
              <View style={styles.balanceCardTop}>
                <View>
                  <Text style={styles.balanceCardLabel}>Available Balance</Text>
                  <Text style={styles.balanceCardAmount}>₦{balance.toLocaleString()}</Text>
                </View>
                <BanknotesIcon />
              </View>
              <TouchableOpacity style={styles.withdrawButton} activeOpacity={0.7}>
                <ArrowDownIcon />
                <Text style={styles.withdrawButtonText}>Withdraw Earnings</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* Total Revenue Card */}
          <View style={styles.balanceCard}>
            <View style={styles.balanceCardRow}>
              <View>
                <Text style={styles.balanceCardLabelDark}>Total Revenue</Text>
                <Text style={styles.balanceCardAmountDark}>
                  ₦{totalRevenue.toLocaleString()}
                </Text>
              </View>
              <View style={styles.iconContainerGreen}>
                <CreditCardIcon />
              </View>
            </View>
          </View>

          {/* Pending Payments Card */}
          <View style={styles.balanceCard}>
            <View style={styles.balanceCardRow}>
              <View>
                <Text style={styles.balanceCardLabelDark}>Pending Payments</Text>
                <Text style={styles.balanceCardAmountDark}>
                  ₦{pendingAmount.toLocaleString()}
                </Text>
              </View>
              <View style={styles.iconContainerYellow}>
                <ClockIcon />
              </View>
            </View>
          </View>
        </View>

        {/* Payment Gateway Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Gateway Settings</Text>
          <View style={styles.gatewayContainer}>
            <View style={styles.gatewayCard}>
              <View style={styles.gatewayInfo}>
                <Text style={styles.gatewayName}>Paystack</Text>
                <Text style={styles.gatewayStatus}>Not connected</Text>
              </View>
              <TouchableOpacity style={styles.connectButton} activeOpacity={0.7}>
                <Text style={styles.connectButtonText}>Connect</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.gatewayCard}>
              <View style={styles.gatewayInfo}>
                <Text style={styles.gatewayName}>Flutterwave</Text>
                <Text style={styles.gatewayStatus}>Not connected</Text>
              </View>
              <TouchableOpacity style={styles.connectButton} activeOpacity={0.7}>
                <Text style={styles.connectButtonText}>Connect</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Filter */}
        <View style={styles.filterContainer}>
          <FilterIcon />
          <View style={styles.filterSelect}>
            <Text style={styles.filterText}>
              {filter === 'All' ? 'All Transactions' : filter}
            </Text>
          </View>
        </View>

        {/* Transactions List */}
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.transactionsList}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
    marginTop: 4,
  },
  balanceCards: {
    padding: 24,
    gap: 16,
  },
  balanceCardGradient: {
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  balanceCardContent: {
    gap: 16,
  },
  balanceCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  balanceCardLabel: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  balanceCardAmount: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  withdrawButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingVertical: 12,
  },
  withdrawButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  balanceCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceCardLabelDark: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
  },
  balanceCardAmountDark: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: '#1A1A1A',
    marginTop: 8,
  },
  iconContainerGreen: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerYellow: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 24,
    marginHorizontal: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  gatewayContainer: {
    gap: 16,
  },
  gatewayCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 16,
  },
  gatewayInfo: {
    flex: 1,
  },
  gatewayName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#1A1A1A',
  },
  gatewayStatus: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  connectButton: {
    backgroundColor: '#3B5BDB',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  connectButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  filterSelect: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginLeft: 8,
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#1A1A1A',
  },
  transactionsList: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  transactionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  transactionReference: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
  },
  transactionOrderId: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#1A1A1A',
    marginTop: 4,
  },
  transactionAmount: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#1A1A1A',
  },
  transactionDetails: {
    marginBottom: 12,
    gap: 8,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionLabel: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
  },
  transactionValue: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#1A1A1A',
  },
  transactionFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  statusIconText: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
  },
  arrowIconText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
  },
  iconTextLarge: {
    fontSize: 32,
  },
  iconTextMedium: {
    fontSize: 24,
  },
  iconTextSmall: {
    fontSize: 16,
  },
});
