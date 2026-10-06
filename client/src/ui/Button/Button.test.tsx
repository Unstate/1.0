import { expect, it, vi } from 'vitest';
import { userEvent } from 'storybook/test';
import { createRef } from 'react';
import { Button } from './Button';
import { render } from '../../test/render';

it('does not submit a form by default and supports keyboard activation', async () => {
  const click = vi.fn();
  const submit = vi.fn((event: React.FormEvent) => event.preventDefault());
  const button = render(
    <form onSubmit={submit}>
      <Button onClick={click}>Read</Button>
    </form>
  ).querySelector('button')!;
  button.focus();
  await userEvent.keyboard('{Enter}');
  expect(click).toHaveBeenCalledTimes(1);
  expect(submit).not.toHaveBeenCalled();
});
it('supports explicit form submission', async () => {
  const submit = vi.fn((event: React.FormEvent) => event.preventDefault());
  const button = render(
    <form onSubmit={submit}>
      <Button type="submit">Save</Button>
    </form>
  ).querySelector('button')!;
  await userEvent.click(button);
  expect(submit).toHaveBeenCalledTimes(1);
});
it('does not activate when disabled', async () => {
  const click = vi.fn();
  const button = render(
    <Button disabled onClick={click}>
      Unavailable
    </Button>
  ).querySelector('button')!;
  await userEvent.click(button);
  expect(button.disabled).toBe(true);
  expect(click).not.toHaveBeenCalled();
});
it('renders links with native navigation attributes and a forwarded ref', () => {
  const ref = createRef<HTMLAnchorElement>();
  const link = render(
    <Button as="a" href="/books" target="_blank" variant="secondary" ref={ref}>
      Books
    </Button>
  ).querySelector('a')!;
  expect(link.getAttribute('href')).toBe('/books');
  expect(link.rel).toBe('noopener noreferrer');
  expect(ref.current).toBe(link);
  expect(getComputedStyle(link).backgroundColor).toBe('rgba(0, 0, 0, 0)');
});
