import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<string> {
    const validatedUsername: string = await this.authService.validateUser(
      email,
      password,
    );
    if (!validatedUsername) {
      throw new UnauthorizedException('Username or password is incorrect.');
    }
    return validatedUsername;
  }
}
