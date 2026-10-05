# Local full-stack Docker setup

Run commands from the repository root. Docker with Compose is required.

A root `.env` supplies Compose values; `server/.env` is only for running the backend directly. A local root `.env` was generated with a random password and is ignored by Git. On another machine, copy `.env.example` to `.env` and replace the placeholder with a long random hexadecimal password. The password is embedded in a connection URL, so use URL-safe characters.

```sh
docker compose config --quiet
docker compose up --build -d
docker compose ps -a
```

If your Docker installation reports a missing Buildx plugin, install the Docker Buildx plugin. On the current machine, the compatibility command `DOCKER_BUILDKIT=0 docker compose up --build -d` also works; it uses the deprecated legacy builder.

Startup order: PostgreSQL becomes healthy, `db-setup` creates the schema and seeds five books, the backend becomes healthy, and Nginx starts. `db-setup` exiting with code 0 is expected. It runs as a one-off service using the Dockerfile's `setup` target. The API uses the separate `runner` target. Re-running setup preserves existing seed records; this is initial setup, not a versioned migration system.

Visit http://localhost:8080 and http://localhost:8080/api/books. Nginx removes `/api/` before proxying to the backend. Database and backend ports are not published. `FRONTEND_PORT` changes the host port. The frontend is bound to host loopback; on a VPS, put an HTTPS reverse proxy on that host in front of port 8080. This configuration does not provide public HTTPS or CI/CD yet.

```sh
docker compose logs backend db-setup
docker compose down
```

`down` preserves database data. Do not use `down --volumes` unless you intend to delete the database. PostgreSQL 18 stores its data under the volume mounted at `/var/lib/postgresql`. Backups are still required.

PostgreSQL's initialization credentials apply only to a fresh data directory. Editing `.env` does not change the password in an existing database; rotate it explicitly before updating the application credentials. This initial setup uses the bootstrap PostgreSQL user for the API; use a separate restricted application user before production deployment.

When deploying a changed backend, recreate/restart the frontend too so Nginx resolves the current backend container address. Docker images currently use moving version tags; a CI/CD deployment should pin the built images to a commit or digest.
