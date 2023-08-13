import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { QuotationsModule } from './quotations/quotations.module';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(QuotationsModule);
  app.useGlobalPipes(new ValidationPipe());

  const port = 3000;
  await app.listen(port);
  logger.log(`Application is listening on port ${port}`);
}
bootstrap();
