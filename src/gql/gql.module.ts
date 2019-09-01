import { Module } from '@nestjs/common';
import { PubSubProvider } from '../services';
import { AuthorResolver } from './authors/author.resolver';
import { AuthorsService } from './authors/authors.service';
import { PostsService } from './posts/posts.service';

@Module({
  providers: [AuthorResolver, PostsService, AuthorsService, PubSubProvider],
})
export class GqlModule {}
