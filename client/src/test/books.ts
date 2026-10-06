import type { Book } from '../types/book';
export const sampleBooks: Book[] = [
  {
    id: '11111111-1111-4111-8111-111111111111',
    title: 'The Hobbit',
    author: 'J. R. R. Tolkien',
    description: 'A journey beyond the familiar.',
    genre: 'Fantasy',
    publicationYear: 1937,
    pageCount: 310,
    coverUrl: null
  },
  {
    id: '22222222-2222-4222-8222-222222222222',
    title: 'Solaris',
    author: 'Stanislaw Lem',
    description: 'An ocean of memories.',
    genre: 'Science fiction',
    publicationYear: 1961,
    pageCount: 204,
    coverUrl: null
  },
  {
    id: '33333333-3333-4333-8333-333333333333',
    title: 'A Wizard of Earthsea',
    author: 'Ursula K. Le Guin',
    description: 'A wizard faces his shadow.',
    genre: 'Fantasy',
    publicationYear: 1968,
    pageCount: 205,
    coverUrl: null
  }
];
