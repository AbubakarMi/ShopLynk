import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useFonts,
  Inter_400Regular,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import { LinearGradient } from 'expo-linear-gradient';
import { ShoppingBagIcon } from '../components/Icons';
import GradientText from '../components/GradientText';

const COLORS = {
  primary: '#3B5BDB',
  primary600: '#3046C5',
  accent: '#00C896',
  white: '#FFFFFF',
  surface: '#F5F7FF',
  textDark: '#1A1A1A',
  textLight: '#6B7280',
};

const SplashScreen = ({ navigation }: any) => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_800ExtraBold,
  });

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const loadingAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (fontsLoaded) {
      // Logo fade in and scale animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();

      // Loading animation - continuous pulse
      Animated.loop(
        Animated.sequence([
          Animated.timing(loadingAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(loadingAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Navigate to SignIn after 2.5 seconds
      const timer = setTimeout(() => {
        navigation.replace('SignIn');
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [fontsLoaded, navigation]);

  if (!fontsLoaded) {
    return null;
  }

  const loadingOpacity = loadingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />

      <View style={styles.content}>
        {/* Logo and Brand */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={[COLORS.primary, COLORS.primary600]}
            style={styles.logoIcon}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <ShoppingBagIcon size={48} color={COLORS.white} />
          </LinearGradient>
          <GradientText
            colors={[COLORS.primary, COLORS.accent, COLORS.accent]}
            style={styles.logoText}
          >
            ShopLynk
          </GradientText>
        </Animated.View>

        {/* Tagline with Loading Animation */}
        <Animated.View
          style={[
            styles.taglineContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Animated.Text
            style={[
              styles.tagline,
              {
                opacity: loadingOpacity,
              },
            ]}
          >
            Your WhatsApp Store in Minutes.
          </Animated.Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  logoIcon: {
    width: 72,
    height: 72,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.5,
        shadowRadius: 24,
      },
      android: { elevation: 12 },
    }),
  },
  logoText: {
    fontSize: 42,
    fontFamily: 'Inter_800ExtraBold',
    letterSpacing: -1,
  },
  taglineContainer: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textLight,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});

export default SplashScreen;
