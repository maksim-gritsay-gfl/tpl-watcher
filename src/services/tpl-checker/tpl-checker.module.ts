import { Module } from '@nestjs/common';
import { TplCheckerService } from './tpl-checker.service';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '../mailer/mailer.module';
import { HistoryModule } from '../history/history.module';

@Module({
  imports: [ConfigModule, MailerModule, HistoryModule],
  providers: [TplCheckerService],
  exports: [TplCheckerService],
})
export class TplCheckerModule {}
