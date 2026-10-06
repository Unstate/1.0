import type { Book } from '../types/book';
import type { CatalogFilters } from '../types/catalog';
export const emptyFilters: CatalogFilters = {
  query: '',
  genres: [],
  shortOnly: false
};
export function filterBooks(books: Book[], filters: CatalogFilters): Book[] {
  const query = filters.query.trim().toLocaleLowerCase();
  return books.filter(
    (book) =>
      (!query ||
        `${book.title} ${book.author}`.toLocaleLowerCase().includes(query)) &&
      (!filters.genres.length || filters.genres.includes(book.genre)) &&
      (!filters.shortOnly || book.pageCount <= 300)
  );
}
