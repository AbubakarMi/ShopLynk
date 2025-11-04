# Routes

Express route definitions for API endpoints.

## Structure

Routes should be organized by resource:

- `auth.routes.ts` - Authentication routes
- `product.routes.ts` - Product routes
- `order.routes.ts` - Order routes
- `customer.routes.ts` - Customer routes
- `store.routes.ts` - Store routes
- `whatsapp.routes.ts` - WhatsApp integration routes

## Example

```typescript
// routes/product.routes.ts
import { Router } from 'express';
import { productController } from '../controllers/product.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { productValidation } from '../middlewares/validators/product.validator';

const router = Router();

// All product routes require authentication
router.use(authenticate);

// GET /api/products/:storeId
router.get('/:storeId', productController.getAll);

// GET /api/products/:storeId/:id
router.get('/:storeId/:id', productController.getById);

// POST /api/products
router.post(
  '/',
  validate(productValidation.create),
  productController.create
);

// PUT /api/products/:id
router.put(
  '/:id',
  validate(productValidation.update),
  productController.update
);

// DELETE /api/products/:id
router.delete('/:id', productController.delete);

export default router;
```

## Best Practices

1. **Use middleware** for authentication, validation, and authorization
2. **Group related routes** using route prefixes
3. **Apply validation** before controller logic
4. **Use consistent naming** for route parameters
5. **Document routes** with comments for complex endpoints
