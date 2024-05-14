import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from '../user/user.service';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(email: string, done: CallableFunction): void {
    done(null, email);
  }

  async deserializeUser(email: string, done: CallableFunction): Promise<void> {
    try {
      const user = await this.userService.findByEmailForAuth(email);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
}
