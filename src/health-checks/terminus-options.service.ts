import { Injectable } from '@nestjs/common';
import {
  TerminusEndpoint,
  TerminusModuleOptions,
  TerminusOptionsFactory,
} from '@nestjs/terminus';
import { DogHealthIndicator } from '../dog/dog.health.service';

@Injectable()
export class TerminusOptionsService implements TerminusOptionsFactory {
  constructor(private readonly dogHealthIndicator: DogHealthIndicator) {}

  createTerminusOptions(): TerminusModuleOptions {
    const healthEndpoint: TerminusEndpoint = {
      url: '/health',
      healthIndicators: [async () => this.dogHealthIndicator.isHealthy('dog')],
    };
    return {
      endpoints: [healthEndpoint],
    };
  }
}
