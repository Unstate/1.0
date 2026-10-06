import { useEffect, useState } from 'react';
import type { LoadBooks } from '../types/book';
import type { BooksState } from '../types/catalog';
export function useBooks(loadBooks: LoadBooks) {
  const [state, setState] = useState<BooksState>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    Promise.resolve()
      .then(() => {
        controller.signal.throwIfAborted();
        setState({ status: 'loading' });
        return loadBooks(controller.signal);
      })
      .then(
        (books) => {
          if (!controller.signal.aborted)
            setState({ status: 'success', books });
        },
        (error) => {
          if (!controller.signal.aborted)
            setState({
              status: 'error',
              message:
                error instanceof Error && error.name !== 'TypeError'
                  ? error.message
                  : 'Не удалось загрузить книги. Проверьте подключение к серверу.'
            });
        }
      );
    return () => controller.abort();
  }, [loadBooks, attempt]);
  return { state, retry: () => setAttempt((value) => value + 1) };
}
