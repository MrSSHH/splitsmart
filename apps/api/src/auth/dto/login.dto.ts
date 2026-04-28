import { IsString, MinLength, minLength } from 'class-validator';

export class LoginRequestDto {
  @IsString()
  username: string;

  @MinLength(6)
  @IsString()
  password: string;
}
