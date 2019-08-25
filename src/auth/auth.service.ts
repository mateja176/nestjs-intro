import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { SerializedUser, User } from '../users/user.interface';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(
    username: User['username'],
    pass: User['password'],
  ): Promise<SerializedUser | null> {
    const user = await this.usersService.findOne(username);

    if (user) {
      return bcrypt.compare(pass, user.password).then(doesPasswordMatch => {
        if (doesPasswordMatch) {
          const { password, ...serializedUser }: User = user;

          return serializedUser;
        } else {
          return null;
        }
      });
    } else {
      return null;
    }
  }
}
