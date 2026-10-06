import { expect, it, vi } from 'vitest';
import { Image } from './Image';
import { render } from '../../test/render';

it('loads a local image and preserves accessible text and dimensions', async () => {
  const img = render(
    <Image
      src="/book-cover.svg"
      alt="Book cover"
      width={240}
      height={290}
      loading="eager"
    />
  ).querySelector('img')!;
  await vi.waitFor(() => expect(img.naturalWidth).toBeGreaterThan(0));
  expect(img.alt).toBe('Book cover');
  expect(img.getAttribute('width')).toBe('240');
  expect(img.loading).toBe('eager');
});
it('supports decorative images, lazy loading and contain fit', () => {
  const img = render(
    <Image src="/book-cover.svg" alt="" fit="contain" />
  ).querySelector('img')!;
  expect(img.alt).toBe('');
  expect(img.loading).toBe('lazy');
  expect(getComputedStyle(img).objectFit).toBe('contain');
});
it('forwards native image error events', async () => {
  const onError = vi.fn();
  render(
    <Image
      src="data:image/png;base64,broken"
      alt="Missing cover"
      loading="eager"
      onError={onError}
    />
  );
  await vi.waitFor(() => expect(onError).toHaveBeenCalledTimes(1));
});
