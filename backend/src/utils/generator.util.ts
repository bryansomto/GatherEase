import { randomInt, randomUUID } from 'crypto';
import { ICodeGenerator } from './types/interfaces';
import appConfig from '../config';
import { FilterData } from './types/types';
import path from 'path';

export class CodeGenerator implements ICodeGenerator {
  phoneCodeLength = parseInt(appConfig.app.VERIFICATION_CODE_LENGTH);
  generatePhoneVerificationCode(): string {
    let code = Math.random();

    code *= parseInt(`1${`0`.repeat(this.phoneCodeLength)}`);

    return Math.round(code).toString().padStart(this.phoneCodeLength, '0');
  }

  cleanToken(token: string): string {
    let newToken = token.split('-');
    newToken.push(Date.now().toString());
    return newToken.join('');
  }

  generateRandomToken(): string {
    const token = randomUUID();
    return this.cleanToken(token);
  }

  filterObject(obj: { [key: string]: any }, filterData: FilterData): { [key: string]: any } {
    if (!obj) return {};
    let newObj = { ...obj };

    if (filterData.exclude) {
      filterData.exclude.forEach((field) => {
        delete newObj[field];
      });
    }

    if (filterData.include) {
      newObj = {};
      filterData.include.forEach((field) => {
        newObj[field] = obj[field];
      });
    }

    return newObj;
  }

  generatePublicId(fileName: string, folders: string[]): string {
    const ext = path.extname(fileName);
    const newFileName = this.generateRandomToken() + ext;

    folders.push(newFileName);

    return path.join(...folders.map((e) => e));
  }
}
