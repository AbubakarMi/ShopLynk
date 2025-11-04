# Pages

Top-level page components for the application routes.

## Structure

Each page should correspond to a route in the application:

- `Home.tsx` - Landing page
- `Dashboard.tsx` - Main dashboard
- `Products.tsx` - Product management
- `Orders.tsx` - Order management
- `Customers.tsx` - Customer management
- `Settings.tsx` - Application settings
- `Login.tsx` - Authentication page
- `Register.tsx` - Registration page

## Example

```tsx
// pages/Dashboard.tsx
import { DashboardLayout } from '@/layouts/DashboardLayout';

export const Dashboard = () => {
  return (
    <DashboardLayout>
      <h1>Dashboard</h1>
      {/* Dashboard content */}
    </DashboardLayout>
  );
};
```
