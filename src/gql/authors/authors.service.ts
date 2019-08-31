import { Injectable } from '@nestjs/common';
import * as faker from 'faker';
import { Omit } from 'utility-types';
import { authorsRange } from '../common';
import { PostsService } from '../posts/posts.service';
import { Author } from './author.model';

@Injectable()
export class AuthorsService {
  authors: Array<Omit<Author, 'posts'>> = authorsRange.map(i => ({
    id: i,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  }));
  constructor(private postsService: PostsService) {}
  async findOneById(authorId: Author['id']): Promise<Author> {
    const posts = await this.postsService.findAll(authorId);
    return {
      ...this.authors.find(({ id }) => id === authorId),
      posts,
    };
  }
}
