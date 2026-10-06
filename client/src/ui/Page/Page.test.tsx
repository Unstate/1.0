import { expect, it } from 'vitest';
import { Page } from './Page';
import { render } from '../../test/render';

it('caps the complete page box at 1440px and centers it', () => {
  const host = render(<Page data-testid="page">Content</Page>, 1800);
  const page = host.firstElementChild!;
  expect(page.getBoundingClientRect().width).toBe(1440);
  expect(
    page.getBoundingClientRect().left - host.getBoundingClientRect().left
  ).toBe(180);
  expect(parseFloat(getComputedStyle(page).paddingLeft)).toBeGreaterThan(0);
});
it('fits a narrow parent without overflowing and forwards attributes', () => {
  const host = render(
    <Page id="content" className="custom">
      Content
    </Page>,
    320
  );
  expect(host.firstElementChild?.getBoundingClientRect().width).toBe(320);
  expect(host.querySelector('#content')?.classList.contains('custom')).toBe(
    true
  );
});
