import { registerAs } from '@nestjs/config';

import {
  IsString,
  IsNotEmpty
} from 'class-validator';
import validateConfig from '../../../utils/validate-config';
import { TplConfig } from './tpl-checker-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  @IsNotEmpty()
  TPL_USER: string;

  @IsString()
  @IsNotEmpty()
  TPL_PIN: string;
}

export default registerAs<TplConfig>('tpl', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    username: process.env.TPL_USER || '',
    pin: process.env.TPL_PIN || '',
  };
});
