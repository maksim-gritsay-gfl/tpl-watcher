import { registerAs } from '@nestjs/config';
import { DatabaseConfig } from './database-config.type';
import validateConfig from '../../utils/validate-config';
import { IsString, IsBoolean, IsOptional } from 'class-validator';
import * as path from 'path';

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  DATABASE_TYPE: string;

  @IsString()
  @IsOptional()
  DATABASE_PATH: string;

  @IsBoolean()
  @IsOptional()
  DATABASE_SYNCHRONIZE: boolean;

  @IsBoolean()
  @IsOptional()
  DATABASE_LOGGING: boolean;
}

export default registerAs<DatabaseConfig>('database', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  const workingDirectory = process.cwd();
  const defaultDbPath = path.join(workingDirectory, 'resources', 'app.db');

  return {
    type: process.env.DATABASE_TYPE || 'better-sqlite3',
    database: process.env.DATABASE_PATH || defaultDbPath,
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true' || true,
    logging: process.env.DATABASE_LOGGING === 'true' || false,
  };
});

