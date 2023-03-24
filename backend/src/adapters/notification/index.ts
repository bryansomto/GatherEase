import { createInjector } from 'typed-inject';
import SMSNotification from './sms.notification';
import { twilioSmsService } from '../../../lib/twilio';

const notificationInjector = createInjector().provideValue('twilioSmsService', twilioSmsService);

const smsNotificationService = notificationInjector.injectClass(SMSNotification);

export { smsNotificationService };
