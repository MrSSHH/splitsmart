import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  firstName?: string;

  @IsNotEmpty()
  lastName?: string;

  @IsNotEmpty()
  username?: string;

  @IsEmail()
  email?: string;

  @IsString()
  @MinLength(6)
  password?: string;

  @IsString()
  @MinLength(6)
  confirmPassword?: string;
}
