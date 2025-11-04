import { motion } from 'framer-motion';
import {
  SparklesIcon,
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
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Home = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                <ShoppingBagIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-textDark">ShopLynk</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-medium text-textLight hover:text-primary transition-colors">Features</a>
              <a href="#testimonials" className="text-sm font-medium text-textLight hover:text-primary transition-colors">Testimonials</a>
              <a href="#pricing" className="text-sm font-medium text-textLight hover:text-primary transition-colors">Pricing</a>
              <button className="text-sm font-medium text-textLight hover:text-textDark transition-colors">Sign In</button>
              <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-600 transition-all">
                Get Started
              </button>
            </div>

            <button className="md:hidden px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold">
              Start Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center">
            {/* Badge */}
            <motion.div variants={fadeIn} className="inline-flex items-center space-x-2 bg-primary-50 border border-primary-200 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-primary-700">Trusted by 50,000+ merchants worldwide</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeIn} className="text-6xl sm:text-7xl lg:text-8xl font-bold text-textDark leading-[1.05] mb-6">
              Your WhatsApp.
              <br />
              Their <span className="text-primary">storefront</span>.
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={fadeIn} className="text-xl sm:text-2xl text-textLight max-w-3xl mx-auto mb-10 leading-relaxed">
              Complete commerce platform for WhatsApp. Launch stores, process orders, scale revenue—without building websites.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button className="group px-8 py-4 bg-primary text-white rounded-xl text-lg font-semibold hover:bg-primary-600 transition-all flex items-center space-x-2 shadow-lg shadow-primary/20">
                <span>Start Free Trial</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white text-textDark border-2 border-border rounded-xl text-lg font-semibold hover:border-textDark transition-all">
                View Demo
              </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div variants={fadeIn} className="flex flex-wrap items-center justify-center gap-6 text-sm text-textLight mb-16">
              {['14-day free trial', 'No credit card', 'Cancel anytime', '5-min setup'].map((item, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <CheckIcon className="w-4 h-4 text-accent" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>

            {/* Dashboard Preview */}
            <motion.div variants={fadeIn} className="relative max-w-5xl mx-auto">
              <div className="relative bg-white rounded-3xl shadow-2xl border border-border p-2 sm:p-3">
                <div className="aspect-video bg-surface rounded-2xl border border-border flex items-center justify-center relative overflow-hidden">
                  <div className="relative text-center z-10">
                    <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary-100">
                      <ShoppingBagIcon className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-textLight font-semibold text-lg">Dashboard Preview</p>
                  </div>
                  {/* Floating Cards */}
                  <div className="absolute top-6 left-6 bg-white rounded-xl shadow-xl p-3 border border-border animate-float">
                    <CheckIcon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="absolute bottom-6 right-6 bg-white rounded-xl shadow-xl p-3 border border-border animate-float" style={{ animationDelay: '1s' }}>
                    <ChartBarSquareIcon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
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
                className="text-center"
              >
                <div className="text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-textLight font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-28 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-20">
            <motion.span variants={fadeIn} className="inline-block text-xs font-bold text-primary uppercase tracking-widest mb-4">
              FEATURES
            </motion.span>
            <motion.h2 variants={fadeIn} className="text-5xl sm:text-6xl font-bold text-textDark mb-6">
              Everything you need
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-textLight max-w-2xl mx-auto">
              Built for entrepreneurs, small businesses, and growing brands.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: ChatBubbleLeftIcon, title: 'AI-Powered Listings', desc: 'Create catalogs automatically from WhatsApp conversations.' },
              { icon: BoltIcon, title: 'Instant Notifications', desc: 'Real-time order updates delivered directly to WhatsApp.' },
              { icon: CreditCardIcon, title: 'Unified Payments', desc: 'Accept all major payment methods with secure processing.' },
              { icon: ChartBarSquareIcon, title: 'Advanced Analytics', desc: 'Deep insights into sales trends and customer behavior.' },
              { icon: ShieldCheckIcon, title: 'Bank-Grade Security', desc: 'Enterprise-level encryption protects your business data.' },
              { icon: ClockIcon, title: 'Automation First', desc: 'Save hours daily with intelligent automation tools.' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="group bg-white p-8 rounded-2xl border border-border hover:border-primary-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-textDark mb-3">{feature.title}</h3>
                <p className="text-textLight leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-28 px-6 lg:px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-20">
            <motion.span variants={fadeIn} className="inline-block text-xs font-bold text-primary uppercase tracking-widest mb-4">
              TESTIMONIALS
            </motion.span>
            <motion.h2 variants={fadeIn} className="text-5xl sm:text-6xl font-bold text-textDark mb-6">
              Loved by merchants
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Chen', role: 'Fashion Boutique Owner', text: 'ShopLynk transformed my business. From manual tracking to fully automated in days.', avatar: '👩‍💼' },
              { name: 'Michael Rodriguez', role: 'Electronics Retailer', text: 'The analytics paid for itself. I finally understand my customers completely.', avatar: '👨‍💻' },
              { name: 'Priya Patel', role: 'Artisan Marketplace', text: 'Setup took 10 minutes. Now I process 10x more orders with less effort.', avatar: '👩‍🎨' },
            ].map((testimonial, i) => (
              <motion.div key={i} variants={fadeIn} className="bg-white p-8 rounded-2xl border border-border">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-bold text-textDark">{testimonial.name}</div>
                    <div className="text-sm text-textLight">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-textLight leading-relaxed">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeIn} className="text-5xl sm:text-6xl font-bold text-textDark mb-6">
              Ready to scale?
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-textLight mb-12 max-w-2xl mx-auto">
              Join thousands of merchants growing their business on WhatsApp.
            </motion.p>
            <motion.button
              variants={fadeIn}
              className="group px-10 py-4 bg-primary text-white rounded-xl text-lg font-semibold hover:bg-primary-600 transition-all flex items-center space-x-2 mx-auto shadow-lg shadow-primary/20"
            >
              <span>Start Free Trial</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-textDark text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2.5 mb-6">
                <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                  <ShoppingBagIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ShopLynk</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-xs">
                The complete commerce platform for WhatsApp. Empowering businesses worldwide.
              </p>
              <div className="flex items-center space-x-3">
                {[GlobeAltIcon, UserGroupIcon, EnvelopeIcon].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Integrations', 'API'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
              { title: 'Resources', links: ['Documentation', 'Help Center', 'Community', 'Contact'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies'] },
            ].map((section, i) => (
              <div key={i}>
                <h3 className="font-bold text-white mb-4">{section.title}</h3>
                <ul className="space-y-3 text-sm">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2025 ShopLynk. All rights reserved.</p>
            <p className="mt-4 md:mt-0">Powered by ShopLynk</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
