import { motion } from 'framer-motion';
import {
  ShoppingBagIcon,
  BoltIcon,
  CreditCardIcon,
  ArrowRightIcon,
  CheckIcon,
  ChatBubbleLeftIcon,
  ChartBarSquareIcon,
  ShieldCheckIcon,
  ClockIcon,
  GlobeAltIcon,
  UserGroupIcon,
  EnvelopeIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Home = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <ShoppingBagIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-textDark">ShopLynk</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-sm font-medium text-textLight hover:text-primary transition-colors"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="text-sm font-medium text-textLight hover:text-primary transition-colors"
              >
                Reviews
              </a>
              <a
                href="#pricing"
                className="text-sm font-medium text-textLight hover:text-primary transition-colors"
              >
                Pricing
              </a>
              <Link
                to="/signin"
                className="text-sm font-medium text-textLight hover:text-textDark transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2.5 bg-gradient-to-r from-primary to-primary-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                Get Started
              </Link>
            </div>

            <Link
              to="/signup"
              className="md:hidden px-4 py-2 bg-gradient-to-r from-primary to-primary-600 text-white rounded-xl text-sm font-semibold"
            >
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/30 via-white to-white pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center">
            {/* Badge */}
            <motion.div
              variants={fadeIn}
              className="inline-flex items-center space-x-2.5 bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-200 rounded-full px-4 sm:px-5 py-2.5 mb-8 sm:mb-10 hover:scale-105 transition-transform cursor-default"
            >
              <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Trusted by 50,000+ merchants worldwide
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeIn}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-textDark leading-[1.15] mb-6 sm:mb-8 px-4"
            >
              Your WhatsApp.
              <br />
              Their{' '}
              <span className="bg-gradient-to-r from-primary via-primary-600 to-accent bg-clip-text text-transparent">
                storefront
              </span>
              .
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeIn}
              className="text-lg sm:text-xl lg:text-2xl text-textLight max-w-3xl mx-auto mb-10 sm:mb-12 leading-relaxed px-4"
            >
              Complete commerce platform for WhatsApp. Launch stores, process orders, scale
              revenue—without building websites.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 sm:mb-14 px-4"
            >
              <Link
                to="/signup"
                className="w-full sm:w-auto group px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-primary to-primary-600 text-white rounded-xl text-base sm:text-lg font-bold hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Start Free Trial</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <button className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white text-textDark border-2 border-border rounded-xl text-base sm:text-lg font-bold hover:border-primary hover:text-primary hover:bg-primary-50/30 hover:scale-105 transition-all duration-300">
                View Demo
              </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={fadeIn}
              className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm sm:text-base text-textLight mb-16 sm:mb-20 px-4"
            >
              {['14-day free trial', 'No credit card', 'Cancel anytime', '5-min setup'].map(
                (item, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-2 hover:text-primary transition-colors"
                  >
                    <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                    <span className="font-medium">{item}</span>
                  </div>
                )
              )}
            </motion.div>

            {/* Dashboard Preview */}
            <motion.div variants={fadeIn} className="relative max-w-5xl mx-auto px-4">
              <div className="relative bg-gradient-to-br from-white to-surface rounded-2xl sm:rounded-3xl shadow-2xl border border-border p-2 sm:p-3">
                <div className="aspect-video bg-gradient-to-br from-surface via-white to-surface rounded-xl sm:rounded-2xl border border-border flex items-center justify-center relative overflow-hidden">
                  <div className="relative text-center z-10">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-primary-100">
                      <ShoppingBagIcon className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                    </div>
                    <p className="text-sm sm:text-lg text-textLight font-semibold">
                      Dashboard Preview
                    </p>
                  </div>
                  <div className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-white rounded-lg sm:rounded-xl shadow-xl p-2 sm:p-3 border border-border animate-float">
                    <CheckIcon className="w-4 h-4 sm:w-6 sm:h-6 text-accent" />
                  </div>
                  <div
                    className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 bg-white rounded-lg sm:rounded-xl shadow-xl p-2 sm:p-3 border border-border animate-float"
                    style={{ animationDelay: '1s' }}
                  >
                    <ChartBarSquareIcon className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-surface to-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16">
            {[
              { value: '50K+', label: 'Active Merchants' },
              { value: '5M+', label: 'Orders Processed' },
              { value: '$2B+', label: 'Revenue Generated' },
              { value: '150+', label: 'Countries' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center group cursor-default"
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-textLight font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <motion.span
              variants={fadeIn}
              className="inline-block text-xs font-bold text-primary uppercase tracking-widest mb-4"
            >
              FEATURES
            </motion.span>
            <motion.h2
              variants={fadeIn}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-textDark mb-4 sm:mb-6"
            >
              Everything you need
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-base sm:text-lg lg:text-xl text-textLight max-w-2xl mx-auto"
            >
              Built for entrepreneurs, small businesses, and growing brands.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {[
              {
                icon: ChatBubbleLeftIcon,
                title: 'AI-Powered Listings',
                desc: 'Create catalogs automatically from WhatsApp conversations.',
              },
              {
                icon: BoltIcon,
                title: 'Instant Notifications',
                desc: 'Real-time order updates delivered directly to WhatsApp.',
              },
              {
                icon: CreditCardIcon,
                title: 'Unified Payments',
                desc: 'Accept all major payment methods with secure processing.',
              },
              {
                icon: ChartBarSquareIcon,
                title: 'Advanced Analytics',
                desc: 'Deep insights into sales trends and customer behavior.',
              },
              {
                icon: ShieldCheckIcon,
                title: 'Bank-Grade Security',
                desc: 'Enterprise-level encryption protects your business data.',
              },
              {
                icon: ClockIcon,
                title: 'Automation First',
                desc: 'Save hours daily with intelligent automation tools.',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="group bg-white p-8 sm:p-10 rounded-2xl border border-border hover:border-primary-300 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl flex items-center justify-center mb-6 sm:mb-7 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary group-hover:text-primary-600 transition-colors" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-textDark mb-3 sm:mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-base sm:text-lg text-textLight leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-surface via-white to-surface"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <motion.span
              variants={fadeIn}
              className="inline-block text-xs font-bold text-primary uppercase tracking-widest mb-4"
            >
              REVIEWS
            </motion.span>
            <motion.h2
              variants={fadeIn}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-textDark mb-4 sm:mb-6"
            >
              Loved by merchants
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-base sm:text-lg text-textLight max-w-2xl mx-auto"
            >
              See what our customers have to say about their experience.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
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
              <motion.div
                key={i}
                variants={fadeIn}
                className="bg-white p-8 sm:p-10 rounded-2xl border border-border hover:border-primary-300 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center space-x-1.5 mb-6 sm:mb-8">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <StarIcon
                      key={index}
                      className="w-5 h-5 sm:w-6 sm:h-6 fill-accent text-accent"
                    />
                  ))}
                </div>
                <p className="text-base sm:text-lg text-textDark leading-relaxed mb-6 sm:mb-8 font-medium">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center space-x-4 sm:space-x-5 pt-6 border-t border-border">
                  <div className="text-4xl sm:text-5xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-bold text-base sm:text-lg text-textDark mb-1">
                      {testimonial.name}
                    </div>
                    <div className="text-sm sm:text-base text-textLight mb-1">
                      {testimonial.role}
                    </div>
                    <div className="text-sm text-primary font-bold">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <motion.span
              variants={fadeIn}
              className="inline-block text-xs font-bold text-primary uppercase tracking-widest mb-4"
            >
              PRICING
            </motion.span>
            <motion.h2
              variants={fadeIn}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-textDark mb-4 sm:mb-6"
            >
              Simple, transparent pricing
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-base sm:text-lg text-textLight max-w-2xl mx-auto"
            >
              Choose the perfect plan for your business. All plans include a 14-day free trial.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
          >
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
              <motion.div
                key={i}
                variants={fadeIn}
                className={`relative bg-white p-8 sm:p-10 rounded-2xl border-2 ${
                  plan.popular
                    ? 'border-primary shadow-2xl scale-105'
                    : 'border-border hover:border-primary-300'
                } hover:shadow-2xl transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary to-accent text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-textDark mb-2">{plan.name}</h3>
                  <p className="text-sm text-textLight mb-6">{plan.description}</p>
                  <div className="flex items-end justify-center mb-2">
                    <span className="text-5xl font-extrabold text-textDark">{plan.price}</span>
                    {plan.period && (
                      <span className="text-lg text-textLight ml-2 mb-2">{plan.period}</span>
                    )}
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start space-x-3">
                      <CheckIcon className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-textLight">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className={`w-full block text-center px-6 py-4 rounded-xl font-bold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-primary to-primary-600 text-white hover:shadow-xl hover:shadow-primary/50 hover:scale-105'
                      : 'border-2 border-border text-textDark hover:border-primary hover:bg-primary-50'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Pricing Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12 sm:mt-16"
          >
            <p className="text-sm sm:text-base text-textLight">
              All plans include a 14-day free trial. No credit card required.{' '}
              <a href="#" className="text-primary font-bold hover:underline">
                View detailed comparison
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-accent-50 to-white opacity-50 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeIn}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-textDark mb-6 sm:mb-8"
            >
              Ready to scale?
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-lg sm:text-xl lg:text-2xl text-textLight mb-10 sm:mb-14 max-w-2xl mx-auto leading-relaxed"
            >
              Join thousands of merchants growing their business on WhatsApp.
            </motion.p>
            <motion.div variants={fadeIn}>
              <Link
                to="/signup"
                className="group px-10 sm:px-12 py-5 sm:py-6 bg-gradient-to-r from-primary to-primary-600 text-white rounded-xl text-lg sm:text-xl font-bold hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 transition-all duration-300 flex items-center space-x-3 mx-auto"
              >
                <span>Start Free Trial</span>
                <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-textDark to-neutral-900 text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-12 mb-12 sm:mb-16">
            {/* Brand */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2">
              <div className="flex items-center space-x-2.5 mb-4 sm:mb-6">
                <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                  <ShoppingBagIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold">ShopLynk</span>
              </div>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-4 sm:mb-6 max-w-xs">
                The complete commerce platform for WhatsApp. Empowering businesses worldwide.
              </p>
              <div className="flex items-center space-x-3">
                {[GlobeAltIcon, UserGroupIcon, EnvelopeIcon].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Integrations', 'API'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
              {
                title: 'Resources',
                links: ['Documentation', 'Help Center', 'Community', 'Contact'],
              },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies'] },
            ].map((section, i) => (
              <div key={i}>
                <h3 className="font-bold text-sm sm:text-base text-white mb-3 sm:mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-400 gap-4">
            <p>© 2025 ShopLynk. All rights reserved.</p>
            <p>Powered by ShopLynk</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
