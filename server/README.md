# Books API

A small NestJS + TypeScript API backed by PostgreSQL. SQL access uses `pg` with parameterized queries. Authentication, ratings, and live reviews can be added later.

## Local setup

Use Node.js 22.12+ (Node 24 recommended) and PostgreSQL. Run commands from `server/`.

1. Install packages: `npm ci`.
2. Copy `.env.example` to `.env` and set `DATABASE_URL` to your database credentials. The sample credentials are placeholders; this project does not create a PostgreSQL user or database.
3. Create an empty PostgreSQL database and a user that can create tables in it, using your preferred PostgreSQL tools.
4. Run `npm run db:setup` to create the books table and insert five sample books.
5. Run `npm run start:dev`.

The API listens on `http://localhost:3000`. `PORT` overrides the port; `CORS_ORIGIN` defaults to the Vite frontend at `http://localhost:5173`.

`db:setup` is transactional and safe to repeat: existing seed records are preserved. It is an initial schema setup, not a versioned migration system. Future schema changes should use explicit migrations. The server checks database/table availability on startup and does not alter the schema automatically.

## Endpoints

### GET /books?page=1&limit=20

Returns books sorted by title, then ID. `page` is between 1 and 1,000,000; `limit` is between 1 and 100. Defaults are 1 and 20. Invalid pagination returns HTTP 400. Pages beyond the available books return an empty `items` array.

```json
{
  "items": [
    {
      "id": "33333333-3333-4333-8333-333333333333",
      "title": "Frankenstein",
      "author": "Mary Shelley",
      "description": "A scientist creates life and confronts the consequences of abandoning his creation.",
      "genre": "Gothic fiction",
      "publicationYear": 1818,
      "pageCount": 280,
      "coverUrl": null
    }
  ],
  "page": 1,
  "limit": 20,
  "hasNextPage": false
}
```

The example is abbreviated; the seeded database returns five books at the default limit. Page counts are illustrative and vary by edition. `coverUrl` is nullable so the frontend can supply a placeholder.

### GET /books/:id

Returns one book with the same fields as a list item. For example:

```sh
curl http://localhost:3000/books/11111111-1111-4111-8111-111111111111
```

Malformed UUID v4 identifiers return HTTP 400; valid but unknown IDs return HTTP 404. Both endpoints are public.

## Commands and tests

- `npm run start:dev`: compile, watch, and restart.
- `npm run build`: compile TypeScript into `dist/`.
- `npm start`: run the compiled application (build first).
- `npm run typecheck`: check types without emitting files.
- `npm test`: build and run HTTP contract tests. These use a stub service; PostgreSQL integration testing is skipped unless configured below.

To run the PostgreSQL integration test, create a **separate empty test database**, then seed and test it:

```sh
DATABASE_URL=postgresql://user:password@localhost:5432/books_test npm run db:setup
TEST_DATABASE_URL=postgresql://user:password@localhost:5432/books_test npm test
```

The integration test expects the five seed books and exercises real SQL, sorting, pagination, detail lookup, and error responses. It only reads the test database.

## Structure

- `src/books/`: book types, HTTP routes, and queries.
- `src/database/`: PostgreSQL pool and connection lifecycle.
- `database/`: initial SQL schema and seed data.
- `scripts/setup-db.cjs`: transactional schema/seed command.
- `test/`: HTTP contract and optional PostgreSQL integration tests.

## Docker exercise

`Dockerfile` is intentionally empty for you to configure. Docker and Compose are not required for running the API against an existing PostgreSQL instance. No container configuration has been supplied.

References: [NestJS](https://docs.nestjs.com/first-steps), [node-postgres parameterized queries](https://node-postgres.com/features/queries).
