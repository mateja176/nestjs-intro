import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, of } from 'rxjs';
import { LoggingInterceptor } from '../logging.interceptor';
import { role } from '../models';
import { Roles } from '../roles.decorator';
import { RolesGuard } from '../roles.guard';
import { TimeoutInterceptor } from '../timeout.interceptor';
import { Cats } from './cat.interface';
import { CatsService } from './cats.service';
import { CreateCatDto } from './create-cat.dto';

@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Post()
  @Roles(role.admin)
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }
  @Get()
  findAll(@Req() request: Request): Cats {
    return this.catsService.findAll();
  }
  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id); // tslint:disable-line
    return `This action returns a #${params.id} cat`;
  }
  @Get('ab*cd')
  findWithWildcard() {
    return 'This route uses a wildcard';
  }
  @Get()
  async findPromise(): Promise<Cats> {
    return [];
  }
  @Get()
  findObservable(): Observable<Cats> {
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
