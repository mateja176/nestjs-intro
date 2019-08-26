import { fromPairs, toPairs } from 'lodash';
import { toNativeConstructor } from '.';
import { mockCat } from '../cats/mockCat';

const catSchema = fromPairs(
  toPairs(mockCat()).map(([key, value]) => [key, toNativeConstructor(value)]),
);

describe('Utils', () => {
  it('should return a mongoose schema', () => {
    expect(catSchema).toEqual({
      name: String,
      age: Number,
      breed: String,
    });
  });
});
