import SMS from './sms.twilio';
import appConfig from '../../src/config';

const authToken = appConfig.twilio.TWILIO_AUTH_TOKEN;
const accountSid = appConfig.twilio.TWILIO_ACCOUNT_SID;
const serviceSid = appConfig.twilio.TWILIO_GATHEREASE_SID;

const twilioSmsService = new SMS(accountSid, authToken, serviceSid);

export { twilioSmsService };
