import { range } from 'lodash';

export const minAuthors = 1;
export const maxAuthors = 10;

export const authorsRange = range(minAuthors, maxAuthors + 1);
