import { NestFactory, Reflector } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';
import { JwtGuard } from './modules/auth/jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(new JwtGuard(app.get(Reflector)));
  app.enableCors({ origin: 'http://localhost:3000', credentials: true });

  await app.listen(3001);
}
bootstrap().then(() => {});
