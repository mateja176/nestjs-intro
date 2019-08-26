import { fromPairs, toPairs } from 'lodash';
import * as mongoose from 'mongoose';
import { Cat } from '../cats/cat.interface';
import { mockCat } from '../cats/mockCat';
import { toNativeConstructor } from '../utils';

const schema = fromPairs(
  toPairs(mockCat()).map(([key, value]) => [key, toNativeConstructor(value)]),
);

export const CatSchema = new mongoose.Schema(schema);

export const catModel = mongoose.model<Cat & mongoose.Document>(
  'Cat',
  CatSchema,
);
