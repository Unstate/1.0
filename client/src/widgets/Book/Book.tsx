import { useState } from 'react';
import { Image, Text } from '../../ui';
import type { BookProps } from '../../types/catalog';
import styles from './Book.module.scss';
export function Book({ book }: BookProps) {
  const [failedCover, setFailedCover] = useState<string | null>(null);
  const showCover = book.coverUrl && book.coverUrl !== failedCover;
  return (
    <article className={styles.book}>
      <div className={styles.cover} aria-hidden="true">
        {showCover ? (
          <Image
            src={book.coverUrl!}
            alt=""
            onError={() => setFailedCover(book.coverUrl)}
          />
        ) : (
          <>
            <span className={styles.coverLabel}>АНСТЕЙТ / БИБЛИОТЕКА</span>
            <span className={styles.coverTitle}>{book.title}</span>
            <span className={styles.coverYear}>{book.publicationYear}</span>
          </>
        )}
      </div>
      <div className={styles.content}>
        <Text variant="caption" tone="accent">
          {book.genre}
        </Text>
        <Text as="h3">{book.title}</Text>
        <Text tone="muted">{book.author}</Text>
        <Text className={styles.description}>{book.description}</Text>
        <Text variant="caption" tone="muted">
          {book.publicationYear} · {book.pageCount} стр.
        </Text>
      </div>
    </article>
  );
}
