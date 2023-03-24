import OrganizerAuthService from './auth';
import { createInjector } from 'typed-inject';
import { organizerRepo, verifyRepo, profileRepo, tokenRepo } from '../../adapters/repositories';
import { jwtGenerator, hashGenerator, codeGenerator } from '../../utils';
import { OrganizerProfile } from './profile';
import redisClientService from '../../adapters/cache';

const organizerAuthServiceInjector = createInjector()
  .provideValue('organizerRepo', organizerRepo)
  .provideValue('verifyRepo', verifyRepo)
  .provideValue('profileRepo', profileRepo)
  .provideValue('tokenRepo', tokenRepo)
  .provideValue('jwtGeneratorService', jwtGenerator)
  .provideValue('hashGeneratorService', hashGenerator)
  .provideValue('codeGeneratorService', codeGenerator)
  .provideValue('redisClientService', redisClientService);

const organizerAuthService = organizerAuthServiceInjector.injectClass(OrganizerAuthService);

const organizerProfileInjector = createInjector()
  .provideValue('organizerRepo', organizerRepo)
  .provideValue('codeGenerator', codeGenerator);

const organizerProfileService = organizerProfileInjector.injectClass(OrganizerProfile);

export { organizerAuthService, organizerProfileService };
