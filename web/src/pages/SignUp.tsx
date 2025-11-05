import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  ShoppingBagIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  BuildingStorefrontIcon,
  PhoneIcon,
  CheckCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
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
  const [currentStep, setCurrentStep] = useState(1);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Sign up:', formData);
    setIsLoading(false);
    // Navigate to onboarding after successful registration
    navigate('/onboarding');
  };

  const handleWhatsAppConnect = () => {
    console.log('Connect WhatsApp');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50/40 via-white to-accent-50/30 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-accent-300 to-accent-100 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-primary-200 to-accent-200 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative w-full max-w-2xl z-10"
      >
        {/* Logo */}
        <motion.div variants={fadeIn}>
          <Link to="/" className="flex items-center justify-center space-x-3 mb-8 group">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40 group-hover:scale-110 transition-transform duration-300">
              <ShoppingBagIcon className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ShopLynk
            </span>
          </Link>
        </motion.div>

        {/* Sign Up Card */}
        <motion.div
          variants={fadeIn}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              variants={fadeIn}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-accent-50 to-primary-50 px-4 py-2 rounded-full mb-4"
            >
              <SparklesIcon className="w-5 h-5 text-accent" />
              <span className="text-sm font-bold text-accent">14-Day Free Trial • No Credit Card</span>
            </motion.div>
            <motion.h1
              variants={fadeIn}
              className="text-4xl sm:text-5xl font-extrabold text-textDark mb-4"
            >
              Create Account
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg text-textLight">
              Launch your WhatsApp store in minutes
            </motion.p>
          </div>

          {/* Form */}
          <motion.form onSubmit={handleSubmit} variants={stagger} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <motion.div variants={fadeIn}>
                <label htmlFor="fullName" className="block text-sm font-bold text-textDark mb-2">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-textLight group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="block w-full pl-12 pr-4 py-3.5 border-2 border-border rounded-xl text-textDark placeholder-textLight focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white/50"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </motion.div>

              {/* Business Name */}
              <motion.div variants={fadeIn}>
                <label htmlFor="businessName" className="block text-sm font-bold text-textDark mb-2">
                  Business Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <BuildingStorefrontIcon className="h-5 w-5 text-textLight group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    type="text"
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="block w-full pl-12 pr-4 py-3.5 border-2 border-border rounded-xl text-textDark placeholder-textLight focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white/50"
                    placeholder="My Store"
                    required
                  />
                </div>
              </motion.div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {/* Email */}
              <motion.div variants={fadeIn}>
                <label htmlFor="email" className="block text-sm font-bold text-textDark mb-2">
                  Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-textLight group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="block w-full pl-12 pr-4 py-3.5 border-2 border-border rounded-xl text-textDark placeholder-textLight focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white/50"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </motion.div>

              {/* Phone Number */}
              <motion.div variants={fadeIn}>
                <label htmlFor="phone" className="block text-sm font-bold text-textDark mb-2">
                  Phone Number
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <PhoneIcon className="h-5 w-5 text-textLight group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="block w-full pl-12 pr-4 py-3.5 border-2 border-border rounded-xl text-textDark placeholder-textLight focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white/50"
                    placeholder="+1 (555) 000-0000"
                    required
                  />
                </div>
              </motion.div>
            </div>

            {/* Password */}
            <motion.div variants={fadeIn}>
              <label htmlFor="password" className="block text-sm font-bold text-textDark mb-2">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-textLight group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="block w-full pl-12 pr-12 py-3.5 border-2 border-border rounded-xl text-textDark placeholder-textLight focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white/50"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-textLight hover:text-primary transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-xs text-textLight">
                Must be at least 8 characters with uppercase, lowercase, and numbers
              </p>
            </motion.div>

            {/* Terms Checkbox */}
            <motion.div variants={fadeIn} className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                checked={formData.agreeToTerms}
                onChange={(e) =>
                  setFormData({ ...formData, agreeToTerms: e.target.checked })
                }
                className="w-5 h-5 mt-0.5 border-2 border-border rounded-md text-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                required
              />
              <label htmlFor="terms" className="text-sm text-textLight">
                I agree to the{' '}
                <a href="#" className="text-primary font-bold hover:text-primary-600 transition-colors">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary font-bold hover:text-primary-600 transition-colors">
                  Privacy Policy
                </a>
              </label>
            </motion.div>

            {/* Create Account Button */}
            <motion.button
              variants={fadeIn}
              type="submit"
              disabled={isLoading || !formData.agreeToTerms}
              className="w-full px-6 py-4 bg-gradient-to-r from-primary to-primary-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <SparklesIcon className="w-6 h-6" />
                  <span>Create Account</span>
                </>
              )}
            </motion.button>

            {/* Divider */}
            <motion.div variants={fadeIn} className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/80 text-textLight font-semibold">
                  Or sign up with
                </span>
              </div>
            </motion.div>

            {/* Social Signup Buttons */}
            <motion.div variants={fadeIn} className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center space-x-2 px-4 py-3 border-2 border-border rounded-xl hover:border-primary hover:bg-primary-50/50 transition-all duration-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="font-semibold text-textDark">Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center space-x-2 px-4 py-3 border-2 border-border rounded-xl hover:border-primary hover:bg-primary-50/50 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <span className="font-semibold text-textDark">Apple</span>
              </button>
            </motion.div>
          </motion.form>

          {/* Footer */}
          <motion.div variants={fadeIn} className="mt-8 text-center">
            <p className="text-base text-textLight">
              Already have an account?{' '}
              <Link
                to="/signin"
                className="font-bold text-primary hover:text-primary-600 transition-colors"
              >
                Sign In
              </Link>
            </p>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div variants={fadeIn} className="mt-6 flex items-center justify-center space-x-6 text-xs text-textLight">
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold">Free 14-Day Trial</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold">No Credit Card Required</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUp;
