import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { catModel } from '../schemas/cat.schema';
import { Cats } from './cat.interface';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        CatsService,
        {
          provide: getModelToken('Cat'),
          useValue: catModel,
        },
      ],
    }).compile();

    catsService = module.get<CatsService>(CatsService);
    catsController = module.get<CatsController>(CatsController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result: Cats = [
        {
          name: 'alf',
          age: 3,
          breed: 'martian',
        },
      ];

      jest
        .spyOn(catsService, 'findAll')
        .mockImplementation(() => Promise.resolve(result));

      expect(await catsController.findAll()).toBe(result);
    });
  });
});
