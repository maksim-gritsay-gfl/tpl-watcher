import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '../mailer/mailer.service';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../app/config/config.type';
import puppeteer from 'puppeteer';
import { HistoryService } from '../history/history.service';

@Injectable()
export class TplCheckerService {
  private readonly tplUsername = '';
  private readonly tplPin = '';
  private readonly url =
    'https://epass-ca.quipugroup.net/?clientID=16&libraryID=1';
  private logger = new Logger('TplChecker');

  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    private readonly historyService: HistoryService,
  ) {
    this.tplUsername = configService.get('tpl.username', { infer: true }) || '';
    this.tplPin = configService.get('tpl.pin', { infer: true }) || '';
  }

  public async checkOffer(): Promise<boolean> {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
      slowMo: 10, // slow down by 10ms
    });
    const page = await browser.newPage();
    // page.setDefaultNavigationTimeout(0);

    try {
      await page.setRequestInterception(true);

      page.on('request', request => {
        if (
          request.resourceType() === 'xhr' ||
          request.resourceType() === 'fetch'
        ) {
          // console.log('Dynamic Call URL:', request.url());
          // console.log('Dynamic Call Method:', request.method());
          // You can also inspect headers, postData, etc.
          // console.log('Dynamic Call Headers:', request.headers());
          // console.log('Dynamic Call Post Data:', request.postData());
        }
        request.continue();
      });
      let captured: TplSearchResponse; // store records here
      page.on('response', async response => {
        try {
          const req = response.request();
          const type = req.resourceType();

          if (!['xhr', 'fetch'].includes(type)) return;

          const url = response.url();
          const status = response.status();
          const headers = response.headers();
          const contentType = headers['content-type'] || '';

          let body = null;
          if (response.url().includes('ePASS_Search')) {
            captured = (await response.json()) as TplSearchResponse;
          }
        } catch (_) {}
      });

      await page.goto(this.url);
      await page.evaluate(() => {
        // @ts-ignore
      });
      await page.type('#ePASSPatronNumber', this.tplUsername, { delay: 150 });
      await page.type('#ePASSPatronPassword', this.tplPin, { delay: 150 });
      await page.click('#ePASSButtonLogin');
      await page.waitForNavigation({ waitUntil: 'networkidle0' }); // Wait for navigation after login
      await new Promise(r => setTimeout(r, 500));

      // Wait until the dynamic element appears in DOM
      await page.waitForSelector('#ePASSAttractionsList', { timeout: 30000 });

      // @ts-ignore
      if (captured) {
        const aquariumObj = captured.attractionList.find(
          attraction => attraction.attractionID === 18,
        );
        if (aquariumObj?.offers) {
          this.logger.log('OFFER !!');
          return true;
        } else {
          this.logger.log('NO OFFER');
        }
        await this.historyService.add({
          type: 'automatic',
          message: '',
          result: aquariumObj?.offers ? 'OFFER' : 'NO OFFER',
        });
      }
      return false;
    } catch (error) {
      console.error('Login failed via browser automation:', error);
      throw error;
    } finally {
      await browser.close();
    }
  }
}
