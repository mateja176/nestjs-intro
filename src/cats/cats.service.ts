import { Injectable } from '@nestjs/common';
import { Cat, Cats } from './cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cats = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll() {
    return this.cats;
  }
}
