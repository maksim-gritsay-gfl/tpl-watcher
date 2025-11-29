import { Module } from '@nestjs/common';
import { MailerService } from '../mailer/mailer.service';
import { TplCheckerService } from "./tpl-checker.service";
import { ConfigModule } from "@nestjs/config";
import { MailerModule } from "../mailer/mailer.module";

@Module({
  imports: [ConfigModule, MailerModule],
  providers: [TplCheckerService],
  exports: [TplCheckerService],
})
export class TplCheckerModule {}
