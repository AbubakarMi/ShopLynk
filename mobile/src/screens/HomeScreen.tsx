import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter';

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
};

const HomeScreen = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <ScrollView showsVerticalScrollIndicator={false} bounces={true}>
        {/* Header */}
        <View style={styles.header}>
          <Animated.View entering={FadeInDown.duration(500)} style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoIconText}>🛍️</Text>
            </View>
            <Text style={styles.logoText}>ShopLynk</Text>
          </Animated.View>
          <Animated.View entering={FadeInDown.duration(500).delay(100)}>
            <TouchableOpacity style={styles.signInButton}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <Animated.View entering={FadeInUp.duration(600).delay(200)}>
            <View style={styles.badge}>
              <View style={styles.badgeDot} />
              <Text style={styles.badgeText}>Trusted by 50,000+ merchants</Text>
            </View>
          </Animated.View>

          <Animated.Text entering={FadeInUp.duration(600).delay(300)} style={styles.heroTitle}>
            Your WhatsApp.{'\n'}Their <Text style={styles.heroAccent}>storefront</Text>.
          </Animated.Text>

          <Animated.Text entering={FadeInUp.duration(600).delay(400)} style={styles.heroSubtitle}>
            Complete commerce platform for WhatsApp. Launch stores, process orders, scale revenue.
          </Animated.Text>

          <Animated.View entering={FadeInUp.duration(600).delay(500)} style={styles.ctaContainer}>
            <TouchableOpacity style={styles.ctaPrimary} activeOpacity={0.8}>
              <Text style={styles.ctaPrimaryText}>Start Free Trial</Text>
              <Text style={styles.ctaIcon}>→</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ctaSecondary} activeOpacity={0.8}>
              <Text style={styles.ctaSecondaryText}>View Demo</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInUp.duration(600).delay(600)} style={styles.trustBadges}>
            {['14-day trial', 'No credit card', 'Cancel anytime'].map((item, i) => (
              <View key={i} style={styles.trustBadge}>
                <Text style={styles.trustCheck}>✓</Text>
                <Text style={styles.trustText}>{item}</Text>
              </View>
            ))}
          </Animated.View>

          <Animated.View entering={FadeInUp.duration(600).delay(700)} style={styles.mockupContainer}>
            <View style={styles.mockup}>
              <View style={styles.mockupContent}>
                <View style={styles.mockupIconBox}>
                  <Text style={styles.mockupIcon}>🛍️</Text>
                </View>
                <Text style={styles.mockupText}>Dashboard Preview</Text>
              </View>
            </View>
          </Animated.View>
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          {[
            { value: '50K+', label: 'Merchants' },
            { value: '5M+', label: 'Orders' },
            { value: '$2B+', label: 'Revenue' },
            { value: '150+', label: 'Countries' },
          ].map((stat, i) => (
            <Animated.View key={i} entering={FadeInUp.duration(600).delay(800 + i * 50)} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Animated.View>
          ))}
        </View>

        {/* Features */}
        <View style={styles.features}>
          <Animated.View entering={FadeInUp.duration(600).delay(300)}>
            <Text style={styles.sectionLabel}>FEATURES</Text>
            <Text style={styles.sectionTitle}>Everything you need</Text>
            <Text style={styles.sectionSubtitle}>Built for entrepreneurs and growing brands.</Text>
          </Animated.View>

          {[
            { icon: '🤖', title: 'AI-Powered Listings', desc: 'Create catalogs from WhatsApp conversations.' },
            { icon: '⚡', title: 'Instant Notifications', desc: 'Real-time updates delivered to WhatsApp.' },
            { icon: '💳', title: 'Unified Payments', desc: 'Accept all major payment methods securely.' },
            { icon: '📊', title: 'Advanced Analytics', desc: 'Deep insights into sales and behavior.' },
            { icon: '🛡️', title: 'Bank-Grade Security', desc: 'Enterprise-level encryption and compliance.' },
            { icon: '⏰', title: 'Automation First', desc: 'Save hours with intelligent automation.' },
          ].map((feature, i) => (
            <Animated.View key={i} entering={FadeInUp.duration(600).delay(500 + i * 80)} style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>{feature.icon}</Text>
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDesc}>{feature.desc}</Text>
            </Animated.View>
          ))}
        </View>

        {/* Testimonials */}
        <View style={styles.testimonials}>
          <Animated.View entering={FadeInUp.duration(600).delay(200)}>
            <Text style={styles.sectionLabel}>TESTIMONIALS</Text>
            <Text style={styles.sectionTitle}>Loved by merchants</Text>
          </Animated.View>

          {[
            { name: 'Sarah Chen', role: 'Fashion Boutique', text: 'Transformed my business completely.', avatar: '👩‍💼' },
            { name: 'Michael Rodriguez', role: 'Electronics Store', text: 'Analytics paid for itself instantly.', avatar: '👨‍💻' },
          ].map((testimonial, i) => (
            <Animated.View key={i} entering={FadeInUp.duration(600).delay(400 + i * 100)} style={styles.testimonialCard}>
              <View style={styles.testimonialHeader}>
                <Text style={styles.testimonialAvatar}>{testimonial.avatar}</Text>
                <View>
                  <Text style={styles.testimonialName}>{testimonial.name}</Text>
                  <Text style={styles.testimonialRole}>{testimonial.role}</Text>
                </View>
              </View>
              <Text style={styles.testimonialText}>"{testimonial.text}"</Text>
            </Animated.View>
          ))}
        </View>

        {/* CTA */}
        <Animated.View entering={FadeInUp.duration(600).delay(600)}>
          <View style={styles.cta}>
            <Text style={styles.ctaTitle}>Ready to scale?</Text>
            <Text style={styles.ctaSubtitle}>Join thousands of merchants growing on WhatsApp.</Text>
            <TouchableOpacity style={styles.ctaButton} activeOpacity={0.8}>
              <Text style={styles.ctaButtonText}>Start Free Trial</Text>
              <Text style={styles.ctaButtonIcon}>→</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerBrand}>
            <View style={styles.footerLogo}>
              <Text style={styles.footerLogoIcon}>🛍️</Text>
            </View>
            <Text style={styles.footerBrandText}>ShopLynk</Text>
          </View>
          <Text style={styles.footerDesc}>Complete commerce platform for WhatsApp. Empowering businesses worldwide.</Text>

          <View style={styles.footerLinks}>
            {[
              { title: 'Product', items: ['Features', 'Pricing', 'API'] },
              { title: 'Company', items: ['About', 'Blog', 'Careers'] },
              { title: 'Resources', items: ['Docs', 'Help', 'Contact'] },
            ].map((section, i) => (
              <View key={i} style={styles.footerSection}>
                <Text style={styles.footerSectionTitle}>{section.title}</Text>
                {section.items.map((item, j) => (
                  <Text key={j} style={styles.footerLink}>{item}</Text>
                ))}
              </View>
            ))}
          </View>

          <View style={styles.footerDivider} />
          <Text style={styles.footerCopyright}>© 2025 ShopLynk. All rights reserved.</Text>
          <Text style={styles.footerPowered}>Powered by ShopLynk</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  logoIcon: {
    width: 36,
    height: 36,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoIconText: { fontSize: 18 },
  logoText: { fontSize: 20, fontFamily: 'Inter_800ExtraBold', color: COLORS.textDark },
  signInButton: { paddingHorizontal: 16, paddingVertical: 8 },
  signInText: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: COLORS.textLight },

  hero: { paddingHorizontal: 24, paddingVertical: 56, alignItems: 'center' },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '10',
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 24,
  },
  badgeDot: { width: 8, height: 8, backgroundColor: COLORS.primary, borderRadius: 4, marginRight: 8 },
  badgeText: { fontSize: 11, fontFamily: 'Inter_700Bold', color: COLORS.primary },
  heroTitle: {
    fontSize: 48,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 56,
  },
  heroAccent: { color: COLORS.primary },
  heroSubtitle: {
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 28,
  },

  ctaContainer: { width: '100%', gap: 12, marginBottom: 24 },
  ctaPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 14,
    ...Platform.select({
      ios: { shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 10 },
      android: { elevation: 6 },
    }),
  },
  ctaPrimaryText: { fontSize: 17, fontFamily: 'Inter_700Bold', color: COLORS.white, marginRight: 8 },
  ctaIcon: { fontSize: 20, color: COLORS.white, fontFamily: 'Inter_700Bold' },
  ctaSecondary: {
    paddingVertical: 18,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  ctaSecondaryText: { fontSize: 17, fontFamily: 'Inter_700Bold', color: COLORS.textDark, textAlign: 'center' },

  trustBadges: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 16, marginBottom: 32 },
  trustBadge: { flexDirection: 'row', alignItems: 'center' },
  trustCheck: { fontSize: 13, color: COLORS.accent, marginRight: 6, fontFamily: 'Inter_700Bold' },
  trustText: { fontSize: 13, fontFamily: 'Inter_400Regular', color: COLORS.textLight },

  mockupContainer: { width: width - 48 },
  mockup: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.15, shadowRadius: 24 },
      android: { elevation: 8 },
    }),
  },
  mockupContent: {
    height: 220,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  mockupIconBox: {
    width: 72,
    height: 72,
    backgroundColor: COLORS.primary + '15',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.primary + '20',
  },
  mockupIcon: { fontSize: 36 },
  mockupText: { fontSize: 15, fontFamily: 'Inter_700Bold', color: COLORS.textLight },

  stats: {
    paddingVertical: 48,
    paddingHorizontal: 24,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 24,
  },
  statCard: { width: '47%', alignItems: 'center', paddingVertical: 12 },
  statValue: { fontSize: 36, fontFamily: 'Inter_800ExtraBold', color: COLORS.primary, marginBottom: 4 },
  statLabel: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: COLORS.textLight },

  features: { paddingHorizontal: 24, paddingVertical: 64, backgroundColor: COLORS.white },
  sectionLabel: {
    fontSize: 11,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 1.5,
  },
  sectionTitle: {
    fontSize: 38,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 46,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 25,
  },

  featureCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 12 },
      android: { elevation: 2 },
    }),
  },
  featureIcon: {
    width: 56,
    height: 56,
    backgroundColor: COLORS.primary + '10',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIconText: { fontSize: 28 },
  featureTitle: { fontSize: 19, fontFamily: 'Inter_800ExtraBold', color: COLORS.textDark, marginBottom: 10 },
  featureDesc: { fontSize: 15, fontFamily: 'Inter_400Regular', color: COLORS.textLight, lineHeight: 23 },

  testimonials: { paddingHorizontal: 24, paddingVertical: 64, backgroundColor: COLORS.surface },
  testimonialCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  testimonialHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  testimonialAvatar: { fontSize: 32, marginRight: 12 },
  testimonialName: { fontSize: 16, fontFamily: 'Inter_700Bold', color: COLORS.textDark, marginBottom: 2 },
  testimonialRole: { fontSize: 13, fontFamily: 'Inter_400Regular', color: COLORS.textLight },
  testimonialText: { fontSize: 15, fontFamily: 'Inter_400Regular', color: COLORS.textLight, lineHeight: 23 },

  cta: {
    marginHorizontal: 24,
    marginBottom: 64,
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  ctaTitle: {
    fontSize: 38,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 46,
  },
  ctaSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 25,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 36,
    paddingVertical: 18,
    borderRadius: 14,
    ...Platform.select({
      ios: { shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 10 },
      android: { elevation: 6 },
    }),
  },
  ctaButtonText: { fontSize: 17, fontFamily: 'Inter_700Bold', color: COLORS.white, marginRight: 8 },
  ctaButtonIcon: { fontSize: 20, color: COLORS.white, fontFamily: 'Inter_700Bold' },

  footer: { paddingVertical: 56, paddingHorizontal: 24, backgroundColor: COLORS.textDark, alignItems: 'center' },
  footerBrand: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  footerLogo: {
    width: 36,
    height: 36,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  footerLogoIcon: { fontSize: 18 },
  footerBrandText: { fontSize: 20, fontFamily: 'Inter_800ExtraBold', color: COLORS.white },
  footerDesc: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    maxWidth: 280,
  },

  footerLinks: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: 32 },
  footerSection: { alignItems: 'center', flex: 1 },
  footerSectionTitle: { fontSize: 13, fontFamily: 'Inter_700Bold', color: COLORS.white, marginBottom: 12 },
  footerLink: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#9CA3AF', marginBottom: 8 },

  footerDivider: { width: '100%', height: 1, backgroundColor: '#FFFFFF20', marginBottom: 24 },
  footerCopyright: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#9CA3AF', marginBottom: 8 },
  footerPowered: { fontSize: 11, fontFamily: 'Inter_400Regular', color: '#6B7280' },
});

export default HomeScreen;
