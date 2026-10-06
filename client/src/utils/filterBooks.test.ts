import { expect, it } from 'vitest';
import { emptyFilters, filterBooks } from './filterBooks';
import { sampleBooks } from '../test/books';
it('normalizes search and combines OR genres with AND constraints', () => {
  expect(
    filterBooks(sampleBooks, { ...emptyFilters, query: '  LEM  ' })
  ).toEqual([sampleBooks[1]]);
  expect(
    filterBooks(sampleBooks, {
      ...emptyFilters,
      genres: ['Fantasy', 'Science fiction'],
      shortOnly: true
    })
  ).toEqual(sampleBooks.slice(1));
  expect(filterBooks(sampleBooks, emptyFilters)).toEqual(sampleBooks);
});
