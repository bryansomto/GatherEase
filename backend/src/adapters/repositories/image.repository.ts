import { Image, PrismaClient } from '@prisma/client';
import { ImageDataInput } from './types/types';
import { IImageRepo } from './types/interfaces';

export default class ImageRepository implements IImageRepo {
  private client;

  constructor(prismaClient: PrismaClient) {
    this.client = prismaClient;
  }

  async createImage(data: ImageDataInput): Promise<Image> {
    return this.client.image.create({
      data,
    });
  }

  async deleteImage(imageId: string): Promise<void> {
    this.client.image.delete({
      where: { id: imageId },
    });
  }

  // async deleteImages(ids: string[]): Promise<void> {
  //   this.client.image.deleteMany({
  //     where: { id IN ids }
  //   })
  // }
}
