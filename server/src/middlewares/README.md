# Middlewares

Express middleware functions for request processing.

## Structure

- `auth.middleware.ts` - Authentication middleware
- `authorization.middleware.ts` - Role-based access control
- `validation.middleware.ts` - Request validation
- `error.middleware.ts` - Error handling
- `rate-limit.middleware.ts` - Rate limiting
- `upload.middleware.ts` - File upload handling
- `logger.middleware.ts` - Request logging

## Example

```typescript
// middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

// middlewares/authorization.middleware.ts
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
      });
    }

    next();
  };
};

// middlewares/validation.middleware.ts
import Joi from 'joi';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }

    next();
  };
};
```

## Best Practices

1. **Keep middleware focused** - Each middleware should have a single responsibility
2. **Use next()** to pass control to the next middleware
3. **Handle errors** appropriately and pass them to error handler
4. **Document middleware** with clear comments
5. **Make middleware reusable** across different routes
