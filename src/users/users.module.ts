import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { AuthenticationService } from 'src/authentication/authentication.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, AuthenticationService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
