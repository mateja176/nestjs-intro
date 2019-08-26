import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { catModel } from '../schemas/cat.schema';
import { CatsService } from './cats.service';

// const jane = { name: 'jane', age: 2, breed: 'siamese' };

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: getModelToken('Cat'),
          useValue: catModel,
        },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('db', () => {
  //   it('should create a cat', async () => {
  //     const cat = await service.create(jane);

  //     expect(cat).toMatchObject(jane);
  //   });
  //   it('should find cats', async () => {
  //     const [cat] = await service.findAll();

  //     expect(cat).toMatchObject(jane);
  //   });
  // });
});
