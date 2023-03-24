import { ITokenRepository, IUserRepository, IVerify } from '../../adapters/repositories/types/interfaces';
import { ICodeGenerator, IHashGenerator, IJwtGenerator } from '../../utils/types/interfaces';
import { AuthenticateUserOutput, UserConfirmationInput, UserLoginInput, UserRegistrationInput } from '../types/types';
import { User } from '@prisma/client';
import {
  InvalidCode,
  InvalidCredentials,
  InvalidToken,
  UserAlreadyVerified,
  UserExistsError,
  UserNotFound,
  VerificationNotFound,
} from '../exceptions';
import eventDispatcher from '../../adapters/events';
import { IRedisClient } from '../../adapters/cache/types/interfaces';

export class UserAuthService {
  public static inject = [
    'jwtGeneratorService',
    'userRepo',
    'hashGeneratorService',
    'verifyRepo',
    'codeGeneratorService',
    'tokenRepo',
    'redisClientService',
  ] as const;

  constructor(
    private readonly jwtGeneratorService: IJwtGenerator,
    private readonly userRepo: IUserRepository,
    private readonly hashGeneratorService: IHashGenerator,
    private readonly verifyRepo: IVerify,
    private readonly codeGeneratorService: ICodeGenerator,
    private readonly tokenRepo: ITokenRepository,
    private readonly redisClientService: IRedisClient
  ) {}

  async registerUser(data: UserRegistrationInput): Promise<User> {
    // check existing user
    const existingUserEmail = await this.userRepo.getUserByEmail(data.email);
    const existingUserPhone = await this.userRepo.getUserByEmail(data.email);

    if (existingUserEmail) throw new UserExistsError(`Email ${data.email} is already registered`);
    if (existingUserPhone) throw new UserExistsError(`Email ${data.phone} is already registered`);

    // hash password

    const password = await this.hashGeneratorService.hashPassword(data.password);

    // create user in DB
    const newUser = await this.userRepo.createUser({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      fullName: `${data.firstName} ${data.lastName}`,
      phone: data.phone,
      password,
    });

    // Generate code and store in DB
    const verificationCode = this.codeGeneratorService.generatePhoneVerificationCode();

    // store verification code in DB
    await this.verifyRepo.createVerification({ code: verificationCode, ownerId: newUser.id });

    // send verification code
    eventDispatcher.dispatch('onUserRegistration', { user: newUser, code: verificationCode });

    return newUser;
  }

  async userConfirmation(data: UserConfirmationInput) {
    // retrieve user

    const existingUser = await this.userRepo.getUserByPhone(data.phone);
    if (!existingUser) throw new UserNotFound(`Phone number ${data.phone} is not registered`);

    if (existingUser.isVerified) throw new UserAlreadyVerified('User is already verified');

    const verify = await this.verifyRepo.getVerification(existingUser.id);
    if (!verify) throw new VerificationNotFound('Verification code not found');

    if (verify.code !== data.code) {
      throw new InvalidCode('Invalid code');
    }
    // delete code and mark user as verified
    await this.verifyRepo.deleteVerfication(existingUser.id);

    await this.userRepo.updateVerificationStatus(existingUser.id, true);

    eventDispatcher.dispatch('onUserConfirmation', { user: existingUser });

    return true;
  }

  async authenticateUser(data: UserLoginInput): Promise<AuthenticateUserOutput> {
    const existingUser = await this.userRepo.getUserByEmail(data.email);

    if (!existingUser) throw new UserNotFound(`Email ${data.email} not registered`);

    const validPassword = await this.hashGeneratorService.validatePassword(data.password, existingUser.password);

    if (!validPassword) throw new InvalidCredentials('Invalid email or password');

    const userAccessToken = this.codeGeneratorService.generateRandomToken();
    const userRefreshToken = this.codeGeneratorService.generateRandomToken();

    // store user and AccessToken in Redis
    await this.redisClientService.setUser(userAccessToken, existingUser);

    const accessTokenPayload = {
      ownerId: existingUser.id,
      role: existingUser.role,
      accessToken: userAccessToken,
    };
    const refreshTokenPayload = {
      ownerId: existingUser.id,
      refreshToken: userRefreshToken,
      role: existingUser.role,
    };

    // store tokens in DB
    await this.tokenRepo.createToken({
      ownerId: existingUser.id,
      token: userAccessToken,
      refreshToken: userRefreshToken,
    });

    //update lastLogin
    this.userRepo.updateLastLogin(existingUser.id);

    // Generate jwt tokens
    const { accessToken, refreshToken } = this.jwtGeneratorService.generateTokenPair({
      accessTokenPayload,
      refreshTokenPayload,
    });

    return {
      accessToken,
      refreshToken,
      user: existingUser,
    };
  }

  async refreshUserToken(refershToken: string) {
    // decode token
    const decodedToken = await this.jwtGeneratorService.verifyRefreshToken(refershToken);

    // check existing token
    const token = await this.tokenRepo.getRefreshToken(decodedToken.refreshToken);

    if (!token) throw new InvalidToken('Token is invalid');

    if (token.ownerId !== decodedToken.ownerId) throw new InvalidToken('Token is invalid');

    // Generate new refreshToken
    const newAccessToken = this.codeGeneratorService.generateRandomToken();

    // save new access token to DB
    await this.tokenRepo.updateAccessToken(token.id, newAccessToken);

    const accessTokenPayload = {
      ownerId: decodedToken.ownerId,
      role: decodedToken.role,
      accessToken: newAccessToken,
    };

    const newJwtRefreshToken = this.jwtGeneratorService.generateAccessToken(accessTokenPayload);

    return newJwtRefreshToken;
  }
}
