import { PrismaClient, Token } from '@prisma/client';
import { ITokenRepository } from './types/interfaces';
import { CreateTokenInput } from './types/types';

export default class TokenRepository implements ITokenRepository {
  constructor(private readonly client: PrismaClient) {
    this.client = client;
  }

  async createToken(data: CreateTokenInput): Promise<Token> {
    return this.client.token.create({
      data,
    });
  }

  async deleteToken(id: string): Promise<void> {
    await this.client.token.delete({
      where: { id },
    });
  }

  async getToken(token: string): Promise<Token | null> {
    return this.client.token.findUnique({
      where: { token },
    });
  }

  async getRefreshToken(refreshToken: string): Promise<Token | null> {
    return this.client.token.findUnique({
      where: { refreshToken },
    });
  }

  async getUserTokens(ownerId: string): Promise<Token[]> {
    return this.client.token.findMany({
      where: {
        ownerId,
      },
    });
  }

  async updateAccessToken(tokenId: string, newToken: string): Promise<Token> {
    return this.client.token.update({
      where: { id: tokenId },
      data: { token: newToken },
    });
  }

  async deleteUserTokens(ownerId: string): Promise<void> {
    await this.client.token.deleteMany({
      where: {
        ownerId,
      },
    });
  }
}
