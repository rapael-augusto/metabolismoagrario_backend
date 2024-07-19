import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const PORT = process.env.PORT || 3333;
  await app.listen(PORT, () => console.log(`Running on PORT: ${PORT} 🌱!`));
}
bootstrap();
