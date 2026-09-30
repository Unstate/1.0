CREATE TABLE IF NOT EXISTS books (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  description TEXT NOT NULL,
  genre TEXT NOT NULL,
  publication_year INTEGER NOT NULL,
  page_count INTEGER NOT NULL CHECK (page_count > 0),
  cover_url TEXT
);
CREATE INDEX IF NOT EXISTS books_title_id_idx ON books (title, id);
