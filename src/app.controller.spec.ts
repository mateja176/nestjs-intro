import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { jwtSecret } from './auth/constants';
import { passportStrategy } from './models';
import { UsersService } from './users/users.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: jwtSecret,
        }),
        PassportModule.register({
          defaultStrategy: passportStrategy.jwt,
        }),
      ],
      controllers: [AppController],
      providers: [AppService, AuthService, UsersService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  // it('should return "Hello World!"', () => {
  //   expect(appController.getHello()).toBe('Hello World!');
  // });
  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
