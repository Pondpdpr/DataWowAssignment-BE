import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateUserDto } from '../user/user.dto';
import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.authService.signup(createUserDto);
  }

  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(@Body() loginDto: LoginDto): Promise<any> {
    return this.authService.login(loginDto);
  }

  // @Get('logout')
  // logOut(@Req() request: Request): any {
  //   return this.authService.logOut(request);
  // }

  @UseGuards(AuthGuard('jwt'))
  @Get('is-logged-in')
  isLoggedIn(@Req() request: Request): boolean {
    console.log(request.user);
    return Boolean(request.user);
  }
}
