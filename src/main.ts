import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //// SWAGGER OPEN API
  const config = new DocumentBuilder()
    .setTitle('Movies API')
    .setDescription('API de ejemplo: listado de películas')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  //// FIN

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
