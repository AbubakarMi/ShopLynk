# Testing the Onboarding Screens

## Quick Test Access

I've added convenient **Test Onboarding** buttons to both mobile and web dashboards so you can easily test the onboarding flow anytime!

### 🎯 How to Test

#### Mobile App
1. Navigate to the Portal/Dashboard screen
2. Look for the blue **"🎯 Test Onboarding"** button at the top
3. Tap the button
4. The onboarding screens will appear immediately
5. Test the full flow:
   - Swipe through slides
   - Try the Skip button
   - Test Next/Get Started buttons
   - Check animations

#### Web App
1. Navigate to `/portal/dashboard`
2. Look for the **"🎯 Test Onboarding"** button below the page header
3. Click the button
4. You'll be redirected to `/onboarding`
5. Test the full flow:
   - Click Next/Back buttons
   - Try the Skip button
   - Click progress dots
   - Test responsive design
   - Check animations

### What the Test Button Does

When you click/tap the test button, it:
1. **Removes the onboarding flag** from storage
   - Mobile: Removes from AsyncStorage
   - Web: Removes from localStorage
2. **Navigates to onboarding** immediately
3. Allows you to see the onboarding experience again

### Normal User Flow (Without Test Button)

For reference, here's how onboarding works for real users:

```
New User
  ↓
Sign Up → Onboarding (First Time Only)
  ↓
Portal Dashboard
  ↓
Returning User → Portal Dashboard (Skips Onboarding)
```

### Testing Scenarios

#### Scenario 1: First Time User
1. Clear app data (or delete/reinstall app)
2. Open app
3. See Splash Screen → Sign Up
4. Complete registration
5. **Onboarding appears automatically**
6. Complete onboarding
7. Enter Portal

#### Scenario 2: Returning User
1. Open app
2. See Splash Screen
3. **Onboarding is skipped**
4. Go directly to Portal

#### Scenario 3: Manual Test (Using Test Button)
1. Already logged in
2. Go to Dashboard
3. Click "🎯 Test Onboarding" button
4. Test the onboarding flow
5. Complete or skip onboarding
6. Return to Portal

### Removing Test Buttons (Production)

Before deploying to production, you may want to remove the test buttons:

**Mobile:** Remove from [mobile/src/screens/portal/DashboardScreen.tsx](mobile/src/screens/portal/DashboardScreen.tsx)
- Lines 118-128: Test button component
- Lines 670-693: Test button styles
- Line 15: Remove AsyncStorage import if not used elsewhere

**Web:** Remove from [web/src/pages/portal/Dashboard.tsx](web/src/pages/portal/Dashboard.tsx)
- Lines 54-65: Test button component

### Manual Reset (Alternative Method)

If you want to reset onboarding without the test button:

**Mobile (React Native Debugger or code):**
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
await AsyncStorage.removeItem('hasSeenOnboarding');
```

**Web (Browser Console):**
```javascript
localStorage.removeItem('shoplynk_hasSeenOnboarding');
// Refresh page or navigate to /onboarding
```

### Development Tools

**Mobile:**
- Use React Native Debugger to inspect AsyncStorage
- Check logs for navigation events
- Use Expo Dev Tools to reload/clear cache

**Web:**
- Open Browser DevTools (F12)
- Go to Application/Storage → Local Storage
- Check for `shoplynk_hasSeenOnboarding` key
- Network tab to see route changes

### Common Issues & Solutions

**Issue: Onboarding doesn't appear after signup**
- Check console for navigation errors
- Verify SignUp navigation code is calling onboarding route
- Check that onboarding screen/page is properly registered

**Issue: Onboarding appears every time**
- Check if storage flag is being set after completion
- Verify AsyncStorage/localStorage permissions
- Look for errors in console when saving flag

**Issue: Test button doesn't work**
- Check navigation prop is available
- Verify onboarding route is registered
- Check for errors in console

**Issue: Animations not smooth**
- Mobile: Ensure react-native-reanimated is properly installed
- Web: Check framer-motion is installed
- Reduce animation complexity if on low-end device

### Performance Testing

**Mobile:**
- Test on physical devices (iOS and Android)
- Check frame rate during animations (should be 60fps)
- Test on different screen sizes
- Check memory usage

**Web:**
- Test on mobile browsers (Chrome, Safari)
- Test on different screen widths (375px, 768px, 1440px)
- Check animation performance
- Test on slower connections

### Design Verification Checklist

- [ ] Colors match existing app (#3B5BDB, #00C896)
- [ ] Fonts match (Inter with correct weights)
- [ ] Spacing matches design system
- [ ] Animations are smooth
- [ ] Buttons have proper hover/active states
- [ ] Icons display correctly
- [ ] Text is readable
- [ ] Responsive on all screen sizes (web)
- [ ] Works in portrait and landscape (mobile)

### Content Testing

- [ ] All 3 slides display
- [ ] Titles are clear and readable
- [ ] Descriptions are informative
- [ ] Icons match content
- [ ] Navigation flows naturally
- [ ] Skip button works from any slide
- [ ] Progress indicator updates correctly
- [ ] Final slide shows "Get Started" instead of "Next"

---

## Quick Commands

### Start Development Servers

**Mobile:**
```bash
cd mobile
npx expo start
```

**Web:**
```bash
cd web
npm run dev
```

### Build for Production

**Mobile:**
```bash
cd mobile
eas build --platform ios
eas build --platform android
```

**Web:**
```bash
cd web
npm run build
```

---

**Happy Testing!** 🎉

The test buttons make it super easy to demo the onboarding flow to stakeholders or test changes during development. Just click and test!
