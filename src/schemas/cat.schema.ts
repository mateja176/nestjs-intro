import { fromPairs, toPairs } from 'lodash';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Cat } from '../cats/cat.interface';
import { mockCats } from '../cats/mockCat';
import { toNativeConstructor } from '../utils';

const catSchema = fromPairs(
  toPairs(mockCats()).map(([key, value]) => [key, toNativeConstructor(value)]),
);

export const CatSchema = new mongoose.Schema(catSchema);

export interface CatModel extends Cat, Document {}
