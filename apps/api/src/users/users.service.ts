import { Injectable } from '@nestjs/common';
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
