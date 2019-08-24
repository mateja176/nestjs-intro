import { Injectable, NestMiddleware } from '@nestjs/common';
import { Handler } from 'express';

export const loggerMiddleware: Handler = (req, res, next) => {
  console.log(req.method);

  next();
};

@Injectable()
export class LoggerService implements NestMiddleware {
  use = loggerMiddleware;
}
