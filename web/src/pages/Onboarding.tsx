import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingBagIcon,
  UsersIcon,
  ChartBarIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';

interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Connect with Buyers',
    description:
      'Build your network and connect with verified buyers looking for products just like yours. Expand your reach beyond traditional markets.',
    icon: UsersIcon,
  },
  {
    id: 2,
    title: 'Compare Prices Instantly',
    description:
      'Get real-time market insights and compare prices across vendors. Make informed decisions and stay competitive in the marketplace.',
    icon: ChartBarIcon,
  },
  {
    id: 3,
    title: 'Manage Your Store',
    description:
      'Powerful tools to manage inventory, track orders, and grow your business. Everything you need in one seamless platform.',
    icon: ShoppingBagIcon,
  },
];

const Onboarding: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem('shoplynk_hasSeenOnboarding', 'true');
    localStorage.setItem('shoplynk_onboardingVersion', '1');
    navigate('/portal/dashboard');
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const currentSlide = slides[currentIndex];
  const IconComponent = currentSlide.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50/40 via-white to-accent-50/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary-300 to-primary-100 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-accent-300 to-accent-100 rounded-full blur-3xl"
      />

      <div className="relative min-h-screen flex flex-col">
        {/* Header with Skip Button */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="flex justify-between items-center p-6 sm:p-8"
        >
          <div className="text-2xl font-extrabold">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ShopLynk
            </span>
          </div>
          {currentIndex < slides.length - 1 && (
            <button
              onClick={handleSkip}
              className="px-4 py-2 text-textLight hover:text-textDark font-semibold transition-colors"
            >
              Skip
            </button>
          )}
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-2xl">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-12"
              >
                {/* Icon */}
                <div className="flex justify-center mb-8">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-primary-50 flex items-center justify-center">
                    <IconComponent className="w-14 h-14 sm:w-16 sm:h-16 text-primary" />
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-textDark text-center mb-6">
                  {currentSlide.title}
                </h1>

                {/* Description */}
                <p className="text-base sm:text-lg text-textLight text-center leading-relaxed max-w-xl mx-auto">
                  {currentSlide.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Navigation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="p-6 sm:p-8 space-y-6"
        >
          {/* Progress Indicator */}
          <div className="flex justify-center items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-border hover:bg-primary/30'
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 max-w-2xl mx-auto">
            {currentIndex > 0 && (
              <button
                onClick={handlePrev}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white/80 border-2 border-border rounded-xl text-textDark font-semibold hover:border-primary/30 hover:bg-primary-50/30 transition-all"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Back</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary to-primary-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all"
            >
              <span>
                {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
              </span>
              {currentIndex < slides.length - 1 && (
                <ArrowRightIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Step Counter */}
          <div className="text-center text-sm text-textLight font-medium">
            {currentIndex + 1} of {slides.length}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Onboarding;
