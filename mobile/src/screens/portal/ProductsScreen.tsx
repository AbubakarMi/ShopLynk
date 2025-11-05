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
const PlusIcon = () => (
  <Text style={styles.iconText}>+</Text>
);

const SearchIcon = () => (
  <Text style={styles.iconTextSmall}>🔍</Text>
);

const FilterIcon = () => (
  <Text style={styles.iconTextSmall}>⚙️</Text>
);

const EditIcon = () => (
  <Text style={styles.iconTextSmall}>✏️</Text>
);

const TrashIcon = () => (
  <Text style={styles.iconTextSmall}>🗑️</Text>
);

const PhotoIcon = () => (
  <Text style={styles.photoIconText}>📷</Text>
);

const CloseIcon = () => (
  <Text style={styles.closeIconText}>×</Text>
);

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export default function ProductsScreen() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock data - Increased to 10 items per page for better mobile experience
  const products: Product[] = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 15000,
      stock: 45,
      category: 'Electronics',
      image: '/placeholder.jpg',
      status: 'In Stock',
    },
    {
      id: '2',
      name: 'Smart Watch Series 5',
      price: 25000,
      stock: 8,
      category: 'Electronics',
      image: '/placeholder.jpg',
      status: 'Low Stock',
    },
    {
      id: '3',
      name: 'Organic Cotton T-Shirt',
      price: 3500,
      stock: 0,
      category: 'Fashion',
      image: '/placeholder.jpg',
      status: 'Out of Stock',
    },
    {
      id: '4',
      name: 'Running Shoes Pro',
      price: 12500,
      stock: 30,
      category: 'Sports',
      image: '/placeholder.jpg',
      status: 'In Stock',
    },
    {
      id: '5',
      name: 'Leather Backpack',
      price: 8500,
      stock: 15,
      category: 'Fashion',
      image: '/placeholder.jpg',
      status: 'In Stock',
    },
    {
      id: '6',
      name: 'Bluetooth Speaker',
      price: 6500,
      stock: 5,
      category: 'Electronics',
      image: '/placeholder.jpg',
      status: 'Low Stock',
    },
    {
      id: '7',
      name: 'Fitness Tracker',
      price: 9500,
      stock: 22,
      category: 'Electronics',
      image: '/placeholder.jpg',
      status: 'In Stock',
    },
    {
      id: '8',
      name: 'Yoga Mat Premium',
      price: 4200,
      stock: 18,
      category: 'Sports',
      image: '/placeholder.jpg',
      status: 'In Stock',
    },
    {
      id: '9',
      name: 'Desk Lamp LED',
      price: 5500,
      stock: 12,
      category: 'Home',
      image: '/placeholder.jpg',
      status: 'In Stock',
    },
    {
      id: '10',
      name: 'Water Bottle Stainless',
      price: 2800,
      stock: 40,
      category: 'Sports',
      image: '/placeholder.jpg',
      status: 'In Stock',
    },
  ];

  const categories = ['all', 'Electronics', 'Fashion', 'Home', 'Beauty', 'Sports'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock':
        return { bg: '#D1FAE5', text: '#065F46' };
      case 'Low Stock':
        return { bg: '#FEF3C7', text: '#92400E' };
      case 'Out of Stock':
        return { bg: '#FEE2E2', text: '#991B1B' };
      default:
        return { bg: '#E5E7EB', text: '#1A1A1A' };
    }
  };

  const renderProduct = ({ item }: { item: Product }) => {
    const statusColors = getStatusColor(item.status);
    return (
      <View style={styles.productCard}>
        <View style={styles.productRow}>
          <View style={styles.productImageContainer}>
            <PhotoIcon />
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productId}>ID: {item.id}</Text>
          </View>
        </View>

        <Text style={styles.productCategory}>{item.category}</Text>

        <View style={styles.productDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Price</Text>
            <Text style={styles.detailValue}>₦{item.price.toLocaleString()}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Stock</Text>
            <Text style={styles.detailValue}>{item.stock} units</Text>
          </View>
        </View>

        <View style={styles.productFooter}>
          <View style={[styles.statusBadge, { backgroundColor: statusColors.bg }]}>
            <Text style={[styles.statusText, { color: statusColors.text }]}>
              {item.status}
            </Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
              <EditIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
              <TrashIcon />
            </TouchableOpacity>
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
          <View style={styles.headerContent}>
            <Text style={styles.title}>Products</Text>
            <Text style={styles.subtitle}>
              Manage your product catalog and inventory
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowAddModal(true)}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['#3B5BDB', '#00C896']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.addButton}
            >
              <PlusIcon />
              <Text style={styles.addButtonText}>Add Product</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <SearchIcon />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#6B7280"
          />
        </View>

        {/* Category Filter */}
        <View style={styles.filterHeader}>
          <FilterIcon />
          <Text style={styles.filterLabel}>Filter by Category</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContainer}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setFilterCategory(cat)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.categoryChip,
                  filterCategory === cat && styles.categoryChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    filterCategory === cat && styles.categoryChipTextActive,
                  ]}
                >
                  {cat === 'all' ? 'All Categories' : cat}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Products List */}
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.productsList}
        />

        {/* Pagination */}
        <View style={styles.pagination}>
          <Text style={styles.paginationText}>Showing 1 to 10 of 45 products</Text>
          <View style={styles.paginationButtons}>
            <TouchableOpacity style={styles.paginationButton} activeOpacity={0.7}>
              <Text style={styles.paginationButtonText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paginationButtonActive} activeOpacity={0.7}>
              <Text style={styles.paginationButtonTextActive}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paginationButton} activeOpacity={0.7}>
              <Text style={styles.paginationButtonText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paginationButton} activeOpacity={0.7}>
              <Text style={styles.paginationButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Add Product Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Product</Text>
              <TouchableOpacity
                onPress={() => setShowAddModal(false)}
                activeOpacity={0.7}
              >
                <CloseIcon />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Product Name</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="Enter product name"
                  placeholderTextColor="#6B7280"
                />
              </View>

              <View style={styles.formRow}>
                <View style={styles.formGroupHalf}>
                  <Text style={styles.formLabel}>Price (₦)</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="0.00"
                    keyboardType="numeric"
                    placeholderTextColor="#6B7280"
                  />
                </View>

                <View style={[styles.formGroupHalf, { marginLeft: 8 }]}>
                  <Text style={styles.formLabel}>Stock</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="0"
                    keyboardType="numeric"
                    placeholderTextColor="#6B7280"
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Category</Text>
                <View style={styles.formInput}>
                  <Text style={styles.formInputPlaceholder}>Select a category</Text>
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Description</Text>
                <TextInput
                  style={[styles.formInput, styles.formTextArea]}
                  placeholder="Enter product description"
                  multiline
                  numberOfLines={3}
                  placeholderTextColor="#6B7280"
                  textAlignVertical="top"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Product Images</Text>
                <View style={styles.imageUpload}>
                  <PhotoIcon />
                  <Text style={styles.imageUploadText}>
                    Click to upload or drag and drop
                  </Text>
                  <Text style={styles.imageUploadSubtext}>
                    PNG, JPG, GIF up to 10MB
                  </Text>
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                onPress={() => setShowAddModal(false)}
                style={styles.cancelButton}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7}>
                <LinearGradient
                  colors={['#3B5BDB', '#00C896']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.submitButton}
                >
                  <Text style={styles.submitButtonText}>Add Product</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
  headerContent: {
    marginBottom: 16,
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginLeft: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    margin: 24,
    marginTop: 0,
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
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#6B7280',
    marginLeft: 8,
  },
  filterScroll: {
    marginBottom: 16,
  },
  filterContainer: {
    paddingHorizontal: 24,
  },
  categoryChip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#3B5BDB',
    borderColor: '#3B5BDB',
  },
  categoryChipText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#6B7280',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  productsList: {
    paddingHorizontal: 24,
  },
  productCard: {
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
  productRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  productImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#1A1A1A',
  },
  productId: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
    marginTop: 1,
  },
  productCategory: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  productDetails: {
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
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
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  actionButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  pagination: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    padding: 24,
    marginTop: 8,
  },
  paginationText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
    marginBottom: 12,
  },
  paginationButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paginationButton: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 4,
  },
  paginationButtonActive: {
    backgroundColor: '#3B5BDB',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 4,
  },
  paginationButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#6B7280',
  },
  paginationButtonTextActive: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
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
  },
  modalBody: {
    padding: 24,
    maxHeight: 400,
  },
  formGroup: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  formGroupHalf: {
    flex: 1,
  },
  formLabel: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#1A1A1A',
  },
  formInputPlaceholder: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
  },
  formTextArea: {
    height: 80,
  },
  imageUpload: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: 40,
    alignItems: 'center',
  },
  imageUploadText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
    marginTop: 8,
  },
  imageUploadSubtext: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
    marginTop: 4,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginRight: 12,
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#6B7280',
  },
  submitButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
  },
  iconText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
  },
  iconTextSmall: {
    fontSize: 16,
  },
  photoIconText: {
    fontSize: 24,
  },
  closeIconText: {
    fontSize: 32,
    color: '#6B7280',
    fontFamily: 'Inter_400Regular',
  },
});
