import { ITwilioSms } from '../../../lib/twilio/types/interfaces';
import { OrganizerWelcomeSmsInput, VerificationSmsInput, WelcomeSmsInput } from './types/interfaces';

export default class SMSNotification {
  public static inject = ['twilioSmsService'] as const;

  constructor(private readonly twilioSmsService: ITwilioSms) {}

  async sendVerificationSMS(data: VerificationSmsInput) {
    const message = `Hello ${data.name}, thank you for signing up at GatherEase. Use this verification code to complete registration: ${data.code}.`;

    return this.twilioSmsService.sendSMS(message, data.recepientPhone);
  }

  async sendWelcomeSms(data: WelcomeSmsInput) {
    const message = `Welcome to the GatherEase community ${data.user.firstName}. Visit our homepage https://www.gatherease.com to see what event is happening near you.`;

    return this.twilioSmsService.sendSMS(message, data.user.phone);
  }

  async sendOrganizerWelcomeSms(data: OrganizerWelcomeSmsInput) {
    const message = `Welcome to the GatherEase community ${data.organizer.fullName}. Visit our homepage https://www.gatherease.com to create an event and start sending out invites.`;

    return this.twilioSmsService.sendSMS(message, data.organizer.phone);
  }
}
