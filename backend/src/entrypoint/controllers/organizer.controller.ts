import { Request, Response } from 'express';
import {
  organizerRegistrationValidation,
  organizerConfirmationValidation,
  organizerLoginValidation,
  organizerRefreshTokenValidation,
} from '../../validators/organizer.validator';
import { ServiceError } from '../../services/exceptions';
import { organizerAuthService, organizerProfileService } from '../../services/organizer';
import { codeGenerator, jwtGenerator } from '../../utils';
import { Organizer } from '@prisma/client';

export async function registerOrganizer(req: Request, res: Response) {
  const { error } = organizerRegistrationValidation(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  try {
    const newOrganizer = organizerAuthService.registerOrganizer(req.body);

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

export async function organizerConfirmation(req: Request, res: Response) {
  const { error } = organizerConfirmationValidation(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  try {
    await organizerAuthService.organizerConfirmation(req.body);

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

export async function organizerLogin(req: Request, res: Response) {
  const { error } = organizerLoginValidation(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  try {
    const { accessToken, refreshToken, organizer } = await organizerAuthService.authenticateOrganizer(req.body);

    res.cookie('x-refresh-token', refreshToken);
    return res.status(200).json({
      accessToken,
      refreshToken,
      user: codeGenerator.filterObject(organizer, { exclude: ['password'] }),
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

export async function organizerRefreshToken(req: Request, res: Response) {
  const payload = req.cookies['x-refresh-token'];

  if (!payload)
    return res.status(400).json({
      message: 'refresh token not provided in cookie',
    });

  try {
    const newRefreshToken = await organizerAuthService.refreshOrganizerToken(payload);

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

export async function getOrganizerProfile(req: Request, res: Response) {
  const organizer = req.user as Organizer;

  if (!organizer) {
    return res.status(400).json({
      message: 'unauthorized',
    });
  }

  try {
    const organizerProfile = await organizerProfileService.getProfile(organizer.id);

    return res.status(200).json({
      message: 'success',
      data: {
        ...organizerProfile,
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
