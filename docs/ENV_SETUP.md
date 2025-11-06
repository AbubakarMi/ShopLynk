# Environment Variables Setup Guide

This guide explains how to configure environment variables for the ShopLynk application to ensure API keys and sensitive credentials are kept secure.

## Overview

ShopLynk uses environment variables to manage sensitive configuration data like API keys, tokens, and secrets. This approach:
- Keeps sensitive data out of version control
- Allows different configurations for development, staging, and production
- Enhances security by preventing credential exposure

## Project Structure

The project has three main components, each with its own environment configuration:

```
ShopLynk/
├── mobile/          # React Native (Expo) mobile app
│   ├── .env         # Mobile environment variables (NOT in git)
│   └── .env.example # Mobile environment template (in git)
├── web/             # React web application
│   ├── .env         # Web environment variables (NOT in git)
│   └── .env.example # Web environment template (in git)
└── server/          # Backend API server
    ├── .env         # Server environment variables (NOT in git)
    └── .env.example # Server environment template (in git)
```

## Setup Instructions

### 1. Mobile App Setup

**Location:** `mobile/.env`

1. Copy the example file:
   ```bash
   cd mobile
   cp .env.example .env
   ```

2. Edit `mobile/.env` and replace placeholder values with your actual credentials:
   ```env
   # API Configuration
   API_URL=http://localhost:5000/api

   # Stripe Configuration
   STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key_here
   STRIPE_SECRET_KEY=sk_test_your_actual_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret

   # Expo Configuration
   EAS_PROJECT_ID=your-actual-project-id

   # App Configuration
   APP_ENV=development
   ```

3. The mobile app accesses these via `expo-constants`:
   ```typescript
   import Constants from 'expo-constants';
   const apiKey = Constants.expoConfig?.extra?.STRIPE_SECRET_KEY;
   ```

### 2. Web App Setup

**Location:** `web/.env`

1. Copy the example file:
   ```bash
   cd web
   cp .env.example .env
   ```

2. Edit `web/.env` and replace placeholder values:
   ```env
   # API Configuration
   VITE_API_URL=http://localhost:5000/api

   # Stripe Configuration
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key_here
   VITE_STRIPE_SECRET_KEY=sk_test_your_actual_key_here
   VITE_STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret

   # App Configuration
   VITE_APP_ENV=development
   ```

3. The web app accesses these via Vite's environment variables:
   ```typescript
   const apiKey = import.meta.env.VITE_STRIPE_SECRET_KEY;
   ```

   **Note:** All web environment variables must be prefixed with `VITE_` to be exposed to the client.

### 3. Server Setup

**Location:** `server/.env`

1. Copy the example file:
   ```bash
   cd server
   cp .env.example .env
   ```

2. Edit `server/.env` with your actual credentials (see `server/.env.example` for all available options)

## Security Best Practices

### Never Commit Secrets

The `.gitignore` file is configured to exclude all `.env` files:
```gitignore
# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

### Use Different Keys for Different Environments

- **Development:** Use test/sandbox API keys (e.g., `pk_test_...`, `sk_test_...`)
- **Production:** Use live API keys (e.g., `pk_live_...`, `sk_live_...`)
- **Never** use production keys in development

### Stripe API Keys

**IMPORTANT:** Stripe has different key types:

- **Publishable Key** (`pk_test_...` or `pk_live_...`): Safe to expose in client-side code
- **Secret Key** (`sk_test_...` or `sk_live_...`): MUST be kept secret, only use server-side
- **Webhook Secret** (`whsec_...`): Used to verify webhook signatures

**WARNING:** The current implementation shows API keys in the Settings screen. This should only display:
- Publishable keys (safe to show)
- Masked versions of secret keys (for reference only)
- Actual secret keys should NEVER be sent to or displayed in the frontend

### Recommended Changes

For production, you should:

1. **Move Secret Keys to Backend Only:**
   - Remove `STRIPE_SECRET_KEY` from mobile and web `.env` files
   - Only keep secret keys in `server/.env`
   - Frontend should only have publishable keys

2. **Use a Secrets Manager for Production:**
   - AWS Secrets Manager
   - HashiCorp Vault
   - Google Cloud Secret Manager
   - Azure Key Vault

3. **Implement API Key Rotation:**
   - Regularly rotate sensitive credentials
   - Have a process for updating keys across environments

## Getting Your API Keys

### Stripe

1. Sign up at [https://stripe.com](https://stripe.com)
2. Go to Developers > API Keys
3. Copy your **Publishable key** and **Secret key**
4. For webhooks:
   - Go to Developers > Webhooks
   - Add endpoint
   - Copy the **Signing secret** (this is your webhook secret)

### Other Services

Refer to the `server/.env.example` file for a complete list of required API keys and where to obtain them:
- WhatsApp Business API
- SMTP credentials for email
- JWT secrets (generate secure random strings)
- Database connection strings
- Redis connection (if using caching)

## Troubleshooting

### Environment Variables Not Loading

**Mobile (Expo):**
- Restart the development server after changing `.env`
- Run `npx expo start --clear` to clear cache
- Ensure variables are defined in `app.json` under `extra`

**Web (Vite):**
- Restart the development server
- Ensure variables are prefixed with `VITE_`
- Check browser console for undefined values

**Server:**
- Ensure you're using `dotenv` package
- Load env vars at the top of your entry file:
  ```javascript
  require('dotenv').config();
  ```

### "Not configured" Appearing in Settings

This means the environment variable is not set. Check:
1. `.env` file exists and has the correct values
2. Development server has been restarted
3. Variable names match exactly (including `VITE_` prefix for web)

## Additional Resources

- [Expo Environment Variables](https://docs.expo.dev/guides/environment-variables/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Stripe API Keys](https://stripe.com/docs/keys)
- [dotenv Documentation](https://github.com/motdotla/dotenv)

## Support

If you encounter issues with environment configuration:
1. Verify all `.env` files are created from their `.example` counterparts
2. Check that `.env` files are in the correct directories
3. Ensure you've restarted development servers after changes
4. Review the error messages in your terminal/console
