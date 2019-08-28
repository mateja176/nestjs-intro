import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './user.interface';

@Controller('users')
export class UsersController {
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findOne(): User {
    return new User({
      id: 1,
      username: 'john',
      password: 'password',
    });
  }
}
