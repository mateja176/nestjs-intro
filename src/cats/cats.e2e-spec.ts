import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { CatsService } from '../../src/cats/cats.service';
import { AppModule } from '../app.module';

describe('Cats', () => {
  let app: INestApplication;
  const catsService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CatsService)
      .useValue(catsService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/GET cats`, () => {
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .expect(catsService.findAll());
  });

  afterAll(async () => {
    await app.close();
  });
});
