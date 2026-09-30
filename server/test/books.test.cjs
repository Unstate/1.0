require('reflect-metadata');
const { before, after, test } = require('node:test');
const assert = require('node:assert/strict');
const { Test } = require('@nestjs/testing');
const { BooksController } = require('../dist/books/books.controller');
const { BooksService } = require('../dist/books/books.service');
const { NotFoundException } = require('@nestjs/common');

let app;
let url;
const id = '11111111-1111-4111-8111-111111111111';
const book = { id, title: 'The Hobbit' };

before(async () => {
  const module = await Test.createTestingModule({
    controllers: [BooksController],
    providers: [{ provide: BooksService, useValue: {
      list: async (page, limit) => ({ items: [book], page, limit, hasNextPage: false }),
      findOne: async (value) => {
        if (value !== id) throw new NotFoundException('Book not found');
        return book;
      },
    } }],
  }).compile();
  app = module.createNestApplication({ logger: false });
  await app.listen(0, '127.0.0.1');
  url = await app.getUrl();
});
after(async () => { await app?.close(); });

test('list uses default pagination', async () => {
  const response = await fetch(`${url}/books`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { items: [book], page: 1, limit: 20, hasNextPage: false });
});
test('accepts explicit pagination', async () => {
  const response = await fetch(`${url}/books?page=2&limit=5`);
  const body = await response.json();
  assert.equal(body.page, 2);
  assert.equal(body.limit, 5);
});
test('rejects invalid pagination', async () => {
  for (const query of ['page=0', 'page=-1', 'page=1.5', 'page=abc', 'page=1000001', 'limit=101', 'limit=0', 'limit=', 'page=1&page=2']) {
    assert.equal((await fetch(`${url}/books?${query}`)).status, 400, query);
  }
});
test('returns an individual book', async () => {
  const response = await fetch(`${url}/books/${id}`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), book);
});
test('rejects malformed identifiers', async () => {
  assert.equal((await fetch(`${url}/books/not-a-uuid`)).status, 400);
});
test('returns 404 for an unknown book', async () => {
  assert.equal((await fetch(`${url}/books/aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa`)).status, 404);
});
