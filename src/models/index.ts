import { toObject } from '../utils';

export enum Path {
  login = 'login',
  me = 'me',
  cats = 'cats',
}

export const passportStrategies = ['local', 'jwt'] as const;
export type PassportStrategy = typeof passportStrategies[number];
export const passportStrategy = toObject(passportStrategies);

export const roles = ['admin'] as const;
export type Role = typeof roles[number];
export type Roles = Role[];
export const role = toObject(roles);

export const metaDataKeys = ['roles'] as const;
export type MetaDataKey = typeof metaDataKeys[number];
export const metaDataKey = toObject(metaDataKeys);

export interface User {
  roles: Roles;
}
