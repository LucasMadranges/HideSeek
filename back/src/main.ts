import {NestFactory} from "@nestjs/core";
import {SwaggerModule, DocumentBuilder} from "@nestjs/swagger";
import {AppModule} from "./app.module";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Configuration CORS
    app.enableCors({
        origin: ["https://192.168.1.22:9200", "http://localhost:9200"], // Ajoutez tous vos domaines autorisés
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
    });

    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));

    // Configuration Swagger
    const config = new DocumentBuilder()
        .setTitle("API Users")
        .setDescription("Documentation API de gestion des utilisateurs")
        .setVersion("1.0")
        .addTag("users")
        .addBearerAuth() // Si vous utilisez l'authentification JWT
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    await app.listen(3000);
}

bootstrap();