import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  TextInput,
  FlatList,
  Modal,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { LinearGradient } from 'expo-linear-gradient';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  EyeIcon,
} from '../../components/Icons';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#3B5BDB',
  accent: '#00C896',
  white: '#FFFFFF',
  surface: '#F9FAFB',
  textDark: '#1A1A1A',
  textLight: '#6B7280',
  border: '#E5E7EB',
  success: '#22C55E',
  inactive: '#9CA3AF',
};

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastPurchase: string;
  totalSpent: number;
  ordersCount: number;
  status: 'Active' | 'Inactive';
  joinedDate: string;
}

const CustomersScreen = ({ navigation }: any) => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  // Mock data - matching web version exactly
  const customers: Customer[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+234 801 234 5678',
      lastPurchase: '2025-11-05',
      totalSpent: 125000,
      ordersCount: 12,
      status: 'Active',
      joinedDate: '2025-06-15',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+234 802 345 6789',
      lastPurchase: '2025-11-04',
      totalSpent: 85000,
      ordersCount: 8,
      status: 'Active',
      joinedDate: '2025-07-20',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+234 803 456 7890',
      lastPurchase: '2025-11-03',
      totalSpent: 210000,
      ordersCount: 18,
      status: 'Active',
      joinedDate: '2025-05-10',
    },
    {
      id: '4',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      phone: '+234 804 567 8901',
      lastPurchase: '2025-09-15',
      totalSpent: 45000,
      ordersCount: 4,
      status: 'Inactive',
      joinedDate: '2025-08-05',
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david@example.com',
      phone: '+234 805 678 9012',
      lastPurchase: '2025-11-02',
      totalSpent: 156000,
      ordersCount: 15,
      status: 'Active',
      joinedDate: '2025-04-22',
    },
  ];

  if (!fontsLoaded) return null;

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
  );

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === 'Active').length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgOrderValue = totalRevenue / customers.reduce((sum, c) => sum + c.ordersCount, 0);

  const handleCustomerPress = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
  };

  const renderCustomer = ({ item }: { item: Customer }) => (
    <Animated.View entering={FadeInDown.duration(400)} style={styles.customerCard}>
      <View style={styles.customerHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.customerName}>{item.name}</Text>
          <View style={styles.customerContact}>
            <EnvelopeIcon size={12} color={COLORS.textLight} />
            <Text style={styles.customerContactText}>{item.email}</Text>
          </View>
          <View style={styles.customerContact}>
            <PhoneIcon size={12} color={COLORS.textLight} />
            <Text style={styles.customerContactText}>{item.phone}</Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleCustomerPress(item)}
          style={styles.viewButton}
        >
          <EyeIcon size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.customerStats}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Last Purchase</Text>
          <Text style={styles.statValue}>{item.lastPurchase}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Spent</Text>
          <Text style={styles.statValue}>₦{item.totalSpent.toLocaleString()}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Orders</Text>
          <Text style={styles.statValue}>{item.ordersCount}</Text>
        </View>
      </View>

      <View style={styles.customerFooter}>
        <View
          style={[
            styles.statusBadge,
            item.status === 'Active' ? styles.statusActive : styles.statusInactive,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              item.status === 'Active' ? styles.statusTextActive : styles.statusTextInactive,
            ]}
          >
            {item.status}
          </Text>
        </View>

        <TouchableOpacity activeOpacity={0.7} style={styles.messageButton}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.accent]}
            style={styles.messageGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <ChatBubbleLeftRightIcon size={14} color={COLORS.white} />
            <Text style={styles.messageButtonText}>Message</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Page header */}
        <View style={styles.pageHeader}>
          <Text style={styles.headerTitle}>Customers</Text>
          <Text style={styles.headerSubtitle}>
            Manage your customer relationships and track their activity
          </Text>
        </View>

        {/* Stats */}
        <Animated.View entering={FadeInDown.duration(400).delay(100)}>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={styles.statCardContent}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.statCardLabel}>Total Customers</Text>
                  <Text style={styles.statCardValue}>{totalCustomers}</Text>
                </View>
                <View style={[styles.statCardIcon, { backgroundColor: '#DBEAFE' }]}>
                  <UserGroupIcon size={24} color={COLORS.primary} />
                </View>
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statCardContent}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.statCardLabel}>Active Customers</Text>
                  <Text style={styles.statCardValue}>{activeCustomers}</Text>
                </View>
                <View style={[styles.statCardIcon, { backgroundColor: '#D1FAE5' }]}>
                  <UserGroupIcon size={24} color={COLORS.success} />
                </View>
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statCardContent}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.statCardLabel}>Total Revenue</Text>
                  <Text style={styles.statCardValue}>₦{totalRevenue.toLocaleString()}</Text>
                </View>
                <View style={[styles.statCardIcon, { backgroundColor: '#E9D5FF' }]}>
                  <ChatBubbleLeftRightIcon size={24} color="#9333EA" />
                </View>
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statCardContent}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.statCardLabel}>Avg Order Value</Text>
                  <Text style={styles.statCardValue}>₦{Math.round(avgOrderValue).toLocaleString()}</Text>
                </View>
                <View style={[styles.statCardIcon, { backgroundColor: '#FEF3C7' }]}>
                  <ChatBubbleLeftRightIcon size={24} color="#D97706" />
                </View>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Search */}
        <Animated.View entering={FadeInDown.duration(400).delay(200)}>
          <View style={styles.searchContainer}>
            <MagnifyingGlassIcon size={20} color={COLORS.textLight} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search customers by name, email or phone..."
              placeholderTextColor={COLORS.textLight}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </Animated.View>

        {/* Customers List */}
        <FlatList
          data={filteredCustomers}
          renderItem={renderCustomer}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.customersList}
        />

        <View style={{ height: 24 }} />
      </ScrollView>

      {/* Customer Details Modal */}
      <Modal
        visible={showCustomerModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCustomerModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Customer Details</Text>
                <TouchableOpacity
                  onPress={() => setShowCustomerModal(false)}
                  activeOpacity={0.7}
                >
                  <XMarkIcon size={24} color={COLORS.textDark} />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                {selectedCustomer && (
                  <>
                    {/* Customer Info */}
                    <View style={styles.modalSection}>
                      <Text style={styles.modalSectionTitle}>Personal Information</Text>
                      <View style={styles.modalInfoCard}>
                        <View style={styles.modalInfoRow}>
                          <Text style={styles.modalInfoLabel}>Name:</Text>
                          <Text style={styles.modalInfoValue}>{selectedCustomer.name}</Text>
                        </View>
                        <View style={styles.modalInfoRow}>
                          <Text style={styles.modalInfoLabel}>Email:</Text>
                          <Text style={styles.modalInfoValue}>{selectedCustomer.email}</Text>
                        </View>
                        <View style={styles.modalInfoRow}>
                          <Text style={styles.modalInfoLabel}>Phone:</Text>
                          <Text style={styles.modalInfoValue}>{selectedCustomer.phone}</Text>
                        </View>
                        <View style={styles.modalInfoRow}>
                          <Text style={styles.modalInfoLabel}>Member Since:</Text>
                          <Text style={styles.modalInfoValue}>{selectedCustomer.joinedDate}</Text>
                        </View>
                      </View>
                    </View>

                    {/* Purchase Stats */}
                    <View style={styles.modalStatsRow}>
                      <View style={styles.modalStatCard}>
                        <Text style={styles.modalStatLabel}>Total Orders</Text>
                        <Text style={styles.modalStatValue}>{selectedCustomer.ordersCount}</Text>
                      </View>
                      <View style={styles.modalStatCard}>
                        <Text style={styles.modalStatLabel}>Total Spent</Text>
                        <Text style={styles.modalStatValue}>
                          ₦{selectedCustomer.totalSpent.toLocaleString()}
                        </Text>
                      </View>
                      <View style={styles.modalStatCard}>
                        <Text style={styles.modalStatLabel}>Last Purchase</Text>
                        <Text style={[styles.modalStatValue, { fontSize: 14 }]}>
                          {selectedCustomer.lastPurchase}
                        </Text>
                      </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.modalActions}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setShowCustomerModal(false)}
                        style={styles.closeButton}
                      >
                        <Text style={styles.closeButtonText}>Close</Text>
                      </TouchableOpacity>

                      <TouchableOpacity activeOpacity={0.7} style={{ flex: 1 }}>
                        <LinearGradient
                          colors={[COLORS.primary, COLORS.accent]}
                          style={styles.modalActionButton}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                        >
                          <ChatBubbleLeftRightIcon size={18} color={COLORS.white} />
                          <Text style={styles.modalActionText}>Message on WhatsApp</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
  },
  pageHeader: {
    padding: 24,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  statCard: {
    width: (width - 64) / 2,
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: { elevation: 2 },
    }),
  },
  statCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statCardLabel: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
    marginBottom: 8,
  },
  statCardValue: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
  },
  statCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    marginHorizontal: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textDark,
  },
  customersList: {
    paddingHorizontal: 24,
  },
  customerCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: { elevation: 2 },
    }),
  },
  customerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  customerName: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
    marginBottom: 6,
  },
  customerContact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  customerContactText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
  },
  viewButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
  },
  customerStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    marginBottom: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
  },
  customerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusActive: {
    backgroundColor: '#D1FAE5',
  },
  statusInactive: {
    backgroundColor: '#F3F4F6',
  },
  statusText: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
  },
  statusTextActive: {
    color: '#059669',
  },
  statusTextInactive: {
    color: '#6B7280',
  },
  messageButton: {
    flex: 1,
    marginLeft: 12,
  },
  messageGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  messageButtonText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.white,
  },
  modalContainer: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxHeight: '80%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
      },
      android: { elevation: 8 },
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
  },
  modalSection: {
    marginBottom: 24,
  },
  modalSectionTitle: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
    marginBottom: 12,
  },
  modalInfoCard: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 12,
  },
  modalInfoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  modalInfoLabel: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
    width: 120,
  },
  modalInfoValue: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textDark,
    flex: 1,
  },
  modalStatsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  modalStatCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  modalStatLabel: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
    marginBottom: 8,
  },
  modalStatValue: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 16,
  },
  closeButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  closeButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
  },
  modalActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  modalActionText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.white,
  },
});

export default CustomersScreen;
