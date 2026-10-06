import { expect, it } from 'vitest';
import { createRef } from 'react';
import { Text } from './Text';
import { render } from '../../test/render';

it.each(['p', 'h1', 'h2', 'h3'] as const)(
  'renders the %s semantic tag',
  (as) => {
    const element = render(<Text as={as}>Book title</Text>).querySelector(as)!;
    expect(element.textContent).toBe('Book title');
    expect(parseFloat(getComputedStyle(element).lineHeight)).toBeGreaterThan(
      parseFloat(getComputedStyle(element).fontSize)
    );
  }
);
it('separates typography from semantics and forwards native props and refs', () => {
  const ref = createRef<HTMLAnchorElement>();
  const link = render(
    <Text
      as="a"
      href="#book"
      variant="h1"
      tone="accent"
      className="custom"
      ref={ref}
    >
      Read
    </Text>
  ).querySelector('a')!;
  expect(link.getAttribute('href')).toBe('#book');
  expect(ref.current).toBe(link);
  expect(link.classList.contains('custom')).toBe(true);
  expect(getComputedStyle(link).fontSize).toBe('40px');
  expect(getComputedStyle(link).color).toBe('rgb(255, 138, 61)');
});
it('supports custom components', () => {
  const Label = ({
    children,
    id
  }: {
    children?: React.ReactNode;
    id: string;
  }) => <label id={id}>{children}</label>;
  expect(
    render(
      <Text as={Label} id="label">
        Name
      </Text>
    ).querySelector('label')?.id
  ).toBe('label');
});
