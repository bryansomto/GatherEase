import { PrismaClient, Verify } from '@prisma/client';
import { IVerify } from './types/interfaces';
import { CreateVerifyInput } from './types/types';

export default class VerifyRepository implements IVerify {
  private client;

  constructor(prismaClient: PrismaClient) {
    this.client = prismaClient;
  }

  async createVerification(data: CreateVerifyInput): Promise<Verify> {
    return this.client.verify.create({
      data,
    });
  }

  async getVerification(ownerId: string): Promise<Verify | null> {
    return this.client.verify.findUnique({
      where: { ownerId },
    });
  }

  async updateVerification(ownerId: string, code: string): Promise<Verify> {
    return this.client.verify.update({
      where: { ownerId },
      data: { code },
    });
  }

  async deleteVerfication(ownerId: string): Promise<any> {
    return this.client.verify.delete({
      where: { ownerId },
    });
  }
}
