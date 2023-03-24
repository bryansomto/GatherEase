import { AccessTokenPayload, FilterData, GenerateTokenPairInput, RefreshTokenPayload, TokenPairOutput } from './types';

export interface IJwtGenerator {
  generateTokenPair(payload: GenerateTokenPairInput): TokenPairOutput;

  generateAccessToken(payload: AccessTokenPayload): string;

  verifyAccessToken(token: string): any;

  verifyRefreshToken(token: string): any;
}

export interface IHashGenerator {
  hashPassword(password: string): Promise<string>;

  validatePassword(password: string, hashedPassword: string): Promise<boolean>;
}

export interface ICodeGenerator {
  filterObject(obj: { [key: string]: any }, filterData: FilterData): { [key: string]: any };

  generatePhoneVerificationCode(): string;

  cleanToken(token: string): string;

  generateRandomToken(): string;

  generatePublicId(fileName: string, folders: string[]): string;
}
