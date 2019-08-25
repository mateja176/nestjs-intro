import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';

describe('PhotoService', () => {
  let module: TestingModule;
  let service: PhotoService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        TypeOrmModule.forFeature([Photo]),
      ],
      providers: [PhotoService],
    }).compile();

    service = module.get<PhotoService>(PhotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find photos', () => {
    return service.findAll().then(photos => {
      expect(photos).toEqual([]);
    });
  });

  afterAll(() => {
    module.close();
  });
});
