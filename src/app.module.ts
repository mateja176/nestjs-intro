import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as compression from 'compression';
import * as cors from 'cors';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CatsModule } from './cats/cats.module';
import { typeOrmConfig } from './config';
import { LoggerService } from './logger/logger.service';
import { passportStrategy } from './models';
import { PhotoModule } from './photo/photo.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CatsModule,
    AuthModule,
    UsersModule,
    PassportModule.register({
      defaultStrategy: passportStrategy.jwt,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    PhotoModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors(), compression(), LoggerService)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
