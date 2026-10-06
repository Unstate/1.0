import { expect, it, vi } from 'vitest';
import { userEvent, within } from 'storybook/test';
import { BookCatalog } from './BookCatalog';
import { sampleBooks } from '../../test/books';
import { render } from '../../test/render';
it('loads, filters across genres and page counts, and clears empty results', async () => {
  const host = render(<BookCatalog loadBooks={async () => sampleBooks} />);
  const screen = within(host);
  await vi.waitFor(() =>
    expect(screen.getAllByRole('article')).toHaveLength(3)
  );
  await userEvent.click(screen.getByRole('checkbox', { name: 'Fantasy' }));
  expect(screen.getAllByRole('article')).toHaveLength(2);
  await userEvent.click(
    screen.getByRole('checkbox', { name: 'До 300 страниц' })
  );
  expect(screen.getAllByRole('article')).toHaveLength(1);
  await userEvent.type(screen.getByRole('searchbox'), 'no matches');
  expect(screen.queryAllByRole('article')).toHaveLength(0);
  await userEvent.click(
    screen.getByRole('button', { name: 'Очистить фильтры' })
  );
  expect(screen.getAllByRole('article')).toHaveLength(3);
});
it('shows errors and retries the request', async () => {
  const load = vi
    .fn()
    .mockRejectedValueOnce(new Error('Сбой API'))
    .mockResolvedValue(sampleBooks);
  const host = render(<BookCatalog loadBooks={load} />);
  const screen = within(host);
  await vi.waitFor(() =>
    expect(screen.getByRole('alert').textContent).toBe('Сбой API')
  );
  await userEvent.click(
    screen.getByRole('button', { name: 'Повторить загрузку' })
  );
  await vi.waitFor(() =>
    expect(screen.getAllByRole('article')).toHaveLength(3)
  );
  expect(load).toHaveBeenCalledTimes(2);
});
it('renders loading and an empty library honestly', async () => {
  const loading = render(
    <BookCatalog loadBooks={() => new Promise(() => {})} />
  );
  expect(within(loading).getByRole('status').textContent).toContain(
    'Загружаем'
  );
  const host = render(<BookCatalog loadBooks={async () => []} />);
  await vi.waitFor(() =>
    expect(host.textContent).toContain('В библиотеке пока нет книг.')
  );
});
