import { SetMetadata } from '@nestjs/common';
import { metaDataKey } from '../models';

export const Roles = (...args: string[]) =>
  SetMetadata(metaDataKey.roles, args);
