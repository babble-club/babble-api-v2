export interface ResponseMessage {
  code: number;
  msg: string;
  subMsg?: string; // Optional property
}

export interface ResponseCategory {
  success: Record<string, ResponseMessage>;
  error: Record<string, ResponseMessage>;
}

export interface ResponseMapper {
  parent: ResponseCategory;
  auth: ResponseCategory;
}

export type ModuleName = keyof ResponseMapper;
export type SuccessKey<T extends ModuleName> = keyof ResponseMapper[T]['success'];
export type ErrorKey<T extends ModuleName> = keyof ResponseMapper[T]['error'];

export const responseMapper: ResponseMapper = {
  parent: {
    success: {
      '1': {
        code: 1,
        msg: 'OTP Generated. Needs verification',
        subMsg: 'Parent successfully registered',
      },
      '2': {
        code: 2,
        msg: 'OTP Generated. Needs verification',
        subMsg: 'Parent fetched. Needs OTP Verification',
      },
      '3': {
        code: 3,
        msg: 'Login successful',
      },
    },
    error: {
      '1': {
        code: 1,
        msg: 'Parent email does not exist',
      },
      '2': {
        code: 2,
        msg: 'Parent data not found',
        subMsg: 'Exception: Details not found in memory',
      },
      '3': {
        code: 3,
        msg: 'Login validation failed',
      },
      '4': {
        code: 4,
        msg: 'Login: Invalid OTP',
        subMsg: 'Login failed due to invalid OTP',
      },
      '5': {
        code: 5,
        msg: 'OTP generation failed.',
      },
    },
  },
  auth: {
    success: {
      '1': {
        code: 1,
        msg: 'Valid session token',
      },
    },
    error: {
      '1': {
        code: 1,
        msg: 'You are not authorised to access this resource',
        subMsg: 'Unauthorised: Token missing',
      },
    },
  },
};
