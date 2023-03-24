import prismaClient from '../adapters/repositories/client';
import logger from './logging';

export default async function connectDb() {
  try {
    await prismaClient.$connect();
    logger.info('Connected to DB');
  } catch (err) {
    logger.error('Could not connect to DB');
  }
}
