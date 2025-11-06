import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
  PuzzlePieceIcon,
  ClockIcon,
  BuildingStorefrontIcon,
} from '../../components/Icons';
import { adminService } from '../../shared/services/adminMockData';
import type { Integration } from '../../shared/types/admin';

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

const AdminIntegrationsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [integrations, setIntegrations] = useState<Integration[]>([]);

  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    try {
      setLoading(true);
      const data = await adminService.getIntegrations();
      setIntegrations(data);
    } catch (error) {
      console.error('Failed to load integrations:', error);
      Alert.alert('Error', 'Failed to load integrations');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (integration: Integration) => {
    const newStatus = integration.status === 'active' ? 'inactive' : 'active';
    try {
      await adminService.toggleIntegration(integration.id, newStatus);
      await loadIntegrations();
    } catch (error) {
      Alert.alert('Error', 'Failed to update integration');
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'payment':
        return COLORS.green;
      case 'email':
        return COLORS.primary;
      case 'ecommerce':
        return COLORS.accent;
      case 'analytics':
        return '#F59E0B';
      default:
        return COLORS.textLight;
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading integrations...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const activeCount = integrations.filter((i) => i.status === 'active').length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Integrations</Text>
        <Text style={styles.subtitle}>
          {activeCount} of {integrations.length} active
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {integrations.map((integration, index) => (
          <Animated.View
            key={integration.id}
            entering={FadeInDown.duration(400).delay(50 * index)}
          >
            <View style={styles.integrationCard}>
              <View style={styles.integrationHeader}>
                <View style={styles.iconContainer}>
                  <PuzzlePieceIcon size={24} color={getTypeColor(integration.type)} />
                </View>
                <View style={styles.integrationInfo}>
                  <Text style={styles.integrationName}>{integration.name}</Text>
                  <View
                    style={[
                      styles.typeBadge,
                      { backgroundColor: `${getTypeColor(integration.type)}20` },
                    ]}
                  >
                    <Text
                      style={[
                        styles.typeText,
                        { color: getTypeColor(integration.type) },
                      ]}
                    >
                      {integration.type}
                    </Text>
                  </View>
                </View>
                <Switch
                  value={integration.status === 'active'}
                  onValueChange={() => handleToggle(integration)}
                  trackColor={{ false: COLORS.border, true: COLORS.accent }}
                  thumbColor={COLORS.white}
                />
              </View>

              <View style={styles.integrationDetails}>
                <View style={styles.detailRow}>
                  <BuildingStorefrontIcon size={16} color={COLORS.textLight} />
                  <Text style={styles.detailText}>
                    {integration.stores} stores connected
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <ClockIcon size={16} color={COLORS.textLight} />
                  <Text style={styles.detailText}>
                    Last sync: {new Date(integration.lastSync).toLocaleString()}
                  </Text>
                </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 12,
  },
  integrationCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  integrationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: `${COLORS.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  integrationInfo: {
    flex: 1,
    marginLeft: 12,
  },
  integrationName: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    textTransform: 'capitalize',
  },
  integrationDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
  },
});

export default AdminIntegrationsScreen;
