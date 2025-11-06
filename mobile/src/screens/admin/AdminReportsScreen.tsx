import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  DownloadIcon,
} from '../../components/Icons';
import { adminService } from '../../shared/services/adminMockData';
import type { ReportMetrics } from '../../shared/types/admin';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#3B5BDB',
  accent: '#00C896',
  surface: '#F9FAFB',
  textDark: '#1A1A1A',
  textLight: '#6B7280',
  border: '#E5E7EB',
  white: '#FFFFFF',
  green: '#10B981',
  red: '#EF4444',
};

const AdminReportsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<ReportMetrics | null>(null);
  const [period, setPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    loadMetrics();
  }, [period]);

  const loadMetrics = async () => {
    try {
      setLoading(true);
      const data = await adminService.getReportMetrics(period);
      setMetrics(data);
    } catch (error) {
      console.error('Failed to load metrics:', error);
      Alert.alert('Error', 'Failed to load metrics');
    } finally {
      setLoading(false);
    }
  };

  const renderMetricCard = (
    title: string,
    current: number,
    previous: number,
    change: number,
    icon: React.ReactNode,
    format: 'currency' | 'number' | 'decimal',
    index: number
  ) => {
    const isPositive = change >= 0;
    const formattedCurrent =
      format === 'currency'
        ? `$${current.toFixed(0)}`
        : format === 'decimal'
        ? current.toFixed(2)
        : current.toString();

    return (
      <Animated.View
        key={title}
        entering={FadeInDown.duration(400).delay(50 * index)}
        style={styles.metricCard}
      >
        <View style={styles.metricHeader}>
          <View style={styles.iconContainer}>{icon}</View>
          <Text style={styles.metricTitle}>{title}</Text>
        </View>
        <Text style={styles.metricValue}>{formattedCurrent}</Text>
        <View style={styles.metricChange}>
          {isPositive ? (
            <ArrowUpIcon size={16} color={COLORS.green} />
          ) : (
            <ArrowDownIcon size={16} color={COLORS.red} />
          )}
          <Text
            style={[
              styles.changeText,
              { color: isPositive ? COLORS.green : COLORS.red },
            ]}
          >
            {Math.abs(change).toFixed(1)}%
          </Text>
          <Text style={styles.changeLabel}>vs previous period</Text>
        </View>
      </Animated.View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading reports...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!metrics) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load metrics</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Reports & Analytics</Text>
        <TouchableOpacity style={styles.exportButton}>
          <DownloadIcon size={20} color={COLORS.primary} />
          <Text style={styles.exportText}>Export</Text>
        </TouchableOpacity>
      </View>

      {/* Period Selector */}
      <View style={styles.periodSelector}>
        {(['weekly', 'monthly', 'yearly'] as const).map((p) => (
          <TouchableOpacity
            key={p}
            style={[styles.periodButton, period === p && styles.periodButtonActive]}
            onPress={() => setPeriod(p)}
          >
            <Text
              style={[
                styles.periodButtonText,
                period === p && styles.periodButtonTextActive,
              ]}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Key Metrics */}
        <View style={styles.metricsGrid}>
          {renderMetricCard(
            'Revenue',
            metrics.revenue.current,
            metrics.revenue.previous,
            metrics.revenue.change,
            <CurrencyDollarIcon size={24} color={COLORS.primary} />,
            'currency',
            0
          )}
          {renderMetricCard(
            'Orders',
            metrics.orders.current,
            metrics.orders.previous,
            metrics.orders.change,
            <ShoppingCartIcon size={24} color={COLORS.accent} />,
            'number',
            1
          )}
          {renderMetricCard(
            'Customers',
            metrics.customers.current,
            metrics.customers.previous,
            metrics.customers.change,
            <UserGroupIcon size={24} color={COLORS.primary} />,
            'number',
            2
          )}
          {renderMetricCard(
            'Avg Order Value',
            metrics.avgOrderValue.current,
            metrics.avgOrderValue.previous,
            metrics.avgOrderValue.change,
            <ChartBarIcon size={24} color={COLORS.accent} />,
            'currency',
            3
          )}
        </View>

        {/* Top Products */}
        <Animated.View
          entering={FadeInDown.duration(400).delay(200)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Top Products</Text>
          <View style={styles.tableContainer}>
            {metrics.topProducts.map((product, index) => (
              <View key={product.name} style={styles.tableRow}>
                <View style={styles.rankBadge}>
                  <Text style={styles.rankText}>{index + 1}</Text>
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productStats}>
                    {product.sales} sales • ${product.revenue.toLocaleString()}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Top Categories */}
        <Animated.View
          entering={FadeInDown.duration(400).delay(300)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Top Categories</Text>
          <View style={styles.categoriesContainer}>
            {metrics.topCategories.map((category, index) => (
              <View key={category.name} style={styles.categoryCard}>
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryPercentage}>
                    {category.percentage}%
                  </Text>
                </View>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${category.percentage}%` },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </Animated.View>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: COLORS.red,
    fontFamily: 'Inter_600SemiBold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.textDark,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  exportText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.primary,
  },
  periodSelector: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  periodButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textDark,
  },
  periodButtonTextActive: {
    color: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  metricsGrid: {
    gap: 12,
    marginBottom: 24,
  },
  metricCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: `${COLORS.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
  },
  metricValue: {
    fontSize: 32,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  changeLabel: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
    marginBottom: 12,
  },
  tableContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: COLORS.white,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
    marginBottom: 2,
  },
  productStats: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
  },
  categoriesContainer: {
    gap: 12,
  },
  categoryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
  },
  categoryPercentage: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: COLORS.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: `${COLORS.primary}20`,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
});

export default AdminReportsScreen;
