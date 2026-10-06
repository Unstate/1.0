import { expect, it } from 'vitest';
import { Section } from './Section';
import { render } from '../../test/render';

it('renders a labelled section with vertical spacing', () => {
  const section = render(
    <Section aria-labelledby="title" id="reviews">
      <h2 id="title">Reviews</h2>
    </Section>
  ).querySelector('section')!;
  expect(section.getAttribute('aria-labelledby')).toBe('title');
  expect(section.id).toBe('reviews');
  expect(parseFloat(getComputedStyle(section).paddingTop)).toBeGreaterThan(0);
  expect(parseFloat(getComputedStyle(section).paddingBottom)).toBeGreaterThan(
    0
  );
});
