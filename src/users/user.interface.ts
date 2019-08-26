import { Exclude } from 'class-transformer';

/* tslint:disable max-classes-per-file */
export class SerializedUser {
  constructor(public id: number, public username: string) {}
}

export class User extends SerializedUser {
  @Exclude()
  password: string;
  constructor({ password, ...rest }: { password: string } & SerializedUser) {
    // @ts-ignore
    super(...Object.values(rest));
    this.password = password;
  }
}

export type Users = User[];
