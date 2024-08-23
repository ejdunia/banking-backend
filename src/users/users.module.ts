import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { Transaction } from 'src/transactions/transaction.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Transaction]),
    ConfigModule,
    JwtModule,
  ],
  providers: [UsersService, AuthenticationService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
