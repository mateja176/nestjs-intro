import { Injectable, NestMiddleware } from '@nestjs/common';
import { Handler } from 'express';

@Injectable()
export class LoggerService implements NestMiddleware {
  use(...params: Parameters<Handler>) {
    const [req, res, next] = params;

    console.log('Request...');

    next();
  }
}
