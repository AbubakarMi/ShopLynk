# ShopLynk Admin Panel - Quick Start 🚀

## 🌐 Web Access

### Start Server
```bash
cd web
npm run dev
```

### Access URLs
- **Admin Dashboard:** http://localhost:5173/admin/dashboard
- **Sign In:** http://localhost:5173/signin (then click "🔐 Access Admin Panel →")
- **From Portal:** http://localhost:5173/portal/dashboard (then click "🔐 Admin Panel")

### All Admin Routes
```
http://localhost:5173/admin/dashboard      # Dashboard
http://localhost:5173/admin/owners         # Business Owners
http://localhost:5173/admin/stores         # Stores
http://localhost:5173/admin/orders         # Orders
http://localhost:5173/admin/payments       # Payments
http://localhost:5173/admin/integrations   # Integrations
http://localhost:5173/admin/reports        # Reports
http://localhost:5173/admin/settings       # Settings
```

---

## 📱 Mobile Access

### Start Expo
```bash
cd mobile
npx expo start
```

### Run On Device
- **iOS Simulator:** Press `i`
- **Android Emulator:** Press `a`
- **Physical Device:** Scan QR code with Expo Go app

### Navigate to Admin
1. From **Sign-In Screen:** Tap "Access Admin Panel →"
2. From **Portal Dashboard:** Tap "🔐 Admin Panel"

---

## 🎨 Design Colors

**Primary:** `#3B5BDB` (Blue)
**Accent:** `#00C896` (Teal/Green)
**Gradient:** `from-[#3B5BDB] to-[#00C896]`

---

## 🗂️ Admin Screens

1. **Dashboard** - Stats, recent orders, top stores
2. **Business Owners** - Search, filter, CRUD operations
3. **Stores** - Manage stores, ratings, status
4. **Orders** - View orders, status tracking
5. **Payments** - Payment methods, transactions
6. **Integrations** - Toggle integrations on/off
7. **Reports** - Analytics by period (weekly/monthly/yearly)
8. **Settings** - Platform configuration

---

## 🧪 Quick Test

### Web
```bash
cd web && npm run dev
# Open: http://localhost:5173/admin/dashboard
```

### Mobile
```bash
cd mobile && npx expo start
# Press 'i' for iOS or 'a' for Android
```

---

## 📂 Project Structure

```
ShopLynk/
├── mobile/
│   ├── src/
│   │   ├── screens/admin/          # 8 admin screens
│   │   ├── navigation/             # AdminTabNavigator
│   │   └── shared/                 # Types + Mock data
│   └── metro.config.js
├── web/
│   ├── src/
│   │   ├── pages/admin/            # 8 admin pages
│   │   ├── layouts/                # AdminLayout
│   │   └── App.tsx                 # Routes
│   └── tailwind.config.js
└── shared/                         # Used by web only
    ├── types/admin.ts
    └── services/adminMockData.ts
```

---

## ⚠️ Important Notes

### Mobile Shared Code
The mobile app uses a **local copy** of shared code in `mobile/src/shared/`.

If you update `shared/types/admin.ts` or `shared/services/adminMockData.ts`, manually copy to mobile:

```bash
cp shared/types/admin.ts mobile/src/shared/types/admin.ts
cp shared/services/adminMockData.ts mobile/src/shared/services/adminMockData.ts
```

### Clear Metro Cache
If mobile bundler has issues:
```bash
cd mobile
npx expo start -c
```

---

## ✅ Success Indicators

You'll know it's working when:

✅ All 8 screens load without errors
✅ Sidebar gradient colors are visible
✅ Navigation works smoothly
✅ Search and filters function
✅ Status toggles update UI
✅ Modals open correctly
✅ Statistics display mock data
✅ Responsive design works (web)
✅ Bottom tabs work (mobile)
✅ "Back to Portal" link works

---

## 🐛 Troubleshooting

### Web Port Conflict
If port 5173 is in use, Vite will use the next available port. Check terminal output.

### Web Module Not Found
```bash
cd web
npm install
```

### Mobile Bundle Error
```bash
cd mobile
rm -rf node_modules
npm install
npx expo start -c
```

### Web Navigation Error
Verify `App.tsx` has all admin routes under `<Route path="/admin" element={<AdminLayout />}>`.

### Mobile Navigation Error
Verify `App.tsx` has `<Stack.Screen name="Admin" component={AdminTabNavigator} />`.

---

## 📖 Full Documentation

See these files for detailed information:

- **IMPLEMENTATION_COMPLETE.md** - Complete implementation overview
- **ADMIN_PANEL_COMPLETE.md** - Full guide with code examples
- **ADMIN_PANEL_ACCESS.md** - Testing checklist
- **WEB_ADMIN_LAYOUT_UPDATE.md** - Layout details
- **MOBILE_BUNDLER_FIX_APPLIED.md** - Metro bundler fix

---

## 🎉 That's It!

Your ShopLynk Admin Panel is ready to use!

**Web:** `cd web && npm run dev` → http://localhost:5173/admin/dashboard
**Mobile:** `cd mobile && npx expo start` → Press `i` or `a`

Enjoy! 🚀
