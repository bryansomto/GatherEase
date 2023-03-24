import appConfig from '../../src/config';
import CloudinaryImageService from './images.cloudinary';

const cloudinaryApiKey = appConfig.cloudinary.CLOUDINARY_API_KEY;
const cloudinarySecret = appConfig.cloudinary.CLOUDINARY_API_SECRET;
const cloudinaryCloudName = appConfig.cloudinary.CLOUDINARY_CLOUD_NAME;

const cloudinaryImageService = new CloudinaryImageService(cloudinaryApiKey, cloudinarySecret, cloudinaryCloudName);

export { cloudinaryImageService };
