import { Organizer, User } from '@prisma/client';

export interface OnUserRegistrationInput {
  user: User;
  code: string;
}

export interface onOrganizerRegistrationInput {
  user: Organizer;
  code: string;
}

export interface OnUserConfirmationInput {
  user: User;
}

export interface OnOrganizerConfirmationInput {
  organizer: Organizer;
}
