import { Injectable } from '@nestjs/common';
import * as faker from 'faker';
import { range } from 'lodash';
import { Cat, Cats } from './cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cats = range(
    0,
    faker.random.number({ min: 1, max: 10 }),
  ).map(() => ({
    name: faker.name.firstName(),
    age: faker.random.number({ min: 1, max: 10 }),
    breed: faker.lorem.word(),
  }));

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll() {
    return this.cats;
  }
}
