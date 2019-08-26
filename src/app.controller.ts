import {
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request as IRequest } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { passportStrategy, Path } from './models';
import { User } from './users/user.interface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    console.log(file);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard(passportStrategy.local))
  @Post(Path.login)
  async login(@Request() req: IRequest) {
    return this.authService.login(req.user as User);
  }

  @UseGuards(AuthGuard())
  @Get(Path.me)
  getProfile(@Request() req: IRequest) {
    return req.user;
  }
}
