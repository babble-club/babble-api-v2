import type { GenericObject } from '@/shared/types/global.types';

type ErrorDetails = {
  status: number;
  code: string;
  message: string;
  data?: GenericObject;
  error?: Error;
};

export default class HttpErrorProvider extends Error {
  public name = 'HttpRequestError';
  public body?: GenericObject;
  public code: string;
  public status = 500;
  public error?: Error;

  constructor(errorDetails: ErrorDetails) {
    super(errorDetails.message);
    const { status, code, message, error, data } = errorDetails;
    this.status = status;
    this.code = code;
    this.error = error;
    this.body = {
      code,
      message,
      data,
    };
  }
}
