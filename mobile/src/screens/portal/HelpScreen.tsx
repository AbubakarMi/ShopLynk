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
  Linking,
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
  QuestionMarkCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EnvelopeIcon,
  PhoneIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
} from '../../components/Icons';

const COLORS = {
  primary: '#3B5BDB',
  accent: '#00C896',
  white: '#FFFFFF',
  surface: '#F9FAFB',
  textDark: '#1A1A1A',
  textLight: '#6B7280',
  border: '#E5E7EB',
};

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const HelpScreen = ({ navigation }: any) => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const faqs: FAQ[] = [
    {
      id: 1,
      question: 'How do I add products to my store?',
      answer:
        'Navigate to the Products page and click the "Add Product" button. Fill in the product details including name, price, stock, category, description, and upload images. Click "Add Product" to save.',
    },
    {
      id: 2,
      question: 'How do I connect my WhatsApp Business account?',
      answer:
        'Go to the WhatsApp Integration page and click "Connect WhatsApp Account". Follow the authentication process to link your WhatsApp Business account. Once connected, you can configure auto-responses and webhooks.',
    },
    {
      id: 3,
      question: 'How do I process orders and mark them as delivered?',
      answer:
        'On the Orders page, click the eye icon to view order details. If the order is pending, you can click "Mark as Delivered" to complete the order. Customers will receive a notification via WhatsApp if configured.',
    },
    {
      id: 4,
      question: 'How do I set up payment gateways?',
      answer:
        'Navigate to the Payments page and scroll to "Payment Gateway Settings". Click "Connect" next to Paystack or Flutterwave, and follow the authentication process. Enter your API keys when prompted.',
    },
    {
      id: 5,
      question: 'Can I export my invoices?',
      answer:
        'Yes! Go to the Invoices page and click the download icon next to any invoice to export it as a PDF. You can also use the date range filter to find specific invoices.',
    },
    {
      id: 6,
      question: 'How do I customize auto-response messages?',
      answer:
        'Visit the WhatsApp Integration page and scroll to "Auto-Response Messages". Edit the welcome message, out of stock message, and order confirmation message. Use placeholders like {order_id} and {amount} for dynamic content.',
    },
    {
      id: 7,
      question: 'How can I track my store analytics?',
      answer:
        'The Analytics page provides comprehensive insights including daily/weekly/monthly sales charts, top-selling products, conversion rates, and customer metrics. Use the time range selector to view different periods.',
    },
    {
      id: 8,
      question: 'What security features are available?',
      answer:
        'ShopLynk offers two-factor authentication (2FA), secure API key management, and encrypted data storage. You can enable 2FA in Settings under the Security tab.',
    },
  ];

  if (!fontsLoaded) return null;

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleSubmit = () => {
    if (!name || !email || !message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    Alert.alert('Success', 'Your message has been sent! We will get back to you shortly.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Page header */}
        <View style={styles.pageHeader}>
          <Text style={styles.headerTitle}>Help Center</Text>
          <Text style={styles.headerSubtitle}>
            Find answers to common questions and get support
          </Text>
        </View>

        {/* Quick Links */}
        <Animated.View entering={FadeInDown.duration(400).delay(100)}>
          <View style={styles.quickLinksGrid}>
            <TouchableOpacity activeOpacity={0.7} style={styles.quickLinkCard}>
              <View style={[styles.quickLinkIcon, { backgroundColor: '#DBEAFE' }]}>
                <QuestionMarkCircleIcon size={24} color={COLORS.primary} />
              </View>
              <View>
                <Text style={styles.quickLinkTitle}>FAQs</Text>
                <Text style={styles.quickLinkSubtitle}>Common questions</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} style={styles.quickLinkCard}>
              <View style={[styles.quickLinkIcon, { backgroundColor: '#D1FAE5' }]}>
                <EnvelopeIcon size={24} color={COLORS.accent} />
              </View>
              <View>
                <Text style={styles.quickLinkTitle}>Contact Support</Text>
                <Text style={styles.quickLinkSubtitle}>Get in touch</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.quickLinkCard}
              onPress={() => Linking.openURL('https://docs.shoplynk.com')}
            >
              <View style={[styles.quickLinkIcon, { backgroundColor: '#E9D5FF' }]}>
                <BookOpenIcon size={24} color="#9333EA" />
              </View>
              <View>
                <Text style={styles.quickLinkTitle}>Documentation</Text>
                <Text style={styles.quickLinkSubtitle}>Full guides</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.quickLinkCard}
              onPress={() => Linking.openURL('https://wa.me/2348012345678')}
            >
              <View style={[styles.quickLinkIcon, { backgroundColor: '#D1FAE5' }]}>
                <ChatBubbleLeftRightIcon size={24} color="#16A34A" />
              </View>
              <View>
                <Text style={styles.quickLinkTitle}>WhatsApp</Text>
                <Text style={styles.quickLinkSubtitle}>Live chat</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* FAQ Section */}
        <Animated.View entering={FadeInDown.duration(400).delay(200)}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            <Text style={styles.sectionSubtitle}>
              Find quick answers to the most common questions
            </Text>
          </View>

          <View style={styles.faqContainer}>
            {faqs.map((faq) => (
              <View key={faq.id} style={styles.faqItem}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => toggleFaq(faq.id)}
                  style={styles.faqHeader}
                >
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  {expandedFaq === faq.id ? (
                    <ChevronUpIcon size={20} color={COLORS.textLight} />
                  ) : (
                    <ChevronDownIcon size={20} color={COLORS.textLight} />
                  )}
                </TouchableOpacity>
                {expandedFaq === faq.id && (
                  <View style={styles.faqAnswerContainer}>
                    <Text style={styles.faqAnswer}>{faq.answer}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Contact Support Form */}
        <Animated.View entering={FadeInDown.duration(400).delay(300)}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Contact Support</Text>
            <Text style={styles.sectionSubtitle}>
              Can't find what you're looking for? Send us a message
            </Text>
          </View>

          <View style={styles.formCard}>
            <View style={styles.formRow}>
              <View style={styles.formColumn}>
                <Text style={styles.formLabel}>Your Name</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="John Doe"
                  placeholderTextColor={COLORS.textLight}
                  value={name}
                  onChangeText={setName}
                />
              </View>
              <View style={styles.formColumn}>
                <Text style={styles.formLabel}>Email Address</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="john@example.com"
                  placeholderTextColor={COLORS.textLight}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Message</Text>
              <TextInput
                style={[styles.formInput, styles.textArea]}
                placeholder="Describe your issue or question..."
                placeholderTextColor={COLORS.textLight}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                value={message}
                onChangeText={setMessage}
              />
            </View>

            <TouchableOpacity activeOpacity={0.7} onPress={handleSubmit}>
              <LinearGradient
                colors={[COLORS.primary, COLORS.accent]}
                style={styles.submitButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <EnvelopeIcon size={18} color={COLORS.white} />
                <Text style={styles.submitButtonText}>Send Message</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Contact Information */}
        <Animated.View entering={FadeInDown.duration(400).delay(400)}>
          <View style={styles.contactInfoGrid}>
            <View style={styles.contactInfoCard}>
              <View style={styles.contactInfoHeader}>
                <View style={[styles.contactIcon, { backgroundColor: '#DBEAFE' }]}>
                  <EnvelopeIcon size={20} color={COLORS.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.contactInfoTitle}>Email Support</Text>
                  <Text style={styles.contactInfoSubtitle}>We'll respond within 24 hours</Text>
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => Linking.openURL('mailto:support@shoplynk.com')}
              >
                <Text style={styles.contactInfoLink}>support@shoplynk.com</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.contactInfoCard}>
              <View style={styles.contactInfoHeader}>
                <View style={[styles.contactIcon, { backgroundColor: '#D1FAE5' }]}>
                  <PhoneIcon size={20} color={COLORS.accent} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.contactInfoTitle}>Phone Support</Text>
                  <Text style={styles.contactInfoSubtitle}>Mon-Fri 9am-5pm WAT</Text>
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => Linking.openURL('tel:+2348012345678')}
              >
                <Text style={styles.contactInfoLink}>+234 801 234 5678</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  quickLinksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  quickLinkCard: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: { elevation: 2 },
    }),
  },
  quickLinkIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickLinkTitle: {
    fontSize: 13,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
  },
  quickLinkSubtitle: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
  },
  faqContainer: {
    marginHorizontal: 24,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: { elevation: 2 },
    }),
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textDark,
    marginRight: 12,
  },
  faqAnswerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  faqAnswer: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
    lineHeight: 20,
  },
  formCard: {
    marginHorizontal: 24,
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: { elevation: 2 },
    }),
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  formColumn: {
    flex: 1,
  },
  formGroup: {
    marginBottom: 16,
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
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
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
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.white,
  },
  contactInfoGrid: {
    gap: 16,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  contactInfoCard: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: { elevation: 2 },
    }),
  },
  contactInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactInfoTitle: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
    marginBottom: 2,
  },
  contactInfoSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
  },
  contactInfoLink: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.primary,
  },
});

export default HelpScreen;
