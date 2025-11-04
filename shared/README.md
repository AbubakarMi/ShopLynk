# Shared Package

Shared utilities, types, and constants used across web, mobile, and server applications.

## Purpose

This package contains code that is reused across multiple parts of the ShopLynk monorepo:
- TypeScript type definitions
- Utility functions
- Constants and enums
- Validation schemas
- Common business logic

## Structure

```
shared/
├── src/
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   ├── constants/     # Constants and enums
│   └── index.ts       # Main export file
├── tsconfig.json
└── package.json
```

## Usage

### In Web Application

```typescript
import { UserRole, formatCurrency } from '@shoplynk/shared';
```

### In Mobile Application

```typescript
import { OrderStatus, validateEmail } from '@shoplynk/shared';
```

### In Server Application

```typescript
import { ProductType, calculateDiscount } from '@shoplynk/shared';
```

## Examples

### Types

```typescript
// types/user.types.ts
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}
```

### Utils

```typescript
// utils/currency.ts
export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

// utils/validation.ts
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

### Constants

```typescript
// constants/order.ts
export const ORDER_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
} as const;

export type OrderStatus = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];
```

## Building

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` directory.

## Best Practices

1. **Keep it platform-agnostic** - Don't include platform-specific code
2. **Export everything** from `index.ts` for easy imports
3. **Document types** with JSDoc comments
4. **Use TypeScript** for type safety
5. **Keep functions pure** - No side effects in utility functions
