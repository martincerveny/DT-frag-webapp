import * as passport from 'passport';

require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setSearchPathMiddleware } from './modules/shared/middleware/setSearchPath.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(setSearchPathMiddleware, passport.initialize());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
