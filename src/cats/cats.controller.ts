import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
export class CatsController {
  @Post()
  @Header('Cache-Control', 'none')
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
  @Get('ab*cd')
  findWithWildcard() {
    return 'This route uses a wildcard';
  }
  @Get()
  async findPromise(): Promise<any[]> {
    return [];
  }
  @Get()
  findObservable(): Observable<any[]> {
    return of([]);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: Partial<CreateCatDto>) {
    return `This action updates a #${id} cat`;
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
