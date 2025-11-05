import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import { ShoppingBagIcon, UsersIcon, ChartBarIcon } from '../components/Icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLORS = {
  primary: '#3B5BDB',
  primary600: '#3046C5',
  accent: '#00C896',
  surface: '#F9FAFB',
  textDark: '#1A1A1A',
  textLight: '#6B7280',
  border: '#E5E7EB',
  white: '#FFFFFF',
};

interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  icon: 'shopping' | 'users' | 'chart';
}

const slides: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Connect with Buyers',
    description: 'Build your network and connect with verified buyers looking for products just like yours. Expand your reach beyond traditional markets.',
    icon: 'users',
  },
  {
    id: '2',
    title: 'Compare Prices Instantly',
    description: 'Get real-time market insights and compare prices across vendors. Make informed decisions and stay competitive in the marketplace.',
    icon: 'chart',
  },
  {
    id: '3',
    title: 'Manage Your Store',
    description: 'Powerful tools to manage inventory, track orders, and grow your business. Everything you need in one seamless platform.',
    icon: 'shopping',
  },
];

const OnboardingScreen = ({ navigation }: any) => {
  // All hooks must be called at the top level
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const onViewableItemsChangedRef = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });
  const viewabilityConfigRef = useRef({
    itemVisiblePercentThreshold: 50,
  });

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      await AsyncStorage.setItem('onboardingVersion', '1');
      navigation.replace('Portal');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
      navigation.replace('Portal');
    }
  };

  const renderIcon = (iconType: string, index: number) => {
    const iconProps = {
      size: 80,
      color: COLORS.primary,
    };

    const icons: Record<string, JSX.Element> = {
      users: <UsersIcon {...iconProps} />,
      chart: <ChartBarIcon {...iconProps} />,
      shopping: <ShoppingBagIcon {...iconProps} />,
    };

    return (
      <Animated.View
        entering={FadeInDown.duration(600).delay(200 * index)}
        style={styles.iconContainer}
      >
        {icons[iconType]}
      </Animated.View>
    );
  };

  const renderSlide = ({ item, index }: { item: OnboardingSlide; index: number }) => (
    <View style={styles.slide}>
      <Animated.View
        entering={FadeInDown.duration(600).delay(100)}
        style={styles.content}
      >
        {renderIcon(item.icon, index)}

        <Animated.Text
          entering={FadeInDown.duration(600).delay(200)}
          style={styles.title}
        >
          {item.title}
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.duration(600).delay(300)}
          style={styles.description}
        >
          {item.description}
        </Animated.Text>
      </Animated.View>
    </View>
  );

  const renderPagination = () => (
    <Animated.View
      entering={FadeInUp.duration(600).delay(400)}
      style={styles.paginationContainer}
    >
      {slides.map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            index === currentIndex && styles.paginationDotActive,
          ]}
        />
      ))}
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <LinearGradient
        colors={['#F5F7FF', '#FFFFFF', '#F0FDF9']}
        style={styles.gradient}
      >
        {/* Skip Button */}
        {currentIndex < slides.length - 1 && (
          <Animated.View
            entering={FadeInDown.duration(600)}
            style={styles.skipContainer}
          >
            <TouchableOpacity
              onPress={handleSkip}
              style={styles.skipButton}
              activeOpacity={0.7}
            >
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Slides */}
        <FlatList
          ref={flatListRef}
          data={slides}
          renderItem={renderSlide}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChangedRef.current}
          viewabilityConfig={viewabilityConfigRef.current}
          bounces={false}
        />

        {/* Bottom Section */}
        <Animated.View
          entering={FadeInUp.duration(600).delay(500)}
          style={styles.bottomContainer}
        >
          {renderPagination()}

          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.9}
            style={styles.buttonContainer}
          >
            <LinearGradient
              colors={[COLORS.primary, COLORS.primary600]}
              style={styles.button}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.buttonText}>
                {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  gradient: {
    flex: 1,
  },
  skipContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  skipButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  skipText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: COLORS.textLight,
  },
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  content: {
    alignItems: 'center',
    maxWidth: 400,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(59, 91, 219, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 32,
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  description: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomContainer: {
    paddingHorizontal: 32,
    paddingBottom: 32,
    gap: 32,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
  },
  paginationDotActive: {
    width: 24,
    backgroundColor: COLORS.primary,
  },
  buttonContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  button: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    color: COLORS.white,
    letterSpacing: 0.5,
  },
});

export default OnboardingScreen;
