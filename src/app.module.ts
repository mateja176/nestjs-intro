import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TerminusModule } from '@nestjs/terminus';
import * as compression from 'compression';
import * as RateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CatsModule } from './cats/cats.module';
import { ConfigModule } from './config/config.module';
import { DogModule } from './dog/dog.module';
import { GqlModule } from './gql/gql.module';
import { TerminusOptionsService } from './health-checks/terminus-options.service';
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
    ConfigModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    TerminusModule.forRootAsync({
      useClass: TerminusOptionsService,
      imports: [DogModule],
    }),
    DogModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'src/generated/graphql/schema.gql',
      debug: true,
      playground: true,
    }),
    GqlModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LoggerService,
    // https://docs.nestjs.com/techniques/caching#global-cache does not work with graphql
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        helmet(),
        // cookieParser(),
        // csurf({ cookie: true }),
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
