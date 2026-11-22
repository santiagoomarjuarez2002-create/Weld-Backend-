import { BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/App/app.module.js';
import { ValidationPipe } from '@nestjs/common/pipes/index.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const defaultValidationError = new ValidationPipe().createExceptionFactory();

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const hasMissingFields = errors.some(
          ({ value }) => value === undefined || value === null || value === '',
        );

        if (hasMissingFields) {
          return new BadRequestException(
            'Falta completar los datos obligatorios.',
          );
        }

        return defaultValidationError(errors);
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3001);
}
await bootstrap();
