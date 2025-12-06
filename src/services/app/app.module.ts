import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { TplCheckerService } from '../tpl-checker/tpl-checker.service';
import { HistoryService } from '../history/history.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import mailConfig from '../mailer/config/mail.config';
import mailMainConfig from '../mailer/config/mail-main.config';
import tplConfig from '../tpl-checker/config/tpl-checker.config';
import { MailerModule } from '../mailer/mailer.module';
import { TplCheckerModule } from '../tpl-checker/tpl-checker.module';
import { HistoryModule } from '../history/history.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, mailConfig, tplConfig, mailMainConfig],
      envFilePath: ['.env'],
    }),
    MailerModule,
    TplCheckerModule,
    HistoryModule,
  ],
  providers: [AppService, TplCheckerService, HistoryService],
})
export class AppModule {}
