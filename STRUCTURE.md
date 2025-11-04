# ShopLynk - Complete Project Structure

This document provides an overview of the complete monorepo structure for ShopLynk.

## Directory Tree

```
ShopLynk/
│
├── web/                          # React Web Application (Vite + TypeScript + Tailwind)
│   ├── public/                   # Static assets
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   │   └── README.md
│   │   ├── pages/                # Page components
│   │   │   └── README.md
│   │   ├── layouts/              # Layout components
│   │   ├── hooks/                # Custom React hooks
│   │   │   └── README.md
│   │   ├── utils/                # Utility functions
│   │   ├── services/             # API services
│   │   │   └── README.md
│   │   ├── context/              # React context providers
│   │   ├── assets/               # Images, fonts, etc.
│   │   ├── App.tsx               # Main App component
│   │   ├── main.tsx              # Application entry point
│   │   ├── index.css             # Global styles
│   │   └── vite-env.d.ts         # Vite environment types
│   ├── index.html                # HTML template
│   ├── vite.config.ts            # Vite configuration
│   ├── tailwind.config.js        # Tailwind CSS configuration
│   ├── postcss.config.js         # PostCSS configuration
│   ├── tsconfig.json             # TypeScript configuration
│   ├── tsconfig.node.json        # TypeScript config for Vite
│   ├── package.json              # Dependencies and scripts
│   └── README.md                 # Web app documentation
│
├── mobile/                       # React Native Mobile App (Expo + TypeScript)
│   ├── src/
│   │   ├── screens/              # Screen components
│   │   │   └── README.md
│   │   ├── components/           # Reusable UI components
│   │   ├── navigation/           # Navigation setup
│   │   │   └── README.md
│   │   ├── hooks/                # Custom React hooks
│   │   ├── utils/                # Utility functions
│   │   ├── services/             # API services
│   │   │   └── README.md
│   │   ├── context/              # React context providers
│   │   └── assets/               # Images, fonts, etc.
│   ├── App.tsx                   # Application entry point
│   ├── app.json                  # Expo configuration
│   ├── babel.config.js           # Babel configuration
│   ├── tsconfig.json             # TypeScript configuration
│   ├── package.json              # Dependencies and scripts
│   └── README.md                 # Mobile app documentation
│
├── server/                       # Node.js Backend API (Express + PostgreSQL)
│   ├── src/
│   │   ├── controllers/          # Route controllers
│   │   │   └── README.md
│   │   ├── routes/               # API routes
│   │   │   └── README.md
│   │   ├── models/               # Business logic models
│   │   ├── services/             # Business logic services
│   │   │   └── README.md
│   │   ├── middlewares/          # Express middlewares
│   │   │   └── README.md
│   │   ├── utils/                # Utility functions
│   │   ├── config/               # Configuration files
│   │   └── app.ts                # Application entry point
│   ├── prisma/
│   │   └── schema.prisma         # Prisma database schema
│   ├── .env.example              # Environment variables template
│   ├── tsconfig.json             # TypeScript configuration
│   ├── package.json              # Dependencies and scripts
│   └── README.md                 # Server documentation
│
├── shared/                       # Shared utilities, types, and constants
│   ├── src/
│   │   ├── types/                # TypeScript type definitions
│   │   │   └── index.ts
│   │   ├── utils/                # Utility functions
│   │   │   └── index.ts
│   │   ├── constants/            # Constants and enums
│   │   │   └── index.ts
│   │   └── index.ts              # Main export file
│   ├── tsconfig.json             # TypeScript configuration
│   ├── package.json              # Dependencies and scripts
│   └── README.md                 # Shared package documentation
│
├── .gitignore                    # Git ignore rules
├── .eslintrc.json                # ESLint configuration
├── .eslintignore                 # ESLint ignore rules
├── .prettierrc                   # Prettier configuration
├── .prettierignore               # Prettier ignore rules
├── package.json                  # Root package.json with workspace config
├── tsconfig.base.json            # Base TypeScript configuration
├── README.md                     # Project documentation
└── STRUCTURE.md                  # This file - project structure overview

```

## Key Features by Module

### Web Application ([web/](web/))
- React 18 with Vite for fast development
- TypeScript for type safety
- Tailwind CSS for styling
- React Router for navigation
- Zustand for state management
- Axios for API calls

### Mobile Application ([mobile/](mobile/))
- React Native with Expo
- TypeScript support
- React Navigation for routing
- AsyncStorage for local data
- Cross-platform (iOS & Android)

### Backend Server ([server/](server/))
- Express.js REST API
- PostgreSQL with Prisma ORM
- JWT authentication
- Helmet for security
- Morgan for logging
- Comprehensive middleware support

### Shared Package ([shared/](shared/))
- Common TypeScript types
- Utility functions (currency, date, validation, etc.)
- Constants and enums
- Reusable across all platforms

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   ```bash
   cp server/.env.example server/.env
   # Edit .env with your configuration
   ```

3. **Start Development Servers**
   ```bash
   # Start all services
   npm run dev

   # Or start individually
   npm run start:web      # Web app on http://localhost:3000
   npm run start:mobile   # Mobile app with Expo
   npm run start:server   # Backend API on http://localhost:5000
   ```

## Available Scripts (Root Level)

- `npm run start:web` - Start web application
- `npm run start:mobile` - Start mobile application
- `npm run start:server` - Start backend server
- `npm run dev` - Start web and server concurrently
- `npm run build` - Build all projects
- `npm run lint` - Lint all workspaces
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run clean` - Clean all build artifacts

## Tech Stack Summary

| Layer | Technologies |
|-------|-------------|
| **Web** | React, Vite, TypeScript, Tailwind CSS, React Router |
| **Mobile** | React Native, Expo, TypeScript, React Navigation |
| **Backend** | Node.js, Express, PostgreSQL, Prisma, JWT |
| **Shared** | TypeScript utilities, types, and constants |
| **DevOps** | ESLint, Prettier, npm workspaces |

## Next Steps

1. Install all dependencies: `npm install`
2. Set up PostgreSQL database
3. Configure environment variables in `server/.env`
4. Run database migrations: `npm run db:migrate --workspace=server`
5. Start development: `npm run dev`

## Contributing

See individual README files in each directory for specific contribution guidelines:
- [web/README.md](web/README.md)
- [mobile/README.md](mobile/README.md)
- [server/README.md](server/README.md)
- [shared/README.md](shared/README.md)
