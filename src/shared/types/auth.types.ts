export interface BaseUser {
  fullName: string;
  email: string;
  type: string;
  roles: string[];
  created: number;
  company: {
    id: string;
    name: string;
    featureFlags: string[];
  };
}

export interface ICSUserJwtPayload extends BaseUser {
  iat: number;
  nbf: number;
  exp: number;
  aud: string;
  iss: string;
  sub: string;
  jti: string;
}

export type ICSUser = BaseUser;
