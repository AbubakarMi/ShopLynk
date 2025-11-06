# Getting Started with ShopLynk

This guide will help you set up the ShopLynk monorepo on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **npm** >= 9.0.0 (comes with Node.js)
- **PostgreSQL** >= 14 ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/downloads))
- **Expo CLI** (for mobile development)
  ```bash
  npm install -g expo-cli
  ```

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ShopLynk
```

### 2. Install Dependencies

Install all dependencies for the monorepo:

```bash
npm install
```

This will install dependencies for all workspaces (web, mobile, server, shared).

### 3. Set Up Environment Variables

#### Server Environment Variables

```bash
# Copy the example environment file
cp server/.env.example server/.env
```

Edit `server/.env` with your configuration:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/shoplynk

# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secret-jwt-key-here

# Server Port
PORT=5000

# CORS Origin
CORS_ORIGIN=http://localhost:3000
```

#### Web Environment Variables (Optional)

Create `web/.env` if you need custom configuration:

```env
VITE_API_URL=http://localhost:5000/api
```

#### Mobile Environment Variables

Environment variables for mobile are configured in `mobile/app.json` under the `extra` section.

### 4. Set Up the Database

#### Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE shoplynk;

# Exit psql
\q
```

#### Run Migrations

```bash
# Generate Prisma Client
npm run db:generate --workspace=server

# Run migrations
npm run db:migrate --workspace=server

# (Optional) Seed the database
npm run db:seed --workspace=server
```

### 5. Start Development Servers

You have several options for starting the development servers:

#### Option A: Start All Services (Recommended)

```bash
# Starts web and server concurrently
npm run dev
```

#### Option B: Start Services Individually

In separate terminal windows:

```bash
# Terminal 1: Start the backend server
npm run start:server

# Terminal 2: Start the web application
npm run start:web

# Terminal 3: Start the mobile application
npm run start:mobile
```

### 6. Access the Applications

Once the servers are running:

- **Web Application**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health
- **Mobile App**: Scan QR code in Expo Go app

## Development Workflow

### Web Development

```bash
# Start development server
cd web
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

### Mobile Development

```bash
# Start Expo development server
cd mobile
npm start

# Run on iOS simulator (Mac only)
npm run ios

# Run on Android emulator
npm run android

# Run on web (for testing)
npm run web
```

### Backend Development

```bash
# Start development server with hot reload
cd server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database commands
npm run db:generate  # Generate Prisma Client
npm run db:migrate   # Run migrations
npm run db:push      # Push schema (dev only)
npm run db:studio    # Open Prisma Studio
```

### Shared Package Development

```bash
cd shared
npm run build
```

## Database Management

### Prisma Studio

Open Prisma Studio to visually manage your database:

```bash
npm run db:studio --workspace=server
```

### Creating Migrations

When you modify the Prisma schema:

```bash
# Create and apply migration
npm run db:migrate --workspace=server

# Give your migration a descriptive name when prompted
```

### Resetting Database

```bash
# WARNING: This will delete all data
cd server
npx prisma migrate reset
```

## Code Quality

### Linting

```bash
# Lint all workspaces
npm run lint

# Fix linting issues
npm run lint:fix

# Lint specific workspace
npm run lint --workspace=web
```

### Formatting

```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

## Building for Production

### Build All Projects

```bash
npm run build
```

### Build Individual Projects

```bash
# Build web application
npm run build:web

# Build server
npm run build:server

# Build mobile application
npm run build:mobile
```

## Common Issues and Solutions

### Issue: Port Already in Use

**Solution**: Change the port in the respective `.env` file or kill the process using the port.

```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

### Issue: Database Connection Error

**Solution**:
1. Ensure PostgreSQL is running
2. Verify `DATABASE_URL` in `server/.env`
3. Check database exists
4. Verify credentials

### Issue: Prisma Client Errors

**Solution**: Regenerate the Prisma Client

```bash
npm run db:generate --workspace=server
```

### Issue: Module Not Found Errors

**Solution**: Reinstall dependencies

```bash
# Clean node_modules
npm run clean

# Reinstall
npm install
```

### Issue: TypeScript Errors

**Solution**: Rebuild TypeScript

```bash
# Clean and rebuild
rm -rf */dist
npm run build
```

## Testing the Setup

### Test Backend API

```bash
# Health check
curl http://localhost:5000/health

# Expected response:
# {"status":"OK","message":"ShopLynk API is running","timestamp":"..."}
```

### Test Web Application

1. Open http://localhost:3000 in your browser
2. You should see "Welcome to ShopLynk" message

### Test Mobile Application

1. Install Expo Go on your phone
2. Scan the QR code from the terminal
3. The app should open on your device

## Next Steps

Now that you have everything set up:

1. **Explore the codebase**: Start with the README files in each directory
2. **Review the database schema**: Check `server/prisma/schema.prisma`
3. **Understand the API structure**: Look at `server/src/controllers` and `server/src/routes`
4. **Check shared utilities**: Explore `shared/src` for reusable code
5. **Start building features**: Begin with simple CRUD operations

## Additional Resources

- [React Documentation](https://react.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Getting Help

If you encounter any issues:

1. Check the README files in each directory
2. Review the documentation links above
3. Search for similar issues in the project repository
4. Ask for help in the project's communication channels

## Contributing

Please read the CONTRIBUTING.md file for details on our code of conduct and the process for submitting pull requests.

---

Happy coding! 🚀
