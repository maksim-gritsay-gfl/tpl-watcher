import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import mailConfig from '../mailer/config/mail.config';
import mailMainConfig from '../mailer/config/mail-main.config';
import tplConfig from '../tpl-checker/config/tpl-checker.config';
import databaseConfig from '../../database/config/database.config';
import { MailerModule } from '../mailer/mailer.module';
import { TplCheckerModule } from '../tpl-checker/tpl-checker.module';
import { HistoryModule } from '../history/history.module';
import { TypeOrmConfigService } from '../../database/typeorm-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, mailConfig, tplConfig, mailMainConfig, databaseConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    MailerModule,
    TplCheckerModule,
    HistoryModule,
  ],
  providers: [AppService],
})
export class AppModule {}
