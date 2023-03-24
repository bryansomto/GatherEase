import { createClient } from 'redis';
import logger from '../../startup/logging';

const client = createClient();

client.on('error', (err) => logger.error('Redis Client Error', err));

client.connect().then(() => {
  logger.info('Connected to Redis');
});

export default client;
