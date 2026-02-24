import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Enable CORS so your Vercel React app can fetch data from this API
  app.enableCors();

  // 2. Bind to the port Render provides, or default to 3000 locally
  const port = process.env.PORT || 3000;
  
  // 3. Listen on '0.0.0.0' which is required by Render's environment
  await app.listen(port, '0.0.0.0');
}
bootstrap();