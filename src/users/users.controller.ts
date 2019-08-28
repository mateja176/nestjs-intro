import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { UserEntity } from './user.interface';

@Controller('users')
export class UsersController {
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findOne(): UserEntity {
    return new UserEntity({
      id: 1,
      username: 'john',
      password: 'password',
      first: 'John',
      last: 'Doe',
    });
  }
}
