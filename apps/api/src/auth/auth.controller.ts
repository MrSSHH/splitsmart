import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginRequestDto) {
    console.log(
      `Login request detected: ${signInDto.username} ${signInDto.password}`,
    );
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
