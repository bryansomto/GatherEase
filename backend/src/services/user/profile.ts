import { IUserRepository } from '../../adapters/repositories/types/interfaces';
import { ICodeGenerator } from '../../utils/types/interfaces';
import { UserNotFound } from '../exceptions';

export class Userprofile {
  public static inject = ['userRepo', 'codeGenerator'] as const;

  constructor(private readonly userRepo: IUserRepository, private readonly codeGenerator: ICodeGenerator) {}

  async getProfile(userId: string): Promise<any> {
    const user = await this.userRepo.getUserById(userId);

    if (!user) throw new UserNotFound('Organizer not found');

    return this.codeGenerator.filterObject(user, { exclude: ['id', 'password'] });
  }
}
