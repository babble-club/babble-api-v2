import type { getTranslatedStringValue } from '@/infrastructure/locales';
import type { ApiResponse } from './interface/http/response/api-response.types';

declare global {
  interface PromiseResolve {
    (_value: void | PromiseLike<void>): void;
    (_value: void | PromiseLike<void>): void;
    (): void;
  }
  namespace Express {
    interface Request {
      context: {
        translate: (
          key: Parameters<typeof getTranslatedStringValue>[1],
          ...args: Parameters<typeof getTranslatedStringValue>[2][]
        ) => string;
      };
    }
    interface Response {
      reply<T = Record<string, unknown>>(response: ApiResponse<T>, statusCode?: number);
      paginatedReply<T = Record<string, unknown>>(response: ApiResponse<T>);
    }
    interface Request {
      context: {
        translate: (
          key: Parameters<typeof getTranslatedStringValue>[1],
          locale?: string,
          ...args: Parameters<typeof getTranslatedStringValue>[2][]
        ) => string;
      };
    }
  }
}
