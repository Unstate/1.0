require('reflect-metadata');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { Test } = require('@nestjs/testing');

test('book endpoints against seeded PostgreSQL', { skip: !process.env.TEST_DATABASE_URL }, async () => {
  // Use a separate test database prepared with npm run db:setup.
  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
  const { AppModule } = require('../dist/app.module');
  const module = await Test.createTestingModule({ imports: [AppModule] }).compile();
  const app = module.createNestApplication({ logger: false });
  try {
    await app.listen(0, '127.0.0.1');
    const url = await app.getUrl();
    const response = await fetch(`${url}/books?limit=2`);
    assert.equal(response.status, 200);
    const first = await response.json();
    assert.equal(first.items.length, 2);
    assert.equal(first.hasNextPage, true);
    assert.equal(first.items[0].title, 'Frankenstein');
    assert.equal(first.items[0].publicationYear, 1818);
    assert.equal(typeof first.items[0].pageCount, 'number');
    assert.equal(first.items[0].coverUrl, null);
    const second = await (await fetch(`${url}/books?page=2&limit=2`)).json();
    assert.equal(second.items.length, 2);
    assert.ok(second.items.every(book => !first.items.some(other => other.id === book.id)));
    const last = await (await fetch(`${url}/books?page=3&limit=2`)).json();
    assert.equal(last.items.length, 1);
    assert.equal(last.hasNextPage, false);
    const empty = await (await fetch(`${url}/books?page=100`)).json();
    assert.deepEqual(empty.items, []);
    const detailResponse = await fetch(`${url}/books/${first.items[0].id}`);
    assert.equal(detailResponse.status, 200);
    assert.deepEqual(await detailResponse.json(), first.items[0]);
    assert.equal((await fetch(`${url}/books/aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa`)).status, 404);
    assert.equal((await fetch(`${url}/books/not-a-uuid`)).status, 400);
  } finally {
    await app.close();
  }
});
