import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtHelper } from './token.helper';

@Injectable()
export class TokenService extends JwtHelper {
  constructor(configService: ConfigService) {
    super(configService);
  }
} 