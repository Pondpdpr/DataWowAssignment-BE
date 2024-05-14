import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
}
