import { Twilio } from 'twilio';

export default class TwilioBase {
  accountSid: string;
  authToken: string;
  client: Twilio;
  constructor(accountSid: string, authToken: string) {
    this.accountSid = accountSid;
    this.authToken = authToken;
    this.client = new Twilio(accountSid, authToken);
  }
}
