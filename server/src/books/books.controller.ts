import { BadRequestException, Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { BooksService } from './books.service';

function paginationValue(value: unknown, fallback: number, max: number, name: string): number {
  if (value === undefined) return fallback;
  if (typeof value !== 'string' || !/^[1-9]\d*$/.test(value)) {
    throw new BadRequestException(`${name} must be a positive integer`);
  }
  const number = Number(value);
  if (!Number.isSafeInteger(number) || number > max) {
    throw new BadRequestException(`${name} must be at most ${max}`);
  }
  return number;
}

@Controller('books')
export class BooksController {
  constructor(private readonly books: BooksService) {}

  @Get()
  list(@Query('page') page?: unknown, @Query('limit') limit?: unknown) {
    return this.books.list(
      paginationValue(page, 1, 1_000_000, 'page'),
      paginationValue(limit, 20, 100, 'limit'),
    );
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.books.findOne(id);
  }
}
