# ShopLynk Web Application

React-based web application built with Vite, TypeScript, and Tailwind CSS.

## Purpose

This is the web frontend for ShopLynk, providing:
- Store management dashboard
- Product catalog management
- Order tracking and management
- Customer management
- Analytics and reporting
- WhatsApp integration interface

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Zustand** - State management
- **Axios** - HTTP client

## Folder Structure

```
web/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── layouts/        # Layout components
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── services/       # API services
│   ├── context/        # React context providers
│   ├── assets/         # Static assets (images, fonts)
│   ├── App.tsx         # Main App component
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles
├── public/             # Static files
└── package.json        # Dependencies and scripts
```

## Getting Started

### Development

```bash
npm run dev
```

Starts the development server at `http://localhost:3000`

### Build

```bash
npm run build
```

Creates an optimized production build in the `dist/` directory.

### Preview

```bash
npm run preview
```

Preview the production build locally.

## Environment Variables

Create a `.env` file in the web directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_WS_URL=ws://localhost:5000
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code
- `npm run lint:fix` - Fix linting issues

## Contributing

Follow the project's coding standards and ensure all tests pass before submitting PRs.
