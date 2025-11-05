import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function WhatsAppScreen() {
  const [isConnected, setIsConnected] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState(
    'Welcome to our store! How can we help you today?'
  );
  const [outOfStockMessage, setOutOfStockMessage] = useState(
    'Sorry, this product is currently out of stock. We will notify you when it becomes available.'
  );
  const [orderConfirmationMessage, setOrderConfirmationMessage] = useState(
    'Thank you for your order! Order ID: {order_id}. Total: {amount}. We will process it shortly.'
  );
  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookEvents, setWebhookEvents] = useState({
    messageReceived: true,
    messageSent: true,
    orderPlaced: true,
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Page header */}
        <View style={styles.header}>
          <Text style={styles.title}>WhatsApp Integration</Text>
          <Text style={styles.subtitle}>
            Connect your WhatsApp Business account and configure automated responses
          </Text>
        </View>

        {/* Connection Status */}
        <View style={styles.card}>
          <View style={styles.connectionHeader}>
            <View style={styles.connectionLeft}>
              <View
                style={[
                  styles.iconCircle,
                  isConnected ? styles.iconCircleConnected : styles.iconCircleDisconnected,
                ]}
              >
                <Ionicons
                  name="chatbubbles-outline"
                  size={32}
                  color={isConnected ? '#00C896' : '#EF4444'}
                />
              </View>
              <View>
                <Text style={styles.connectionTitle}>Connection Status</Text>
                <View style={styles.statusRow}>
                  {isConnected ? (
                    <>
                      <Ionicons name="checkmark-circle" size={20} color="#00C896" />
                      <Text style={styles.statusConnected}>Connected</Text>
                      <Text style={styles.phoneNumber}>+234 801 234 5678</Text>
                    </>
                  ) : (
                    <>
                      <Ionicons name="close-circle" size={20} color="#EF4444" />
                      <Text style={styles.statusDisconnected}>Not Connected</Text>
                    </>
                  )}
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsConnected(!isConnected)}
          >
            <LinearGradient
              colors={['#3B5BDB', '#00C896']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <Ionicons name="link-outline" size={20} color="#FFFFFF" />
              <Text style={styles.buttonText}>
                {isConnected ? 'Disconnect' : 'Connect WhatsApp Account'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Auto-Response Configuration */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Ionicons name="document-text-outline" size={24} color="#3B5BDB" />
            <Text style={styles.sectionTitle}>Auto-Response Messages</Text>
          </View>

          {/* Welcome Message */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Welcome Message</Text>
            <Text style={styles.helpText}>
              Sent automatically when a customer first contacts you
            </Text>
            <TextInput
              value={welcomeMessage}
              onChangeText={setWelcomeMessage}
              multiline
              numberOfLines={3}
              style={[styles.input, styles.textArea]}
              placeholder="Enter welcome message..."
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Out of Stock Message */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Out of Stock Message</Text>
            <Text style={styles.helpText}>
              Sent when a customer inquires about an out-of-stock product
            </Text>
            <TextInput
              value={outOfStockMessage}
              onChangeText={setOutOfStockMessage}
              multiline
              numberOfLines={3}
              style={[styles.input, styles.textArea]}
              placeholder="Enter out of stock message..."
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Order Confirmation Message */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Order Confirmation Message</Text>
            <Text style={styles.helpText}>
              Sent when a customer completes an order. Use {'{order_id}'} and {'{amount}'} for
              dynamic values
            </Text>
            <TextInput
              value={orderConfirmationMessage}
              onChangeText={setOrderConfirmationMessage}
              multiline
              numberOfLines={3}
              style={[styles.input, styles.textArea]}
              placeholder="Enter order confirmation message..."
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <TouchableOpacity activeOpacity={0.7}>
            <LinearGradient
              colors={['#3B5BDB', '#00C896']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.saveButton}
            >
              <Text style={styles.saveButtonText}>Save Auto-Response Messages</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Webhook Settings */}
        <View style={styles.card}>
          <View style={styles.webhookHeader}>
            <Text style={styles.sectionTitle}>Webhook Settings</Text>
            <Text style={styles.webhookSubtitle}>
              Configure webhooks to receive real-time updates from WhatsApp
            </Text>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Webhook URL</Text>
            <TextInput
              value={webhookUrl}
              onChangeText={setWebhookUrl}
              style={styles.input}
              placeholder="https://yourwebsite.com/webhook"
              placeholderTextColor="#9CA3AF"
              keyboardType="url"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.webhookEventsBox}>
            <Text style={styles.webhookEventsTitle}>Webhook Events</Text>
            <View style={styles.checkboxGroup}>
              <TouchableOpacity
                style={styles.checkboxRow}
                activeOpacity={0.7}
                onPress={() =>
                  setWebhookEvents({
                    ...webhookEvents,
                    messageReceived: !webhookEvents.messageReceived,
                  })
                }
              >
                <View
                  style={[
                    styles.checkbox,
                    webhookEvents.messageReceived && styles.checkboxChecked,
                  ]}
                >
                  {webhookEvents.messageReceived && (
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>Message Received</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkboxRow}
                activeOpacity={0.7}
                onPress={() =>
                  setWebhookEvents({
                    ...webhookEvents,
                    messageSent: !webhookEvents.messageSent,
                  })
                }
              >
                <View
                  style={[
                    styles.checkbox,
                    webhookEvents.messageSent && styles.checkboxChecked,
                  ]}
                >
                  {webhookEvents.messageSent && (
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>Message Sent</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkboxRow}
                activeOpacity={0.7}
                onPress={() =>
                  setWebhookEvents({
                    ...webhookEvents,
                    orderPlaced: !webhookEvents.orderPlaced,
                  })
                }
              >
                <View
                  style={[
                    styles.checkbox,
                    webhookEvents.orderPlaced && styles.checkboxChecked,
                  ]}
                >
                  {webhookEvents.orderPlaced && (
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>Order Placed</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity activeOpacity={0.7}>
            <LinearGradient
              colors={['#3B5BDB', '#00C896']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.saveButton}
            >
              <Text style={styles.saveButtonText}>Save Webhook Settings</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Messages Today</Text>
            <Text style={styles.statValue}>127</Text>
            <Text style={styles.statChange}>+15% from yesterday</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Response Rate</Text>
            <Text style={styles.statValue}>94%</Text>
            <Text style={styles.statChange}>Above average</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Avg Response Time</Text>
            <Text style={styles.statValue}>2.5m</Text>
            <Text style={styles.statInfo}>Last 24 hours</Text>
          </View>
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
  },
  card: {
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
  connectionHeader: {
    marginBottom: 16,
  },
  connectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  iconCircleConnected: {
    backgroundColor: '#D1FAE5',
  },
  iconCircleDisconnected: {
    backgroundColor: '#FEE2E2',
  },
  connectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#1A1A1A',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 8,
  },
  statusConnected: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#00C896',
  },
  statusDisconnected: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#EF4444',
  },
  phoneNumber: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#1A1A1A',
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#374151',
  },
  helpText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#1A1A1A',
    marginTop: 8,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
  },
  webhookHeader: {
    marginBottom: 24,
  },
  webhookSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
    marginTop: 4,
  },
  webhookEventsBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  webhookEventsTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#1A1A1A',
    marginBottom: 12,
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
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3B5BDB',
    borderColor: '#3B5BDB',
  },
  checkboxLabel: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#374151',
  },
  statsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 16,
  },
  statCard: {
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
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#6B7280',
  },
  statValue: {
    fontSize: 30,
    fontFamily: 'Inter_700Bold',
    color: '#1A1A1A',
    marginTop: 8,
  },
  statChange: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#00C896',
    marginTop: 8,
  },
  statInfo: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
    marginTop: 8,
  },
});
