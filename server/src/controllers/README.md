# Controllers

Route controllers handle HTTP requests and responses.

## Structure

Controllers should be organized by resource:

- `auth.controller.ts` - Authentication handlers
- `product.controller.ts` - Product CRUD handlers
- `order.controller.ts` - Order management handlers
- `customer.controller.ts` - Customer management handlers
- `store.controller.ts` - Store management handlers
- `whatsapp.controller.ts` - WhatsApp integration handlers

## Example

```typescript
// controllers/product.controller.ts
import { Request, Response, NextFunction } from 'express';
import { productService } from '../services/product.service';

export class ProductController {
  // Get all products
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { storeId } = req.params;
      const products = await productService.findAll(storeId);
      res.json({ success: true, data: products });
    } catch (error) {
      next(error);
    }
  }

  // Get product by ID
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await productService.findById(id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
      res.json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  }

  // Create product
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.create(req.body);
      res.status(201).json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  }

  // Update product
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await productService.update(id, req.body);
      res.json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  }

  // Delete product
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await productService.delete(id);
      res.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

export const productController = new ProductController();
```
