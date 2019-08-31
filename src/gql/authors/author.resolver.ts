/* tslint:disable max-classes-per-file */

import {
  Args,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';
import { Post } from '../posts/post.model';
import { PostsService } from '../posts/posts.service';
import { Author } from './author.model';
import { AuthorsService } from './authors.service';

@ArgsType()
class AuthorArgs {
  // todo extract into custom scalar with description
  // * to convey the rule explicitly based on the schema
  @Field(type => Int)
  @Min(1)
  @Max(10)
  id: number;
}

@Resolver(of => Author)
export class AuthorResolver {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly postsService: PostsService,
  ) {}

  @Query(returns => Author, { name: 'author' })
  async getAuthor(@Args() { id }: AuthorArgs) {
    return await this.authorsService.findOneById(id);
  }

  @ResolveProperty('posts', () => [Post])
  async getPosts(@Parent() author: Author): Promise<Post[]> {
    const { id } = author;
    return await this.postsService.findAll(id);
  }
}
