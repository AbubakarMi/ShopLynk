import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  HomeIcon,
  CubeIcon,
  ShoppingCartIcon,
  CreditCardIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ChartBarIcon,
  UsersIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  BellIcon,
  Bars3Icon,
  XMarkIcon,
} from '../components/Icons';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = Math.min(280, width * 0.8); // 80% of screen width, max 280px

const COLORS = {
  primary: '#3B5BDB',
  accent: '#00C896',
  white: '#FFFFFF',
  surface: '#F9FAFB',
  textDark: '#1A1A1A',
  textLight: '#6B7280',
  border: '#E5E7EB',
  gray900: '#111827',
};

interface NavItem {
  name: string;
  screen: string;
  icon: React.ComponentType<any>;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', screen: 'Dashboard', icon: HomeIcon },
  { name: 'Products', screen: 'Products', icon: CubeIcon },
  { name: 'Orders', screen: 'Orders', icon: ShoppingCartIcon },
  { name: 'Payments', screen: 'Payments', icon: CreditCardIcon },
  { name: 'WhatsApp', screen: 'WhatsApp', icon: ChatBubbleLeftRightIcon },
  { name: 'Invoices', screen: 'Invoices', icon: DocumentTextIcon },
  { name: 'Analytics', screen: 'Analytics', icon: ChartBarIcon },
  { name: 'Customers', screen: 'Customers', icon: UsersIcon },
  { name: 'Settings', screen: 'Settings', icon: CogIcon },
  { name: 'Help Center', screen: 'Help', icon: QuestionMarkCircleIcon },
];

interface PortalLayoutProps {
  navigation: any;
  children: React.ReactNode;
  currentScreen: string;
}

export default function PortalLayout({ navigation, children, currentScreen }: PortalLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigate = (screen: string) => {
    setSidebarOpen(false);
    navigation.navigate(screen);
  };

  const handleLogout = () => {
    setSidebarOpen(false);
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setSidebarOpen(true)}
          style={styles.menuButton}
          activeOpacity={0.7}
        >
          <Bars3Icon size={24} color={COLORS.textDark} />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <View style={styles.logoBox} />
          <Text style={styles.logoText}>ShopLynk</Text>
        </View>

        <TouchableOpacity style={styles.notificationButton} activeOpacity={0.7}>
          <BellIcon size={22} color={COLORS.textLight} />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>{children}</View>

      {/* Sidebar Modal */}
      <Modal
        visible={sidebarOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setSidebarOpen(false)}
      >
        <View style={styles.modalOverlay}>
          {/* Sidebar - Opens from LEFT */}
          <View style={styles.sidebar}>
            {/* Sidebar Header */}
            <View style={styles.sidebarHeader}>
              <View style={styles.sidebarLogoContainer}>
                <View style={styles.sidebarLogoBox} />
                <Text style={styles.sidebarLogoText}>ShopLynk</Text>
              </View>
              <TouchableOpacity
                onPress={() => setSidebarOpen(false)}
                style={styles.closeButton}
                activeOpacity={0.7}
              >
                <XMarkIcon size={24} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>

            {/* Navigation */}
            <ScrollView style={styles.navigation} showsVerticalScrollIndicator={false}>
              {navItems.map((item) => {
                const isActive = currentScreen === item.screen;
                const Icon = item.icon;

                return (
                  <TouchableOpacity
                    key={item.screen}
                    onPress={() => handleNavigate(item.screen)}
                    activeOpacity={0.7}
                    style={styles.navItemContainer}
                  >
                    {isActive ? (
                      <View style={styles.navItemActive}>
                        <Icon size={20} color={COLORS.white} />
                        <Text style={styles.navItemTextActive}>{item.name}</Text>
                      </View>
                    ) : (
                      <View style={styles.navItemInactive}>
                        <Icon size={20} color={COLORS.textLight} />
                        <Text style={styles.navItemTextInactive}>{item.name}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Logout Button */}
            <View style={styles.sidebarFooter}>
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}
                activeOpacity={0.7}
              >
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Backdrop - After sidebar so it's on the right */}
          <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPress={() => setSidebarOpen(false)}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    height: 64,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: { elevation: 2 },
    }),
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  notificationButton: {
    padding: 8,
    borderRadius: 8,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  content: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(17, 24, 39, 0.5)',
  },
  sidebar: {
    width: SIDEBAR_WIDTH,
    backgroundColor: COLORS.white,
    height: '100%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: { elevation: 16 },
    }),
  },
  sidebarHeader: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sidebarLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sidebarLogoBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  sidebarLogoText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  closeButton: {
    padding: 8,
  },
  navigation: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  navItemContainer: {
    marginBottom: 4,
  },
  navItemActive: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
    backgroundColor: COLORS.primary,
  },
  navItemInactive: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  navItemTextActive: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
  navItemTextInactive: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textLight,
  },
  sidebarFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  logoutButton: {
    backgroundColor: COLORS.surface,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
  },
});
