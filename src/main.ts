import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassValidationPipe } from './cats/class-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ClassValidationPipe());

  await app.listen(3000);
}
bootstrap();
