import { useState } from 'react';
import {
  QuestionMarkCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EnvelopeIcon,
  PhoneIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export default function Help() {
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

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Your message has been sent! We will get back to you shortly.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
        <p className="mt-1 text-sm text-gray-600">
          Find answers to common questions and get support
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <a
          href="#faq"
          className="flex items-center space-x-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#3B5BDB] hover:shadow-md"
        >
          <div className="rounded-lg bg-blue-100 p-3">
            <QuestionMarkCircleIcon className="h-6 w-6 text-[#3B5BDB]" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">FAQs</p>
            <p className="text-sm text-gray-600">Common questions</p>
          </div>
        </a>

        <a
          href="#contact"
          className="flex items-center space-x-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#00C896] hover:shadow-md"
        >
          <div className="rounded-lg bg-green-100 p-3">
            <EnvelopeIcon className="h-6 w-6 text-[#00C896]" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Contact Support</p>
            <p className="text-sm text-gray-600">Get in touch</p>
          </div>
        </a>

        <a
          href="https://docs.shoplynk.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#3B5BDB] hover:shadow-md"
        >
          <div className="rounded-lg bg-purple-100 p-3">
            <BookOpenIcon className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Documentation</p>
            <p className="text-sm text-gray-600">Full guides</p>
          </div>
        </a>

        <a
          href="https://wa.me/2348012345678"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#00C896] hover:shadow-md"
        >
          <div className="rounded-lg bg-green-100 p-3">
            <ChatBubbleLeftRightIcon className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">WhatsApp</p>
            <p className="text-sm text-gray-600">Live chat</p>
          </div>
        </a>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
          <p className="mt-1 text-sm text-gray-600">
            Find quick answers to the most common questions
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="rounded-lg border border-gray-200">
              <button
                onClick={() => toggleFaq(faq.id)}
                className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                {expandedFaq === faq.id ? (
                  <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {expandedFaq === faq.id && (
                <div className="border-t border-gray-200 bg-gray-50 p-4">
                  <p className="text-sm text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support Form */}
      <div id="contact" className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Contact Support</h2>
          <p className="mt-1 text-sm text-gray-600">
            Can't find what you're looking for? Send us a message
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#3B5BDB] focus:outline-none focus:ring-2 focus:ring-[#3B5BDB]"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#3B5BDB] focus:outline-none focus:ring-2 focus:ring-[#3B5BDB]"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={6}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#3B5BDB] focus:outline-none focus:ring-2 focus:ring-[#3B5BDB]"
              placeholder="Describe your issue or question..."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-[#3B5BDB] to-[#00C896] px-8 py-3 font-medium text-white shadow-lg transition-transform hover:scale-105"
            >
              <EnvelopeIcon className="h-5 w-5" />
              <span>Send Message</span>
            </button>
          </div>
        </form>
      </div>

      {/* Contact Information */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center space-x-3">
            <div className="rounded-lg bg-blue-100 p-3">
              <EnvelopeIcon className="h-6 w-6 text-[#3B5BDB]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Email Support</h3>
              <p className="text-sm text-gray-600">We'll respond within 24 hours</p>
            </div>
          </div>
          <a
            href="mailto:support@shoplynk.com"
            className="text-sm font-medium text-[#3B5BDB] hover:text-[#00C896]"
          >
            support@shoplynk.com
          </a>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center space-x-3">
            <div className="rounded-lg bg-green-100 p-3">
              <PhoneIcon className="h-6 w-6 text-[#00C896]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Phone Support</h3>
              <p className="text-sm text-gray-600">Mon-Fri 9am-5pm WAT</p>
            </div>
          </div>
          <a
            href="tel:+2348012345678"
            className="text-sm font-medium text-[#00C896] hover:text-[#3B5BDB]"
          >
            +234 801 234 5678
          </a>
        </div>
      </div>
    </div>
  );
}
