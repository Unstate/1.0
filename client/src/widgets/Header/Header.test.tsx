import { expect, it } from 'vitest';
import { within } from 'storybook/test';
import { Header } from './Header';
import { render } from '../../test/render';
it('provides the project name and navigation home', () => {
  const host = render(<Header />);
  expect(within(host).getByRole('banner')).toBeTruthy();
  expect(
    within(host)
      .getByRole('link', { name: 'Анстейт Space' })
      .getAttribute('href')
  ).toBe('/');
});
