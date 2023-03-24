import jwt, { JwtPayload } from 'jsonwebtoken';
import { AccessTokenPayload, GenerateTokenPairInput, RefreshTokenPayload, TokenPairOutput } from './types/types';
import appConfig from '../config';
import { IJwtGenerator } from './types/interfaces';
import { InvalidToken } from '../services/exceptions';

export default class JwtGenerator implements IJwtGenerator {
  generateTokenPair(payload: GenerateTokenPairInput): TokenPairOutput {
    const accessToken = jwt.sign(payload.accessTokenPayload, appConfig.jwt.ACCESS_TOKEN_SECRET, {
      expiresIn: appConfig.jwt.ACCESS_TOKEN_EXPIRY,
    });
    const refreshToken = jwt.sign(payload.refreshTokenPayload, appConfig.jwt.REFRESH_TOKEN_SECRET, {
      expiresIn: appConfig.jwt.REFRESH_TOKEN_EXPIRY,
    });

    return { accessToken, refreshToken };
  }

  generateAccessToken(payload: AccessTokenPayload): string {
    return jwt.sign(payload, appConfig.jwt.ACCESS_TOKEN_SECRET, {
      expiresIn: appConfig.jwt.ACCESS_TOKEN_EXPIRY,
    });
  }

  verifyAccessToken(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, appConfig.jwt.ACCESS_TOKEN_SECRET);

      return decoded as JwtPayload;
    } catch (error) {
      throw new InvalidToken('Invalid token');
    }
  }

  verifyRefreshToken(token: string) {
    try {
      const decoded = jwt.verify(token, appConfig.jwt.REFRESH_TOKEN_SECRET);

      return decoded;
    } catch (error) {
      throw new InvalidToken('Invalid token');
    }
  }
}
