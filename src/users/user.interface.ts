import { Exclude } from 'class-transformer';

/* tslint:disable max-classes-per-file */
export class SerializedUser {
  id: number;
  username: string;
}

export class User extends SerializedUser {
  @Exclude()
  password: string;
  constructor(user: User) {
    super();
    Object.assign(this, user);
  }
}

export type Users = User[];
