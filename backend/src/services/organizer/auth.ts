import {
  IOrganizerRepository,
  IProfileRepositiory,
  ITokenRepository,
  IVerify,
} from '../../adapters/repositories/types/interfaces';
import { ICodeGenerator, IHashGenerator, IJwtGenerator } from '../../utils/types/interfaces';
import {
  AuthenticateOrganizerOutput,
  OrganizerConfirmationInput,
  OrganizerLoginInput,
  OrganizerRegistrationInput,
  RefreshOrganizerInput,
} from '../types/types';
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

export default class OrganizerAuthService {
  public static inject = [
    'organizerRepo',
    'verifyRepo',
    'profileRepo',
    'tokenRepo',
    'jwtGeneratorService',
    'hashGeneratorService',
    'codeGeneratorService',
    'redisClientService',
  ] as const;

  constructor(
    private readonly organizerRepo: IOrganizerRepository,
    private readonly verifyRepo: IVerify,
    private readonly profileRepo: IProfileRepositiory,
    private readonly tokenRepo: ITokenRepository,
    private readonly jwtGeneratorService: IJwtGenerator,
    private readonly hashGeneratorService: IHashGenerator,
    private readonly codeGeneratorService: ICodeGenerator,
    private readonly redisClientService: IRedisClient
  ) {}

  async registerOrganizer(data: OrganizerRegistrationInput) {
    // check existing organizer
    const existingEmail = await this.organizerRepo.getOrganizerByEmail(data.email);
    const existingPhone = await this.organizerRepo.getOrganizerByPhone(data.phone);

    if (existingEmail) throw new UserExistsError(`Email ${data.email} is already registered`);
    if (existingPhone) throw new UserExistsError(`Email ${data.phone} is already registered`);

    // hash password
    const password = await this.hashGeneratorService.hashPassword(data.password);

    // create organizer in DB
    const newOrganizer = await this.organizerRepo.createOrganizer({
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
    await this.verifyRepo.createVerification({ code: verificationCode, ownerId: newOrganizer.id });

    // send verification code
    eventDispatcher.dispatch('onUserRegistration', { user: newOrganizer, code: verificationCode });

    return newOrganizer;
  }

  async organizerConfirmation(data: OrganizerConfirmationInput) {
    // retrieve user

    const existingOrganizer = await this.organizerRepo.getOrganizerByPhone(data.phone);
    if (!existingOrganizer) throw new UserNotFound(`Phone number ${data.phone} is not registered`);

    const organizerProfile = await this.profileRepo.getOrganizerProfile(existingOrganizer.id);
    if (organizerProfile?.isVerified) throw new UserAlreadyVerified('User is already verified');

    const verify = await this.verifyRepo.getVerification(existingOrganizer.id);
    if (!verify) throw new VerificationNotFound('Verification code not found');

    if (verify.code !== data.code) {
      throw new InvalidCode('Invalid code');
    }
    // delete code and mark user as verified
    await this.verifyRepo.deleteVerfication(existingOrganizer.id);

    await this.organizerRepo.updateVerificationStatus(existingOrganizer.id, true);

    eventDispatcher.dispatch('onOrganizerConfirmation', { organizer: existingOrganizer });

    return true;
  }

  async authenticateOrganizer(data: OrganizerLoginInput): Promise<AuthenticateOrganizerOutput> {
    const existingOrganizer = await this.organizerRepo.getOrganizerByEmail(data.email);

    if (!existingOrganizer) throw new UserNotFound(`Email ${data.email} not registered`);

    const validPassword = await this.hashGeneratorService.validatePassword(data.password, existingOrganizer.password);

    if (!validPassword) throw new InvalidCredentials('Invalid email or password');

    const organizerAccessToken = this.codeGeneratorService.generateRandomToken();
    const organizerRefreshToken = this.codeGeneratorService.generateRandomToken();

    // store token in DB
    await this.redisClientService.setUser(organizerAccessToken, existingOrganizer);

    const accessTokenPayload = {
      ownerId: existingOrganizer.id,
      role: existingOrganizer.role,
      accessToken: organizerAccessToken,
    };
    const refreshTokenPayload = {
      ownerId: existingOrganizer.id,
      refreshToken: organizerRefreshToken,
      role: existingOrganizer.role,
    };

    // store tokens in DB
    await this.tokenRepo.createToken({
      ownerId: existingOrganizer.id,
      token: organizerAccessToken,
      refreshToken: organizerRefreshToken,
    });

    //update lastLogin
    this.organizerRepo.updateLastLogin(existingOrganizer.id);

    // Generate jwt tokens
    const { accessToken, refreshToken } = this.jwtGeneratorService.generateTokenPair({
      accessTokenPayload,
      refreshTokenPayload,
    });

    return {
      accessToken,
      refreshToken,
      organizer: existingOrganizer,
    };
  }

  async refreshOrganizerToken(refershToken: string) {
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
