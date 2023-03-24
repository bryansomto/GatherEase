import CloudinaryBase from './base.cloudinary';
import { CloudinaryImageUploadResponse } from './types/types';
import { ICloudinaryImageService } from './types/interfaces';
import { UploadApiResponse } from 'cloudinary';
import streamifier from 'streamifier';

export default class CloudinaryImageService extends CloudinaryBase implements ICloudinaryImageService {
  constructor(cloudinary_api_key: string, cloudinary_secret: string, cloud_name: string) {
    super(cloudinary_api_key, cloudinary_secret, cloud_name);
  }

  async uploadImage(image: Express.Multer.File, publicId: string): Promise<UploadApiResponse> {
    const folders = publicId.split('/');
    const fileName = folders.pop()?.split('.')[0];

    let uploadFromBuffer = () => {
      return new Promise((resolve, reject) => {
        let uploadStream = this.cloudinaryClient.uploader.upload_stream(
          {
            folder: folders.join('/'),
            public_id: fileName,
            timestamp: Date.now(),
            resource_type: 'image',
          },
          (error: any, result: any) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

        streamifier.createReadStream(image.buffer).pipe(uploadStream);
      });
    };

    const response = await uploadFromBuffer();
    return response as UploadApiResponse;
  }
}
