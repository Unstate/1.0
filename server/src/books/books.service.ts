import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Book } from './book';

const columns = `id, title, author, description, genre,
  publication_year AS "publicationYear", page_count AS "pageCount", cover_url AS "coverUrl"`;

@Injectable()
export class BooksService {
  constructor(private readonly database: DatabaseService) {}

  async list(page: number, limit: number) {
    // Read one extra row to detect the next page without a separate count query.
    const { rows } = await this.database.pool.query<Book>(
      `SELECT ${columns} FROM books ORDER BY title, id LIMIT $1 OFFSET $2`,
      [limit + 1, (page - 1) * limit],
    );
    return { items: rows.slice(0, limit), page, limit, hasNextPage: rows.length > limit };
  }

  async findOne(id: string): Promise<Book> {
    const { rows } = await this.database.pool.query<Book>(
      `SELECT ${columns} FROM books WHERE id = $1`, [id],
    );
    if (!rows[0]) throw new NotFoundException('Book not found');
    return rows[0];
  }
}
