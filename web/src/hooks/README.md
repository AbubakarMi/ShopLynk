# Hooks

Custom React hooks for shared logic across components.

## Examples

- `useAuth.ts` - Authentication logic
- `useApi.ts` - API call wrapper
- `useLocalStorage.ts` - Local storage management
- `useDebounce.ts` - Debounce utility
- `useMediaQuery.ts` - Responsive design helper

## Example

```tsx
// hooks/useAuth.ts
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Authentication logic here

  return { user, loading, login, logout };
};
```
