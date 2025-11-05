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
  Switch,
  Alert,
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
  BuildingStorefrontIcon,
  UserIcon,
  Cog6ToothIcon,
  KeyIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
} from '../../components/Icons';

const COLORS = {
  primary: '#3B5BDB',
  accent: '#00C896',
  white: '#FFFFFF',
  surface: '#F9FAFB',
  textDark: '#1A1A1A',
  textLight: '#6B7280',
  border: '#E5E7EB',
  danger: '#EF4444',
};

type SettingsTab = 'business' | 'profile' | 'preferences' | 'api' | 'security' | 'danger';

const SettingsScreen = ({ navigation }: any) => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [activeTab, setActiveTab] = useState<SettingsTab>('business');
  const [showApiKey, setShowApiKey] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const tabs = [
    { id: 'business' as SettingsTab, label: 'Business Info', icon: BuildingStorefrontIcon },
    { id: 'profile' as SettingsTab, label: 'Profile', icon: UserIcon },
    { id: 'preferences' as SettingsTab, label: 'Store Preferences', icon: Cog6ToothIcon },
    { id: 'api' as SettingsTab, label: 'API & Integrations', icon: KeyIcon },
    { id: 'security' as SettingsTab, label: 'Security', icon: ShieldCheckIcon },
    { id: 'danger' as SettingsTab, label: 'Danger Zone', icon: ExclamationTriangleIcon },
  ];

  if (!fontsLoaded) return null;

  const renderBusinessInfo = () => (
    <View style={styles.tabContent}>
      <Text style={styles.tabTitle}>Business Information</Text>
      <Text style={styles.tabSubtitle}>Update your store's business details</Text>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Business Name</Text>
        <TextInput
          style={styles.formInput}
          defaultValue="My Awesome Store"
          placeholderTextColor={COLORS.textLight}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Business Address</Text>
        <TextInput
          style={styles.formInput}
          defaultValue="123 Main Street, Lagos, Nigeria"
          placeholderTextColor={COLORS.textLight}
        />
      </View>

      <View style={styles.formRow}>
        <View style={styles.formColumn}>
          <Text style={styles.formLabel}>Contact Email</Text>
          <TextInput
            style={styles.formInput}
            defaultValue="contact@mystore.com"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={COLORS.textLight}
          />
        </View>
        <View style={styles.formColumn}>
          <Text style={styles.formLabel}>Contact Phone</Text>
          <TextInput
            style={styles.formInput}
            defaultValue="+234 801 234 5678"
            keyboardType="phone-pad"
            placeholderTextColor={COLORS.textLight}
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Business Description</Text>
        <TextInput
          style={[styles.formInput, styles.textArea]}
          defaultValue="We sell quality products at affordable prices."
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          placeholderTextColor={COLORS.textLight}
        />
      </View>

      <TouchableOpacity activeOpacity={0.7}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.accent]}
          style={styles.saveButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderProfile = () => (
    <View style={styles.tabContent}>
      <Text style={styles.tabTitle}>Profile Settings</Text>
      <Text style={styles.tabSubtitle}>Manage your personal information</Text>

      <View style={styles.formRow}>
        <View style={styles.formColumn}>
          <Text style={styles.formLabel}>First Name</Text>
          <TextInput
            style={styles.formInput}
            defaultValue="John"
            placeholderTextColor={COLORS.textLight}
          />
        </View>
        <View style={styles.formColumn}>
          <Text style={styles.formLabel}>Last Name</Text>
          <TextInput
            style={styles.formInput}
            defaultValue="Doe"
            placeholderTextColor={COLORS.textLight}
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Email Address</Text>
        <TextInput
          style={styles.formInput}
          defaultValue="john@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={COLORS.textLight}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Phone Number</Text>
        <TextInput
          style={styles.formInput}
          defaultValue="+234 801 234 5678"
          keyboardType="phone-pad"
          placeholderTextColor={COLORS.textLight}
        />
      </View>

      <TouchableOpacity activeOpacity={0.7}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.accent]}
          style={styles.saveButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.saveButtonText}>Update Profile</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderPreferences = () => (
    <View style={styles.tabContent}>
      <Text style={styles.tabTitle}>Store Preferences</Text>
      <Text style={styles.tabSubtitle}>Configure your store's operational settings</Text>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Currency</Text>
        <View style={styles.selectInput}>
          <Text style={styles.selectInputText}>Nigerian Naira (₦)</Text>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Time Zone</Text>
        <View style={styles.selectInput}>
          <Text style={styles.selectInputText}>West Africa Time (WAT)</Text>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Delivery Options</Text>
        <View style={styles.checkboxGroup}>
          <View style={styles.checkboxRow}>
            <View style={styles.checkbox}>
              <View style={styles.checkboxChecked} />
            </View>
            <Text style={styles.checkboxLabel}>Home Delivery</Text>
          </View>
          <View style={styles.checkboxRow}>
            <View style={styles.checkbox}>
              <View style={styles.checkboxChecked} />
            </View>
            <Text style={styles.checkboxLabel}>Store Pickup</Text>
          </View>
          <View style={styles.checkboxRow}>
            <View style={styles.checkbox} />
            <Text style={styles.checkboxLabel}>Express Delivery</Text>
          </View>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Notifications</Text>
        <View style={styles.checkboxGroup}>
          <View style={styles.checkboxRow}>
            <View style={styles.checkbox}>
              <View style={styles.checkboxChecked} />
            </View>
            <Text style={styles.checkboxLabel}>Email notifications for new orders</Text>
          </View>
          <View style={styles.checkboxRow}>
            <View style={styles.checkbox}>
              <View style={styles.checkboxChecked} />
            </View>
            <Text style={styles.checkboxLabel}>WhatsApp notifications</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity activeOpacity={0.7}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.accent]}
          style={styles.saveButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.saveButtonText}>Save Preferences</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderAPI = () => (
    <View style={styles.tabContent}>
      <Text style={styles.tabTitle}>API & Integrations</Text>
      <Text style={styles.tabSubtitle}>Manage your API keys and third-party integrations</Text>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>API Key</Text>
        <View style={styles.apiKeyContainer}>
          <TextInput
            style={[styles.formInput, styles.apiKeyInput]}
            value="your-stripe-secret-key"
            secureTextEntry={!showApiKey}
            editable={false}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowApiKey(!showApiKey)}
            style={styles.apiButton}
          >
            <Text style={styles.apiButtonText}>{showApiKey ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.copyButton}>
            <Text style={styles.copyButtonText}>Copy</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Webhook Secret</Text>
        <View style={styles.apiKeyContainer}>
          <TextInput
            style={[styles.formInput, styles.apiKeyInput]}
            value="your-stripe-webhook-secret"
            secureTextEntry
            editable={false}
          />
          <TouchableOpacity activeOpacity={0.7} style={styles.copyButton}>
            <Text style={styles.copyButtonText}>Copy</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.warningBox}>
        <Text style={styles.warningTitle}>Important Security Notice</Text>
        <Text style={styles.warningText}>
          Keep your API keys secret. Don't share them in public repositories or client-side code.
        </Text>
      </View>

      <TouchableOpacity activeOpacity={0.7} style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>Regenerate API Key</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSecurity = () => (
    <View style={styles.tabContent}>
      <Text style={styles.tabTitle}>Security Settings</Text>
      <Text style={styles.tabSubtitle}>Manage your account security and authentication</Text>

      <View style={styles.formGroup}>
        <Text style={[styles.formLabel, { marginBottom: 12 }]}>Change Password</Text>
        <TextInput
          style={styles.formInput}
          placeholder="Current Password"
          placeholderTextColor={COLORS.textLight}
          secureTextEntry
        />
        <TextInput
          style={[styles.formInput, { marginTop: 12 }]}
          placeholder="New Password"
          placeholderTextColor={COLORS.textLight}
          secureTextEntry
        />
        <TextInput
          style={[styles.formInput, { marginTop: 12 }]}
          placeholder="Confirm New Password"
          placeholderTextColor={COLORS.textLight}
          secureTextEntry
        />
        <TouchableOpacity activeOpacity={0.7} style={{ marginTop: 16 }}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.accent]}
            style={styles.saveButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.saveButtonText}>Update Password</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Two-Factor Authentication</Text>
        <View style={styles.switchContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.switchLabel}>Enable 2FA</Text>
            <Text style={styles.switchDescription}>
              Add an extra layer of security to your account
            </Text>
          </View>
          <Switch
            value={twoFactorAuth}
            onValueChange={setTwoFactorAuth}
            trackColor={{ false: COLORS.border, true: COLORS.accent }}
            thumbColor={COLORS.white}
          />
        </View>
      </View>
    </View>
  );

  const renderDangerZone = () => (
    <View style={styles.tabContent}>
      <Text style={[styles.tabTitle, { color: COLORS.danger }]}>Danger Zone</Text>
      <Text style={styles.tabSubtitle}>Irreversible and destructive actions</Text>

      <View style={styles.dangerCard}>
        <Text style={styles.dangerCardTitle}>Delete Store</Text>
        <Text style={styles.dangerCardText}>
          Permanently delete your store and all associated data. This action cannot be undone.
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.dangerButton}
          onPress={() => Alert.alert('Delete Store', 'This action cannot be undone.')}
        >
          <Text style={styles.dangerButtonText}>Delete Store</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dangerCard}>
        <Text style={styles.dangerCardTitle}>Delete Account</Text>
        <Text style={styles.dangerCardText}>
          Permanently delete your account, all stores, and data. This action cannot be undone.
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.dangerButton, styles.dangerButtonFilled]}
          onPress={() => Alert.alert('Delete Account', 'This action cannot be undone.')}
        >
          <Text style={[styles.dangerButtonText, { color: COLORS.white }]}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'business':
        return renderBusinessInfo();
      case 'profile':
        return renderProfile();
      case 'preferences':
        return renderPreferences();
      case 'api':
        return renderAPI();
      case 'security':
        return renderSecurity();
      case 'danger':
        return renderDangerZone();
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Page header */}
        <View style={styles.pageHeader}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>Manage your store settings and preferences</Text>
        </View>

        {/* Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabsScroll}
          contentContainerStyle={styles.tabsContainer}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isDanger = tab.id === 'danger';
            return (
              <TouchableOpacity
                key={tab.id}
                activeOpacity={0.7}
                onPress={() => setActiveTab(tab.id)}
              >
                {isActive ? (
                  <LinearGradient
                    colors={[COLORS.primary, COLORS.accent]}
                    style={styles.tabActive}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Icon size={18} color={COLORS.white} />
                    <Text style={styles.tabTextActive}>{tab.label}</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.tabInactive}>
                    <Icon
                      size={18}
                      color={isDanger ? COLORS.danger : COLORS.textLight}
                    />
                    <Text
                      style={[
                        styles.tabTextInactive,
                        isDanger && { color: COLORS.danger },
                      ]}
                    >
                      {tab.label}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Content */}
        <Animated.View entering={FadeInDown.duration(400)}>
          {renderContent()}
        </Animated.View>

        <View style={{ height: 24 }} />
      </ScrollView>
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
  tabsScroll: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tabsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 8,
  },
  tabActive: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
  },
  tabInactive: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    gap: 8,
  },
  tabTextActive: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.white,
  },
  tabTextInactive: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
  },
  tabContent: {
    padding: 24,
  },
  tabTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  tabSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 24,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  formColumn: {
    flex: 1,
  },
  formLabel: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textDark,
    backgroundColor: COLORS.white,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  selectInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
  },
  selectInputText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textDark,
  },
  checkboxGroup: {
    gap: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
  },
  checkboxLabel: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textDark,
  },
  apiKeyContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  apiKeyInput: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
  },
  apiButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  apiButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textDark,
  },
  copyButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  copyButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.white,
  },
  warningBox: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  warningTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#78350F',
    marginBottom: 4,
  },
  warningText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#92400E',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textDark,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 24,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 16,
  },
  switchLabel: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  switchDescription: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
  },
  dangerCard: {
    backgroundColor: '#FEE2E2',
    borderWidth: 2,
    borderColor: '#FCA5A5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  dangerCardTitle: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: COLORS.danger,
    marginBottom: 8,
  },
  dangerCardText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#991B1B',
    marginBottom: 16,
    lineHeight: 20,
  },
  dangerButton: {
    borderWidth: 2,
    borderColor: COLORS.danger,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  dangerButtonFilled: {
    backgroundColor: COLORS.danger,
  },
  dangerButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.danger,
  },
  saveButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: { elevation: 4 },
    }),
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.white,
  },
});

export default SettingsScreen;
