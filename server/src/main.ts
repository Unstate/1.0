import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { port } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173' });
  app.enableShutdownHooks();
  await app.listen(port(), '0.0.0.0');
}

void bootstrap().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
