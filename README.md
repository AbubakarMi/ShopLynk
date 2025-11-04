# ShopLynk - WhatsApp Store Builder

ShopLynk is a multi-platform WhatsApp store builder that lets small businesses create mini e-commerce stores from WhatsApp chats auto-listing their products, managing orders, and collecting payments all without needing coding skills.

## Project Structure

This is a monorepo containing:

- **web/** - React web application (Vite + TypeScript + Tailwind CSS)
- **mobile/** - React Native mobile app (Expo + TypeScript)
- **server/** - Node.js backend API (Express + PostgreSQL)
- **shared/** - Shared utilities, types, and constants

## Tech Stack

### Frontend (Web)
- React 18
- Vite
- TypeScript
- Tailwind CSS
- React Router

### Mobile
- React Native
- Expo
- TypeScript
- React Navigation
- AsyncStorage

### Backend
- Node.js
- Express
- PostgreSQL
- Prisma ORM
- TypeScript

## Getting Started

### Prerequisites
- Node.js >= 18.x
- npm or yarn
- PostgreSQL database
- Expo CLI (for mobile development)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ShopLynk
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Copy example env files
cp server/.env.example server/.env
# Edit the .env files with your configuration
```

4. Start the development servers

```bash
# Start web app
npm run start:web

# Start mobile app
npm run start:mobile

# Start backend server
npm run start:server

# Start all services
npm run dev
```

## Project Features

- WhatsApp Store Management
- Product Catalog
- Order Management
- Customer Management
- Payment Integration (planned)
- Analytics Dashboard
- Multi-language Support (planned)

## Workspace Structure

```
shoplynk/
├── web/           # React web application
├── mobile/        # React Native mobile app
├── server/        # Express backend API
├── shared/        # Shared code and types
└── package.json   # Root package.json with workspace config
```

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
