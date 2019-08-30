import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';

@Injectable()
export class AppService {
  private isAuthEnabled: boolean;
  constructor(config: ConfigService) {
    this.isAuthEnabled = config.get('API_AUTH_ENABLED');
  }
  getHello(): string {
    return this.isAuthEnabled ? 'Hello' : 'Hello World!';
  }
}
