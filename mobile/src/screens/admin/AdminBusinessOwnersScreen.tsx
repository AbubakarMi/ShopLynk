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
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
  MagnifyingGlassIcon,
  FilterIcon,
  PlusIcon,
  UserIcon,
  EnvelopeIcon,
  BuildingStorefrontIcon,
  GlobeAltIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from '../../components/Icons';
import { adminService } from '../../shared/services/adminMockData';
import type { BusinessOwner } from '../../shared/types/admin';

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

const AdminBusinessOwnersScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);
  const [owners, setOwners] = useState<BusinessOwner[]>([]);
  const [filteredOwners, setFilteredOwners] = useState<BusinessOwner[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'suspended'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState<BusinessOwner | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    loadBusinessOwners();
  }, []);

  useEffect(() => {
    filterOwners();
  }, [searchQuery, filterStatus, owners]);

  const loadBusinessOwners = async () => {
    try {
      setLoading(true);
      const data = await adminService.getBusinessOwners();
      setOwners(data);
      setFilteredOwners(data);
    } catch (error) {
      console.error('Failed to load business owners:', error);
      Alert.alert('Error', 'Failed to load business owners');
    } finally {
      setLoading(false);
    }
  };

  const filterOwners = () => {
    let filtered = [...owners];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (owner) =>
          owner.name.toLowerCase().includes(query) ||
          owner.email.toLowerCase().includes(query) ||
          owner.store.toLowerCase().includes(query) ||
          owner.country.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter((owner) => owner.status === filterStatus);
    }

    setFilteredOwners(filtered);
  };

  const handleStatusToggle = async (owner: BusinessOwner) => {
    const newStatus = owner.status === 'active' ? 'suspended' : 'active';
    Alert.alert(
      `${newStatus === 'active' ? 'Activate' : 'Suspend'} Owner`,
      `Are you sure you want to ${newStatus === 'active' ? 'activate' : 'suspend'} ${owner.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              await adminService.updateBusinessOwnerStatus(owner.id, newStatus);
              await loadBusinessOwners();
              Alert.alert('Success', `Owner ${newStatus === 'active' ? 'activated' : 'suspended'} successfully`);
            } catch (error) {
              Alert.alert('Error', 'Failed to update owner status');
            }
          },
        },
      ]
    );
  };

  const handleDelete = async (owner: BusinessOwner) => {
    Alert.alert(
      'Delete Owner',
      `Are you sure you want to delete ${owner.name}? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await adminService.deleteBusinessOwner(owner.id);
              await loadBusinessOwners();
              setShowDetails(false);
              Alert.alert('Success', 'Owner deleted successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete owner');
            }
          },
        },
      ]
    );
  };

  const renderFilterModal = () => (
    <Modal visible={showFilters} transparent animationType="fade">
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setShowFilters(false)}
      >
        <View style={styles.filterModal}>
          <View style={styles.filterHeader}>
            <Text style={styles.filterTitle}>Filter by Status</Text>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <XMarkIcon size={24} color={COLORS.textDark} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              styles.filterOption,
              filterStatus === 'all' && styles.filterOptionActive,
            ]}
            onPress={() => {
              setFilterStatus('all');
              setShowFilters(false);
            }}
          >
            <Text
              style={[
                styles.filterOptionText,
                filterStatus === 'all' && styles.filterOptionTextActive,
              ]}
            >
              All Owners
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterOption,
              filterStatus === 'active' && styles.filterOptionActive,
            ]}
            onPress={() => {
              setFilterStatus('active');
              setShowFilters(false);
            }}
          >
            <Text
              style={[
                styles.filterOptionText,
                filterStatus === 'active' && styles.filterOptionTextActive,
              ]}
            >
              Active Only
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterOption,
              filterStatus === 'suspended' && styles.filterOptionActive,
            ]}
            onPress={() => {
              setFilterStatus('suspended');
              setShowFilters(false);
            }}
          >
            <Text
              style={[
                styles.filterOptionText,
                filterStatus === 'suspended' && styles.filterOptionTextActive,
              ]}
            >
              Suspended Only
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const renderDetailsModal = () => (
    <Modal visible={showDetails} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.detailsModal}>
          <View style={styles.detailsHeader}>
            <Text style={styles.detailsTitle}>Owner Details</Text>
            <TouchableOpacity onPress={() => setShowDetails(false)}>
              <XMarkIcon size={24} color={COLORS.textDark} />
            </TouchableOpacity>
          </View>

          {selectedOwner && (
            <ScrollView style={styles.detailsContent}>
              <View style={styles.detailSection}>
                <View style={styles.detailRow}>
                  <UserIcon size={20} color={COLORS.textLight} />
                  <View style={styles.detailInfo}>
                    <Text style={styles.detailLabel}>Name</Text>
                    <Text style={styles.detailValue}>{selectedOwner.name}</Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <EnvelopeIcon size={20} color={COLORS.textLight} />
                  <View style={styles.detailInfo}>
                    <Text style={styles.detailLabel}>Email</Text>
                    <Text style={styles.detailValue}>{selectedOwner.email}</Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <BuildingStorefrontIcon size={20} color={COLORS.textLight} />
                  <View style={styles.detailInfo}>
                    <Text style={styles.detailLabel}>Store</Text>
                    <Text style={styles.detailValue}>{selectedOwner.store}</Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <GlobeAltIcon size={20} color={COLORS.textLight} />
                  <View style={styles.detailInfo}>
                    <Text style={styles.detailLabel}>Country</Text>
                    <Text style={styles.detailValue}>{selectedOwner.country}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Statistics</Text>
                <View style={styles.statsRow}>
                  <View style={styles.statBox}>
                    <Text style={styles.statValue}>
                      {selectedOwner.totalOrders}
                    </Text>
                    <Text style={styles.statLabel}>Total Orders</Text>
                  </View>
                  <View style={styles.statBox}>
                    <Text style={styles.statValue}>
                      ${selectedOwner.totalRevenue.toLocaleString()}
                    </Text>
                    <Text style={styles.statLabel}>Total Revenue</Text>
                  </View>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>Member Since</Text>
                  <Text style={styles.statValue}>
                    {new Date(selectedOwner.joined).toLocaleDateString()}
                  </Text>
                </View>
              </View>

              <View style={styles.detailActions}>
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor:
                        selectedOwner.status === 'active'
                          ? COLORS.yellow
                          : COLORS.green,
                    },
                  ]}
                  onPress={() => handleStatusToggle(selectedOwner)}
                >
                  <Text style={styles.actionButtonText}>
                    {selectedOwner.status === 'active' ? 'Suspend' : 'Activate'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: COLORS.red }]}
                  onPress={() => handleDelete(selectedOwner)}
                >
                  <TrashIcon size={20} color={COLORS.white} />
                  <Text style={styles.actionButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading business owners...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Business Owners</Text>
        <Text style={styles.subtitle}>{owners.length} total owners</Text>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <MagnifyingGlassIcon size={20} color={COLORS.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search owners, stores, countries..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <FilterIcon size={20} color={COLORS.primary} />
          {filterStatus !== 'all' && <View style={styles.filterBadge} />}
        </TouchableOpacity>
      </View>

      {/* Results Count */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {filteredOwners.length} {filteredOwners.length === 1 ? 'result' : 'results'}
        </Text>
        {filterStatus !== 'all' && (
          <TouchableOpacity onPress={() => setFilterStatus('all')}>
            <Text style={styles.clearFilterText}>Clear filter</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Owners List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredOwners.map((owner, index) => (
          <Animated.View
            key={owner.id}
            entering={FadeInDown.duration(400).delay(50 * index)}
          >
            <TouchableOpacity
              style={styles.ownerCard}
              onPress={() => {
                setSelectedOwner(owner);
                setShowDetails(true);
              }}
            >
              <View style={styles.ownerHeader}>
                <View style={styles.ownerAvatar}>
                  <Text style={styles.ownerInitials}>
                    {owner.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()}
                  </Text>
                </View>
                <View style={styles.ownerInfo}>
                  <Text style={styles.ownerName}>{owner.name}</Text>
                  <Text style={styles.ownerEmail}>{owner.email}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        owner.status === 'active'
                          ? `${COLORS.green}20`
                          : `${COLORS.red}20`,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color: owner.status === 'active' ? COLORS.green : COLORS.red,
                      },
                    ]}
                  >
                    {owner.status}
                  </Text>
                </View>
              </View>

              <View style={styles.ownerDetails}>
                <View style={styles.ownerDetailRow}>
                  <BuildingStorefrontIcon size={16} color={COLORS.textLight} />
                  <Text style={styles.ownerDetailText}>{owner.store}</Text>
                </View>
                <View style={styles.ownerDetailRow}>
                  <GlobeAltIcon size={16} color={COLORS.textLight} />
                  <Text style={styles.ownerDetailText}>{owner.country}</Text>
                </View>
              </View>

              <View style={styles.ownerStats}>
                <View style={styles.ownerStat}>
                  <Text style={styles.ownerStatValue}>{owner.totalOrders}</Text>
                  <Text style={styles.ownerStatLabel}>Orders</Text>
                </View>
                <View style={styles.ownerStatDivider} />
                <View style={styles.ownerStat}>
                  <Text style={styles.ownerStatValue}>
                    ${owner.totalRevenue.toLocaleString()}
                  </Text>
                  <Text style={styles.ownerStatLabel}>Revenue</Text>
                </View>
                <View style={styles.ownerStatDivider} />
                <View style={styles.ownerStat}>
                  <Text style={styles.ownerStatValue}>
                    {new Date(owner.joined).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </Text>
                  <Text style={styles.ownerStatLabel}>Joined</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}

        {filteredOwners.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No business owners found</Text>
            <Text style={styles.emptyStateSubtext}>
              Try adjusting your search or filters
            </Text>
          </View>
        )}
      </ScrollView>

      {renderFilterModal()}
      {renderDetailsModal()}
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
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
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
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  resultsText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
  },
  clearFilterText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 12,
  },
  ownerCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  ownerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ownerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ownerInitials: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: COLORS.white,
  },
  ownerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  ownerName: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
    marginBottom: 2,
  },
  ownerEmail: {
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
  ownerDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  ownerDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ownerDetailText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
  },
  ownerStats: {
    flexDirection: 'row',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  ownerStat: {
    flex: 1,
    alignItems: 'center',
  },
  ownerStatValue: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
    marginBottom: 2,
  },
  ownerStatLabel: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
  },
  ownerStatDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  filterModal: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
  },
  filterOption: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: COLORS.surface,
  },
  filterOptionActive: {
    backgroundColor: COLORS.primary,
  },
  filterOptionText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textDark,
  },
  filterOptionTextActive: {
    color: COLORS.white,
  },
  detailsModal: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: 80,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  detailsTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
  },
  detailsContent: {
    flex: 1,
    padding: 20,
  },
  detailSection: {
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  detailInfo: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textDark,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 12,
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
  },
  detailActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    borderRadius: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: COLORS.white,
  },
});

export default AdminBusinessOwnersScreen;
