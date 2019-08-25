import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as IRequest } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { User } from './users/user.interface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: IRequest) {
    return this.authService.login(req.user as User);
  }
}
