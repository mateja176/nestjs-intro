import { Exclude, Expose } from 'class-transformer';

/* tslint:disable max-classes-per-file */
export class SerializedUser {
  id: number;
  username: string;
}

interface WithPassword {
  password: string;
}

export class User extends SerializedUser implements WithPassword {
  password: string;
}

export class UserEntity extends SerializedUser implements WithPassword {
  first: string;
  last: string;
  @Exclude()
  password: string;
  constructor(user: Partial<UserEntity>) {
    super();
    Object.assign(this, user);
  }
  @Expose()
  fullName() {
    return `${this.first} ${this.last}`;
  }
}

export type Users = User[];
