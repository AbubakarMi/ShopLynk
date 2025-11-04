# Quick Start Guide - Landing Pages

Fast-track guide to run the ShopLynk landing pages on Web and Mobile.

## ⚡ Quick Setup (5 minutes)

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x
- For mobile: Expo Go app on your phone (iOS/Android)

---

## 🖥️ Web Landing Page

### 1. Install Dependencies
```bash
cd web
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to: **http://localhost:3000**

**That's it!** 🎉 You should see the beautiful landing page.

### Expected Result
- Animated hero section with gradient
- Trust badge with pulsing indicator
- Feature cards with hover effects
- Smooth scroll animations
- Professional footer

### Troubleshooting
- **Port already in use**: Change port in `vite.config.ts`
- **Build errors**: Delete `node_modules` and run `npm install` again
- **Missing styles**: Ensure Tailwind is compiling correctly

---

## 📱 Mobile Landing Page

### 1. Install Dependencies
```bash
cd mobile
npm install
```

### 2. Start Expo Server
```bash
npm start
```

### 3. Open on Your Device

**Option A: Physical Device (Recommended)**
1. Install **Expo Go** from:
   - iOS: App Store
   - Android: Play Store
2. Scan the QR code shown in terminal
3. App opens automatically

**Option B: Emulator**
- iOS: Press `i` in terminal (Mac only)
- Android: Press `a` in terminal (requires Android Studio)

### Expected Result
- Gradient header from primary to accent color
- Smooth fade-in animations
- Feature cards with gradients
- Native-feeling scrolling
- Touch-optimized buttons

### Troubleshooting
- **Fonts not loading**: Wait for fonts to download on first launch
- **Blank screen**: Check if Expo Go is updated
- **Build errors**: Run `expo doctor` to diagnose issues

---

## 🎨 What You'll See

### Web Version
```
✨ Navbar (fixed, glassmorphism)
   ↓
🎯 Hero Section (full-screen, animated gradient)
   ↓
⚡ Features Grid (3 cards with icons)
   ↓
🚀 CTA Section (gradient background)
   ↓
📋 Footer (multi-column)
```

### Mobile Version
```
✨ Header (gradient, logo + login)
   ↓
🎯 Hero Section (badge + headline + CTA)
   ↓
📱 Mockup Preview
   ↓
⚡ Features Stack (3 cards vertical)
   ↓
🚀 CTA Section (gradient card)
   ↓
📋 Footer (simple, centered)
```

---

## 🔧 Common Commands

### Web
```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Check for errors
npm run lint:fix         # Auto-fix errors
```

### Mobile
```bash
# Development
npm start                # Start Expo
npm run ios              # Run on iOS (Mac only)
npm run android          # Run on Android
npm run web              # Run in browser (testing)

# Building
npm run build            # Build with EAS
npm run build:android    # Build APK/AAB
npm run build:ios        # Build IPA
```

---

## 🌈 Brand Colors Reference

Use these in your own components:

### Web (Tailwind)
```jsx
<div className="bg-primary">Primary</div>
<div className="bg-accent">Accent</div>
<div className="bg-background">Background</div>
<div className="text-textDark">Text</div>

// Gradient
<div className="gradient-primary">Gradient</div>
<span className="gradient-text">Gradient Text</span>
```

### Mobile (StyleSheet)
```javascript
import { COLORS } from './constants'; // You can extract this

const styles = StyleSheet.create({
  primary: { backgroundColor: '#6C63FF' },
  accent: { backgroundColor: '#00C897' },
  background: { backgroundColor: '#F5F7FA' },
  textDark: { color: '#1F1F1F' },
});
```

---

## 📦 File Structure

### Web
```
web/
├── src/
│   ├── pages/
│   │   └── Home.tsx          ← Landing page
│   ├── App.tsx               ← Router setup
│   ├── index.css             ← Global styles + fonts
│   └── main.tsx              ← Entry point
├── tailwind.config.js        ← Brand colors
└── package.json              ← Dependencies
```

### Mobile
```
mobile/
├── src/
│   └── screens/
│       └── HomeScreen.tsx    ← Landing page
├── App.tsx                   ← Entry point
├── app.json                  ← Expo config
└── package.json              ← Dependencies
```

---

## 🚀 Performance Tips

### Web
- Images are placeholders - replace with optimized WebP
- Lazy load components below fold
- Enable code splitting for routes
- Use `next/image` if migrating to Next.js

### Mobile
- Fonts are cached after first load
- Use `react-native-fast-image` for images
- Enable Hermes engine (already enabled in Expo)
- Profile with Flipper for optimization

---

## 🎯 Next Development Steps

1. **Authentication Pages**
   - Login screen
   - Sign up screen
   - Password reset

2. **Dashboard**
   - Product list
   - Order management
   - Analytics

3. **Backend Integration**
   - Connect to API
   - Add authentication
   - State management (Zustand)

4. **Additional Pages**
   - Pricing page
   - About us
   - Contact form

---

## 🐛 Known Issues & Fixes

### Web
- **Issue**: Animations lag on scroll
  - **Fix**: Reduce number of animated elements or use CSS animations

### Mobile
- **Issue**: StatusBar not matching gradient
  - **Fix**: Set `StatusBar.setBackgroundColor()` in Android

---

## 📚 Resources

- [Tailwind CSS Docs](https://tailwindcss.com)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Expo Documentation](https://docs.expo.dev)
- [React Navigation](https://reactnavigation.org)
- [Inter Font Family](https://fonts.google.com/specimen/Inter)

---

## 💬 Need Help?

Check the main documentation:
- `README.md` - Project overview
- `GETTING_STARTED.md` - Full setup guide
- `STRUCTURE.md` - Project structure
- `LANDING_PAGE_IMPLEMENTATION.md` - Detailed implementation docs

---

**Happy Coding! 🚀**

Built by ShopLynk Team with ❤️
