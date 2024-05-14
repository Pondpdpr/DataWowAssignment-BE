import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { Request } from 'express';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { AccessToken, LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.userService.findOneForSignIn(email);
    if (user && (await argon2.verify(user.password, password))) {
      return user;
    }
    throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
  }

  async signup(createUserDto: CreateUserDto): Promise<any> {
    createUserDto.password = await argon2.hash(createUserDto.password);

    const insertResult = await this.userService.create(createUserDto);
    if (!insertResult) throw new ConflictException('User already exists');

    return { message: 'Sign up successful', statusCode: HttpStatus.CREATED };
  }

  async login(loginDto: LoginDto): Promise<AccessToken> {
    const user: User = await this.userService.findByEmailForAuth(
      loginDto.email,
    );
    const payload = { email: user.email, id: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  logOut(@Req() request: Request): any {
    if (request.isUnauthenticated())
      throw new UnauthorizedException(
        'Cannot logout because user not logged in.',
      );

    request.session.destroy(() => undefined);
    return { message: 'Log out successful', statusCode: HttpStatus.OK };
  }
}
