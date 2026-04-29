import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginRequestDto) {
    console.log(
      `Login request detected: ${signInDto.email} ${signInDto.password}`,
    );
    return this.authService.signIn(signInDto.email!, signInDto.password!);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    console.log(
      `Register request detected: ${registerDto.firstName} ${registerDto.lastName} ${registerDto.email} ${registerDto.password} ${registerDto.confirmPassword}`,
    );
    return this.authService.register(
      registerDto.firstName!,
      registerDto.lastName!,
      registerDto.username!,
      registerDto.email!,
      registerDto.password!,
      registerDto.confirmPassword!,
    );
  }
}
