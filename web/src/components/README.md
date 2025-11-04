# Components

Reusable UI components for the web application.

## Structure

- **ui/** - Basic UI components (Button, Input, Card, etc.)
- **layout/** - Layout-specific components (Header, Sidebar, Footer)
- **features/** - Feature-specific components (ProductCard, OrderList, etc.)

## Example

```tsx
// components/ui/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ children, onClick, variant = 'primary' }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded ${variant === 'primary' ? 'bg-primary-600' : 'bg-secondary-600'}`}
    >
      {children}
    </button>
  );
};
```
