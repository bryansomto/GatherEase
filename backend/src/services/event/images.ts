import { IImageRepo } from '../../adapters/repositories/types/interfaces';
import { EventImageInput } from '../types/types';
import { ICodeGenerator } from '../../utils/types/interfaces';
import { ICloudinaryImageService } from 'lib/cloudinary/types/interfaces';
import { ImageUploadError } from '../exceptions';
import logger from '../../startup/logging';

export default class ImageService {
  public static inject = ['imageRepo', 'codeGenerator', 'cloudinaryImageService'] as const;

  constructor(
    private readonly imageRepo: IImageRepo,
    private readonly codeGenerator: ICodeGenerator,
    private readonly cloudinaryImageService: ICloudinaryImageService
  ) {}

  async uploadEventImage(data: EventImageInput) {
    let imageUrl: string;

    const tag = `events/${data.organizer.id}`;
    const publicId = this.codeGenerator.generatePublicId(data.image.originalname, ['events', data.organizer.id]);

    const imageUpload = this.cloudinaryImageService.uploadImage(data.image, publicId);

    try {
      const { secure_url } = await Promise.resolve(imageUpload);

      if (!secure_url) throw new ImageUploadError('Unable to upload image');

      const newImage = await this.imageRepo.createImage({
        imageUrl: secure_url,
        tag: publicId,
        ownerId: data.organizer.id,
      });

      return newImage;
    } catch (error) {
      logger.error(`Error uploading image: ${error}`);
      throw new ImageUploadError('Unable to upload image');
    }
  }
}
