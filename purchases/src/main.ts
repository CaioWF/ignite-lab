import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 3333;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => console.log(`Server running at ${PORT}`));
}
bootstrap();
