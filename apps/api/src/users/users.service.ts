import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const newUser = this.usersRepository.create({
      firstName,
      lastName,
      username,

      email,
      password,
    });
    try {
      const savedUser = await this.usersRepository.save(newUser);
    } catch (error) {
      if (error.code === '23505') {
        const detail = error.detail;
        throw new ConflictException({
          message: 'User registration failed',
          detail: detail.replace('Key ', ''), // Makes it cleaner for the frontend
        });
      } else {
        throw new InternalServerErrorException();
      }
    }
    return this.usersRepository.save(newUser);
  }

  async findOne(email: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }
  findAll() {
    return this.usersRepository.find();
  }
}
