import { Injectable, Logger, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
import { databaseUrl } from '../config';

@Injectable()
export class DatabaseService implements OnModuleInit, OnApplicationShutdown {
  private readonly logger = new Logger(DatabaseService.name);
  readonly pool = new Pool({
    connectionString: databaseUrl(),
    max: 10,
    connectionTimeoutMillis: 5000,
    statement_timeout: 10000,
  });

  constructor() {
    this.pool.on('error', (error) => this.logger.error('Idle database connection failed', error.stack));
  }

  async onModuleInit(): Promise<void> {
    await this.pool.query('SELECT 1 FROM books LIMIT 1');
  }

  async onApplicationShutdown(): Promise<void> {
    await this.pool.end();
  }
}
