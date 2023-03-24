import getEnv from './base.config';

export const devConfig = {
  database: {
    DATABASE_URL: getEnv('DATABASE_URL'),
  },
  app: {
    PORT: getEnv('PORT'),
    VERIFICATION_CODE_LENGTH: getEnv('VERIFICATION_CODE_LENGTH'),
  },
  twilio: {
    TWILIO_ACCOUNT_SID: getEnv('TWILIO_ACCOUNT_SID'),
    TWILIO_AUTH_TOKEN: getEnv('TWILIO_AUTH_TOKEN'),
    TWILIO_GATHEREASE_SID: getEnv('TWILIO_GATHEREASE_SID'),
  },
  jwt: {
    ACCESS_TOKEN_EXPIRY: getEnv('ACCESS_TOKEN_EXPIRY'),
    REFRESH_TOKEN_EXPIRY: getEnv('REFRESH_TOKEN_EXPIRY'),
    ACCESS_TOKEN_SECRET: getEnv('ACCESS_TOKEN_SECRET'),
    REFRESH_TOKEN_SECRET: getEnv('REFRESH_TOKEN_SECRET'),
  },
  hashing: {
    SALT_ROUNDS: getEnv('SALT_ROUNDS'),
  },
  cloudinary: {
    CLOUDINARY_API_KEY: getEnv('CLOUDINARY_API_KEY'),
    CLOUDINARY_API_SECRET: getEnv('CLOUDINARY_API_SECRET'),
    CLOUDINARY_URL: getEnv('CLOUDINARY_URL'),
    CLOUDINARY_CLOUD_NAME: getEnv('CLOUDINARY_CLOUD_NAME'),
  },
};
