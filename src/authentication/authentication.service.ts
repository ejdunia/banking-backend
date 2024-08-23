import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import PostgresErrorCode from 'src/database/postgresErrorCodes.enum';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import TokenPayload from './tokenPayload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
// import { ConfigService } from '@nestjs/config';
//
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async register(userData: CreateUserDto): Promise<any> {
    // const hashedPassword = await bcrypt.hash(
    //   userData.password,
    //   +process.env.BCRYPT_SALT_ROUNDS,
    // );
    console.log(`creating user from auth`);
    // try {
    //   const newUser = this.usersRepository.create({
    //     ...userData,
    //     password: hashedPassword,
    //   });
    //   await this.usersRepository.save(newUser);
    //   return newUser;
    // }
    try {
      await this.usersService.create(userData);
      userData.password == undefined;
      return userData;
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

  private async verifyPassword(
    submittedPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordSame = await bcrypt.compare(
      submittedPassword,
      hashedPassword,
    );
    if (!isPasswordSame) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  public async getAuthenticatedUser(email: string, submittedPassword: string) {
    try {
      const user = await this.usersService.findOneByEmail(email);
      this.verifyPassword(submittedPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'wrong credeitials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication = ${token}; HttpOnly; path=/; Max-Age=${this.configService.get('JWT_EXPIRES_TIME')}`;
  }
}
