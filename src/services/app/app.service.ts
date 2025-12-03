import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '../mailer/mailer.service';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from './config/config.type';
import { TplCheckerService } from '../tpl-checker/tpl-checker.service';
import path from 'path';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name, { timestamp: true });

  constructor(
    private readonly mailerService: MailerService,
    private readonly tplCheckerService: TplCheckerService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}
  async runWatcher(): Promise<string> {
    const mailData = {
      to: this.configService.get('app.watcherSendTo', { infer: true }),
    };
    const sleepMins = this.configService.get('app.watcherSleepMins', {
      infer: true,
    });
    this.logger.log(`WATCHER INIT MAIL DATA ${JSON.stringify(mailData)}`);
    this.logger.log(`WATCHER INIT CHECK PERIOD MINS ${sleepMins}`);
    while (true) {
      try {
        const isOffer = await this.tplCheckerService.checkOffer();
        this.logger.log(`Check result: ${isOffer ? 'OFFER' : 'NO OFFER'}`);
        if (isOffer) {
          try {
            await this.mailerService.sendMail({
              to: mailData.to,
              subject: 'New Offer for TPL User',
              text: `NEW OFFER FOR AQUARIUM`,
              templatePath: path.join(
                this.configService.getOrThrow('app.workingDirectory', {
                  infer: true,
                }),
                'src',
                'templates',
                'mail',
                'offer.hbs',
              ),
              context: {
                title: 'New Offer for TPL User',
                actionTitle: '',
                app_name: this.configService.get('app.name', { infer: true }),
                text1: 'New Offer for TPL User',
              },
            });
            this.logger.log(`- Mail is sent!`);
          } catch (e) {
            this.logger.error('Sent mail Error', e);
          }
        } else {
        }
        await new Promise(r => setTimeout(r, 10 * 60 * 1000));
      } catch (e) {
        this.logger.error('TPL Check Error', e);
        await new Promise(r => setTimeout(r, 10 * 60 * 1000));
      }
    }
    return '';
  }
}
