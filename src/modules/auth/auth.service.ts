import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { Request } from 'express';
import { CreateUserDto, CredentialDto } from '../user/user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string): Promise<string> {
    const userCredential: CredentialDto =
      await this.userService.findOneForSignIn(email);
    if (
      userCredential &&
      (await argon2.verify(userCredential.password, password))
    ) {
      return userCredential.email;
    }
    throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
  }

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    createUserDto.password = await argon2.hash(createUserDto.password);

    const insertResult = await this.userService.create(createUserDto);
    if (!insertResult) throw new ConflictException('User already exists');

    return { message: 'Sign up successful', statusCode: HttpStatus.CREATED };
  }

  logIn(): any {
    return { message: 'Log in successful', statusCode: HttpStatus.OK };
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
