import { useState } from 'react';
import {
  BuildingStorefrontIcon,
  UserIcon,
  CogIcon,
  KeyIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

type SettingsTab = 'business' | 'profile' | 'preferences' | 'api' | 'security' | 'danger';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('business');
  const [showApiKey, setShowApiKey] = useState(false);

  const tabs = [
    { id: 'business' as SettingsTab, label: 'Business Info', icon: BuildingStorefrontIcon },
    { id: 'profile' as SettingsTab, label: 'Profile', icon: UserIcon },
    { id: 'preferences' as SettingsTab, label: 'Store Preferences', icon: CogIcon },
    { id: 'api' as SettingsTab, label: 'API & Integrations', icon: KeyIcon },
    { id: 'security' as SettingsTab, label: 'Security', icon: ShieldCheckIcon },
    { id: 'danger' as SettingsTab, label: 'Danger Zone', icon: ExclamationTriangleIcon },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your store settings and preferences
        </p>
      </div>

      {/* Settings Container */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Tabs Sidebar */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-[#3B5BDB] to-[#00C896] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    } ${tab.id === 'danger' && activeTab !== tab.id ? 'text-red-600' : ''}`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            {/* Business Info Tab */}
            {activeTab === 'business' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Business Information</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Update your store's business details
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Business Name
                    </label>
                    <input
                      type="text"
                      defaultValue="My Awesome Store"
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#3B5BDB] focus:outline-none focus:ring-2 focus:ring-[#3B5BDB]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Business Address
                    </label>
                    <input
                      type="text"
                      defaultValue="123 Main Street, Lagos, Nigeria"
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#3B5BDB] focus:outline-none focus:ring-2 focus:ring-[#3B5BDB]"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        defaultValue="contact@mystore.com"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#3B5BDB] focus:outline-none focus:ring-2 focus:ring-[#3B5BDB]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        defaultValue="+234 801 234 5678"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#3B5BDB] focus:outline-none focus:ring-2 focus:ring-[#3B5BDB]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Business Description
                    </label>
                    <textarea
                      rows={4}
                      defaultValue="We sell quality products at affordable prices."
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#3B5BDB] focus:outline-none focus:ring-2 focus:ring-[#3B5BDB]"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="rounded-lg bg-gradient-to-r from-[#3B5BDB] to-[#00C896] px-8 py-3 font-medium text-white shadow-lg transition-transform hover:scale-105">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Profile Settings</h3>
                  <p className="mt-1 text-sm text-gray-600">Manage your personal information</p>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">First Name</label>
                      <input
                        type="text"
                        defaultValue="John"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#3B5BDB] focus:outline-none focus:ring-2 focus:ring-[#3B5BDB]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Last Name</label>
                      <input
                        type="text"
                        defaultValue="Doe"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#3B5BDB] focus:outline-none focus:ring-2 focus:ring-[#3B5BDB]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                      type="email"
                      defaultValue="john@example.com"
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#3B5BDB] focus:outline-none focus:ring-2 focus:ring-[#3B5BDB]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      defaultValue="+234 801 234 5678"
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#3B5BDB] focus:outline-none focus:ring-2 focus:ring-[#3B5BDB]"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="rounded-lg bg-gradient-to-r from-[#3B5BDB] to-[#00C896] px-8 py-3 font-medium text-white shadow-lg transition-transform hover:scale-105">
                    Update Profile
                  </button>
                </div>
              </div>
            )}

            {/* Store Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Store Preferences</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Configure your store's operational settings
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Currency</label>
                    <select className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#3B5BDB] focus:outline-none focus:ring-2 focus:ring-[#3B5BDB]">
                      <option>Nigerian Naira (₦)</option>
                      <option>US Dollar ($)</option>
                      <option>British Pound (£)</option>
                      <option>Euro (€)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Time Zone</label>
                    <select className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#3B5BDB] focus:outline-none focus:ring-2 focus:ring-[#3B5BDB]">
                      <option>West Africa Time (WAT)</option>
                      <option>Greenwich Mean Time (GMT)</option>
                      <option>Eastern Time (ET)</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-medium text-gray-700">
                      Delivery Options
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 rounded border-gray-300 text-[#3B5BDB] focus:ring-[#3B5BDB]"
                        />
                        <span className="text-sm text-gray-700">Home Delivery</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 rounded border-gray-300 text-[#3B5BDB] focus:ring-[#3B5BDB]"
                        />
                        <span className="text-sm text-gray-700">Store Pickup</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-[#3B5BDB] focus:ring-[#3B5BDB]"
                        />
                        <span className="text-sm text-gray-700">Express Delivery</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-medium text-gray-700">
                      Notifications
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 rounded border-gray-300 text-[#3B5BDB] focus:ring-[#3B5BDB]"
                        />
                        <span className="text-sm text-gray-700">Email notifications for new orders</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 rounded border-gray-300 text-[#3B5BDB] focus:ring-[#3B5BDB]"
                        />
                        <span className="text-sm text-gray-700">WhatsApp notifications</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="rounded-lg bg-gradient-to-r from-[#3B5BDB] to-[#00C896] px-8 py-3 font-medium text-white shadow-lg transition-transform hover:scale-105">
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* API & Integrations Tab */}
            {activeTab === 'api' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">API & Integrations</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Manage your API keys and third-party integrations
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">API Key</label>
                    <div className="mt-1 flex space-x-2">
                      <input
                        type={showApiKey ? 'text' : 'password'}
                        value={import.meta.env.VITE_STRIPE_SECRET_KEY || 'Not configured'}
                        readOnly
                        className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 font-mono text-sm"
                      />
                      <button
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        {showApiKey ? 'Hide' : 'Show'}
                      </button>
                      <button className="rounded-lg bg-[#3B5BDB] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                        Copy
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Webhook Secret</label>
                    <div className="mt-1 flex space-x-2">
                      <input
                        type="password"
                        value={import.meta.env.VITE_STRIPE_WEBHOOK_SECRET || 'Not configured'}
                        readOnly
                        className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 font-mono text-sm"
                      />
                      <button className="rounded-lg bg-[#3B5BDB] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                        Copy
                      </button>
                    </div>
                  </div>

                  <div className="rounded-lg bg-yellow-50 p-4">
                    <p className="text-sm font-medium text-yellow-900">Important Security Notice</p>
                    <p className="mt-1 text-sm text-yellow-700">
                      Keep your API keys secret. Don't share them in public repositories or client-side code.
                    </p>
                  </div>

                  <button className="rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-700 hover:bg-gray-50">
                    Regenerate API Key
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Manage your account security and authentication
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="mb-3 font-medium text-gray-900">Change Password</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#3B5BDB] focus:outline-none focus:ring-2 focus:ring-[#3B5BDB]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#3B5BDB] focus:outline-none focus:ring-2 focus:ring-[#3B5BDB]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#3B5BDB] focus:outline-none focus:ring-2 focus:ring-[#3B5BDB]"
                        />
                      </div>
                      <button className="rounded-lg bg-gradient-to-r from-[#3B5BDB] to-[#00C896] px-6 py-2 font-medium text-white hover:opacity-90">
                        Update Password
                      </button>
                    </div>
                  </div>

                  <hr className="border-gray-200" />

                  <div>
                    <h4 className="mb-3 font-medium text-gray-900">Two-Factor Authentication</h4>
                    <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                      <div>
                        <p className="font-medium text-gray-900">Enable 2FA</p>
                        <p className="text-sm text-gray-600">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" className="peer sr-only" />
                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-gradient-to-r peer-checked:from-[#3B5BDB] peer-checked:to-[#00C896] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Danger Zone Tab */}
            {activeTab === 'danger' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-red-600">Danger Zone</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Irreversible and destructive actions
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg border-2 border-red-300 bg-red-50 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-red-900">Delete Store</h4>
                        <p className="mt-1 text-sm text-red-700">
                          Permanently delete your store and all associated data. This action cannot
                          be undone.
                        </p>
                      </div>
                      <button className="ml-4 rounded-lg border-2 border-red-600 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white">
                        Delete Store
                      </button>
                    </div>
                  </div>

                  <div className="rounded-lg border-2 border-red-300 bg-red-50 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-red-900">Delete Account</h4>
                        <p className="mt-1 text-sm text-red-700">
                          Permanently delete your account, all stores, and data. This action cannot
                          be undone.
                        </p>
                      </div>
                      <button className="ml-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
