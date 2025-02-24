import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration Swagger
  const config = new DocumentBuilder()
      .setTitle('API Users')
      .setDescription('Documentation API de gestion des utilisateurs')
      .setVersion('1.0')
      .addTag('users')
      .addBearerAuth() // Si vous utilisez l'authentification JWT
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();