import { Module } from '@nestjs/common';
import { AuthorResolver } from './authors/author.resolver';
import { AuthorsService } from './authors/authors.service';
import { PostsService } from './posts/posts.service';

@Module({
  providers: [AuthorResolver, PostsService, AuthorsService],
})
export class GqlModule {}
