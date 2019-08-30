import { Test, TestingModule } from '@nestjs/testing';
import { DogHealthIndicator } from './dog.health.service';

describe('DogHealthIndicator', () => {
  let service: DogHealthIndicator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DogHealthIndicator],
    }).compile();

    service = module.get<DogHealthIndicator>(DogHealthIndicator);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
