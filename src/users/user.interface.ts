import { Exclude } from 'class-transformer';

/* tslint:disable max-classes-per-file */
export class SerializedUser {
  id: number;
  username: string;
}

export class User extends SerializedUser {
  @Exclude()
  password: string;
}

export type Users = User[];
