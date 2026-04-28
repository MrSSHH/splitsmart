import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    firstName: string,
    lastName: string,
    username: string,

    email: string,
    password: string,
    confirmPassword: string,
  ): Promise<User> {
    const existingUser = await this.usersService.findOne(email);

    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    } else if (password !== confirmPassword) {
      throw new UnauthorizedException('Passwords do not match');
    }

    const newUser = await this.usersService.create(
      firstName,
      lastName,
      username,

      email,
      password,
    );

    return newUser;
  }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    // Simple check TODO: (replace with bcrypt later)
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
