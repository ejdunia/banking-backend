import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByEmaik(email: string): Promise<User | null> {
    // return this.usersRepository.findOneBy({ id });
    const user = this.usersRepository.findOneBy({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'user with this email not found',
      HttpStatus.NOT_FOUND,
    );
  }

  findAllUsers(): Promise<User[]> {
    // return `this returns all users`;
    return this.usersRepository.find();
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    console.log(`creating user`);
    const newUser = this.usersRepository.create(userData);
    return this.usersRepository.save(newUser);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
