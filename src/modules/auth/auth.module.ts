import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { LocalSerializer } from './local.serializer';
import { LocalAuthGuard } from './local-auth.guard';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'local', session: true }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, LocalSerializer, LocalAuthGuard],
})
export class AuthModule {}
