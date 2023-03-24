import { EventSubscriber, On } from 'event-dispatch';
import { smsNotificationService } from '../notification';
import { OnOrganizerConfirmationInput, onOrganizerRegistrationInput } from './types/types';

@EventSubscriber()
export default class OrganizerEventSubscriber {
  smsNotificationService = smsNotificationService;

  @On('onOrganizerRegistration')
  async onOrganizerRegistration(data: onOrganizerRegistrationInput) {
    this.smsNotificationService.sendVerificationSMS({
      name: data.user.firstName,
      recepientPhone: data.user.phone,
      code: data.code,
    });
  }

  @On('onOrganizerConfirmation')
  async onUserConfirmation(data: OnOrganizerConfirmationInput) {
    this.smsNotificationService.sendOrganizerWelcomeSms({ organizer: data.organizer });
  }
}
