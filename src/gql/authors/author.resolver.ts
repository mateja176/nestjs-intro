/* tslint:disable max-classes-per-file */

import { Inject } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import { PubSub } from 'graphql-subscriptions';
import { ArgsType, Field, InputType, Int } from 'type-graphql';
import { CustomProvider } from '../../models';
import { Comment } from '../comments/comment.models';
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
    @Inject(CustomProvider.pubSub) public pubSub: PubSub,
    private readonly authorsService: AuthorsService,
    private readonly postsService: PostsService,
  ) {}

  @Query(returns => Author, { name: 'author' })
  // * the query argument order is arbitrary since every argument is named
  async getAuthor(@Args() { id }: AuthorArgs) {
    const author = await this.authorsService.findOneById(id);
    return author;
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

  @Subscription(returns => Comment, {
    filter: (payload, variables) => true,
  })
  commentAdded() {
    return this.pubSub.asyncIterator('commentAdded');
  }
}
