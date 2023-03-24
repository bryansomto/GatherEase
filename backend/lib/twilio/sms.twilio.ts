import TwilioBase from './base.twilio';
import { ITwilioSms } from './types/interfaces';

export default class SMS extends TwilioBase implements ITwilioSms {
  serviceSid: string;
  constructor(accountSid: string, authToken: string, serviceSid: string) {
    super(accountSid, authToken);
    this.serviceSid = serviceSid;
  }

  async sendSMS(message: string, recepient: string): Promise<any> {
    return this.client.messages.create({
      body: message,
      to: recepient,
      messagingServiceSid: this.serviceSid,
    });
  }
}
