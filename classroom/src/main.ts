import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const PORT = 3335;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'classroom',
        brokers: ['localhost:29092'],
      },
    },
  });

  app
    .startAllMicroservices()
    .then(() => console.log('[Classroom] Microservice started'));

  app
    .listen(PORT)
    .then(() => console.log(`[Classroom] Server started in port ${PORT}`));
}
bootstrap();
