import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type TimeRange = 'daily' | 'weekly' | 'monthly';

interface SalesData {
  label: string;
  sales: number;
  orders: number;
}

interface TopProduct {
  id: string;
  name: string;
  unitsSold: number;
  revenue: number;
  trend: 'up' | 'down';
  trendValue: number;
}

export default function AnalyticsScreen() {
  const [timeRange, setTimeRange] = useState<TimeRange>('weekly');

  // Mock data
  const dailySales: SalesData[] = [
    { label: '00:00', sales: 1200, orders: 3 },
    { label: '04:00', sales: 800, orders: 2 },
    { label: '08:00', sales: 3500, orders: 8 },
    { label: '12:00', sales: 5200, orders: 12 },
    { label: '16:00', sales: 4800, orders: 10 },
    { label: '20:00', sales: 3200, orders: 7 },
  ];

  const weeklySales: SalesData[] = [
    { label: 'Mon', sales: 3200, orders: 8 },
    { label: 'Tue', sales: 4100, orders: 11 },
    { label: 'Wed', sales: 3800, orders: 9 },
    { label: 'Thu', sales: 5200, orders: 14 },
    { label: 'Fri', sales: 4800, orders: 13 },
    { label: 'Sat', sales: 6100, orders: 17 },
    { label: 'Sun', sales: 5500, orders: 15 },
  ];

  const monthlySales: SalesData[] = [
    { label: 'Week 1', sales: 18500, orders: 45 },
    { label: 'Week 2', sales: 21200, orders: 52 },
    { label: 'Week 3', sales: 19800, orders: 48 },
    { label: 'Week 4', sales: 24300, orders: 61 },
  ];

  const topProducts: TopProduct[] = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      unitsSold: 145,
      revenue: 2175000,
      trend: 'up',
      trendValue: 12,
    },
    {
      id: '2',
      name: 'Smart Watch Series 5',
      unitsSold: 98,
      revenue: 2450000,
      trend: 'up',
      trendValue: 8,
    },
    {
      id: '3',
      name: 'Organic Cotton T-Shirt',
      unitsSold: 234,
      revenue: 819000,
      trend: 'down',
      trendValue: 3,
    },
    {
      id: '4',
      name: 'LED Desk Lamp',
      unitsSold: 67,
      revenue: 536000,
      trend: 'up',
      trendValue: 15,
    },
    {
      id: '5',
      name: 'Bluetooth Speaker',
      unitsSold: 89,
      revenue: 712000,
      trend: 'down',
      trendValue: 5,
    },
  ];

  const getSalesData = () => {
    switch (timeRange) {
      case 'daily':
        return dailySales;
      case 'weekly':
        return weeklySales;
      case 'monthly':
        return monthlySales;
      default:
        return weeklySales;
    }
  };

  const currentData = getSalesData();
  const maxSales = Math.max(...currentData.map((d) => d.sales));

  const renderTopProduct = ({ item, index }: { item: TopProduct; index: number }) => (
    <View style={styles.productCard}>
      <View style={styles.productLeft}>
        <LinearGradient
          colors={['#3B5BDB', '#00C896']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.productRank}
        >
          <Text style={styles.productRankText}>{index + 1}</Text>
        </LinearGradient>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productUnits}>{item.unitsSold} units sold</Text>
        </View>
      </View>
      <View style={styles.productRight}>
        <Text style={styles.productRevenue}>₦{item.revenue.toLocaleString()}</Text>
        <View style={styles.trendRow}>
          <Ionicons
            name={item.trend === 'up' ? 'trending-up' : 'trending-down'}
            size={16}
            color={item.trend === 'up' ? '#00C896' : '#EF4444'}
          />
          <Text
            style={[
              styles.trendText,
              { color: item.trend === 'up' ? '#00C896' : '#EF4444' },
            ]}
          >
            {item.trendValue}%
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Page header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Analytics</Text>
            <Text style={styles.subtitle}>
              Track your store's performance and insights
            </Text>
          </View>

          {/* Time Range Selector */}
          <View style={styles.timeRangeContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setTimeRange('daily')}
              style={[
                styles.timeButton,
                styles.timeButtonLeft,
                timeRange === 'daily' && styles.timeButtonActive,
              ]}
            >
              {timeRange === 'daily' ? (
                <LinearGradient
                  colors={['#3B5BDB', '#00C896']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.timeButtonGradient}
                >
                  <Text style={styles.timeButtonTextActive}>Daily</Text>
                </LinearGradient>
              ) : (
                <Text style={styles.timeButtonText}>Daily</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setTimeRange('weekly')}
              style={[
                styles.timeButton,
                styles.timeButtonMiddle,
                timeRange === 'weekly' && styles.timeButtonActive,
              ]}
            >
              {timeRange === 'weekly' ? (
                <LinearGradient
                  colors={['#3B5BDB', '#00C896']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.timeButtonGradient}
                >
                  <Text style={styles.timeButtonTextActive}>Weekly</Text>
                </LinearGradient>
              ) : (
                <Text style={styles.timeButtonText}>Weekly</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setTimeRange('monthly')}
              style={[
                styles.timeButton,
                styles.timeButtonRight,
                timeRange === 'monthly' && styles.timeButtonActive,
              ]}
            >
              {timeRange === 'monthly' ? (
                <LinearGradient
                  colors={['#3B5BDB', '#00C896']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.timeButtonGradient}
                >
                  <Text style={styles.timeButtonTextActive}>Monthly</Text>
                </LinearGradient>
              ) : (
                <Text style={styles.timeButtonText}>Monthly</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Key Metrics */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricCard}>
            <View style={styles.metricContent}>
              <View>
                <Text style={styles.metricLabel}>Total Revenue</Text>
                <Text style={styles.metricValue}>₦245,000</Text>
                <View style={styles.metricChange}>
                  <Ionicons name="trending-up" size={16} color="#00C896" />
                  <Text style={styles.metricChangeText}>12% increase</Text>
                </View>
              </View>
              <View style={[styles.metricIcon, { backgroundColor: '#D1FAE5' }]}>
                <Ionicons name="cash-outline" size={32} color="#00C896" />
              </View>
            </View>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricContent}>
              <View>
                <Text style={styles.metricLabel}>Conversion Rate</Text>
                <Text style={styles.metricValue}>3.2%</Text>
                <View style={styles.metricChange}>
                  <Ionicons name="trending-up" size={16} color="#00C896" />
                  <Text style={styles.metricChangeText}>0.5% increase</Text>
                </View>
              </View>
              <View style={[styles.metricIcon, { backgroundColor: '#DBEAFE' }]}>
                <Ionicons name="bar-chart-outline" size={32} color="#3B5BDB" />
              </View>
            </View>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricContent}>
              <View>
                <Text style={styles.metricLabel}>Returning Customers</Text>
                <Text style={styles.metricValue}>342</Text>
                <View style={styles.metricChange}>
                  <Ionicons name="trending-down" size={16} color="#EF4444" />
                  <Text style={[styles.metricChangeText, { color: '#EF4444' }]}>
                    2% decrease
                  </Text>
                </View>
              </View>
              <View style={[styles.metricIcon, { backgroundColor: '#EDE9FE' }]}>
                <Ionicons name="people-outline" size={32} color="#9333EA" />
              </View>
            </View>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricContent}>
              <View>
                <Text style={styles.metricLabel}>Avg Order Value</Text>
                <Text style={styles.metricValue}>₦8,750</Text>
                <View style={styles.metricChange}>
                  <Ionicons name="trending-up" size={16} color="#00C896" />
                  <Text style={styles.metricChangeText}>7% increase</Text>
                </View>
              </View>
              <View style={[styles.metricIcon, { backgroundColor: '#FEF3C7' }]}>
                <Ionicons name="bag-outline" size={32} color="#D97706" />
              </View>
            </View>
          </View>
        </View>

        {/* Sales Chart */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartTitle}>
                Sales Overview ({timeRange.charAt(0).toUpperCase() + timeRange.slice(1)})
              </Text>
              <Text style={styles.chartSubtitle}>
                Track your sales performance over time
              </Text>
            </View>
          </View>

          <View style={styles.chartContent}>
            {currentData.map((data, index) => (
              <View key={index} style={styles.chartRow}>
                <View style={styles.chartRowHeader}>
                  <Text style={styles.chartLabel}>{data.label}</Text>
                  <View style={styles.chartStats}>
                    <Text style={styles.chartOrders}>{data.orders} orders</Text>
                    <Text style={styles.chartSales}>₦{data.sales.toLocaleString()}</Text>
                  </View>
                </View>
                <View style={styles.chartBarContainer}>
                  <LinearGradient
                    colors={['#3B5BDB', '#00C896']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[
                      styles.chartBar,
                      { width: `${(data.sales / maxSales) * 100}%` },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Top Selling Products */}
        <View style={styles.productsCard}>
          <View style={styles.productsHeader}>
            <View>
              <Text style={styles.chartTitle}>Top Selling Products</Text>
              <Text style={styles.chartSubtitle}>
                Best performing products in your store
              </Text>
            </View>
          </View>

          <FlatList
            data={topProducts}
            renderItem={renderTopProduct}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          />
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
  timeRangeContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  timeButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeButtonLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  timeButtonMiddle: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#D1D5DB',
  },
  timeButtonRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  timeButtonActive: {
    overflow: 'hidden',
  },
  timeButtonGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#374151',
  },
  timeButtonTextActive: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
  },
  metricsContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
    gap: 16,
  },
  metricCard: {
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
  metricContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#6B7280',
  },
  metricValue: {
    fontSize: 30,
    fontFamily: 'Inter_700Bold',
    color: '#1A1A1A',
    marginTop: 8,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 4,
  },
  metricChangeText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#00C896',
  },
  metricIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartCard: {
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
  chartHeader: {
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#1A1A1A',
  },
  chartSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
    marginTop: 4,
  },
  chartContent: {
    gap: 16,
  },
  chartRow: {
    gap: 4,
  },
  chartRowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chartLabel: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#374151',
  },
  chartStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  chartOrders: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
  },
  chartSales: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#1A1A1A',
  },
  chartBarContainer: {
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    overflow: 'hidden',
  },
  chartBar: {
    height: '100%',
  },
  productsCard: {
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
  productsHeader: {
    marginBottom: 16,
  },
  productCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  productLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 16,
  },
  productRank: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productRankText: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#1A1A1A',
  },
  productUnits: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  productRight: {
    alignItems: 'flex-end',
  },
  productRevenue: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#1A1A1A',
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  trendText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
});
