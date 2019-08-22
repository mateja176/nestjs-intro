import {
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Req,
} from '@nestjs/common';
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
  @Get('ab*cd')
  findWithWildcard() {
    return 'This route uses a wildcard';
  }
  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
}
