import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import PostgresErrorCode from 'src/database/postgresErrorCodes.enum';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import TokenPayload from './tokenPayload.interface';
// import { ConfigService } from '@nestjs/config';

export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  public async register(registrationData: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
        password: hashedPassword,
      });
      // console.log(createdUser);
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      // catch duplicate emails from being registered
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
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
