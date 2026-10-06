import { expect, it, vi } from 'vitest';
import { userEvent, within } from 'storybook/test';
import { Input } from './Input';
import { render } from '../../test/render';
it('has an accessible label and accepts typing', async () => {
  const change = vi.fn();
  const host = render(<Input label="Поиск" type="search" onChange={change} />);
  const input = within(host).getByRole('searchbox', { name: 'Поиск' });
  await userEvent.type(input, 'Lem');
  expect((input as HTMLInputElement).value).toBe('Lem');
  expect(change).toHaveBeenCalled();
});
