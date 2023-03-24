import { IOrganizerRepository } from '../../adapters/repositories/types/interfaces';
import { ICodeGenerator } from '../../utils/types/interfaces';
import { UserNotFound } from '../exceptions';

export class OrganizerProfile {
  public static inject = ['organizerRepo', 'codeGenerator'] as const;

  constructor(private readonly organizerRepo: IOrganizerRepository, private readonly codeGenerator: ICodeGenerator) {}

  async getProfile(organizerId: string): Promise<any> {
    const organizer = await this.organizerRepo.getOrganizerFullProfile(organizerId);

    if (!organizer) throw new UserNotFound('Organizer not found');

    return this.codeGenerator.filterObject(organizer, { exclude: ['password'] });
  }
}
