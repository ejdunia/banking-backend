import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
// import PostgresErrorCode from 'src/database/postgresErrorCodes.enum';
// import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './interfaces/user.interface';
import PostgresErrorCode from 'src/database/postgresErrorCodes.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ id });
    if (user) {
      return user;
    }
    throw new HttpException('user not found', HttpStatus.NOT_FOUND);
  }

  async findOneByEmail(email: string): Promise<User | null> {
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
  async findAllUsers(): Promise<User[]> {
    // return `this returns all users`;
    return await this.usersRepository.find();
  }

  async create(userData: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(
      userData.password,
      +process.env.BCRYPT_SALT_ROUNDS,
    );
    console.log(`creating user`);
    try {
      const newUser = await this.usersRepository.create({
        ...userData,
        password: hashedPassword,
      });
      await this.usersRepository.save(newUser);
      return newUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong #from the userservice ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(id, user: UpdateUserDto): Promise<User> {
    const userToUpdate = this.usersRepository.findOneBy({ id });
    console.log(userToUpdate);
    // console.log(user);
    return user;
  }

  // public async register(registrationData: CreateUserDto) {
  //   const hashedPassword = await bcrypt.hash(registrationData.password, 10);
  //   try {
  //     const createdUser = await this.usersRepository.create({
  //       ...registrationData,
  //       password: hashedPassword,
  //     });
  //     console.log(createdUser);
  //     await this.usersRepository.save(createdUser);
  //     return createdUser;
  //   } catch (error) {
  //     if (error?.code === PostgresErrorCode.UniqueViolation) {
  //       throw new HttpException(
  //         'User with that email already exists',
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }
  //     throw new HttpException(
  //       'Something went wrong',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  public async getAuthenticatedUser(email: string, hashedPassword: string) {
    try {
      const user = await this.usersRepository.findOneBy({ email });
      const isPasswordMatching = await bcrypt.compare(
        hashedPassword,
        user.password,
      );
      if (!isPasswordMatching) {
        throw new HttpException(
          'Wrong credentials provided',
          HttpStatus.BAD_REQUEST,
        );
      }
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
