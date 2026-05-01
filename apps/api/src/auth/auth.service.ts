import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
  async register(
    firstName: string,
    lastName: string,

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
    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.usersService.create(
      firstName,
      lastName,
      email,
      hashedPassword,
    );
    const accessToken = this.signIn(email, password);
    return accessToken;
  }

  async validateUser(password: string, storedHash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, storedHash);
    return isMatch;
  }
  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isMatch = await this.validateUser(pass, user?.password!);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
