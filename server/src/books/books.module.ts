import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({ controllers: [BooksController], providers: [BooksService, DatabaseService] })
export class BooksModule {}
