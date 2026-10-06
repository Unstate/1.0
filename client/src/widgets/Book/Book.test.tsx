import { expect, it, vi } from 'vitest';
import { within } from 'storybook/test';
import { Book } from './Book';
import { sampleBooks } from '../../test/books';
import { render } from '../../test/render';
it('renders real book metadata with a generated cover when none is provided', () => {
  const host = render(<Book book={sampleBooks[0]} />);
  expect(
    within(host).getByRole('heading', { name: 'The Hobbit' })
  ).toBeTruthy();
  expect(within(host).getByText('J. R. R. Tolkien')).toBeTruthy();
  expect(host.textContent).toContain('310 стр.');
  expect(host.querySelector('img')).toBeNull();
});
it('replaces a broken remote cover with a fallback', async () => {
  const host = render(
    <Book
      book={{ ...sampleBooks[0], coverUrl: 'data:image/png;base64,broken' }}
    />
  );
  await vi.waitFor(() => expect(host.querySelector('img')).toBeNull());
  expect(host.textContent).toContain('АНСТЕЙТ / БИБЛИОТЕКА');
});
