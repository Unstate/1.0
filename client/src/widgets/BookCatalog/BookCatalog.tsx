import { useState } from 'react';
import { booksApi } from '../../api/books';
import { useBooks } from '../../hooks/useBooks';
import { Button, Text } from '../../ui';
import { Book } from '../Book/Book';
import { BookFilters } from '../BookFilters/BookFilters';
import { emptyFilters, filterBooks } from '../../utils/filterBooks';
import type { BookCatalogProps, CatalogFilters } from '../../types/catalog';
import styles from './BookCatalog.module.scss';
export function BookCatalog({
  loadBooks = booksApi.listAll
}: BookCatalogProps) {
  const { state, retry } = useBooks(loadBooks);
  const [filters, setFilters] = useState<CatalogFilters>(emptyFilters);
  if (state.status === 'loading')
    return (
      <div className={styles.message} role="status">
        Загружаем библиотеку…
      </div>
    );
  if (state.status === 'error')
    return (
      <div className={styles.message}>
        <Text role="alert">{state.message}</Text>
        <Button onClick={retry}>Повторить загрузку</Button>
      </div>
    );
  const genres = [...new Set(state.books.map((book) => book.genre))].sort(
    (a, b) => a.localeCompare(b)
  );
  const visible = filterBooks(state.books, filters);
  return (
    <div className={styles.layout}>
      <BookFilters genres={genres} value={filters} onChange={setFilters} />
      <section aria-labelledby="catalog-title" className={styles.results}>
        <div className={styles.heading}>
          <Text as="h1" variant="h2" id="catalog-title">
            Книжная полка
          </Text>
          <Text as="span" variant="caption" tone="accent" role="status">
            Показано {visible.length} из {state.books.length}
          </Text>
        </div>
        {visible.length ? (
          <ul className={styles.list}>
            {visible.map((book) => (
              <li key={book.id}>
                <Book book={book} />
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.message}>
            <Text>
              {state.books.length
                ? 'Ничего не найдено. Попробуйте изменить фильтры.'
                : 'В библиотеке пока нет книг.'}
            </Text>
            {state.books.length > 0 && (
              <Button
                variant="secondary"
                onClick={() => setFilters(emptyFilters)}
              >
                Очистить фильтры
              </Button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
