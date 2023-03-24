import { Request, Response } from 'express';
import {
  userConfirmationValidation,
  userLoginValidation,
  userRegistrationValidation,
} from '../../validators/user.validator';
import { userAuthService, userProfileService } from '../../services/user';
import { ServiceError } from '../../services/exceptions';
import { codeGenerator } from '../../utils';
import { User } from '@prisma/client';

export async function registerUser(req: Request, res: Response) {
  const { error } = userRegistrationValidation(req.body);

  if (error)
    return res.status(400).json({
      message: error.details[0].message,
    });

  try {
    const newUser = await userAuthService.registerUser(req.body);
    return res.status(200).json({
      message: 'Verfification code sent.',
    });
  } catch (error) {
    if (error instanceof ServiceError) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}

export async function userConfirmation(req: Request, res: Response) {
  const { error } = userConfirmationValidation(req.body);

  if (error)
    return res.status(400).json({
      message: error.details[0].message,
    });

  try {
    const verified = await userAuthService.userConfirmation(req.body);

    return res.status(200).json({
      message: 'confirmation successful. Please sign in.',
    });
  } catch (error) {
    if (error instanceof ServiceError) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}

export async function userLogin(req: Request, res: Response) {
  const { error } = userLoginValidation(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  try {
    const { accessToken, refreshToken, user } = await userAuthService.authenticateUser(req.body);

    res.cookie('x-refresh-token', refreshToken);
    return res.status(200).json({
      accessToken,
      refreshToken,
      user: codeGenerator.filterObject(user, { exclude: ['id', 'password'] }),
    });
  } catch (error) {
    if (error instanceof ServiceError) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}

export async function userRefreshToken(req: Request, res: Response) {
  const payload = req.cookies['x-refresh-token'];

  if (!payload)
    return res.status(400).json({
      message: 'refresh token not provided in cookie',
    });

  try {
    const newRefreshToken = await userAuthService.refreshUserToken(payload);

    return res.status(200).json({
      message: 'success',
      data: {
        refreshToken: newRefreshToken,
      },
    });
  } catch (error) {
    if (error instanceof ServiceError) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}

export async function getUserProfile(req: Request, res: Response) {
  const user = req.user as User;

  if (!user) {
    return res.status(400).json({
      message: 'unauthorized',
    });
  }

  try {
    const userProfile = await userProfileService.getProfile(user.id);

    return res.status(200).json({
      message: 'success',
      data: {
        ...userProfile,
      },
    });
  } catch (error) {
    if (error instanceof ServiceError) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}
