import { fromPairs, toPairs } from 'lodash';
import { toNativeConstructor } from '.';
import { CatsService } from '../cats/cats.service';

const catSchema = fromPairs(
  toPairs(new CatsService().findAll()[0]).map(([key, value]) => [
    key,
    toNativeConstructor(value),
  ]),
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
