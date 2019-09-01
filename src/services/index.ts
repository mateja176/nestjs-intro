import { Provider } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { CustomProvider } from '../models';

export const PubSubProvider: Provider = {
  provide: CustomProvider.pubSub,
  useClass: PubSub,
};
