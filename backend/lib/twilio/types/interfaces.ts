export interface ITwilioSms {
  sendSMS(message: string, recepient: string): Promise<any>;
}
