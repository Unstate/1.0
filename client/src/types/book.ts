export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  genre: string;
  publicationYear: number;
  pageCount: number;
  coverUrl: string | null;
}
export interface BooksPage {
  items: Book[];
  page: number;
  limit: number;
  hasNextPage: boolean;
}
export type LoadBooks = (signal?: AbortSignal) => Promise<Book[]>;
