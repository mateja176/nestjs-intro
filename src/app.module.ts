import {
  CacheInterceptor,
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import * as compression from 'compression';
import * as csurf from 'csurf';
import * as RateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CatsModule } from './cats/cats.module';
import { LoggerService } from './logger/logger.service';
import { passportStrategy } from './models';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CatsModule,
    AuthModule,
    UsersModule,
    PassportModule.register({
      defaultStrategy: passportStrategy.jwt,
    }),
    // TypeOrmModule.forRoot(typeOrmConfig),
    // PhotoModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    CacheModule.register(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        helmet(),
        csurf(),
        new RateLimit({
          windowMs: 15 * 60 * 1000, // 15 minutes
          max: 1000, // limit each IP to 1000 requests per windowMs
        }),
        compression(),
        LoggerService,
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
