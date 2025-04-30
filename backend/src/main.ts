import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { z } from 'zod';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const envSchema = z.object({
    DATABASE_HOST: z
      .string()
      .nonempty({ message: 'DATABASE_HOST is required' }),
    DATABASE_PORT: z
      .string()
      .transform((val) => parseInt(val))
      .refine((port) => !isNaN(port), {
        message: 'DATABASE_PORT must be a number',
      }),
    DATABASE_USERNAME: z
      .string()
      .nonempty({ message: 'DATABASE_USERNAME is required' }),
    DATABASE_PASSWORD: z
      .string()
      .nonempty({ message: 'DATABASE_PASSWORD is required' }),
    DATABASE_NAME: z
      .string()
      .nonempty({ message: 'DATABASE_NAME is required' }),
    APP_PORT: z
      .string()
      .transform((val) => parseInt(val))
      .refine((port) => !isNaN(port), {
        message: 'APP_PORT must be a number',
      }),
    JWT_SECRET: z.string().nonempty({ message: 'JWT_SECRET is required' }),
  });

  type Environment = z.infer<typeof envSchema>;
  const env = envSchema.parse(process.env) as Environment;

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(env.APP_PORT);
  console.log(`🚀 Application is listening on port ${env.APP_PORT}`);
}

bootstrap();
