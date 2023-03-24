import { ROLE } from '@prisma/client';

export interface AccessTokenPayload {
  ownerId: string;
  accessToken: string;
  role: ROLE;
}

export interface RefreshTokenPayload {
  ownerId: string;
  refreshToken: string;
  role: ROLE;
}
export interface GenerateTokenPairInput {
  accessTokenPayload: AccessTokenPayload;
  refreshTokenPayload: RefreshTokenPayload;
}

export interface TokenPairOutput {
  accessToken: string;
  refreshToken: string;
}

export interface FilterData {
  include?: string[];
  exclude?: string[];
}

export type HashAlgorithms = 'sha256' | 'sha1';
