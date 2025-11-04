# ShopLynk Backend API

Node.js backend API built with Express, TypeScript, and PostgreSQL.

## Purpose

This is the backend API for ShopLynk, providing:
- RESTful API endpoints
- User authentication and authorization
- Store management
- Product CRUD operations
- Order processing
- Customer management
- WhatsApp API integration (planned)
- Payment processing (planned)

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **PostgreSQL** - Database
- **Prisma** - ORM
- **JWT** - Authentication
- **Helmet** - Security
- **Morgan** - Logging

## Folder Structure

```
server/
├── src/
│   ├── controllers/    # Route controllers
│   ├── routes/         # API routes
│   ├── models/         # Business logic models (if needed beyond Prisma)
│   ├── services/       # Business logic services
│   ├── middlewares/    # Express middlewares
│   ├── utils/          # Utility functions
│   ├── config/         # Configuration files
│   └── app.ts          # Application entry point
├── prisma/
│   ├── schema.prisma   # Database schema
│   └── seed.ts         # Database seeding
├── .env.example        # Environment variables template
└── package.json        # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js >= 18.x
- PostgreSQL database
- npm or yarn

### Installation

1. Install dependencies
```bash
npm install
```

2. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Set up database
```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database (optional)
npm run db:seed
```

### Development

```bash
npm run dev
```

Server starts at `http://localhost:5000`

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Environment Variables

See `.env.example` for all available configuration options.

Key variables:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order status
- `DELETE /api/orders/:id` - Cancel order

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get customer by ID
- `POST /api/customers` - Create customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

## Database Schema

Managed with Prisma ORM. See `prisma/schema.prisma` for the complete schema.

### Main Models
- **User** - Application users
- **Store** - Store/business information
- **Product** - Product catalog
- **Customer** - Customer information
- **Order** - Order management
- **OrderItem** - Order line items
- **Payment** - Payment tracking

### Commands
```bash
# Generate Prisma client
npm run db:generate

# Create migration
npm run db:migrate

# Push schema to database (development)
npm run db:push

# Open Prisma Studio
npm run db:studio
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Lint code
- `npm run lint:fix` - Fix linting issues
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database

## Contributing

Follow the project's coding standards and ensure all tests pass before submitting PRs.
