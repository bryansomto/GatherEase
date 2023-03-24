import { User } from '@prisma/client';
import { EventSubscriber, On } from 'event-dispatch';
import { smsNotificationService } from '../notification';
import { OnUserConfirmationInput, OnUserRegistrationInput, onOrganizerRegistrationInput } from './types/types';

@EventSubscriber()
export default class UserEventSubscriber {
  smsNotificationService = smsNotificationService;
  @On('onUserRegistration')
  async onUserRegistration(data: OnUserRegistrationInput) {
    this.smsNotificationService.sendVerificationSMS({
      name: data.user.firstName,
      recepientPhone: data.user.phone,
      code: data.code,
    });
  }

  @On('onUserConfirmation')
  async onUserConfirmation(data: OnUserConfirmationInput) {
    this.smsNotificationService.sendWelcomeSms({ user: data.user });
  }
}
