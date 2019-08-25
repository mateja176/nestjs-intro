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
import { AuthModule } from './auth/auth.module';
import { CatsModule } from './cats/cats.module';
import { LoggerService } from './logger/logger.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [CatsModule, AuthModule, UserModule],
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
