# Mobile Metro Bundler Fix Guide

## Issue
Metro bundler cannot resolve imports from the `shared` folder because it's outside the mobile project directory.

## Solution

I've created a `metro.config.js` file that configures Metro to watch the parent directory and resolve modules from the shared folder.

### Steps to Fix:

1. **Stop the current Metro bundler** (Ctrl+C in terminal)

2. **Clear Metro cache and restart:**
   ```bash
   cd mobile
   npx expo start -c
   ```
   The `-c` flag clears the cache.

3. **If that doesn't work, try a full reset:**
   ```bash
   cd mobile

   # Clear all caches
   rm -rf node_modules
   rm -rf .expo
   npm cache clean --force

   # Reinstall dependencies
   npm install

   # Start with clean cache
   npx expo start -c
   ```

4. **Alternative: If the issue persists**, you can copy the shared folder into mobile:
   ```bash
   cd mobile
   mkdir -p src/shared
   cp -r ../shared/* src/shared/
   ```

   Then update imports in all admin screens from:
   ```typescript
   import { adminService } from '../../../../shared/services/adminMockData';
   import type { DashboardStats } from '../../../../shared/types/admin';
   ```

   To:
   ```typescript
   import { adminService } from '../../shared/services/adminMockData';
   import type { DashboardStats } from '../../shared/types/admin';
   ```

## Files That Need the Fix

If you go with Option 2 (copying shared folder), update these files:

**Mobile Admin Screens:**
- `mobile/src/screens/admin/AdminDashboardScreen.tsx`
- `mobile/src/screens/admin/AdminBusinessOwnersScreen.tsx`
- `mobile/src/screens/admin/AdminStoresScreen.tsx`
- `mobile/src/screens/admin/AdminOrdersScreen.tsx`
- `mobile/src/screens/admin/AdminPaymentsScreen.tsx`
- `mobile/src/screens/admin/AdminIntegrationsScreen.tsx`
- `mobile/src/screens/admin/AdminReportsScreen.tsx`
- `mobile/src/screens/admin/AdminSettingsScreen.tsx`

## Recommended Solution

**Option 1: Metro Config (Recommended)**
- ✅ Keeps shared code in one place
- ✅ Changes to shared code automatically reflect in both platforms
- ❌ Requires Metro cache clearing

**Option 2: Copy Shared Folder**
- ✅ Works immediately without configuration
- ✅ No Metro cache issues
- ❌ Need to sync changes manually between mobile and web
- ❌ Code duplication

## Quick Commands

**Clear cache and restart:**
```bash
cd mobile
npx expo start -c
```

**Full reset (if needed):**
```bash
cd mobile
rm -rf node_modules .expo
npm install
npx expo start -c
```

**Check if Metro config exists:**
```bash
ls mobile/metro.config.js
```

The `metro.config.js` file has been created and should fix the issue. Just restart Metro with the `-c` flag!
