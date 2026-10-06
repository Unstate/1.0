import { useState } from 'react';
import { expect, it } from 'vitest';
import { userEvent, within } from 'storybook/test';
import { BookFilters } from './BookFilters';
import { emptyFilters } from '../../utils/filterBooks';
import { render } from '../../test/render';
function Harness() {
  const [value, setValue] = useState(emptyFilters);
  return (
    <BookFilters
      genres={['Fantasy', 'Mystery']}
      value={value}
      onChange={setValue}
    />
  );
}
it('supports combined selections and resetting every filter', async () => {
  const host = render(<Harness />);
  const screen = within(host);
  await userEvent.click(screen.getByRole('checkbox', { name: 'Fantasy' }));
  await userEvent.click(
    screen.getByRole('checkbox', { name: 'До 300 страниц' })
  );
  await userEvent.type(screen.getByRole('searchbox'), 'book');
  await userEvent.click(
    screen.getByRole('button', { name: 'Сбросить фильтры' })
  );
  expect((screen.getByRole('searchbox') as HTMLInputElement).value).toBe('');
  expect(
    screen
      .getAllByRole('checkbox')
      .every((input) => !(input as HTMLInputElement).checked)
  ).toBe(true);
});
