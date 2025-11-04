import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
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

const COLORS = {
  primary: '#3B5BDB',
  primary600: '#3046C5',
  accent: '#00C896',
  accent50: '#ECFDF8',
  accent500: '#00C896',
  white: '#FFFFFF',
  surface: '#F9FAFB',
  textDark: '#1A1A1A',
  textLight: '#6B7280',
  border: '#E5E7EB',
  success: '#22C55E',
};

const SignUpScreen = ({ navigation }: any) => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    password: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!fontsLoaded) return null;

  const handleSignUp = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Sign up:', formData);
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7FF" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Logo */}
          <Animated.View entering={FadeInDown.duration(600)} style={styles.logoContainer}>
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

          {/* Card Container */}
          <Animated.View entering={FadeInUp.duration(600).delay(100)} style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
              <LinearGradient
                colors={[COLORS.accent50, '#EEF2FF']}
                style={styles.trialBadge}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.sparkleIcon}>✨</Text>
                <Text style={styles.trialText}>14-Day Free Trial • No Credit Card</Text>
              </LinearGradient>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Launch your WhatsApp store in minutes</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              {/* Row 1: Full Name & Business Name */}
              <View style={styles.row}>
                <View style={styles.halfInput}>
                  <Text style={styles.label}>Full Name</Text>
                  <View style={[styles.inputContainer, formData.fullName && styles.inputFocused]}>
                    <Text style={styles.icon}>👤</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="John Doe"
                      placeholderTextColor={COLORS.textLight}
                      value={formData.fullName}
                      onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                    />
                  </View>
                </View>

                <View style={styles.halfInput}>
                  <Text style={styles.label}>Business Name</Text>
                  <View style={[styles.inputContainer, formData.businessName && styles.inputFocused]}>
                    <Text style={styles.icon}>🏪</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="My Store"
                      placeholderTextColor={COLORS.textLight}
                      value={formData.businessName}
                      onChangeText={(text) => setFormData({ ...formData, businessName: text })}
                    />
                  </View>
                </View>
              </View>

              {/* Row 2: Email & Phone */}
              <View style={styles.row}>
                <View style={styles.halfInput}>
                  <Text style={styles.label}>Email</Text>
                  <View style={[styles.inputContainer, formData.email && styles.inputFocused]}>
                    <Text style={styles.icon}>✉️</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="john@example.com"
                      placeholderTextColor={COLORS.textLight}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={formData.email}
                      onChangeText={(text) => setFormData({ ...formData, email: text })}
                    />
                  </View>
                </View>

                <View style={styles.halfInput}>
                  <Text style={styles.label}>Phone Number</Text>
                  <View style={[styles.inputContainer, formData.phone && styles.inputFocused]}>
                    <Text style={styles.icon}>📞</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="+1 (555) 000-0000"
                      placeholderTextColor={COLORS.textLight}
                      keyboardType="phone-pad"
                      value={formData.phone}
                      onChangeText={(text) => setFormData({ ...formData, phone: text })}
                    />
                  </View>
                </View>
              </View>

              {/* Password */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={[styles.inputContainer, formData.password && styles.inputFocused]}>
                  <Text style={styles.icon}>🔒</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor={COLORS.textLight}
                    secureTextEntry={!showPassword}
                    value={formData.password}
                    onChangeText={(text) => setFormData({ ...formData, password: text })}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeButton}
                  >
                    <Text style={styles.eyeIcon}>{showPassword ? '👁' : '👁‍🗨'}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.passwordHint}>
                  Must be at least 8 characters with uppercase, lowercase, and numbers
                </Text>
              </View>

              {/* Terms Checkbox */}
              <TouchableOpacity
                style={styles.termsContainer}
                onPress={() => setFormData({ ...formData, agreeToTerms: !formData.agreeToTerms })}
                activeOpacity={0.7}
              >
                <View style={[styles.checkbox, formData.agreeToTerms && styles.checkboxChecked]}>
                  {formData.agreeToTerms && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.termsText}>
                  I agree to the{' '}
                  <Text style={styles.termsLink}>Terms of Service</Text>
                  {' '}and{' '}
                  <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
              </TouchableOpacity>

              {/* Create Account Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleSignUp}
                disabled={isLoading || !formData.agreeToTerms}
                style={[styles.submitButton, (isLoading || !formData.agreeToTerms) && styles.buttonDisabled]}
              >
                <LinearGradient
                  colors={[COLORS.primary, COLORS.primary600]}
                  style={styles.submitGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  {isLoading ? (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator color={COLORS.white} size="small" />
                      <Text style={styles.buttonText}>Creating Account...</Text>
                    </View>
                  ) : (
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonIcon}>✨</Text>
                      <Text style={styles.buttonText}>Create Account</Text>
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Or sign up with</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Buttons */}
              <View style={styles.socialContainer}>
                <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
                  <Text style={styles.googleIcon}>G</Text>
                  <Text style={styles.socialText}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
                  <Text style={styles.appleIcon}>🍎</Text>
                  <Text style={styles.socialText}>Apple</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Already have an account?{' '}
                <Text style={styles.footerLink} onPress={() => navigation.navigate('SignIn')}>
                  Sign In
                </Text>
              </Text>
            </View>

            {/* Trust Indicators */}
            <View style={styles.trustContainer}>
              <View style={styles.trustBadge}>
                <Text style={styles.trustIcon}>✓</Text>
                <Text style={styles.trustText}>Free 14-Day Trial</Text>
              </View>
              <View style={styles.trustBadge}>
                <Text style={styles.trustIcon}>✓</Text>
                <Text style={styles.trustText}>No Credit Card Required</Text>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FF',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 48,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  logoIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
      },
      android: { elevation: 10 },
    }),
  },
  logoIconText: {
    fontSize: 32,
  },
  logoText: {
    fontSize: 28,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.textDark,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 24,
    padding: 32,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.15,
        shadowRadius: 40,
      },
      android: { elevation: 8 },
    }),
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  trialBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  sparkleIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  trialText: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: COLORS.accent,
  },
  title: {
    fontSize: 40,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.textDark,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
    textAlign: 'center',
  },
  form: {
    marginBottom: 32,
  },
  row: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  halfInput: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 12,
    height: 56,
  },
  inputFocused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: { elevation: 2 },
    }),
  },
  icon: {
    fontSize: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textDark,
  },
  eyeButton: {
    padding: 4,
  },
  eyeIcon: {
    fontSize: 20,
  },
  passwordHint: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
    marginTop: 8,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 6,
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: 12,
    fontFamily: 'Inter_800ExtraBold',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
    lineHeight: 20,
  },
  termsLink: {
    color: COLORS.primary,
    fontFamily: 'Inter_700Bold',
  },
  submitButton: {
    marginBottom: 24,
  },
  submitGradient: {
    borderRadius: 12,
    paddingVertical: 16,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
      },
      android: { elevation: 8 },
    }),
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: COLORS.white,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: COLORS.white,
  },
  googleIcon: {
    fontSize: 20,
    fontFamily: 'Inter_800ExtraBold',
    marginRight: 8,
  },
  appleIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  socialText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textDark,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  footerText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
    textAlign: 'center',
  },
  footerLink: {
    color: COLORS.primary,
    fontFamily: 'Inter_700Bold',
  },
  trustContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trustIcon: {
    fontSize: 16,
    color: COLORS.success,
    marginRight: 4,
    fontFamily: 'Inter_800ExtraBold',
  },
  trustText: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textLight,
  },
});

export default SignUpScreen;
