// File: src/interface/http/middleware/error-handler.ts
import { Elysia } from 'elysia';
import { UnauthorizedError } from '@/shared/errors/unauthorised-error.types';
import { ForbiddenError } from '@/shared/errors/forbidden-error.types';
import { ValidationError } from '@/shared/errors/validation-error.types';

export function errorHandler() {
  return new Elysia().onError(({ code, error, set }) => {
    if (error instanceof ValidationError) {
      set.status = 400;
      return {
        error: {
          code: 'VALIDATION_ERROR',
          message: error.message,
          details: error.details,
        },
      };
    }

    // Default error response
    set.status = code === 'NOT_FOUND' ? 404 : 500;
    return {
      error: {
        code: code,
        message: error.message,
      },
    };
  });
}
