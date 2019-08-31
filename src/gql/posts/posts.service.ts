import { Injectable } from '@nestjs/common';
import * as faker from 'faker';
import { range } from 'ramda';
import { Author } from '../authors/author.model';
import { authorsRange } from '../common';
import { Post } from './post.model';

@Injectable()
export class PostsService {
  allPosts = authorsRange.reduce(
    (posts, i) => ({
      ...posts,
      [i]: range(0, 2).map(() => ({
        id: faker.random.number(),
        title: faker.name.title(),
        votes: faker.random.number({ min: 0, max: 100 }),
      })),
    }),
    {} as Record<Author['id'], Post[]>,
  );
  async findAll(authorId: Author['id']): Promise<Post[]> {
    return this.allPosts[authorId];
  }

  async upvoteById(postId: Post['id']): Promise<Post> {
    const post = Object.values(this.allPosts)
      .flat()
      .find(({ id }) => id === postId);

    post.votes += 1;

    return post;
  }
}
