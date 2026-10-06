import type { Book, LoadBooks } from './book';
export interface CatalogFilters {
  query: string;
  genres: string[];
  shortOnly: boolean;
}
export interface BookProps {
  book: Book;
}
export interface BookFiltersProps {
  genres: string[];
  value: CatalogFilters;
  onChange: (value: CatalogFilters) => void;
}
export interface BookCatalogProps {
  loadBooks?: LoadBooks;
}
export type BooksState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; books: Book[] };
