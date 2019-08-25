import * as faker from 'faker';
import { range } from 'lodash';
import { Cats } from './cat.interface';

export const mockCats = (): Cats =>
  range(0, faker.random.number({ min: 1, max: 10 })).map(() => ({
    name: faker.name.firstName(),
    age: faker.random.number({ min: 1, max: 10 }),
    breed: faker.lorem.word(),
  }));
