import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
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
const SearchIcon = () => (
  <Text style={styles.iconTextSmall}>🔍</Text>
);

const EyeIcon = () => (
  <Text style={styles.iconTextSmall}>👁️</Text>
);

const CheckIcon = () => (
  <Text style={styles.iconTextSmall}>✓</Text>
);

const CloseIcon = () => (
  <Text style={styles.closeIconText}>×</Text>
);

const XMarkIcon = () => (
  <Text style={styles.iconTextSmall}>✕</Text>
);

type OrderStatus = 'All' | 'Pending' | 'Completed' | 'Cancelled';

interface Order {
  id: string;
  customer: string;
  phone: string;
  items: number;
  amount: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
  date: string;
  time: string;
}

export default function OrdersScreen() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [activeTab, setActiveTab] = useState<OrderStatus>('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const orders: Order[] = [
    {
      id: '#ORD-001',
      customer: 'John Doe',
      phone: '+234 801 234 5678',
      items: 3,
      amount: 12500,
      status: 'Pending',
      date: '2025-11-05',
      time: '10:30 AM',
    },
    {
      id: '#ORD-002',
      customer: 'Jane Smith',
      phone: '+234 802 345 6789',
      items: 1,
      amount: 8500,
      status: 'Completed',
      date: '2025-11-04',
      time: '03:15 PM',
    },
    {
      id: '#ORD-003',
      customer: 'Mike Johnson',
      phone: '+234 803 456 7890',
      items: 5,
      amount: 21000,
      status: 'Processing',
      date: '2025-11-04',
      time: '11:45 AM',
    },
    {
      id: '#ORD-004',
      customer: 'Sarah Williams',
      phone: '+234 804 567 8901',
      items: 2,
      amount: 6500,
      status: 'Cancelled',
      date: '2025-11-03',
      time: '09:20 AM',
    },
  ];

  const tabs: OrderStatus[] = ['All', 'Pending', 'Completed', 'Cancelled'];

  const filteredOrders =
    activeTab === 'All'
      ? orders
      : orders.filter((order) => order.status === activeTab || order.status === 'Processing');

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
        return { bg: '#E5E7EB', text: '#1A1A1A' };
    }
  };

  const getTabCount = (tab: OrderStatus) => {
    if (tab === 'All') return orders.length;
    return orders.filter((o) => o.status === tab || o.status === 'Processing').length;
  };

  const renderOrder = ({ item }: { item: Order }) => {
    const statusColors = getStatusColor(item.status);
    return (
      <View style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <Text style={styles.orderId}>{item.id}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColors.bg }]}>
            <Text style={[styles.statusText, { color: statusColors.text }]}>
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.orderBody}>
          <View style={styles.orderInfo}>
            <Text style={styles.customerName}>{item.customer}</Text>
            <Text style={styles.customerPhone}>{item.phone}</Text>
          </View>

          <View style={styles.orderDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Items</Text>
              <Text style={styles.detailValue}>{item.items} items</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Amount</Text>
              <Text style={styles.detailValue}>₦{item.amount.toLocaleString()}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date & Time</Text>
              <View>
                <Text style={styles.detailValue}>{item.date}</Text>
                <Text style={styles.detailValueSub}>{item.time}</Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => setSelectedOrder(item)}
          activeOpacity={0.7}
        >
          <EyeIcon />
          <Text style={styles.viewButtonText}>View Details</Text>
        </TouchableOpacity>
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
          <Text style={styles.title}>Orders</Text>
          <Text style={styles.subtitle}>Track and manage all your customer orders</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.7}
                style={styles.tabWrapper}
              >
                <View style={styles.tabContent}>
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === tab && styles.tabTextActive,
                    ]}
                  >
                    {tab}
                  </Text>
                  <View
                    style={[
                      styles.tabBadge,
                      activeTab === tab && styles.tabBadgeActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.tabBadgeText,
                        activeTab === tab && styles.tabBadgeTextActive,
                      ]}
                    >
                      {getTabCount(tab)}
                    </Text>
                  </View>
                </View>
                {activeTab === tab && <View style={styles.tabIndicator} />}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <SearchIcon />
          <TextInput
            style={styles.searchInput}
            placeholder="Search orders by ID or customer..."
            placeholderTextColor="#6B7280"
          />
        </View>

        {/* Orders List */}
        <FlatList
          data={filteredOrders}
          renderItem={renderOrder}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.ordersList}
        />
      </ScrollView>

      {/* Order Details Modal */}
      <Modal
        visible={selectedOrder !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedOrder(null)}
      >
        {selectedOrder && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  Order Details - {selectedOrder.id}
                </Text>
                <TouchableOpacity
                  onPress={() => setSelectedOrder(null)}
                  activeOpacity={0.7}
                >
                  <CloseIcon />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                {/* Customer Info */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Customer Information</Text>
                  <View style={styles.infoBox}>
                    <Text style={styles.infoText}>
                      <Text style={styles.infoLabel}>Name:</Text> {selectedOrder.customer}
                    </Text>
                    <Text style={styles.infoText}>
                      <Text style={styles.infoLabel}>Phone:</Text> {selectedOrder.phone}
                    </Text>
                    <Text style={styles.infoText}>
                      <Text style={styles.infoLabel}>Delivery Address:</Text> 123 Main
                      Street, Lagos, Nigeria
                    </Text>
                  </View>
                </View>

                {/* Order Items */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Order Items</Text>
                  <View style={styles.itemCard}>
                    <View>
                      <Text style={styles.itemName}>Premium Wireless Headphones</Text>
                      <Text style={styles.itemQuantity}>Quantity: 1</Text>
                    </View>
                    <Text style={styles.itemPrice}>₦15,000</Text>
                  </View>
                </View>

                {/* Payment Info */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Payment Information</Text>
                  <View style={styles.infoBox}>
                    <View style={styles.paymentRow}>
                      <Text style={styles.paymentLabel}>Subtotal:</Text>
                      <Text style={styles.paymentValue}>
                        ₦{selectedOrder.amount.toLocaleString()}
                      </Text>
                    </View>
                    <View style={styles.paymentRow}>
                      <Text style={styles.paymentLabel}>Delivery:</Text>
                      <Text style={styles.paymentValue}>₦0</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.paymentRow}>
                      <Text style={styles.paymentTotal}>Total:</Text>
                      <Text style={styles.paymentTotal}>
                        ₦{selectedOrder.amount.toLocaleString()}
                      </Text>
                    </View>
                    <View style={styles.paymentStatusContainer}>
                      <View
                        style={[
                          styles.statusBadge,
                          { backgroundColor: getStatusColor(selectedOrder.status).bg },
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusText,
                            { color: getStatusColor(selectedOrder.status).text },
                          ]}
                        >
                          Payment: {selectedOrder.status === 'Completed' ? 'Paid' : 'Pending'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>

              {selectedOrder.status === 'Pending' && (
                <View style={styles.modalFooter}>
                  <TouchableOpacity
                    style={styles.cancelOrderButton}
                    activeOpacity={0.7}
                  >
                    <XMarkIcon />
                    <Text style={styles.cancelOrderButtonText}>Cancel Order</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.7}>
                    <LinearGradient
                      colors={['#3B5BDB', '#00C896']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.deliveredButton}
                    >
                      <CheckIcon />
                      <Text style={styles.deliveredButtonText}>Mark as Delivered</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        )}
      </Modal>
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
  tabsContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingHorizontal: 24,
  },
  tabWrapper: {
    marginRight: 32,
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#3B5BDB',
  },
  tabBadge: {
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginLeft: 8,
  },
  tabBadgeActive: {
    backgroundColor: '#DBEAFE',
  },
  tabBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: '#6B7280',
  },
  tabBadgeTextActive: {
    color: '#3B5BDB',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#3B5BDB',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    margin: 24,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#1A1A1A',
  },
  ordersList: {
    paddingHorizontal: 24,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: '#1A1A1A',
  },
  statusBadge: {
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  statusText: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
  },
  orderBody: {
    marginBottom: 8,
  },
  orderInfo: {
    marginBottom: 8,
  },
  customerName: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#1A1A1A',
  },
  customerPhone: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
    marginTop: 1,
  },
  orderDetails: {
    gap: 4,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: '#1A1A1A',
  },
  detailValueSub: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
    textAlign: 'right',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingVertical: 12,
  },
  viewButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#3B5BDB',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: '#1A1A1A',
    flex: 1,
  },
  modalBody: {
    padding: 24,
    maxHeight: 400,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  infoBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  infoLabel: {
    fontFamily: 'Inter_600SemiBold',
    color: '#6B7280',
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 16,
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#1A1A1A',
  },
  itemQuantity: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#1A1A1A',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  paymentLabel: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
  },
  paymentValue: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#1A1A1A',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  paymentTotal: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#1A1A1A',
  },
  paymentStatusContainer: {
    marginTop: 12,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  cancelOrderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginRight: 12,
  },
  cancelOrderButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#DC2626',
    marginLeft: 8,
  },
  deliveredButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  deliveredButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  iconTextSmall: {
    fontSize: 16,
  },
  closeIconText: {
    fontSize: 32,
    color: '#6B7280',
    fontFamily: 'Inter_400Regular',
  },
});
