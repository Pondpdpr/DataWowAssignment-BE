import { NestFactory } from '@nestjs/core';
import { TypeormStore } from 'connect-typeorm';
import 'dotenv/config';
import session from 'express-session';
import passport from 'passport';
import { Repository } from 'typeorm';
import { AppModule } from './app.module';
import { Session } from './entities/session.entity';
import { SessionRepository } from './modules/session/session.repository';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const sessionRepository = app.get<Repository<Session>>(SessionRepository);
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: Boolean(process.env.SESSION_RESAVE),
      saveUninitialized: Boolean(process.env.SESSION_SAVE_UNINITIALIZED),
      cookie: { maxAge: +process.env.SESSION_MAX_AGE },
      store: new TypeormStore({
        cleanupLimit: 2,
        limitSubquery: false,
        ttl: 86400,
      }).connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.enableCors({ origin: 'http://localhost:3000', credentials: true });

  await app.listen(3001);
}
bootstrap();
