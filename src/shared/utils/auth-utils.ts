import { UnauthorizedError } from '../errors/unauthorised-error.types';
import { ValidationMessages } from '../constants/validation-messages';
import { HttpHeaders } from '@/interface/http/constants/http-headers';

export const parseAuthenticationToken = (headers: Headers): string => {
  try {
    const authHeader = headers.get(HttpHeaders.AUTHORIZATION);
    if (!authHeader) {
      throw new UnauthorizedError(ValidationMessages.AUTHORIZATION.MISSING_AUTH_HEADER);
    }

    const [tokenType, token] = authHeader.split(' ');
    if (tokenType !== 'Bearer' || !token) {
      throw new UnauthorizedError(ValidationMessages.AUTHORIZATION.INVALID_TOKEN);
    }

    return token;
  } catch (error) {
    console.error(error);
    throw new UnauthorizedError(ValidationMessages.AUTHORIZATION.TOKEN_PARSING_FAILED);
  }
};
