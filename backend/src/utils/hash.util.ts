import { createHmac } from 'node:crypto';
import bcrypt from 'bcrypt';
import appConfig from '../config';
import { IHashGenerator } from './types/interfaces';
import { HashAlgorithms } from './types/types';
import path from 'node:path';

export default class HashGenerator implements IHashGenerator {
  bcrypt = bcrypt;

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, parseInt(appConfig.hashing.SALT_ROUNDS));
  }

  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  generateHashDigest(parameters: string, secret: string, algorithm: HashAlgorithms) {
    const hmac = createHmac(algorithm, secret);

    hmac.update(parameters);

    const digest = hmac.digest('hex');

    return digest;
  }
}
