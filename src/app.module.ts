import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import * as compression from 'compression';
import * as cors from 'cors';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerService } from './logger/logger.service';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors(), compression(), LoggerService)
      .forRoutes({ path: 'cats', method: RequestMethod.ALL });
  }
}
