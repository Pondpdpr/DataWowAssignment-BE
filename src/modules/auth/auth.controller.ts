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
import { Request } from 'express';
import { CreateUserDto } from '../user/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.authService.signUp(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(): Promise<any> {
    return this.authService.logIn();
  }

  @Get('logout')
  logOut(@Req() request: Request): any {
    return this.authService.logOut(request);
  }

  @Get('is-logged-in')
  isLoggedIn(@Req() request: Request): boolean {
    return Boolean(request.user);
  }
}
