## Book catalogue

- `ui/`: reusable primitives; no book-domain or HTTP logic.
- `widgets/`: Header, Book, BookFilters, BookCatalog with stories and tests.
- `api/instance.ts`: HTTP wrapper; `api/books.ts`: book response validation and pagination.
- `types/`: API/domain types and UI/widget props.
- `hooks/useBooks.ts`: loading, retry and request cancellation.
- `utils/filterBooks.ts`: pure search/filter logic.

The small catalogue is loaded from all API pages and filtered locally. Selected genres are combined with OR; search and the 300-page filter are combined with AND. Stories use fixtures; the application never substitutes fixture data for a failed API request.

For Vite development, from the repository root start PostgreSQL, setup and API:

```sh
docker compose -p anstate-dev -f compose.yaml -f compose.dev.yaml up --build -d --wait backend
```

Then run `npm run dev` from `client`. Vite proxies `/api` to `http://127.0.0.1:3000`; override `API_PROXY_TARGET` when using a different backend address. The development override exposes the API only on loopback. Production keeps using Nginx and the original Compose file.

The seed now contains 25 books. Existing databases get the additional books when setup is re-run; original records are not overwritten. To update an already-running local stack, rebuild the setup image and run `docker compose -p anstate-dev -f compose.yaml -f compose.dev.yaml run --build --rm db-setup`. Page counts are illustrative and depend on edition.
