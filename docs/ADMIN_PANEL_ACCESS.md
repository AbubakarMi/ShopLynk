# ShopLynk Admin Panel - Quick Access Guide

## 🔗 Direct Access Links

### Web Application

#### Development Server
Assuming your web server is running on `http://localhost:5173` (Vite default):

**Admin Panel Dashboard:**
```
http://localhost:5173/admin/dashboard
```

**All Admin Routes:**
- Dashboard: `http://localhost:5173/admin/dashboard`
- Business Owners: `http://localhost:5173/admin/owners`
- Stores: `http://localhost:5173/admin/stores`
- Orders: `http://localhost:5173/admin/orders`
- Payments: `http://localhost:5173/admin/payments`
- Integrations: `http://localhost:5173/admin/integrations`
- Reports: `http://localhost:5173/admin/reports`
- Settings: `http://localhost:5173/admin/settings`

**Sign In Page (with Admin Access):**
```
http://localhost:5173/signin
```
- Click "🔐 Access Admin Panel →" button at the bottom
- Or submit the sign-in form (redirects to admin)

**Portal Dashboard (with Admin Access):**
```
http://localhost:5173/portal/dashboard
```
- Click "🔐 Admin Panel" button at the top

---

### Mobile Application (Expo)

#### Using Expo Go

1. **Start the Metro bundler:**
   ```bash
   cd mobile
   npx expo start
   ```

2. **Scan QR code** with Expo Go app on your device

3. **Navigate to Admin Panel:**
   - From **Sign-In Screen**: Tap "Access Admin Panel →"
   - From **Portal Dashboard**: Tap "🔐 Admin Panel" button

#### Direct Navigation in Code

**From Sign-In:**
```typescript
navigation.navigate('Admin');
```

**From Portal Dashboard:**
```typescript
navigation.navigate('Admin');
```

---

## 📱 Testing the Admin Panel

### Web Testing Steps

1. **Start the development server:**
   ```bash
   cd web
   npm run dev
   ```

2. **Open your browser:**
   ```
   http://localhost:5173
   ```

3. **Navigate to Sign-In:**
   ```
   http://localhost:5173/signin
   ```

4. **Access Admin Panel** (3 ways):
   - Click "🔐 Access Admin Panel →" at bottom of sign-in page
   - Fill form and click "Sign In" (auto-redirects to admin)
   - Or go directly to: `http://localhost:5173/admin/dashboard`

5. **Test All Screens:**
   - Use sidebar navigation (desktop) or hamburger menu (mobile)
   - Navigate through all 8 admin screens
   - Test search, filters, and CRUD operations

---

### Mobile Testing Steps

1. **Start Expo:**
   ```bash
   cd mobile
   npx expo start
   ```

2. **Run on device/simulator:**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Or scan QR code with Expo Go

3. **From Sign-In Screen:**
   - Tap "Access Admin Panel →" button at the bottom

4. **Or from Portal Dashboard:**
   - Sign in first (or tap skip)
   - Tap "🔐 Admin Panel" button at the top

5. **Test All Screens:**
   - Use bottom tab navigation
   - Navigate through all 8 admin screens
   - Test search, filters, modals, and actions

---

## 🎯 Quick Test Checklist

### Dashboard
- [ ] View all 4 stat cards (Revenue, Orders, Stores, Owners)
- [ ] Check trend indicators (arrows)
- [ ] Click quick action buttons
- [ ] View recent orders list
- [ ] View top stores ranking

### Business Owners
- [ ] Search for owners by name/email
- [ ] Filter by status (All/Active/Suspended)
- [ ] Click owner card to view details
- [ ] Toggle owner status (Suspend/Activate)
- [ ] Test delete owner (with confirmation)

### Stores
- [ ] Search stores
- [ ] View store ratings (stars)
- [ ] Check products/orders counts
- [ ] Toggle store status

### Orders
- [ ] View orders list
- [ ] Check status badges colors
- [ ] Verify statistics (total revenue, completed count)

### Payments
- [ ] View payment list
- [ ] Check payment methods (Credit Card/PayPal/Bank Transfer)
- [ ] View transaction IDs
- [ ] Verify statistics

### Integrations
- [ ] Toggle integrations on/off
- [ ] Check connected stores count
- [ ] View last sync times
- [ ] Test all 5 integrations

### Reports
- [ ] Switch between periods (Weekly/Monthly/Yearly)
- [ ] View metrics with trends
- [ ] Check top products ranking
- [ ] Check top categories with percentage bars

### Settings
- [ ] Modify general settings (platform name, email, etc.)
- [ ] Toggle payment providers
- [ ] Adjust commission rate and minimum payout
- [ ] Toggle notification preferences
- [ ] Adjust security settings
- [ ] Click Save button

---

## 🔍 Troubleshooting

### Web Issues

**Port Conflict:**
If port 5173 is in use, Vite will use the next available port. Check terminal output.

**Module Not Found:**
```bash
cd web
npm install
```

**TypeScript Errors:**
Check that all admin files are created in correct locations.

**Navigation Not Working:**
Verify `App.tsx` has all admin routes added.

---

### Mobile Issues

**Metro Bundle Error:**
```bash
cd mobile
rm -rf node_modules
npm install
npx expo start -c
```

**Navigation Error:**
Verify `App.tsx` has `AdminTabNavigator` imported and added to Stack.

**Icons Not Showing:**
Verify all icons are exported from `mobile/src/components/Icons.tsx`.

**Fonts Not Loading:**
Wait for fonts to load before rendering screens.

---

## 📊 Mock Data Available

### Business Owners
- 5 owners (4 active, 1 suspended)
- Names, emails, stores, countries
- Order counts and revenue

### Stores
- 5 stores (4 active, 1 suspended)
- Categories, ratings, products
- Order counts and revenue

### Orders
- 7 orders with various statuses
- Customers, stores, amounts
- Items count and dates

### Payments
- 6 payments with various statuses
- Payment methods and transaction IDs
- Associated orders and stores

### Integrations
- 5 integrations (4 active, 1 inactive)
- Stripe, PayPal, Mailchimp, Shopify, Google Analytics
- Last sync times

### Reports
- Metrics for weekly/monthly/yearly periods
- Top 5 products with sales and revenue
- Top 4 categories with percentages

### Settings
- General: Platform name, support email, currency, timezone
- Payments: Provider toggles, commission rate, minimum payout
- Notifications: Email, SMS, push toggles
- Security: 2FA, session timeout, password length

---

## 🎨 Design Consistency

Both platforms use identical:
- **Primary Color:** #3B5BDB
- **Accent Color:** #00C896
- **Font Family:** Inter (mobile) / System (web)
- **Status Colors:**
  - Success/Completed: Green (#10B981)
  - Warning/Pending: Yellow (#F59E0B)
  - Error/Failed: Red (#EF4444)
  - Info/Processing: Blue (#3B82F6)
  - Special/Shipped: Purple (#8B5CF6)

---

## 📝 Notes

- **Authentication:** Currently bypassed for testing. Sign-in redirects directly to admin.
- **Data Persistence:** Mock data resets on page/app reload.
- **Real-time Updates:** Not implemented. Refresh to see changes.
- **Backend Integration:** Replace `adminService` calls with real API endpoints.

---

## ✅ Success Indicators

You'll know the admin panel is working correctly when:

1. ✅ All 8 screens load without errors
2. ✅ Navigation works smoothly between screens
3. ✅ Search and filters function properly
4. ✅ Status toggles update UI immediately
5. ✅ Modals open and close correctly
6. ✅ Statistics display accurate mock data
7. ✅ Loading states appear during data fetches
8. ✅ Responsive design works on all screen sizes (web)
9. ✅ Bottom tabs work on mobile
10. ✅ "Back to Portal" link works (web sidebar)

---

## 🚀 Ready to Use!

The admin panel is **fully functional** and ready for testing. Just start your development servers and use the links above to access all features.

**Quick Start Commands:**

**Web:**
```bash
cd web
npm run dev
# Open http://localhost:5173/admin/dashboard
```

**Mobile:**
```bash
cd mobile
npx expo start
# Scan QR code or press i/a for simulator
```

Enjoy testing the ShopLynk Admin Panel! 🎉
