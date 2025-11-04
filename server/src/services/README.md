# Services

Business logic layer for the application.

## Structure

Services contain the core business logic and database operations:

- `auth.service.ts` - Authentication logic
- `product.service.ts` - Product business logic
- `order.service.ts` - Order processing logic
- `customer.service.ts` - Customer management logic
- `store.service.ts` - Store management logic
- `whatsapp.service.ts` - WhatsApp API integration
- `payment.service.ts` - Payment processing (future)
- `email.service.ts` - Email notifications (future)

## Example

```typescript
// services/product.service.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ProductService {
  // Find all products for a store
  async findAll(storeId: string) {
    return await prisma.product.findMany({
      where: { storeId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Find product by ID
  async findById(id: string) {
    return await prisma.product.findUnique({
      where: { id },
      include: {
        store: true,
      },
    });
  }

  // Create new product
  async create(data: any) {
    return await prisma.product.create({
      data,
    });
  }

  // Update product
  async update(id: string, data: any) {
    return await prisma.product.update({
      where: { id },
      data,
    });
  }

  // Delete product
  async delete(id: string) {
    return await prisma.product.delete({
      where: { id },
    });
  }

  // Search products
  async search(storeId: string, query: string) {
    return await prisma.product.findMany({
      where: {
        storeId,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
    });
  }
}

export const productService = new ProductService();
```

## Best Practices

1. **Separate concerns** - Keep business logic in services, not controllers
2. **Use Prisma** for database operations
3. **Handle errors** appropriately and throw meaningful error messages
4. **Validate data** before database operations
5. **Use transactions** for complex operations that modify multiple tables
