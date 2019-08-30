import { Module } from '@nestjs/common';
import { DogHealthIndicator } from './dog.health.service';

@Module({
  providers: [DogHealthIndicator],
  exports: [DogHealthIndicator],
})
export class DogModule {}
