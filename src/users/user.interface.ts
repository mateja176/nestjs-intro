export interface SerializedUser {
  id: number;
  username: string;
}

export interface User extends SerializedUser {
  password: string;
}

export type Users = User[];
