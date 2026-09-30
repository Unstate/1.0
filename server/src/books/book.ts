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
