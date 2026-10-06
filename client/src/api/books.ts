import type { ApiClient } from '../types/api';
import type { Book, BooksPage } from '../types/book';
import { instance } from './instance';

function isBook(value: unknown): value is Book {
  if (!value || typeof value !== 'object') return false;
  const b = value as Record<string, unknown>;
  return (
    ['id', 'title', 'author', 'description', 'genre'].every(
      (key) => typeof b[key] === 'string'
    ) &&
    Number.isInteger(b.publicationYear) &&
    Number.isInteger(b.pageCount) &&
    Number(b.pageCount) > 0 &&
    (b.coverUrl === null || typeof b.coverUrl === 'string')
  );
}
function parsePage(value: unknown, expectedPage: number): BooksPage {
  const page = value as Partial<BooksPage> | null;
  if (
    !page ||
    !Array.isArray(page.items) ||
    !page.items.every(isBook) ||
    page.page !== expectedPage ||
    !Number.isInteger(page.limit) ||
    Number(page.limit) < 1 ||
    typeof page.hasNextPage !== 'boolean' ||
    (page.hasNextPage && page.items.length === 0)
  )
    throw new Error('Сервер вернул некорректный список книг.');
  return page as BooksPage;
}
export function createBooksApi(client: ApiClient) {
  return {
    async listAll(signal?: AbortSignal): Promise<Book[]> {
      const books: Book[] = [];
      let page = 1;
      while (true) {
        signal?.throwIfAborted();
        const result = parsePage(
          await client.get<unknown>(`/books?page=${page}&limit=100`, {
            signal
          }),
          page
        );
        books.push(...result.items);
        if (!result.hasNextPage) return books;
        page += 1;
      }
    }
  };
}
export const booksApi = createBooksApi(instance);
