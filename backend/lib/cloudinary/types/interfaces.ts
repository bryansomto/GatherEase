import { UploadApiResponse } from 'cloudinary';
import { CloudinaryImageUploadResponse } from './types';

export interface ICloudinaryImageService {
  uploadImage(image: Express.Multer.File, publicId: string): Promise<UploadApiResponse>;
}
