import { Category, PrismaClient } from '@prisma/client';
import { ICategortRepository } from './types/interfaces';

export default class CategoryRepository implements ICategortRepository {
  private client;

  constructor(prismaClient: PrismaClient) {
    this.client = prismaClient;
  }

  async createCategory(name: string): Promise<Category> {
    return this.client.category.create({
      data: {
        name: name,
      },
    });
  }

  async deleteCategory(categoryId: string): Promise<void> {
    await this.client.category.delete({
      where: { id: categoryId },
    });
  }
}
