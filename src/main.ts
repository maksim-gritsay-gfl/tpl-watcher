import { NestFactory } from '@nestjs/core';
import { AppModule } from './services/app/app.module';
import { AppService } from './services/app/app.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const appService = app.get(AppService);

  try {
    await appService.runWatcher();
  } finally {
    await app.close();
  }
}
bootstrap();