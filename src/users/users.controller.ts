import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  // because the userservice class is injectable, we dont need to instantiate is using the new keyword as nestjs already handles it for us
  constructor(private usersService: UsersService) {}
  @Get()
  getAllUsers() {
    // console.log(aUser);
    // return 'this method gets all users';
    console.log(`getting all users`);
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  //   route parameters
  getUser(@Param('email') email: string) {
    // console.log({ id });
    return this.usersService.findOneByEmaik(email);
  }

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
