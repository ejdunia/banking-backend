import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  // because the userservice class is injectable, we dont need to instantiate is using the new keyword as nestjs already handles it for us
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers() {
    console.log(`getting all users`);
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  //   route parameters
  getUser(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Get('email/:email')
  getUserByMail(@Param() Param: any) {
    return `${Param.email}`;
    // return this.usersService.findOneByEmail(email);
  }

  @Post()
  async createUser(@Body(ValidationPipe) user: CreateUserDto) {
    return this.usersService.create(user);
    // return this.usersService.register(user);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.usersService.updateUser(Number(id), user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.delete(id);
  }
}
