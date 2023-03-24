import { config } from 'dotenv';

const envPath = process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production';

config({ path: envPath });

export default function getEnv(envVariable: string): string {
  if (!process.env[envVariable]) {
    throw new Error(`Environemnt variable ${envVariable} not found`);
  } else {
    return process.env[envVariable] as string;
  }
}
