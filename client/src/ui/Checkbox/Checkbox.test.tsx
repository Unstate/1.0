import { expect, it, vi } from 'vitest';
import { userEvent, within } from 'storybook/test';
import { Checkbox } from './Checkbox';
import { render } from '../../test/render';
it('associates its label and toggles by keyboard', async () => {
  const change = vi.fn();
  const host = render(<Checkbox label="Фантастика" onChange={change} />);
  const input = within(host).getByRole('checkbox', {
    name: 'Фантастика'
  }) as HTMLInputElement;
  input.focus();
  await userEvent.keyboard(' ');
  expect(input.checked).toBe(true);
  expect(change).toHaveBeenCalledTimes(1);
});
it('respects disabled and controlled checked state', async () => {
  const change = vi.fn();
  const host = render(
    <Checkbox label="Жанр" checked disabled onChange={change} />
  );
  await userEvent.click(within(host).getByText('Жанр'));
  expect(host.querySelector('input')!.checked).toBe(true);
  expect(change).not.toHaveBeenCalled();
});
