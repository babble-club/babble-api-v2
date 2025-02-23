import type { Request } from 'express';

export interface ContextualRequest extends Request {
  context: {
    translate: (
      key: 'error' | 'success' | 'ok' | 'somethingBadHappened',
      ...args: (string | number)[]
    ) => string;
  };
}
