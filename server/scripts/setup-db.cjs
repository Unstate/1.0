const { readFile } = require('node:fs/promises');
const { join } = require('node:path');
const { Pool } = require('pg');

async function main() {
  if (!process.env.DATABASE_URL) throw new Error('Set DATABASE_URL before running db:setup.');
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, connectionTimeoutMillis: 5000 });
  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      for (const file of ['001-books.sql', 'seed.sql']) {
        await client.query(await readFile(join(__dirname, '../database', file), 'utf8'));
      }
      await client.query('COMMIT');
      console.log('Books schema and sample data are ready.');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } finally {
    await pool.end();
  }
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
