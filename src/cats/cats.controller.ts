import { Controller, Get, Header, HttpCode, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
  @Post()
  @Header('Cache-Control', 'none')
  @HttpCode(204)
  create() {
    return 'This action adds a new cat';
  }
}
