# ShopLynk Mobile Application

React Native mobile application built with Expo and TypeScript.

## Purpose

This is the mobile app for ShopLynk, providing:
- Store management on-the-go
- Product catalog browsing and management
- Order notifications and management
- Customer communication via WhatsApp
- Real-time order updates
- Mobile-optimized dashboard

## Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **React Navigation** - Navigation library
- **AsyncStorage** - Local storage
- **Zustand** - State management
- **Axios** - HTTP client

## Folder Structure

```
mobile/
├── src/
│   ├── screens/        # Screen components
│   ├── components/     # Reusable UI components
│   ├── navigation/     # Navigation setup
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── services/       # API services
│   ├── context/        # React context providers
│   └── assets/         # Images, fonts, etc.
├── App.tsx             # Application entry point
├── app.json            # Expo configuration
└── package.json        # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js >= 18.x
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Studio (for emulator)
- Expo Go app on your physical device (optional)

### Development

```bash
# Start Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web (for testing)
npm run web
```

### Building

```bash
# Build for all platforms
npm run build

# Build for Android only
npm run build:android

# Build for iOS only
npm run build:ios
```

## Environment Variables

Configure in `app.json` under `extra`:

```json
{
  "extra": {
    "apiUrl": "https://api.shoplynk.com",
    "wsUrl": "wss://api.shoplynk.com"
  }
}
```

Access in code:
```typescript
import Constants from 'expo-constants';
const apiUrl = Constants.expoConfig?.extra?.apiUrl;
```

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web
- `npm run build` - Build for production
- `npm run lint` - Lint code
- `npm run lint:fix` - Fix linting issues

## Contributing

Follow the project's coding standards and test on both iOS and Android before submitting PRs.
