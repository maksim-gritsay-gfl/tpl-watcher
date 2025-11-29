import { AppConfig } from './app-config.type';
import { MailConfig } from '../../mailer/config/mail-config.type';
import { TplConfig } from '../../tpl-checker/config/tpl-checker-config.type';

export type AllConfigType = {
  app: AppConfig;
  mail: MailConfig;
  mailMain: MailConfig;
  tpl: TplConfig;
};
