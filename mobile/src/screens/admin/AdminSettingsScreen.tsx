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
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
  Cog6ToothIcon,
  BellIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
} from '../../components/Icons';
import { adminService } from '../../shared/services/adminMockData';
import type { PlatformSettings } from '../../shared/types/admin';

const COLORS = {
  primary: '#3B5BDB',
  accent: '#00C896',
  surface: '#F9FAFB',
  textDark: '#1A1A1A',
  textLight: '#6B7280',
  border: '#E5E7EB',
  white: '#FFFFFF',
  green: '#10B981',
};

const AdminSettingsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<PlatformSettings | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await adminService.getPlatformSettings();
      setSettings(data);
    } catch (error) {
      console.error('Failed to load settings:', error);
      Alert.alert('Error', 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;

    try {
      setSaving(true);
      await adminService.updatePlatformSettings(settings);
      Alert.alert('Success', 'Settings updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading settings...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!settings) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load settings</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Platform Settings</Text>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <Text style={styles.saveButtonText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* General Settings */}
        <Animated.View
          entering={FadeInDown.duration(400).delay(50)}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <Cog6ToothIcon size={24} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>General</Text>
          </View>
          <View style={styles.settingsCard}>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Platform Name</Text>
              <TextInput
                style={styles.settingInput}
                value={settings.general.platformName}
                onChangeText={(text) =>
                  setSettings({
                    ...settings,
                    general: { ...settings.general, platformName: text },
                  })
                }
              />
            </View>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Support Email</Text>
              <TextInput
                style={styles.settingInput}
                value={settings.general.supportEmail}
                onChangeText={(text) =>
                  setSettings({
                    ...settings,
                    general: { ...settings.general, supportEmail: text },
                  })
                }
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Currency</Text>
              <TextInput
                style={styles.settingInput}
                value={settings.general.currency}
                onChangeText={(text) =>
                  setSettings({
                    ...settings,
                    general: { ...settings.general, currency: text },
                  })
                }
              />
            </View>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Timezone</Text>
              <TextInput
                style={styles.settingInput}
                value={settings.general.timezone}
                onChangeText={(text) =>
                  setSettings({
                    ...settings,
                    general: { ...settings.general, timezone: text },
                  })
                }
              />
            </View>
          </View>
        </Animated.View>

        {/* Payment Settings */}
        <Animated.View
          entering={FadeInDown.duration(400).delay(100)}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <CurrencyDollarIcon size={24} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Payments</Text>
          </View>
          <View style={styles.settingsCard}>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Stripe</Text>
              <Switch
                value={settings.payments.stripeEnabled}
                onValueChange={(value) =>
                  setSettings({
                    ...settings,
                    payments: { ...settings.payments, stripeEnabled: value },
                  })
                }
                trackColor={{ false: COLORS.border, true: COLORS.accent }}
                thumbColor={COLORS.white}
              />
            </View>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>PayPal</Text>
              <Switch
                value={settings.payments.paypalEnabled}
                onValueChange={(value) =>
                  setSettings({
                    ...settings,
                    payments: { ...settings.payments, paypalEnabled: value },
                  })
                }
                trackColor={{ false: COLORS.border, true: COLORS.accent }}
                thumbColor={COLORS.white}
              />
            </View>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Commission Rate (%)</Text>
              <TextInput
                style={styles.settingInputSmall}
                value={settings.payments.commissionRate.toString()}
                onChangeText={(text) =>
                  setSettings({
                    ...settings,
                    payments: {
                      ...settings.payments,
                      commissionRate: parseFloat(text) || 0,
                    },
                  })
                }
                keyboardType="numeric"
              />
            </View>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Minimum Payout ($)</Text>
              <TextInput
                style={styles.settingInputSmall}
                value={settings.payments.minimumPayout.toString()}
                onChangeText={(text) =>
                  setSettings({
                    ...settings,
                    payments: {
                      ...settings.payments,
                      minimumPayout: parseFloat(text) || 0,
                    },
                  })
                }
                keyboardType="numeric"
              />
            </View>
          </View>
        </Animated.View>

        {/* Notification Settings */}
        <Animated.View
          entering={FadeInDown.duration(400).delay(150)}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <BellIcon size={24} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Notifications</Text>
          </View>
          <View style={styles.settingsCard}>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Email Notifications</Text>
              <Switch
                value={settings.notifications.emailNotifications}
                onValueChange={(value) =>
                  setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      emailNotifications: value,
                    },
                  })
                }
                trackColor={{ false: COLORS.border, true: COLORS.accent }}
                thumbColor={COLORS.white}
              />
            </View>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>SMS Notifications</Text>
              <Switch
                value={settings.notifications.smsNotifications}
                onValueChange={(value) =>
                  setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      smsNotifications: value,
                    },
                  })
                }
                trackColor={{ false: COLORS.border, true: COLORS.accent }}
                thumbColor={COLORS.white}
              />
            </View>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Push Notifications</Text>
              <Switch
                value={settings.notifications.pushNotifications}
                onValueChange={(value) =>
                  setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      pushNotifications: value,
                    },
                  })
                }
                trackColor={{ false: COLORS.border, true: COLORS.accent }}
                thumbColor={COLORS.white}
              />
            </View>
          </View>
        </Animated.View>

        {/* Security Settings */}
        <Animated.View
          entering={FadeInDown.duration(400).delay(200)}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <ShieldCheckIcon size={24} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Security</Text>
          </View>
          <View style={styles.settingsCard}>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Two-Factor Auth Required</Text>
              <Switch
                value={settings.security.twoFactorRequired}
                onValueChange={(value) =>
                  setSettings({
                    ...settings,
                    security: {
                      ...settings.security,
                      twoFactorRequired: value,
                    },
                  })
                }
                trackColor={{ false: COLORS.border, true: COLORS.accent }}
                thumbColor={COLORS.white}
              />
            </View>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Session Timeout (min)</Text>
              <TextInput
                style={styles.settingInputSmall}
                value={settings.security.sessionTimeout.toString()}
                onChangeText={(text) =>
                  setSettings({
                    ...settings,
                    security: {
                      ...settings.security,
                      sessionTimeout: parseInt(text) || 30,
                    },
                  })
                }
                keyboardType="numeric"
              />
            </View>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Min Password Length</Text>
              <TextInput
                style={styles.settingInputSmall}
                value={settings.security.passwordMinLength.toString()}
                onChangeText={(text) =>
                  setSettings({
                    ...settings,
                    security: {
                      ...settings.security,
                      passwordMinLength: parseInt(text) || 8,
                    },
                  })
                }
                keyboardType="numeric"
              />
            </View>
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
    color: '#EF4444',
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
  saveButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
  },
  settingsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textDark,
    flex: 1,
  },
  settingInput: {
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textDark,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  settingInputSmall: {
    width: 80,
    textAlign: 'right',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textDark,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});

export default AdminSettingsScreen;
