import { Injectable } from '@nestjs/common';
import * as faker from 'faker';
import { range } from 'lodash';
import { User, Users } from './user.interface';

@Injectable()
export class UsersService {
  private readonly users: Users = range(0, 10)
    .map(() => ({
      id: faker.random.number(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    }))
    .concat({
      id: 1,
      username: 'john',
      password: 'password',
    });

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
