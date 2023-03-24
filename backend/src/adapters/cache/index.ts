import RedisClient from './redis';
import client from './client';

const redisClientService = new RedisClient(client);

export default redisClientService;
