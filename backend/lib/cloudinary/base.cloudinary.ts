import { v2 as cloudinary } from 'cloudinary';

export default class CloudinaryBase {
  cloudinary_api_key: string;
  cloudinary_secret: string;
  cloud_name: string;
  cloudinaryClient = cloudinary;

  constructor(cloudinary_api_key: string, cloudinary_secret: string, cloud_name: string) {
    this.cloudinary_api_key = cloudinary_api_key;
    this.cloudinary_secret = cloudinary_secret;
    this.cloud_name = cloud_name;

    this.cloudinaryClient.config({
      cloud_name: this.cloud_name,
      api_key: this.cloudinary_api_key,
      api_secret: this.cloudinary_secret,
      secure: true,
    });
  }
}
