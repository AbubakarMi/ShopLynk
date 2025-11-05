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
  ActivityIndicator,
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
import {
  ShoppingBagIcon,
  ChatBubbleLeftIcon,
  BoltIcon,
  CreditCardIcon,
  ChartBarSquareIcon,
  ShieldCheckIcon,
  ClockIcon,
  CheckIcon,
  StarIcon,
  GlobeAltIcon,
  UserGroupIcon,
  EnvelopeIcon,
  ArrowRightIcon,
} from '../components/Icons';
import GradientText from '../components/GradientText';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#3B5BDB',
  primary50: '#EEF2FF',
  primary100: '#E0E7FF',
  primary200: '#C7D2FE',
  primary300: '#A5B4FC',
  primary600: '#3046C5',
  primary700: '#2838A8',
  accent: '#00C896',
  accent50: '#ECFDF8',
  accent400: '#34D5B5',
  white: '#FFFFFF',
  surface: '#F9FAFB',
  textDark: '#1A1A1A',
  textLight: '#6B7280',
  border: '#E5E7EB',
  success: '#22C55E',
  neutral900: '#111827',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
};

const HomeScreen = ({ navigation }: any) => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <ScrollView showsVerticalScrollIndicator={false} bounces={true}>
        {/* Header/Navbar */}
        <View style={styles.header}>
          <Animated.View entering={FadeInDown.duration(500)} style={styles.logoContainer}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.primary600]}
              style={styles.logoIcon}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <ShoppingBagIcon size={20} color={COLORS.white} />
            </LinearGradient>
            <Text style={styles.logoText}>ShopLynk</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(100)} style={styles.navButtons}>
            <TouchableOpacity
              style={styles.signInButton}
              onPress={() => navigation.navigate('SignIn')}
            >
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.primary600]}
                style={styles.getStartedButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.getStartedText}>Get Started</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* TEMPORARY TEST BUTTON - For testing Portal */}
        <View style={{ backgroundColor: '#FFF3CD', borderColor: '#FFC107', borderWidth: 2, margin: 16, borderRadius: 12, overflow: 'hidden' }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Portal')}
          >
            <LinearGradient
              colors={['#FFF3CD', '#FFE69C']}
              style={{ padding: 20, alignItems: 'center' }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#856404', marginBottom: 4 }}>
                🧪 TEST PORTAL (Temporary)
              </Text>
              <Text style={{ fontSize: 13, color: '#856404', opacity: 0.8 }}>
                Tap to access Business Owner Portal
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <LinearGradient
          colors={[COLORS.primary50 + '4D', COLORS.white, COLORS.white]}
          style={styles.hero}
        >
          {/* Trust Badge */}
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
              <GradientText
                colors={[COLORS.primary, COLORS.accent, COLORS.accent]}
                style={styles.badgeText}
              >
                Trusted by 50,000+ merchants worldwide
              </GradientText>
            </LinearGradient>
          </Animated.View>

          {/* Hero Title */}
          <Animated.View entering={FadeInUp.duration(600).delay(300)} style={styles.heroTitleContainer}>
            <Text style={styles.heroTitle}>Your WhatsApp.</Text>
            <View style={styles.heroTitleRow}>
              <Text style={styles.heroTitle}>
                Their <Text style={{ color: 'transparent' }}>storefront</Text>.
              </Text>
              <View style={{ position: 'absolute', left: 100, top: 2 }}>
                <GradientText colors={[COLORS.primary, COLORS.primary600, COLORS.accent]} style={{ ...styles.heroTitle, fontSize: 41 }}>storefront</GradientText>
              </View>
            </View>
          </Animated.View>

          {/* Hero Subtitle */}
          <Animated.Text entering={FadeInUp.duration(600).delay(400)} style={styles.heroSubtitle}>
            Complete commerce platform for WhatsApp. Launch stores, process orders, scale revenue—without building websites.
          </Animated.Text>

          {/* CTA Buttons */}
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
                <ArrowRightIcon size={20} color={COLORS.white} />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ctaSecondary} activeOpacity={0.8}>
              <Text style={styles.ctaSecondaryText}>View Demo</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Trust Badges - Updated with 4 items */}
          <Animated.View entering={FadeInUp.duration(600).delay(600)} style={styles.trustBadges}>
            {['14-day free trial', 'No credit card', 'Cancel anytime', '5-min setup'].map((item, i) => (
              <View key={i} style={styles.trustBadge}>
                <CheckIcon size={16} color={COLORS.accent} />
                <Text style={styles.trustText}>{item}</Text>
              </View>
            ))}
          </Animated.View>

          {/* TEMPORARY TEST BUTTON - For testing Portal */}
          <Animated.View entering={FadeInUp.duration(600).delay(650)} style={{ marginTop: 20, marginBottom: 20 }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Portal')}
            >
              <LinearGradient
                colors={[COLORS.accent, '#00A876']}
                style={styles.testPortalButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.testPortalButtonText}>🧪 TEST PORTAL (Temporary)</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Dashboard Preview with Floating Elements */}
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
                <View style={styles.mockupCenter}>
                  <LinearGradient
                    colors={[COLORS.primary50, COLORS.accent50]}
                    style={styles.mockupIconBox}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <ShoppingBagIcon size={32} color={COLORS.primary} />
                  </LinearGradient>
                  <Text style={styles.mockupText}>Dashboard Preview</Text>
                </View>

                {/* Floating Check Icon - Top Left */}
                <Animated.View
                  entering={FadeInUp.duration(1000).delay(900)}
                  style={styles.floatingIconTopLeft}
                >
                  <View style={styles.floatingIconContainer}>
                    <CheckIcon size={18} color={COLORS.accent} />
                  </View>
                </Animated.View>

                {/* Floating Chart Icon - Bottom Right */}
                <Animated.View
                  entering={FadeInUp.duration(1000).delay(1100)}
                  style={styles.floatingIconBottomRight}
                >
                  <View style={styles.floatingIconContainer}>
                    <ChartBarSquareIcon size={18} color={COLORS.primary} />
                  </View>
                </Animated.View>
              </LinearGradient>
            </View>
          </Animated.View>
        </LinearGradient>

        {/* Stats Section */}
        <LinearGradient
          colors={[COLORS.surface, COLORS.white]}
          style={styles.stats}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.statsRow}>
            {[
              { value: '50K+', label: 'Active Merchants' },
              { value: '5M+', label: 'Orders Processed' },
              { value: '$2B+', label: 'Revenue Generated' },
              { value: '150+', label: 'Countries' },
            ].map((stat, i) => (
              <View key={i} style={styles.statCard}>
                <Animated.View entering={FadeInUp.duration(600).delay(800 + i * 50)}>
                  <GradientText
                    colors={[COLORS.primary, COLORS.accent, COLORS.accent]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.statValue}
                  >
                    {stat.value}
                  </GradientText>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </Animated.View>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* Features Section */}
        <View style={styles.features}>
          <Animated.View entering={FadeInUp.duration(600).delay(300)}>
            <Text style={styles.sectionLabel}>FEATURES</Text>
            <Text style={styles.sectionTitle}>Everything you need</Text>
            <Text style={styles.sectionSubtitle}>Built for entrepreneurs, small businesses, and growing brands.</Text>
          </Animated.View>

          {[
            {
              icon: '💬',
              title: 'AI-Powered Listings',
              desc: 'Create catalogs automatically from WhatsApp conversations.',
            },
            {
              icon: '⚡',
              title: 'Instant Notifications',
              desc: 'Real-time order updates delivered directly to WhatsApp.',
            },
            {
              icon: '💳',
              title: 'Unified Payments',
              desc: 'Accept all major payment methods with secure processing.',
            },
            {
              icon: '📊',
              title: 'Advanced Analytics',
              desc: 'Deep insights into sales trends and customer behavior.',
            },
            {
              icon: '🛡️',
              title: 'Bank-Grade Security',
              desc: 'Enterprise-level encryption protects your business data.',
            },
            {
              icon: '⏰',
              title: 'Automation First',
              desc: 'Save hours daily with intelligent automation tools.',
            },
          ].map((feature, i) => {
            const IconComponent = [ChatBubbleLeftIcon, BoltIcon, CreditCardIcon, ChartBarSquareIcon, ShieldCheckIcon, ClockIcon][i];
            return (
              <Animated.View key={i} entering={FadeInUp.duration(600).delay(500 + i * 80)} style={styles.featureCard}>
                <TouchableOpacity activeOpacity={0.7} style={{ flex: 1 }}>
                  <LinearGradient
                    colors={[COLORS.primary50, COLORS.accent50]}
                    style={styles.featureIcon}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <IconComponent size={32} color={COLORS.primary} />
                  </LinearGradient>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDesc}>{feature.desc}</Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {/* Testimonials Section */}
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
              {/* Stars at Top */}
              <View style={styles.testimonialRating}>
                {[...Array(testimonial.rating)].map((_, index) => (
                  <StarIcon key={`star-${testimonial.name}-${index}`} size={20} color={COLORS.accent} filled={true} />
                ))}
              </View>

              {/* Quote */}
              <Text style={styles.testimonialText}>"{testimonial.text}"</Text>

              {/* Author Info - Bottom with Border */}
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

        {/* Pricing Section - NEW */}
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
                '99.99% SLA',
              ],
              cta: 'Contact Sales',
              popular: false,
            },
          ].map((plan, i) => (
            <Animated.View
              key={i}
              entering={FadeInUp.duration(600).delay(400 + i * 100)}
              style={[
                styles.pricingCard,
                plan.popular && styles.pricingCardPopular,
              ]}
            >
              {plan.popular && (
                <View style={styles.popularBadgeContainer}>
                  <LinearGradient
                    colors={[COLORS.primary, COLORS.accent]}
                    style={styles.popularBadge}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
                  </LinearGradient>
                </View>
              )}

              <View style={styles.pricingHeader}>
                <Text style={styles.pricingName}>{plan.name}</Text>
                <Text style={styles.pricingDescription}>{plan.description}</Text>
                <View style={styles.pricingPriceContainer}>
                  <Text style={styles.pricingPrice}>{plan.price}</Text>
                  {plan.period && (
                    <Text style={styles.pricingPeriod}>{plan.period}</Text>
                  )}
                </View>
              </View>

              <View style={styles.pricingFeatures}>
                {plan.features.map((feature, j) => (
                  <View key={j} style={styles.pricingFeature}>
                    <CheckIcon size={16} color={COLORS.accent} />
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
                    <Text style={styles.pricingButtonTextWhite}>{plan.cta}</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.pricingButtonSecondary}>
                    <Text style={styles.pricingButtonTextDark}>{plan.cta}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </Animated.View>
          ))}

          {/* Pricing Note */}
          <Animated.View entering={FadeInUp.duration(600).delay(700)}>
            <Text style={styles.pricingNote}>
              All plans include a 14-day free trial. No credit card required.{' '}
              <Text style={styles.pricingNoteLink}>View detailed comparison</Text>
            </Text>
          </Animated.View>
        </View>

        {/* Final CTA Section */}
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
                <ArrowRightIcon size={22} color={COLORS.white} />
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>

        {/* Footer - Updated with Social Links and Better Structure */}
        <LinearGradient
          colors={[COLORS.textDark, COLORS.neutral900]}
          style={styles.footer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Brand Section */}
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

          {/* Social Icons */}
          <View style={styles.socialIcons}>
            {[GlobeAltIcon, UserGroupIcon, EnvelopeIcon].map((Icon, i) => (
              <TouchableOpacity key={i} style={styles.socialIcon} activeOpacity={0.7}>
                <Icon size={20} color={COLORS.white} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer Links - Updated to 4 sections like web */}
          <View style={styles.footerLinks}>
            {[
              { title: 'Product', items: ['Features', 'Pricing', 'Integrations', 'API'] },
              { title: 'Company', items: ['About', 'Blog', 'Careers', 'Press'] },
              { title: 'Resources', items: ['Documentation', 'Help Center', 'Community', 'Contact'] },
              { title: 'Legal', items: ['Privacy', 'Terms', 'Security', 'Cookies'] },
            ].map((section, i) => (
              <View key={i} style={styles.footerSection}>
                <Text style={styles.footerSectionTitle}>{section.title}</Text>
                {section.items.map((item, j) => (
                  <TouchableOpacity key={j} activeOpacity={0.7}>
                    <Text style={styles.footerLink}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>

          {/* Footer Bottom */}
          <View style={styles.footerDivider} />
          <View style={styles.footerBottom}>
            <Text style={styles.footerCopyright}>© 2025 ShopLynk. All rights reserved.</Text>
            <Text style={styles.footerPowered}>Powered by ShopLynk</Text>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },

  // Header/Navbar
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: COLORS.white + 'E6',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border + '99',
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
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: { elevation: 6 },
    }),
  },
  logoIconText: { fontSize: 18 },
  logoText: { fontSize: 20, fontFamily: 'Inter_800ExtraBold', color: COLORS.textDark },
  navButtons: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  signInButton: { paddingHorizontal: 12, paddingVertical: 8 },
  signInText: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: COLORS.textLight },
  getStartedButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: { elevation: 6 },
    }),
  },
  getStartedText: { fontSize: 14, fontFamily: 'Inter_700Bold', color: COLORS.white },

  // Hero Section
  hero: { paddingHorizontal: 20, paddingTop: 48, paddingBottom: 64, alignItems: 'center' },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary200,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 28,
  },
  badgeDot: { width: 8, height: 8, borderRadius: 4, marginRight: 10 },
  badgeText: { fontSize: 11, fontFamily: 'Inter_800ExtraBold', letterSpacing: 0.5 },
  heroTitleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTitleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  heroTitle: {
    fontSize: 40,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.textDark,
    textAlign: 'center',
    lineHeight: 48,
  },
  gradientTextWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroAccent: {
    color: COLORS.primary,
  },
  heroSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    paddingHorizontal: 8,
  },

  // CTA Buttons
  ctaContainer: { width: '100%', gap: 14, marginBottom: 28 },
  ctaPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 14,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.45,
        shadowRadius: 18,
      },
      android: { elevation: 12 },
    }),
  },
  ctaPrimaryText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: COLORS.white,
    marginRight: 8,
  },
  ctaIcon: { fontSize: 20, color: COLORS.white, fontFamily: 'Inter_700Bold' },
  ctaSecondary: {
    paddingVertical: 18,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  ctaSecondaryText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
    textAlign: 'center',
  },

  // Trust Badges
  trustBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 44,
  },
  trustBadge: { flexDirection: 'row', alignItems: 'center' },
  trustCheck: {
    marginRight: 6,
  },
  trustText: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: COLORS.textLight, marginLeft: 6 },

  // Test Portal Button (Temporary)
  testPortalButton: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.accent,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 14,
      },
      android: { elevation: 8 },
    }),
  },
  testPortalButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: COLORS.white,
    letterSpacing: 0.5,
  },

  // Mockup/Dashboard Preview
  mockupContainer: { width: width - 40 },
  mockup: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 0.2,
        shadowRadius: 28,
      },
      android: { elevation: 12 },
    }),
  },
  mockupContent: {
    height: 240,
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    position: 'relative',
  },
  mockupCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  mockupIconBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.primary100,
  },
  mockupIcon: { fontSize: 30 },
  mockupText: { fontSize: 15, fontFamily: 'Inter_700Bold', color: COLORS.textLight },

  // Floating Icons
  floatingIconTopLeft: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  floatingIconBottomRight: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  floatingIconContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: { elevation: 6 },
    }),
  },
  floatingIconText: { fontSize: 20 },

  // Stats Section
  stats: {
    paddingVertical: 52,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  statCard: { flex: 1, alignItems: 'center', paddingVertical: 12 },
  statValueGradient: { marginBottom: 8, borderRadius: 8 },
  statValue: {
    fontSize: 32,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.white,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 4,
  },

  // Features Section
  features: { paddingHorizontal: 20, paddingVertical: 56, backgroundColor: COLORS.white },
  sectionLabel: {
    fontSize: 10,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 1.5,
  },
  sectionTitle: {
    fontSize: 32,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 40,
  },
  sectionSubtitle: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 36,
    lineHeight: 22,
    paddingHorizontal: 4,
  },

  featureCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 26,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 18,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 18,
      },
      android: { elevation: 5 },
    }),
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  featureIconText: { fontSize: 30 },
  featureTitle: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  featureDesc: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
    lineHeight: 21,
  },

  // Testimonials Section
  testimonials: { paddingHorizontal: 20, paddingVertical: 56 },
  testimonialCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 28,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 18,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 18,
      },
      android: { elevation: 6 },
    }),
  },
  testimonialRating: { flexDirection: 'row', marginBottom: 16, gap: 4 },
  testimonialText: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textDark,
    lineHeight: 24,
    marginBottom: 18,
  },
  testimonialDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 16,
  },
  testimonialHeader: { flexDirection: 'row', alignItems: 'center' },
  testimonialAvatar: { fontSize: 40, marginRight: 14 },
  testimonialName: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
    marginBottom: 3,
  },
  testimonialRole: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
    marginBottom: 3,
  },
  testimonialCompany: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    color: COLORS.primary
  },

  // Pricing Section - NEW
  pricing: {
    paddingHorizontal: 20,
    paddingVertical: 56,
    backgroundColor: COLORS.white
  },
  pricingCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 28,
    borderWidth: 2,
    borderColor: COLORS.border,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 18,
      },
      android: { elevation: 5 },
    }),
  },
  pricingCardPopular: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.25,
        shadowRadius: 24,
      },
      android: { elevation: 10 },
    }),
  },
  popularBadgeContainer: {
    position: 'absolute',
    top: -14,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  popularBadge: {
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
      android: { elevation: 6 },
    }),
  },
  popularBadgeText: {
    fontSize: 11,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.white,
    letterSpacing: 1,
  },
  pricingHeader: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  pricingName: {
    fontSize: 22,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  pricingDescription: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 16,
  },
  pricingPriceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  pricingPrice: {
    fontSize: 48,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.textDark,
  },
  pricingPeriod: {
    fontSize: 17,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
    marginBottom: 8,
    marginLeft: 4,
  },
  pricingFeatures: {
    marginBottom: 24,
  },
  pricingFeature: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  pricingFeatureCheck: {
    marginRight: 10,
    marginTop: 2,
  },
  pricingFeatureText: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
    flex: 1,
  },
  pricingButton: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 14,
      },
      android: { elevation: 8 },
    }),
  },
  pricingButtonSecondary: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  pricingButtonTextWhite: {
    fontSize: 16,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.white,
  },
  pricingButtonTextDark: {
    fontSize: 16,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.textDark,
  },
  pricingNote: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 20,
  },
  pricingNoteLink: {
    fontSize: 13,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.primary,
  },

  // Final CTA Section
  cta: {
    marginHorizontal: 20,
    marginBottom: 60,
    borderRadius: 26,
    padding: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary + '4D',
  },
  ctaTitle: {
    fontSize: 42,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: 18,
    lineHeight: 50,
  },
  ctaSubtitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 28,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 36,
    paddingVertical: 20,
    borderRadius: 14,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.4,
        shadowRadius: 18,
      },
      android: { elevation: 12 },
    }),
  },
  ctaButtonText: {
    fontSize: 18,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.white,
    marginRight: 8,
  },
  ctaButtonIcon: { fontSize: 22, color: COLORS.white, fontFamily: 'Inter_800ExtraBold' },

  // Footer - Reduced size
  footer: { paddingVertical: 40, paddingHorizontal: 20 },
  footerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
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
        shadowOpacity: 0.35,
        shadowRadius: 8,
      },
      android: { elevation: 6 },
    }),
  },
  footerLogoIcon: { fontSize: 18 },
  footerBrandText: { fontSize: 20, fontFamily: 'Inter_800ExtraBold', color: COLORS.white },
  footerDesc: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: COLORS.gray400,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
  },

  // Social Icons - NEW
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 24,
  },
  socialIcon: {
    width: 38,
    height: 38,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Footer Links - Reduced spacing
  footerLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 16,
  },
  footerSection: {
    width: '47%',
    alignItems: 'center',
  },
  footerSectionTitle: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    color: COLORS.white,
    marginBottom: 8,
  },
  footerLink: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: COLORS.gray400,
    marginBottom: 5,
    textAlign: 'center',
  },

  // Footer Bottom
  footerDivider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 16,
  },
  footerBottom: {
    alignItems: 'center',
    gap: 6,
  },
  footerCopyright: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: COLORS.gray400,
  },
  footerPowered: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: COLORS.gray500
  },
});

export default HomeScreen;
