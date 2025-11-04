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
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#3B5BDB',
  primary50: '#EEF2FF',
  primary100: '#E0E7FF',
  primary600: '#3046C5',
  accent: '#00C896',
  accent50: '#ECFDF8',
  white: '#FFFFFF',
  surface: '#F9FAFB',
  textDark: '#1A1A1A',
  textLight: '#6B7280',
  border: '#E5E7EB',
  success: '#22C55E',
};

const HomeScreen = ({ navigation }: any) => {
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
            <LinearGradient
              colors={[COLORS.primary, COLORS.primary600]}
              style={styles.logoIcon}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.logoIconText}>🛍️</Text>
            </LinearGradient>
            <Text style={styles.logoText}>ShopLynk</Text>
          </Animated.View>
          <Animated.View entering={FadeInDown.duration(500).delay(100)}>
            <TouchableOpacity
              style={styles.signInButton}
              onPress={() => navigation.navigate('SignIn')}
            >
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Hero */}
        <LinearGradient
          colors={[COLORS.primary50 + '80', COLORS.white, COLORS.white]}
          style={styles.hero}
        >
          <Animated.View entering={FadeInUp.duration(600).delay(200)}>
            <LinearGradient
              colors={[COLORS.primary50, COLORS.accent50]}
              style={styles.badge}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.accent]}
                style={styles.badgeDot}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
              <Text style={styles.badgeText}>Trusted by 50,000+ merchants worldwide</Text>
            </LinearGradient>
          </Animated.View>

          <Animated.Text entering={FadeInUp.duration(600).delay(300)} style={styles.heroTitle}>
            Your WhatsApp.{'\n'}Their <Text style={styles.heroAccent}>storefront</Text>.
          </Animated.Text>

          <Animated.Text entering={FadeInUp.duration(600).delay(400)} style={styles.heroSubtitle}>
            Complete commerce platform for WhatsApp. Launch stores, process orders, scale revenue.
          </Animated.Text>

          <Animated.View entering={FadeInUp.duration(600).delay(500)} style={styles.ctaContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('SignUp')}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.primary600]}
                style={styles.ctaPrimary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.ctaPrimaryText}>Start Free Trial</Text>
                <Text style={styles.ctaIcon}>→</Text>
              </LinearGradient>
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

          <Animated.View
            entering={FadeInUp.duration(600).delay(700)}
            style={styles.mockupContainer}
          >
            <View style={styles.mockup}>
              <LinearGradient
                colors={[COLORS.surface, COLORS.white, COLORS.surface]}
                style={styles.mockupContent}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <LinearGradient
                  colors={[COLORS.primary50, COLORS.accent50]}
                  style={styles.mockupIconBox}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.mockupIcon}>🛍️</Text>
                </LinearGradient>
                <Text style={styles.mockupText}>Dashboard Preview</Text>
              </LinearGradient>
            </View>
          </Animated.View>
        </LinearGradient>

        {/* Stats */}
        <LinearGradient
          colors={[COLORS.surface, COLORS.white]}
          style={styles.stats}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.statsGrid}>
            {[
              { value: '50K+', label: 'Active Merchants' },
              { value: '5M+', label: 'Orders Processed' },
              { value: '$2B+', label: 'Revenue Generated' },
              { value: '150+', label: 'Countries' },
            ].map((stat, i) => (
              <Animated.View
                key={i}
                entering={FadeInUp.duration(600).delay(800 + i * 50)}
                style={styles.statCard}
              >
                <LinearGradient
                  colors={[COLORS.primary, COLORS.accent]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.statValueContainer}
                >
                  <Text style={styles.statValue}>{stat.value}</Text>
                </LinearGradient>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </Animated.View>
            ))}
          </View>
        </LinearGradient>

        {/* Features */}
        <View style={styles.features}>
          <Animated.View entering={FadeInUp.duration(600).delay(300)}>
            <Text style={styles.sectionLabel}>FEATURES</Text>
            <Text style={styles.sectionTitle}>Everything you need</Text>
            <Text style={styles.sectionSubtitle}>Built for entrepreneurs and growing brands.</Text>
          </Animated.View>

          {[
            {
              icon: '🤖',
              title: 'AI-Powered Listings',
              desc: 'Create catalogs from WhatsApp conversations.',
            },
            {
              icon: '⚡',
              title: 'Instant Notifications',
              desc: 'Real-time updates delivered to WhatsApp.',
            },
            {
              icon: '💳',
              title: 'Unified Payments',
              desc: 'Accept all major payment methods securely.',
            },
            {
              icon: '📊',
              title: 'Advanced Analytics',
              desc: 'Deep insights into sales and behavior.',
            },
            {
              icon: '🛡️',
              title: 'Bank-Grade Security',
              desc: 'Enterprise-level encryption and compliance.',
            },
            {
              icon: '⏰',
              title: 'Automation First',
              desc: 'Save hours with intelligent automation.',
            },
          ].map((feature, i) => (
            <Animated.View
              key={i}
              entering={FadeInUp.duration(600).delay(500 + i * 80)}
              style={styles.featureCard}
            >
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>{feature.icon}</Text>
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDesc}>{feature.desc}</Text>
            </Animated.View>
          ))}
        </View>

        {/* Testimonials */}
        <LinearGradient
          colors={[COLORS.surface, COLORS.white, COLORS.surface]}
          style={styles.testimonials}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <Animated.View entering={FadeInUp.duration(600).delay(200)}>
            <Text style={styles.sectionLabel}>REVIEWS</Text>
            <Text style={styles.sectionTitle}>Loved by merchants</Text>
            <Text style={styles.sectionSubtitle}>
              See what our customers have to say about their experience.
            </Text>
          </Animated.View>

          {[
            {
              name: 'Sarah Chen',
              role: 'Fashion Boutique Owner',
              company: 'Elegant Threads',
              text: 'ShopLynk transformed my business completely. From manual order tracking to fully automated in just days. Revenue up 300%!',
              avatar: '👩‍💼',
              rating: 5,
            },
            {
              name: 'Michael Rodriguez',
              role: 'Electronics Retailer',
              company: 'TechHub Store',
              text: 'The analytics alone paid for itself. I finally understand my customers and inventory needs. Best investment this year.',
              avatar: '👨‍💻',
              rating: 5,
            },
            {
              name: 'Priya Patel',
              role: 'Artisan Marketplace',
              company: 'HandCrafted',
              text: 'Setup took 10 minutes. Now I process 10x more orders with half the effort. Customer support is incredible!',
              avatar: '👩‍🎨',
              rating: 5,
            },
          ].map((testimonial, i) => (
            <Animated.View
              key={i}
              entering={FadeInUp.duration(600).delay(400 + i * 100)}
              style={styles.testimonialCard}
            >
              <View style={styles.testimonialRating}>
                {[...Array(testimonial.rating)].map((_, index) => (
                  <Text key={index} style={styles.star}>
                    ⭐
                  </Text>
                ))}
              </View>
              <Text style={styles.testimonialText}>"{testimonial.text}"</Text>
              <View style={styles.testimonialDivider} />
              <View style={styles.testimonialHeader}>
                <Text style={styles.testimonialAvatar}>{testimonial.avatar}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.testimonialName}>{testimonial.name}</Text>
                  <Text style={styles.testimonialRole}>{testimonial.role}</Text>
                  <Text style={styles.testimonialCompany}>{testimonial.company}</Text>
                </View>
              </View>
            </Animated.View>
          ))}
        </LinearGradient>

        {/* Pricing */}
        <View style={styles.pricing}>
          <Animated.View entering={FadeInUp.duration(600).delay(200)}>
            <Text style={styles.sectionLabel}>PRICING</Text>
            <Text style={styles.sectionTitle}>Simple, transparent pricing</Text>
            <Text style={styles.sectionSubtitle}>
              Choose the perfect plan for your business. All plans include a 14-day free trial.
            </Text>
          </Animated.View>

          {[
            {
              name: 'Starter',
              price: '$29',
              period: '/month',
              description: 'Perfect for small businesses getting started',
              features: [
                'Up to 1,000 orders/month',
                'Basic analytics',
                'WhatsApp integration',
                'Standard support',
                'Single store',
                'Basic automation',
              ],
              cta: 'Start Free Trial',
              popular: false,
            },
            {
              name: 'Professional',
              price: '$79',
              period: '/month',
              description: 'For growing businesses that need more power',
              features: [
                'Up to 10,000 orders/month',
                'Advanced analytics',
                'WhatsApp + SMS',
                'Priority support',
                'Up to 5 stores',
                'Advanced automation',
                'Custom branding',
                'API access',
              ],
              cta: 'Start Free Trial',
              popular: true,
            },
            {
              name: 'Enterprise',
              price: 'Custom',
              period: '',
              description: 'Tailored solutions for large organizations',
              features: [
                'Unlimited orders',
                'Custom analytics',
                'Multi-channel integration',
                'Dedicated support',
                'Unlimited stores',
                'Custom automation',
                'White-label solution',
                'Custom integrations',
              ],
              cta: 'Contact Sales',
              popular: false,
            },
          ].map((plan, i) => (
            <Animated.View
              key={i}
              entering={FadeInUp.duration(600).delay(400 + i * 150)}
              style={[styles.pricingCard, plan.popular && styles.pricingCardPopular]}
            >
              {plan.popular && (
                <LinearGradient
                  colors={[COLORS.primary, COLORS.accent]}
                  style={styles.popularBadge}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
                </LinearGradient>
              )}
              <Text style={styles.pricingName}>{plan.name}</Text>
              <Text style={styles.pricingDescription}>{plan.description}</Text>
              <View style={styles.pricingPriceContainer}>
                <Text style={styles.pricingPrice}>{plan.price}</Text>
                {plan.period && <Text style={styles.pricingPeriod}>{plan.period}</Text>}
              </View>
              <View style={styles.pricingFeatures}>
                {plan.features.map((feature, j) => (
                  <View key={j} style={styles.pricingFeature}>
                    <Text style={styles.pricingFeatureCheck}>✓</Text>
                    <Text style={styles.pricingFeatureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('SignUp')}
              >
                {plan.popular ? (
                  <LinearGradient
                    colors={[COLORS.primary, COLORS.primary600]}
                    style={styles.pricingButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.pricingButtonTextPrimary}>{plan.cta}</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.pricingButtonSecondary}>
                    <Text style={styles.pricingButtonTextSecondary}>{plan.cta}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </Animated.View>
          ))}

          <Animated.View entering={FadeInUp.duration(600).delay(850)} style={styles.pricingNote}>
            <Text style={styles.pricingNoteText}>
              All plans include a 14-day free trial. No credit card required.{' '}
              <Text style={styles.pricingNoteLink}>View detailed comparison</Text>
            </Text>
          </Animated.View>
        </View>

        {/* CTA */}
        <Animated.View entering={FadeInUp.duration(600).delay(600)}>
          <LinearGradient
            colors={[COLORS.primary50 + '80', COLORS.accent50 + '80', COLORS.white]}
            style={styles.cta}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.ctaTitle}>Ready to scale?</Text>
            <Text style={styles.ctaSubtitle}>
              Join thousands of merchants growing their business on WhatsApp.
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('SignUp')}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.primary600]}
                style={styles.ctaButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.ctaButtonText}>Start Free Trial</Text>
                <Text style={styles.ctaButtonIcon}>→</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>

        {/* Footer */}
        <LinearGradient
          colors={[COLORS.textDark, '#111827']}
          style={styles.footer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.footerBrand}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.primary600]}
              style={styles.footerLogo}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.footerLogoIcon}>🛍️</Text>
            </LinearGradient>
            <Text style={styles.footerBrandText}>ShopLynk</Text>
          </View>
          <Text style={styles.footerDesc}>
            The complete commerce platform for WhatsApp. Empowering businesses worldwide.
          </Text>

          <View style={styles.footerLinks}>
            {[
              { title: 'Product', items: ['Features', 'Pricing', 'API'] },
              { title: 'Company', items: ['About', 'Blog', 'Careers'] },
              { title: 'Resources', items: ['Docs', 'Help', 'Contact'] },
            ].map((section, i) => (
              <View key={i} style={styles.footerSection}>
                <Text style={styles.footerSectionTitle}>{section.title}</Text>
                {section.items.map((item, j) => (
                  <Text key={j} style={styles.footerLink}>
                    {item}
                  </Text>
                ))}
              </View>
            ))}
          </View>

          <View style={styles.footerDivider} />
          <Text style={styles.footerCopyright}>© 2025 ShopLynk. All rights reserved.</Text>
          <Text style={styles.footerPowered}>Powered by ShopLynk</Text>
        </LinearGradient>
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
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: { elevation: 4 },
    }),
  },
  logoIconText: { fontSize: 18 },
  logoText: { fontSize: 20, fontFamily: 'Inter_800ExtraBold', color: COLORS.textDark },
  signInButton: { paddingHorizontal: 16, paddingVertical: 8 },
  signInText: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: COLORS.textLight },

  hero: { paddingHorizontal: 24, paddingVertical: 64, alignItems: 'center' },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary + '50',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginBottom: 32,
  },
  badgeDot: { width: 8, height: 8, borderRadius: 4, marginRight: 10 },
  badgeText: { fontSize: 12, fontFamily: 'Inter_800ExtraBold', color: COLORS.primary },
  heroTitle: {
    fontSize: 52,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 60,
  },
  heroAccent: { color: COLORS.primary },
  heroSubtitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 32,
  },

  ctaContainer: { width: '100%', gap: 16, marginBottom: 32 },
  ctaPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
      },
      android: { elevation: 10 },
    }),
  },
  ctaPrimaryText: {
    fontSize: 18,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.white,
    marginRight: 10,
  },
  ctaIcon: { fontSize: 22, color: COLORS.white, fontFamily: 'Inter_800ExtraBold' },
  ctaSecondary: {
    paddingVertical: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  ctaSecondaryText: {
    fontSize: 18,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.textDark,
    textAlign: 'center',
  },

  trustBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 48,
  },
  trustBadge: { flexDirection: 'row', alignItems: 'center' },
  trustCheck: {
    fontSize: 16,
    color: COLORS.accent,
    marginRight: 8,
    fontFamily: 'Inter_800ExtraBold',
  },
  trustText: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: COLORS.textLight },

  mockupContainer: { width: width - 48 },
  mockup: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
      },
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
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
  },
  mockupIcon: { fontSize: 36 },
  mockupText: { fontSize: 15, fontFamily: 'Inter_700Bold', color: COLORS.textLight },

  stats: {
    paddingVertical: 56,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 40,
  },
  statCard: {
    width: '45%',
    alignItems: 'center',
    paddingVertical: 16,
  },
  statValueContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 12,
  },
  statValue: {
    fontSize: 48,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.white,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textLight,
    textAlign: 'center',
  },

  features: { paddingHorizontal: 24, paddingVertical: 64, backgroundColor: COLORS.white },
  sectionLabel: {
    fontSize: 12,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 2,
  },
  sectionTitle: {
    fontSize: 42,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 50,
  },
  sectionSubtitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 28,
  },

  featureCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
      },
      android: { elevation: 4 },
    }),
  },
  featureIcon: {
    width: 64,
    height: 64,
    backgroundColor: COLORS.primary + '10',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  featureIconText: { fontSize: 32 },
  featureTitle: {
    fontSize: 21,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.textDark,
    marginBottom: 12,
  },
  featureDesc: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
    lineHeight: 26,
  },

  testimonials: { paddingHorizontal: 24, paddingVertical: 64 },
  testimonialCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
      },
      android: { elevation: 4 },
    }),
  },
  testimonialRating: { flexDirection: 'row', marginBottom: 24, gap: 6 },
  star: { fontSize: 20 },
  testimonialText: {
    fontSize: 17,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textDark,
    lineHeight: 28,
    marginBottom: 24,
  },
  testimonialDivider: { height: 1, backgroundColor: COLORS.border, marginBottom: 24 },
  testimonialHeader: { flexDirection: 'row', alignItems: 'center' },
  testimonialAvatar: { fontSize: 48, marginRight: 20 },
  testimonialName: {
    fontSize: 18,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.textDark,
    marginBottom: 6,
  },
  testimonialRole: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
    marginBottom: 4,
  },
  testimonialCompany: { fontSize: 14, fontFamily: 'Inter_800ExtraBold', color: COLORS.primary },

  pricing: { paddingHorizontal: 24, paddingVertical: 64, backgroundColor: COLORS.white },
  pricingCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 32,
    borderWidth: 2,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
      },
      android: { elevation: 6 },
    }),
  },
  pricingCardPopular: {
    borderColor: COLORS.primary,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.3,
        shadowRadius: 24,
      },
      android: { elevation: 12 },
    }),
  },
  popularBadge: {
    position: 'absolute',
    top: -14,
    left: '50%',
    transform: [{ translateX: -70 }],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: { elevation: 8 },
    }),
  },
  popularBadgeText: {
    fontSize: 11,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.white,
    letterSpacing: 1,
  },
  pricingName: {
    fontSize: 24,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: 8,
  },
  pricingDescription: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  pricingPriceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 32,
  },
  pricingPrice: {
    fontSize: 52,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.textDark,
  },
  pricingPeriod: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
    marginBottom: 8,
    marginLeft: 6,
  },
  pricingFeatures: {
    marginBottom: 32,
  },
  pricingFeature: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  pricingFeatureCheck: {
    fontSize: 18,
    color: COLORS.accent,
    marginRight: 12,
    marginTop: 2,
  },
  pricingFeatureText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
    lineHeight: 22,
  },
  pricingButton: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: { elevation: 8 },
    }),
  },
  pricingButtonSecondary: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  pricingButtonTextPrimary: {
    fontSize: 17,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.white,
  },
  pricingButtonTextSecondary: {
    fontSize: 17,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.textDark,
  },
  pricingNote: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  pricingNoteText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 22,
  },
  pricingNoteLink: {
    color: COLORS.primary,
    fontFamily: 'Inter_800ExtraBold',
  },

  cta: {
    marginHorizontal: 24,
    marginBottom: 64,
    borderRadius: 28,
    padding: 48,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
  },
  ctaTitle: {
    fontSize: 44,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 52,
  },
  ctaSubtitle: {
    fontSize: 19,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 36,
    lineHeight: 30,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 22,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
      },
      android: { elevation: 10 },
    }),
  },
  ctaButtonText: {
    fontSize: 19,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.white,
    marginRight: 10,
  },
  ctaButtonIcon: { fontSize: 24, color: COLORS.white, fontFamily: 'Inter_800ExtraBold' },

  footer: { paddingVertical: 56, paddingHorizontal: 24, alignItems: 'center' },
  footerBrand: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  footerLogo: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
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

  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 32,
  },
  footerSection: { alignItems: 'center', flex: 1 },
  footerSectionTitle: {
    fontSize: 13,
    fontFamily: 'Inter_700Bold',
    color: COLORS.white,
    marginBottom: 12,
  },
  footerLink: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#9CA3AF', marginBottom: 8 },

  footerDivider: { width: '100%', height: 1, backgroundColor: '#FFFFFF20', marginBottom: 24 },
  footerCopyright: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#9CA3AF',
    marginBottom: 8,
  },
  footerPowered: { fontSize: 11, fontFamily: 'Inter_400Regular', color: '#6B7280' },
});

export default HomeScreen;
