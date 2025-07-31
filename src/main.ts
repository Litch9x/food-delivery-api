import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
   const config = new DocumentBuilder()
    .setTitle('Food Delivery API')
    .setDescription('API docs for the food delivery system')
    .setVersion('1.0')
    .addBearerAuth() // 👈 thêm xác thực JWT nếu cần
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 👈 mount tại /api

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
