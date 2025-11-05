import { useState } from 'react';
import {
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  LinkIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

export default function WhatsApp() {
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

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">WhatsApp Integration</h1>
        <p className="mt-1 text-sm text-gray-600">
          Connect your WhatsApp Business account and configure automated responses
        </p>
      </div>

      {/* Connection Status */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className={`rounded-full p-3 ${
                isConnected ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              <ChatBubbleLeftRightIcon
                className={`h-8 w-8 ${
                  isConnected ? 'text-green-600' : 'text-red-600'
                }`}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Connection Status</h3>
              <div className="mt-1 flex items-center space-x-2">
                {isConnected ? (
                  <>
                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-600">Connected</span>
                    <span className="text-sm text-gray-500">+234 801 234 5678</span>
                  </>
                ) : (
                  <>
                    <XCircleIcon className="h-5 w-5 text-red-600" />
                    <span className="text-sm font-medium text-red-600">Not Connected</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsConnected(!isConnected)}
            className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-[#3B5BDB] to-[#00C896] px-6 py-3 text-white shadow-lg transition-transform hover:scale-105"
          >
            <LinkIcon className="h-5 w-5" />
            <span className="font-medium">
              {isConnected ? 'Disconnect' : 'Connect WhatsApp Account'}
            </span>
          </button>
        </div>
      </div>

      {/* Auto-Response Configuration */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center space-x-3">
          <DocumentTextIcon className="h-6 w-6 text-[#3B5BDB]" />
          <h3 className="text-lg font-semibold text-gray-900">Auto-Response Messages</h3>
        </div>

        <div className="space-y-6">
          {/* Welcome Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Welcome Message
            </label>
            <p className="mt-1 text-xs text-gray-500">
              Sent automatically when a customer first contacts you
            </p>
            <textarea
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
              rows={3}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#3B5BDB] focus:outline-none focus:ring-2 focus:ring-[#3B5BDB]"
              placeholder="Enter welcome message..."
            />
          </div>

          {/* Out of Stock Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Out of Stock Message
            </label>
            <p className="mt-1 text-xs text-gray-500">
              Sent when a customer inquires about an out-of-stock product
            </p>
            <textarea
              value={outOfStockMessage}
              onChange={(e) => setOutOfStockMessage(e.target.value)}
              rows={3}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#3B5BDB] focus:outline-none focus:ring-2 focus:ring-[#3B5BDB]"
              placeholder="Enter out of stock message..."
            />
          </div>

          {/* Order Confirmation Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Order Confirmation Message
            </label>
            <p className="mt-1 text-xs text-gray-500">
              Sent when a customer completes an order. Use {'{order_id}'} and {'{amount}'} for
              dynamic values
            </p>
            <textarea
              value={orderConfirmationMessage}
              onChange={(e) => setOrderConfirmationMessage(e.target.value)}
              rows={3}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#3B5BDB] focus:outline-none focus:ring-2 focus:ring-[#3B5BDB]"
              placeholder="Enter order confirmation message..."
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="rounded-lg bg-gradient-to-r from-[#3B5BDB] to-[#00C896] px-8 py-3 font-medium text-white shadow-lg transition-transform hover:scale-105">
            Save Auto-Response Messages
          </button>
        </div>
      </div>

      {/* Webhook Settings */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Webhook Settings</h3>
          <p className="mt-1 text-sm text-gray-600">
            Configure webhooks to receive real-time updates from WhatsApp
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Webhook URL</label>
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#3B5BDB] focus:outline-none focus:ring-2 focus:ring-[#3B5BDB]"
              placeholder="https://yourwebsite.com/webhook"
            />
          </div>

          <div className="rounded-lg bg-blue-50 p-4">
            <p className="text-sm font-medium text-gray-900">Webhook Events</p>
            <div className="mt-3 space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 text-[#3B5BDB] focus:ring-[#3B5BDB]"
                />
                <span className="text-sm text-gray-700">Message Received</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 text-[#3B5BDB] focus:ring-[#3B5BDB]"
                />
                <span className="text-sm text-gray-700">Message Sent</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 text-[#3B5BDB] focus:ring-[#3B5BDB]"
                />
                <span className="text-sm text-gray-700">Order Placed</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="rounded-lg bg-gradient-to-r from-[#3B5BDB] to-[#00C896] px-8 py-3 font-medium text-white shadow-lg transition-transform hover:scale-105">
            Save Webhook Settings
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Messages Today</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">127</p>
          <p className="mt-2 text-sm text-green-600">+15% from yesterday</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Response Rate</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">94%</p>
          <p className="mt-2 text-sm text-green-600">Above average</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">2.5m</p>
          <p className="mt-2 text-sm text-gray-600">Last 24 hours</p>
        </div>
      </div>
    </div>
  );
}
