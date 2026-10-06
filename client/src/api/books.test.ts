import { expect, it, vi } from 'vitest';
import { createInstance, ApiError } from './instance';
import { createBooksApi } from './books';
import { sampleBooks } from '../test/books';
it('fetches all pages through the HTTP wrapper and passes cancellation', async () => {
  const fetcher = vi
    .fn<typeof fetch>()
    .mockResolvedValueOnce(
      Response.json({
        items: sampleBooks.slice(0, 1),
        page: 1,
        limit: 100,
        hasNextPage: true
      })
    )
    .mockResolvedValueOnce(
      Response.json({
        items: sampleBooks.slice(1),
        page: 2,
        limit: 100,
        hasNextPage: false
      })
    );
  const signal = new AbortController().signal;
  const result = await createBooksApi(createInstance('/api/', fetcher)).listAll(
    signal
  );
  expect(result).toEqual(sampleBooks);
  expect(fetcher.mock.calls.map((call) => call[0])).toEqual([
    '/api/books?page=1&limit=100',
    '/api/books?page=2&limit=100'
  ]);
  expect(fetcher.mock.calls[0][1]?.signal).toBe(signal);
});
it('rejects HTTP failures and invalid response shapes', async () => {
  const failed = createInstance(
    '/api',
    vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 500 }))
  );
  await expect(failed.get('/books')).rejects.toBeInstanceOf(ApiError);
  const invalid = createInstance(
    '/api',
    vi.fn<typeof fetch>().mockResolvedValue(Response.json({ items: [] }))
  );
  await expect(createBooksApi(invalid).listAll()).rejects.toThrow(
    'некорректный'
  );
});
it('does not start requests after cancellation', async () => {
  const fetcher = vi.fn<typeof fetch>();
  const controller = new AbortController();
  controller.abort();
  await expect(
    createBooksApi(createInstance('/api', fetcher)).listAll(controller.signal)
  ).rejects.toThrow();
  expect(fetcher).not.toHaveBeenCalled();
});
