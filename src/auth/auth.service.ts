import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SerializedUser, User } from '../users/user.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

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

  async login(user: SerializedUser) {
    const payload = {
      username: user.username,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
