# ShopLynk Admin Panel - Navigation Flow

## 🗺️ Complete Navigation Map

```
┌─────────────────────────────────────────────────────────────┐
│                         MOBILE APP                          │
└─────────────────────────────────────────────────────────────┘

    ┌──────────────┐
    │ Splash Screen │
    └──────┬───────┘
           │
           v
    ┌──────────────┐
    │ Sign Up      │◄─────────┐
    └──────┬───────┘          │
           │                  │
           v                  │
    ┌──────────────┐          │
    │ Sign In      │──────────┘
    └──────┬───────┘
           │
           ├─────────────────────┐
           │                     │
           v                     v
    ┌──────────────┐      ┌──────────────┐
    │ Onboarding   │      │ ADMIN PANEL  │ 🔐
    └──────┬───────┘      └──────┬───────┘
           │                     │
           v                     │
    ┌──────────────┐             │
    │ Portal       │◄────────────┘
    │ (8 Tabs)     │─────────────┐
    └──────┬───────┘             │
           │                     │
           └─────────────────────┘
              "Back" navigation


┌─────────────────────────────────────────────────────────────┐
│                         WEB APP                             │
└─────────────────────────────────────────────────────────────┘

    ┌──────────────┐
    │ Home (/)     │
    └──────┬───────┘
           │
           ├─────────────────────┬─────────────────────┐
           │                     │                     │
           v                     v                     v
    ┌──────────────┐      ┌──────────────┐    ┌──────────────┐
    │ Sign Up      │      │ Sign In      │    │ Onboarding   │
    └──────────────┘      └──────┬───────┘    └──────┬───────┘
                                 │                   │
                                 ├───────────────────┘
                                 │
                                 ├─────────────────────┐
                                 │                     │
                                 v                     v
                          ┌──────────────┐      ┌──────────────┐
                          │ Portal       │      │ ADMIN PANEL  │ 🔐
                          │ /portal/*    │◄─────┤ /admin/*     │
                          └──────────────┘      └──────────────┘
                                 ▲                     │
                                 │                     │
                                 └─────────────────────┘
                                    "Back to Portal"
```

---

## 📱 Mobile - Bottom Tab Navigation

### Admin Panel (8 Tabs)
```
┌─────────────────────────────────────────────────────────┐
│                   ADMIN TAB NAVIGATOR                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                  [Screen Content]                       │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  📊      👥      🏪      🛒      💳      🧩      📈   ⚙️│
│ Dash  Owners  Stores Orders Payments Integ Reports Sett│
└─────────────────────────────────────────────────────────┘
```

**Tab Details:**
1. 📊 **Dashboard** - Stats, recent orders, top stores
2. 👥 **Owners** - Business owners with search/filter
3. 🏪 **Stores** - Store management with ratings
4. 🛒 **Orders** - Order tracking and status
5. 💳 **Payments** - Payment transactions
6. 🧩 **Integrations** - Third-party integrations
7. 📈 **Reports** - Analytics by period
8. ⚙️ **Settings** - Platform configuration

---

## 🌐 Web - Sidebar + Nested Routes

### Admin Layout Structure
```
┌───────────────────┬─────────────────────────────────────────┐
│                   │  ┌────────────────────────────────────┐ │
│   SIDEBAR         │  │  TOP BAR                           │ │
│   (256px)         │  │  🔍 Search    🔔    👤 Admin ▼    │ │
│                   │  └────────────────────────────────────┘ │
│  ┌─────────────┐  │                                         │
│  │ 🛡️ Admin    │  │  ┌────────────────────────────────┐   │
│  │   Panel     │  │  │                                │   │
│  └─────────────┘  │  │                                │   │
│                   │  │                                │   │
│  📊 Dashboard     │  │     MAIN CONTENT AREA          │   │
│  👥 Business Owners  │  │     (Nested Routes)            │   │
│  🏪 Stores        │  │                                │   │
│  🛒 Orders        │  │     <Outlet />                 │   │
│  💳 Payments      │  │                                │   │
│  🧩 Integrations  │  │                                │   │
│  📈 Reports       │  │                                │   │
│  ⚙️ Settings      │  │                                │   │
│                   │  └────────────────────────────────┘   │
│  ┌─────────────┐  │                                         │
│  │ Admin Mode  │  │                                         │
│  │     ●       │  │                                         │
│  └─────────────┘  │                                         │
│  ┌─────────────┐  │                                         │
│  │← Back to    │  │                                         │
│  │  Portal     │  │                                         │
│  └─────────────┘  │                                         │
└───────────────────┴─────────────────────────────────────────┘
```

**Responsive Behavior:**
- **Desktop (≥1024px):** Sidebar always visible, fixed left
- **Mobile (<1024px):** Sidebar hidden, hamburger menu appears

---

## 🔐 Access Points

### Mobile - 3 Ways to Access Admin

**1. From Sign-In Screen:**
```
SignInScreen.tsx
├── Email input
├── Password input
├── [Sign In] button
└── [Access Admin Panel →] button  ← Navigate to 'Admin'
```

**2. From Portal Dashboard:**
```
DashboardScreen.tsx (Portal)
├── Header
│   └── [🔐 Admin Panel] button  ← Navigate to 'Admin'
└── Content
```

**3. Direct Navigation (in code):**
```typescript
navigation.navigate('Admin');
```

---

### Web - 3 Ways to Access Admin

**1. Direct URL:**
```
http://localhost:5173/admin/dashboard
http://localhost:5173/admin/owners
http://localhost:5173/admin/stores
... (and 5 more routes)
```

**2. From Sign-In Page:**
```
SignIn.tsx
├── Email input
├── Password input
├── [Sign In] button → navigate('/admin/dashboard')
└── [🔐 Access Admin Panel →] button → navigate('/admin/dashboard')
```

**3. From Portal Dashboard:**
```
Dashboard.tsx (Portal)
├── Header
│   └── [🔐 Admin Panel] button → navigate('/admin/dashboard')
└── Content
```

**4. From Admin Layout:**
```
AdminLayout.tsx
├── Sidebar
│   └── [← Back to Portal] button → navigate('/portal/dashboard')
└── Top Bar
    └── Profile Dropdown
        ├── Settings → navigate('/admin/settings')
        ├── Back to Portal → navigate('/portal/dashboard')
        └── Sign Out → navigate('/signin')
```

---

## 🎯 Navigation Context

### Current Location Detection

**Mobile:**
```typescript
import { useRoute } from '@react-navigation/native';

const route = useRoute();
const isActive = route.name === 'AdminDashboard';
```

**Web:**
```typescript
import { useLocation } from 'react-router-dom';

const location = useLocation();
const isActive = location.pathname === '/admin/dashboard';
```

---

## 🔄 Data Flow

### Mock Data Service Pattern

```
┌─────────────────┐
│  Admin Screen   │
└────────┬────────┘
         │
         │ useState/useEffect
         │
         v
┌─────────────────┐
│  adminService   │
└────────┬────────┘
         │
         │ getDashboardStats()
         │ getBusinessOwners()
         │ updateOwnerStatus()
         │ etc.
         │
         v
┌─────────────────┐
│   Mock Data     │
│  (in memory)    │
└─────────────────┘
```

**Example:**
```typescript
// Mobile
import { adminService } from '../../shared/services/adminMockData';
import type { DashboardStats } from '../../shared/types/admin';

// Web
import { adminService } from '../../../shared/services/adminMockData';
import type { DashboardStats } from '../../../shared/types/admin';

// Both use the same service methods
const stats = await adminService.getDashboardStats();
```

---

## 🎨 Active State Visual Indicators

### Mobile Bottom Tabs
```
ACTIVE STATE:
┌─────────────────┐
│   [Icon Color]  │ ← Gradient: from-[#3B5BDB] to-[#00C896]
│   Label Text    │ ← Color: primary (#3B5BDB)
└─────────────────┘

INACTIVE STATE:
┌─────────────────┐
│   [Icon Color]  │ ← Gray (#6B7280)
│   Label Text    │ ← Gray (#6B7280)
└─────────────────┘
```

### Web Sidebar Links
```
ACTIVE STATE:
┌─────────────────────────────────┐
│  bg-gradient-to-r               │
│  from-[#3B5BDB] to-[#00C896]    │
│                                 │
│  📊 Dashboard                   │  ← White text
│                                 │
└─────────────────────────────────┘

INACTIVE STATE:
┌─────────────────────────────────┐
│  bg-transparent                 │
│  hover:bg-gray-100              │
│                                 │
│  📊 Dashboard                   │  ← Gray text (#374151)
│                                 │
└─────────────────────────────────┘
```

---

## 📊 Screen Hierarchy

### Mobile Stack Structure
```
NavigationContainer
└── Stack.Navigator
    ├── Splash
    ├── SignUp
    ├── SignIn
    ├── Onboarding
    ├── Portal (Tab.Navigator)
    │   ├── Dashboard
    │   ├── Orders
    │   ├── Products
    │   ├── Payments
    │   └── Settings
    └── Admin (Tab.Navigator) ← 8 admin tabs
        ├── AdminDashboard
        ├── AdminBusinessOwners
        ├── AdminStores
        ├── AdminOrders
        ├── AdminPayments
        ├── AdminIntegrations
        ├── AdminReports
        └── AdminSettings
```

### Web Route Structure
```
Routes
├── / (Home)
├── /signup (SignUp)
├── /signin (SignIn)
├── /onboarding (Onboarding)
├── /portal (PortalLayout)
│   ├── /portal/dashboard
│   ├── /portal/orders
│   ├── /portal/products
│   ├── /portal/payments
│   ├── /portal/whatsapp
│   ├── /portal/invoices
│   ├── /portal/analytics
│   ├── /portal/customers
│   ├── /portal/settings
│   └── /portal/help
└── /admin (AdminLayout) ← 8 admin routes
    ├── /admin/dashboard
    ├── /admin/owners
    ├── /admin/stores
    ├── /admin/orders
    ├── /admin/payments
    ├── /admin/integrations
    ├── /admin/reports
    └── /admin/settings
```

---

## ✨ Feature Matrix

| Feature               | Mobile | Web | Notes                          |
|-----------------------|--------|-----|--------------------------------|
| Dashboard Stats       | ✅     | ✅  | 4 cards with trends            |
| Search Functionality  | ✅     | ✅  | Owners, stores, orders         |
| Filter by Status      | ✅     | ✅  | All/Active/Suspended           |
| CRUD Operations       | ✅     | ✅  | Create, Read, Update, Delete   |
| Detail Modals         | ✅     | ✅  | Full info + actions            |
| Status Toggle         | ✅     | ✅  | Active/Suspend stores/owners   |
| Integration Toggle    | ✅     | ✅  | Enable/disable integrations    |
| Period Selector       | ✅     | ✅  | Weekly/Monthly/Yearly          |
| Settings Management   | ✅     | ✅  | 4 sections with save           |
| Responsive Design     | N/A    | ✅  | Desktop + Mobile layouts       |
| Pull to Refresh       | ✅     | N/A | Mobile native gesture          |
| Gradient Styling      | ✅     | ✅  | Consistent brand colors        |
| Loading States        | ✅     | ✅  | Spinners during data fetch     |
| Error Handling        | ✅     | ✅  | Graceful error messages        |
| Navigation            | ✅     | ✅  | Bottom tabs vs Sidebar         |

---

## 🚦 User Journey Examples

### Example 1: Suspend a Business Owner

**Mobile:**
1. Sign in → Tap "Access Admin Panel"
2. Navigate to "Owners" tab (👥)
3. Search for owner by name
4. Tap owner card
5. Tap "Suspend Owner" button
6. Confirm in alert dialog
7. Status updates to "Suspended" with red badge

**Web:**
1. Sign in → Click "🔐 Access Admin Panel"
2. Sidebar already shows "Business Owners"
3. Click "Business Owners" in sidebar
4. Use search bar to find owner
5. Click owner card to open modal
6. Click "Suspend Owner" button
7. Modal closes, card shows "Suspended" badge

---

### Example 2: View Reports by Period

**Mobile:**
1. Navigate to Admin panel
2. Tap "Reports" tab (📈)
3. Tap period buttons at top (Weekly/Monthly/Yearly)
4. View metrics change dynamically
5. Scroll to see top products and categories

**Web:**
1. Navigate to Admin panel
2. Click "Reports" in sidebar
3. Click period buttons at top
4. View metrics grid update
5. Scroll to see rankings

---

### Example 3: Toggle Integration

**Mobile:**
1. Navigate to "Integrations" tab (🧩)
2. Find integration card (e.g., Stripe)
3. Tap toggle switch
4. Status updates immediately
5. Last sync time displayed

**Web:**
1. Click "Integrations" in sidebar
2. Find integration card
3. Click toggle switch
4. Card updates with new status
5. Connected stores count shown

---

## 🔧 Development Workflow

### Adding a New Admin Screen

**Mobile:**
1. Create screen file: `mobile/src/screens/admin/NewScreen.tsx`
2. Add to `AdminTabNavigator.tsx`:
   ```typescript
   <Tab.Screen name="NewScreen" component={NewScreen} />
   ```
3. Update navigation type definitions if using TypeScript
4. Add icon to tab configuration

**Web:**
1. Create page file: `web/src/pages/admin/NewPage.tsx`
2. Add to `App.tsx` under admin route:
   ```typescript
   <Route path="newpage" element={<NewPage />} />
   ```
3. Add navigation item to `AdminLayout.tsx`:
   ```typescript
   { name: 'New Page', path: '/admin/newpage', icon: NewIcon }
   ```

---

## 📈 Performance Considerations

### Mobile
- Uses `React.memo` for list items
- Implements `FlatList` with `keyExtractor` for large lists
- Pull-to-refresh for data updates
- Native animations for smooth transitions

### Web
- Lazy loading for route components (can be added)
- CSS transitions for sidebar animations
- Debounced search inputs
- Responsive images and icons

---

## 🎊 Complete!

The admin panel navigation flow is fully implemented and documented. Both platforms provide seamless access to all 8 admin screens with consistent UX patterns.

**Key Success Metrics:**
✅ Zero navigation errors
✅ Consistent active state indicators
✅ Smooth transitions between screens
✅ Proper back navigation handling
✅ Responsive design (web)
✅ Professional UI/UX throughout

---

**Last Updated:** November 6, 2025
**Platforms:** Mobile (React Native/Expo) + Web (React/Vite)
**Navigation Pattern:** Bottom Tabs (Mobile) + Sidebar (Web)
