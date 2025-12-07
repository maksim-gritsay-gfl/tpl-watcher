import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AllConfigType } from '../services/app/config/config.type';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<AllConfigType>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get('database.type', { infer: true }) as 'better-sqlite3',
      database: this.configService.get('database.database', { infer: true }) as string,
      synchronize: this.configService.get('database.synchronize', { infer: true }),
      logging: this.configService.get('database.logging', { infer: true }),
      autoLoadEntities: true,
    };
  }
}

