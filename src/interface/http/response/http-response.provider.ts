import type { GenericObject } from '@/shared/types/global.types';
import type { HttpStatusCode } from '@/interface/http/constants/http-status';
import {
  type ErrorKey,
  type ModuleName,
  type ResponseMapper,
  responseMapper,
  type ResponseMessage,
  type SuccessKey,
} from './http-response.mapper';

interface GenerateResponse<_T extends ModuleName> {
  code: HttpStatusCode;
  json: {
    status: boolean;
    success: ResponseMessage | null;
    error: ResponseMessage | null;
    body: GenericObject | null;
  };
}

export default class HttpResponseProvider {
  private responseMapper: ResponseMapper = responseMapper;

  /**
   * Generates a standardized response object with type safety.
   *
   * @param code The HTTP status code.
   * @param module The module name (e.g., 'parent', 'auth'). Must be a key of `responseMapper`.
   * @param body Optional data to include in the response.
   * @param successMapper Optional key for a success message from the `responseMapper`.
   * @param errMapper Optional key for an error message from the `responseMapper`.
   * @returns A structured response object with status, success/error messages, and body.
   */
  public generate<T extends ModuleName>(
    code: HttpStatusCode,
    module: T,
    body: GenericObject | null = null,
    successMapper: SuccessKey<T> | '' = '',
    errMapper: ErrorKey<T> | '' = ''
  ): GenerateResponse<T> {
    const mappedModule = responseMapper[module];
    const success = successMapper
      ? mappedModule?.success[successMapper as keyof typeof mappedModule.success] || null
      : null;
    const error = errMapper
      ? mappedModule?.error[errMapper as keyof typeof mappedModule.error] || null
      : null;
    const status = code >= 200 && code < 300; //check range for success
    return {
      code: code,
      json: {
        status,
        success,
        error,
        body,
      },
    };
  }
}
