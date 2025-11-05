import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue';

interface Invoice {
  id: string;
  orderId: string;
  customer: string;
  email: string;
  amount: number;
  date: string;
  dueDate: string;
  status: InvoiceStatus;
}

export default function InvoicesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock data
  const invoices: Invoice[] = [
    {
      id: 'INV-001',
      orderId: '#ORD-001',
      customer: 'John Doe',
      email: 'john@example.com',
      amount: 12500,
      date: '2025-11-05',
      dueDate: '2025-11-12',
      status: 'Paid',
    },
    {
      id: 'INV-002',
      orderId: '#ORD-002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      amount: 8500,
      date: '2025-11-04',
      dueDate: '2025-11-11',
      status: 'Pending',
    },
    {
      id: 'INV-003',
      orderId: '#ORD-003',
      customer: 'Mike Johnson',
      email: 'mike@example.com',
      amount: 21000,
      date: '2025-11-03',
      dueDate: '2025-11-10',
      status: 'Paid',
    },
    {
      id: 'INV-004',
      orderId: '#ORD-004',
      customer: 'Sarah Williams',
      email: 'sarah@example.com',
      amount: 6500,
      date: '2025-10-28',
      dueDate: '2025-11-04',
      status: 'Overdue',
    },
  ];

  const getStatusColor = (status: InvoiceStatus) => {
    switch (status) {
      case 'Paid':
        return { bg: '#D1FAE5', text: '#065F46' };
      case 'Pending':
        return { bg: '#FEF3C7', text: '#92400E' };
      case 'Overdue':
        return { bg: '#FEE2E2', text: '#991B1B' };
      default:
        return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  const renderInvoiceItem = ({ item }: { item: Invoice }) => {
    const statusColors = getStatusColor(item.status);
    return (
      <View style={styles.invoiceCard}>
        <View style={styles.invoiceHeader}>
          <View style={styles.invoiceIdRow}>
            <Ionicons name="document-text-outline" size={20} color="#3B5BDB" />
            <Text style={styles.invoiceId}>{item.id}</Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: statusColors.bg },
            ]}
          >
            <Text style={[styles.statusText, { color: statusColors.text }]}>
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.invoiceRow}>
          <Text style={styles.invoiceLabel}>Order ID:</Text>
          <Text style={styles.invoiceValue}>{item.orderId}</Text>
        </View>

        <View style={styles.invoiceRow}>
          <Text style={styles.invoiceLabel}>Customer:</Text>
          <View style={styles.customerInfo}>
            <Text style={styles.invoiceValue}>{item.customer}</Text>
            <Text style={styles.invoiceEmail}>{item.email}</Text>
          </View>
        </View>

        <View style={styles.invoiceRow}>
          <Text style={styles.invoiceLabel}>Amount:</Text>
          <Text style={styles.invoiceAmount}>₦{item.amount.toLocaleString()}</Text>
        </View>

        <View style={styles.invoiceRow}>
          <Text style={styles.invoiceLabel}>Date:</Text>
          <Text style={styles.invoiceValue}>{item.date}</Text>
        </View>

        <View style={styles.invoiceRow}>
          <Text style={styles.invoiceLabel}>Due Date:</Text>
          <Text style={styles.invoiceValue}>{item.dueDate}</Text>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.7}
          >
            <Ionicons name="eye-outline" size={20} color="#3B5BDB" />
            <Text style={styles.actionButtonText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.7}
          >
            <Ionicons name="download-outline" size={20} color="#00C896" />
            <Text style={[styles.actionButtonText, { color: '#00C896' }]}>Download</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Page header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Invoices</Text>
            <Text style={styles.subtitle}>
              Manage and track all your invoices and receipts
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <LinearGradient
              colors={['#3B5BDB', '#00C896']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.generateButton}
            >
              <Ionicons name="add" size={20} color="#FFFFFF" />
              <Text style={styles.generateButtonText}>Generate Invoice</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total Invoices</Text>
            <Text style={styles.statValue}>{invoices.length}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Paid</Text>
            <Text style={[styles.statValue, { color: '#00C896' }]}>
              ₦{invoices
                .filter((inv) => inv.status === 'Paid')
                .reduce((sum, inv) => sum + inv.amount, 0)
                .toLocaleString()}
            </Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Pending</Text>
            <Text style={[styles.statValue, { color: '#F59E0B' }]}>
              ₦{invoices
                .filter((inv) => inv.status === 'Pending')
                .reduce((sum, inv) => sum + inv.amount, 0)
                .toLocaleString()}
            </Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Overdue</Text>
            <Text style={[styles.statValue, { color: '#EF4444' }]}>
              ₦{invoices
                .filter((inv) => inv.status === 'Overdue')
                .reduce((sum, inv) => sum + inv.amount, 0)
                .toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filtersCard}>
          {/* Search */}
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by invoice ID or customer..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Date Range */}
          <View style={styles.dateRow}>
            <View style={styles.dateInputContainer}>
              <Ionicons name="calendar-outline" size={20} color="#9CA3AF" style={styles.dateIcon} />
              <TextInput
                style={styles.dateInput}
                placeholder="Start date"
                value={startDate}
                onChangeText={setStartDate}
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={styles.dateInputContainer}>
              <Ionicons name="calendar-outline" size={20} color="#9CA3AF" style={styles.dateIcon} />
              <TextInput
                style={styles.dateInput}
                placeholder="End date"
                value={endDate}
                onChangeText={setEndDate}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Status Filter */}
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={styles.radioButton}
              activeOpacity={0.7}
              onPress={() => setStatusFilter('all')}
            >
              <View style={[styles.radio, statusFilter === 'all' && styles.radioSelected]}>
                {statusFilter === 'all' && <View style={styles.radioDot} />}
              </View>
              <Text style={styles.radioLabel}>All</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioButton}
              activeOpacity={0.7}
              onPress={() => setStatusFilter('Paid')}
            >
              <View style={[styles.radio, statusFilter === 'Paid' && styles.radioSelected]}>
                {statusFilter === 'Paid' && <View style={styles.radioDot} />}
              </View>
              <Text style={styles.radioLabel}>Paid</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioButton}
              activeOpacity={0.7}
              onPress={() => setStatusFilter('Pending')}
            >
              <View style={[styles.radio, statusFilter === 'Pending' && styles.radioSelected]}>
                {statusFilter === 'Pending' && <View style={styles.radioDot} />}
              </View>
              <Text style={styles.radioLabel}>Pending</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioButton}
              activeOpacity={0.7}
              onPress={() => setStatusFilter('Overdue')}
            >
              <View style={[styles.radio, statusFilter === 'Overdue' && styles.radioSelected]}>
                {statusFilter === 'Overdue' && <View style={styles.radioDot} />}
              </View>
              <Text style={styles.radioLabel}>Overdue</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Invoices List */}
        <View style={styles.invoicesContainer}>
          <FlatList
            data={invoices}
            renderItem={renderInvoiceItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        </View>

        {/* Pagination */}
        <View style={styles.paginationCard}>
          <Text style={styles.paginationText}>
            Showing 1 to {invoices.length} of {invoices.length} invoices
          </Text>
          <View style={styles.paginationButtons}>
            <TouchableOpacity style={styles.paginationButton} activeOpacity={0.7}>
              <Text style={styles.paginationButtonText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.paginationButton, styles.paginationButtonActive]}
              activeOpacity={0.7}
            >
              <Text style={styles.paginationButtonActiveText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paginationButton} activeOpacity={0.7}>
              <Text style={styles.paginationButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    marginBottom: 16,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  generateButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
  },
  statsContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
    gap: 16,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#6B7280',
  },
  statValue: {
    fontSize: 30,
    fontFamily: 'Inter_700Bold',
    color: '#1A1A1A',
    marginTop: 8,
  },
  filtersCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginBottom: 16,
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: 12,
    zIndex: 1,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingLeft: 40,
    paddingRight: 16,
    paddingVertical: 8,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#1A1A1A',
  },
  dateRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  dateInputContainer: {
    flex: 1,
    position: 'relative',
  },
  dateIcon: {
    position: 'absolute',
    left: 12,
    top: 12,
    zIndex: 1,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingLeft: 40,
    paddingRight: 16,
    paddingVertical: 8,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#1A1A1A',
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#3B5BDB',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3B5BDB',
  },
  radioLabel: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#374151',
  },
  invoicesContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  invoiceCard: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  invoiceIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  invoiceId: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#1A1A1A',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
  },
  invoiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  invoiceLabel: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
  },
  invoiceValue: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: '#1A1A1A',
  },
  customerInfo: {
    alignItems: 'flex-end',
  },
  invoiceEmail: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
  },
  invoiceAmount: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: '#1A1A1A',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#F9FAFB',
    gap: 6,
  },
  actionButtonText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: '#3B5BDB',
  },
  paginationCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  paginationText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
    marginBottom: 16,
  },
  paginationButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  paginationButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
  },
  paginationButtonActive: {
    backgroundColor: '#3B5BDB',
    borderColor: '#3B5BDB',
  },
  paginationButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#374151',
  },
  paginationButtonActiveText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
  },
});
