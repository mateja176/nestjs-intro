/* tslint:disable max-classes-per-file */

import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import { ArgsType, Field, InputType, Int } from 'type-graphql';
import { maxAuthors, minAuthors } from '../common';
import { Post } from '../posts/post.model';
import { PostsService } from '../posts/posts.service';
import { Author } from './author.model';
import { AuthorsService } from './authors.service';

@ArgsType()
class AuthorArgs {
  // todo extract into custom scalar with description
  // * to convey the rule explicitly based on the schema
  @Field(type => Int)
  @Min(minAuthors)
  @Max(maxAuthors)
  id: number;
}

@ArgsType()
class UpvotePostArgs {
  @Field(type => Int)
  id: number;
}

@InputType()
export class UpvotePostInput {
  @Field(type => Int)
  id: number;
}

@Resolver(of => Author)
export class AuthorResolver {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly postsService: PostsService,
  ) {}

  @Query(returns => Author, { name: 'author' })
  // * the query argument order is arbitrary since every argument is named
  async getAuthor(@Args() { id }: AuthorArgs) {
    return await this.authorsService.findOneById(id);
  }

  @ResolveProperty('posts', () => [Post])
  async getPosts(@Parent() author: Author) {
    const { id } = author;
    return await this.postsService.findAll(id);
  }

  @Mutation(returns => Post)
  async upvotePost(@Args('upvotePostInput') { id }: UpvotePostInput) {
    return await this.postsService.upvoteById(id);
  }
}
