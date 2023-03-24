import { User } from '@prisma/client';
import { UserAuthenticationInput, UserRegistrationInput } from './types';

export interface IUserAuthService {
  registerUser(data: UserRegistrationInput): Promise<User>;

  loginUser(data: UserAuthenticationInput): Promise<User>;
}
